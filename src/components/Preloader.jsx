import { useEffect, useState } from 'react';
import { site } from '../data.js';
import { prefersReducedMotion } from '../hooks.js';

export default function Preloader({ onDone }) {
  const [leaving, setLeaving] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const showFor = prefersReducedMotion() ? 150 : 1600;
    const t1 = setTimeout(() => setLeaving(true), showFor);
    const t2 = setTimeout(() => {
      setGone(true);
      onDone?.();
    }, showFor + 650);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [onDone]);

  if (gone) return null;

  return (
    <div className={`preloader${leaving ? ' preloader--leaving' : ''}`} aria-hidden="true">
      <div className="preloader__inner">
        <div className="preloader__logo">
          <img className="logo-wordmark" src="/initcode-logo.png" alt={site.name} />
        </div>
        <div className="preloader__bar">
          <span className="preloader__bar-fill" />
        </div>
      </div>
    </div>
  );
}
