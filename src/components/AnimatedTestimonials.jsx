import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Icon } from './Icons.jsx';

/*
 * AnimatedTestimonials — ported from the shadcn/Tailwind "animated-testimonials"
 * component to this project's stack (JSX + plain CSS). A stacked-photo slider:
 * the active portrait springs forward while the quote reveals word by word.
 * Wired to this project's testimonials data (fields: quote, name, role, image).
 */
export default function AnimatedTestimonials({ testimonials, autoplay = false }) {
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();

  const handleNext = () => setActive((prev) => (prev + 1) % testimonials.length);
  const handlePrev = () =>
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  const isActive = (index) => index === active;

  useEffect(() => {
    if (!autoplay || reduced) return;
    const interval = setInterval(handleNext, 5000);
    return () => clearInterval(interval);
  }, [autoplay, reduced]); // eslint-disable-line react-hooks/exhaustive-deps

  // Small random tilt for the stacked (inactive) cards.
  const randomRotateY = () => (reduced ? 0 : Math.floor(Math.random() * 21) - 10);

  return (
    <div className="at">
      <div className="at__grid">
        <div className="at__images">
          <AnimatePresence>
            {testimonials.map((t, index) => (
              <motion.div
                key={t.image}
                initial={{ opacity: 0, scale: 0.9, z: -100, rotate: randomRotateY() }}
                animate={{
                  opacity: isActive(index) ? 1 : 0.7,
                  scale: isActive(index) ? 1 : 0.95,
                  z: isActive(index) ? 0 : -100,
                  rotate: isActive(index) ? 0 : randomRotateY(),
                  zIndex: isActive(index) ? 999 : testimonials.length + 2 - index,
                  y: isActive(index) && !reduced ? [0, -60, 0] : 0,
                }}
                exit={{ opacity: 0, scale: 0.9, z: 100, rotate: randomRotateY() }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                className="at__image"
              >
                <img
                  src={t.image}
                  alt={`${t.name}, ${t.role}`}
                  draggable={false}
                  width="500"
                  height="500"
                  loading="lazy"
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="at__content">
          <motion.div
            key={active}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
          >
            <span className="at__mark" aria-hidden="true">
              &ldquo;
            </span>
            <p className="at__quote">
              {testimonials[active].quote.split(' ').map((word, index) => (
                <motion.span
                  key={`${active}-${index}`}
                  initial={{ filter: 'blur(10px)', opacity: 0, y: 5 }}
                  animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.2,
                    ease: 'easeInOut',
                    delay: reduced ? 0 : 0.02 * index,
                  }}
                  className="at__word"
                >
                  {word}&nbsp;
                </motion.span>
              ))}
            </p>
            <div className="at__author">
              <span className="at__name">{testimonials[active].name}</span>
              <span className="at__role">{testimonials[active].role}</span>
            </div>
          </motion.div>

          <div className="at__nav">
            <button
              type="button"
              onClick={handlePrev}
              className="at__btn"
              aria-label="Previous testimonial"
            >
              <Icon name="arrowLeft" size={18} />
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="at__btn"
              aria-label="Next testimonial"
            >
              <Icon name="arrowRight" size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
