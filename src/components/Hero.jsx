import { hero } from '../data.js';
import { scrollToSection, useTyping, useParallax } from '../hooks.js';
import { Icon } from './Icons.jsx';
import ProjectMorph from './ProjectMorph.jsx';

export default function Hero({ ready }) {
  const typed = useTyping(hero.typingPhrases);
  const orbA = useParallax(0.1);
  const orbB = useParallax(-0.08);

  const go = (e, href) => {
    e.preventDefault();
    scrollToSection(href);
  };

  return (
    <section id="home" className={`hero${ready ? ' hero--ready' : ''}`}>
      {/* Decorative background: gradient mesh orbs + grain + grid */}
      <div className="hero__bg" aria-hidden="true">
        <div className="hero__orb hero__orb--a" ref={orbA} />
        <div className="hero__orb hero__orb--b" ref={orbB} />
        <div className="hero__grid" />
        <div className="grain" />
      </div>

      <div className="container hero__layout">
        <div className="hero__content">
        <span className="hero__badge">
          <span className="hero__badge-dot" />
          {hero.badge}
        </span>

        <h1 className="hero__headline">
          {hero.headlineLines.map((line, lineIndex) => (
            <span className="hero__line" key={line}>
              <span
                className="hero__line-inner"
                style={{ '--line-delay': `${0.15 + lineIndex * 0.14}s` }}
              >
                {line.split(' ').map((word, wordIndex) =>
                  word === hero.highlightWord ? (
                    <span className="text-gradient" key={wordIndex}>
                      {word}{' '}
                    </span>
                  ) : (
                    <span key={wordIndex}>{word} </span>
                  )
                )}
              </span>
            </span>
          ))}
        </h1>

        <p className="hero__typing" aria-label={hero.typingPhrases[0]}>
          <span aria-hidden="true">
            {typed}
            <span className="hero__caret" />
          </span>
        </p>

        <p className="hero__subline">{hero.subline}</p>

        <div className="hero__ctas">
          <a href="#projects" className="btn btn--primary btn--lg" onClick={(e) => go(e, '#projects')}>
            View Our Work
          </a>
          <a href="#contact" className="btn btn--ghost btn--lg" onClick={(e) => go(e, '#contact')}>
            Start a Project
            <Icon name="arrowUpRight" size={18} />
          </a>
        </div>
        </div>

        {/* Interactive scroll-morph project selector */}
        <div className="hero__visual">
          <ProjectMorph />
        </div>
      </div>

      <a
        href="#services"
        className="hero__scroll-hint"
        aria-label="Scroll to services"
        onClick={(e) => go(e, '#services')}
      >
        <span className="hero__mouse">
          <span className="hero__mouse-wheel" />
        </span>
        <Icon name="chevronDown" size={16} />
      </a>
    </section>
  );
}
