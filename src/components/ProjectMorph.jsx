import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { projects } from '../data.js';
import { prefersReducedMotion } from '../hooks.js';
import { Icon } from './Icons.jsx';

/*
 * ProjectMorph — an interactive project selector.
 * Adapted from the "scroll-morph-hero" component to this project's stack
 * (JSX + plain CSS instead of TSX + Tailwind) and wired to real projects:
 * each floating card is a live project that opens in a new tab, and the
 * back face reveals its name. Cards animate scatter -> line -> circle on
 * scroll-into-view, then morph into a bottom arc as you scroll.
 */

const IMG_WIDTH = 60;
const IMG_HEIGHT = 85;
const MAX_SCROLL = 3000; // virtual scroll range
const lerp = (start, end, t) => start * (1 - t) + end * t;

function FlipCard({ project, target }) {
  return (
    <motion.a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${project.name} — open live site in a new tab`}
      animate={{
        x: target.x,
        y: target.y,
        rotate: target.rotation,
        scale: target.scale,
        opacity: target.opacity,
      }}
      transition={{ type: 'spring', stiffness: 40, damping: 15 }}
      style={{
        position: 'absolute',
        width: IMG_WIDTH,
        height: IMG_HEIGHT,
        transformStyle: 'preserve-3d',
        perspective: '1000px',
      }}
      className="pm-card"
    >
      <motion.div
        className="pm-card__inner"
        style={{ transformStyle: 'preserve-3d' }}
        transition={{ duration: 0.6, type: 'spring', stiffness: 260, damping: 20 }}
        whileHover={{ rotateY: 180 }}
      >
        {/* Front face — the project screenshot */}
        <div className="pm-face pm-face--front">
          <img src={project.image} alt={`${project.name} preview`} loading="lazy" />
          <div className="pm-face__veil" />
        </div>

        {/* Back face — project name + visit prompt */}
        <div className="pm-face pm-face--back">
          <span className="pm-face__tag">{project.tag}</span>
          <span className="pm-face__name">{project.name}</span>
          <span className="pm-face__visit">
            Visit <Icon name="arrowUpRight" size={11} />
          </span>
        </div>
      </motion.div>
    </motion.a>
  );
}

export default function ProjectMorph() {
  const reduced = prefersReducedMotion();
  const cards = projects;
  const total = cards.length;

  const [introPhase, setIntroPhase] = useState(reduced ? 'circle' : 'scatter');
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const containerRef = useRef(null);

  // --- Container size (drives responsive circle / arc geometry) ---
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setContainerSize({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        });
      }
    });
    observer.observe(el);
    setContainerSize({ width: el.offsetWidth, height: el.offsetHeight });
    return () => observer.disconnect();
  }, []);

  // --- Virtual scroll ---
  const virtualScroll = useMotionValue(0);
  const scrollRef = useRef(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || reduced) return;

    // Only consume the wheel while the morph can still advance in that
    // direction; at a boundary we let the page scroll normally so the
    // section never traps the single-page scroll.
    const handleWheel = (e) => {
      const cur = scrollRef.current;
      const next = Math.min(Math.max(cur + e.deltaY, 0), MAX_SCROLL);
      if (next === cur) return; // boundary reached — release to the page
      e.preventDefault();
      scrollRef.current = next;
      virtualScroll.set(next);
    };

    let touchStartY = 0;
    const handleTouchStart = (e) => {
      touchStartY = e.touches[0].clientY;
    };
    const handleTouchMove = (e) => {
      const touchY = e.touches[0].clientY;
      const deltaY = touchStartY - touchY;
      const cur = scrollRef.current;
      const next = Math.min(Math.max(cur + deltaY, 0), MAX_SCROLL);
      if (next === cur) return; // let the page take over at the ends
      e.preventDefault();
      touchStartY = touchY;
      scrollRef.current = next;
      virtualScroll.set(next);
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    container.addEventListener('touchstart', handleTouchStart, { passive: false });
    container.addEventListener('touchmove', handleTouchMove, { passive: false });
    return () => {
      container.removeEventListener('wheel', handleWheel);
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
    };
  }, [virtualScroll, reduced]);

  // Morph: 0 (circle) -> 1 (bottom arc) over the first slice of scroll.
  const morphProgress = useTransform(virtualScroll, [0, 600], [0, 1]);
  const smoothMorph = useSpring(morphProgress, { stiffness: 40, damping: 20 });
  // Shuffle the arc as scrolling continues.
  const scrollRotate = useTransform(virtualScroll, [600, 3000], [0, 360]);
  const smoothScrollRotate = useSpring(scrollRotate, { stiffness: 40, damping: 20 });

  // --- Mouse parallax ---
  const mouseX = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 30, damping: 20 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container || reduced) return;
    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const normalizedX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseX.set(normalizedX * 28);
    };
    container.addEventListener('mousemove', handleMouseMove);
    return () => container.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, reduced]);

  // --- Intro sequence: start when the section scrolls into view ---
  useEffect(() => {
    if (reduced) return;
    const el = containerRef.current;
    if (!el) return;
    let timers = [];
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        timers.push(setTimeout(() => setIntroPhase('line'), 400));
        timers.push(setTimeout(() => setIntroPhase('circle'), 2200));
      },
      { threshold: 0.35 }
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      timers.forEach(clearTimeout);
    };
  }, [reduced]);

  // --- Random scatter start positions ---
  const scatterPositions = useMemo(
    () =>
      cards.map(() => ({
        x: (Math.random() - 0.5) * 1500,
        y: (Math.random() - 0.5) * 1000,
        rotation: (Math.random() - 0.5) * 180,
        scale: 0.6,
        opacity: 0,
      })),
    [cards]
  );

  // --- Bridge motion values into React state for the geometry math ---
  const [morphValue, setMorphValue] = useState(0);
  const [rotateValue, setRotateValue] = useState(0);
  const [parallaxValue, setParallaxValue] = useState(0);

  useEffect(() => {
    const a = smoothMorph.on('change', setMorphValue);
    const b = smoothScrollRotate.on('change', setRotateValue);
    const c = smoothMouseX.on('change', setParallaxValue);
    return () => {
      a();
      b();
      c();
    };
  }, [smoothMorph, smoothScrollRotate, smoothMouseX]);

  const contentOpacity = useTransform(smoothMorph, [0.8, 1], [0, 1]);
  const contentY = useTransform(smoothMorph, [0.8, 1], [20, 0]);

  return (
    <div ref={containerRef} className="pm-stage">
      <div className="pm-inner">
        {/* Arc caption (fades in once morphed) */}
        <motion.div style={{ opacity: contentOpacity, y: contentY }} className="pm-arc-caption">
          <h3>Pick a project</h3>
          <p>Hover any card to reveal it, then click to open the live site.</p>
        </motion.div>

        {/* Cards */}
        <div className="pm-cards">
          {cards.map((project, i) => {
            let target = { x: 0, y: 0, rotation: 0, scale: 1, opacity: 1 };

            if (introPhase === 'scatter') {
              target = scatterPositions[i];
            } else if (introPhase === 'line') {
              const lineSpacing = 70;
              const lineX = i * lineSpacing - (total * lineSpacing) / 2;
              target = { x: lineX, y: 0, rotation: 0, scale: 1, opacity: 1 };
            } else {
              const isMobile = containerSize.width < 768;
              const minDimension = Math.min(containerSize.width, containerSize.height);

              // Circle position — sized to sit comfortably inside the footprint
              const circleRadius = Math.min(minDimension * 0.34, 180);
              const circleAngle = (i / total) * 360;
              const circleRad = (circleAngle * Math.PI) / 180;
              const circlePos = {
                x: Math.cos(circleRad) * circleRadius,
                y: Math.sin(circleRad) * circleRadius,
                rotation: circleAngle + 90,
              };

              // Bottom "rainbow" arc — tuned for the contained footprint and
              // vertically centred (apex above centre) so it never clips.
              const arcRadius = minDimension * (isMobile ? 0.5 : 0.44);
              const spreadAngle = isMobile ? 112 : 128;
              // Vertical span of the arc is (1 - cos(spread/2)) * radius; place
              // the apex half that distance above centre to centre the whole arc.
              const halfDrop = (1 - Math.cos((spreadAngle / 2) * (Math.PI / 180))) * arcRadius;
              const arcApexY = -halfDrop / 2;
              const arcCenterY = arcApexY + arcRadius;
              const startAngle = -90 - spreadAngle / 2;
              const step = spreadAngle / (total - 1);

              const scrollProgress = Math.min(Math.max(rotateValue / 360, 0), 1);
              const maxRotation = spreadAngle * 0.8;
              const boundedRotation = -scrollProgress * maxRotation;

              const currentArcAngle = startAngle + i * step + boundedRotation;
              const arcRad = (currentArcAngle * Math.PI) / 180;
              const arcPos = {
                x: Math.cos(arcRad) * arcRadius + parallaxValue,
                y: Math.sin(arcRad) * arcRadius + arcCenterY,
                rotation: currentArcAngle + 90,
                scale: isMobile ? 1.15 : 1.25,
              };

              target = {
                x: lerp(circlePos.x, arcPos.x, morphValue),
                y: lerp(circlePos.y, arcPos.y, morphValue),
                rotation: lerp(circlePos.rotation, arcPos.rotation, morphValue),
                scale: lerp(1, arcPos.scale, morphValue),
                opacity: 1,
              };
            }

            return <FlipCard key={project.name} project={project} target={target} />;
          })}
        </div>
      </div>
    </div>
  );
}
