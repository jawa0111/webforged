import { about, stats } from '../data.js';
import { useCounter, useReveal } from '../hooks.js';
import { Icon } from './Icons.jsx';

function StatCard({ stat, index }) {
  const [ref, value] = useCounter(stat.value);
  return (
    <div className="glass-card stat-card reveal" style={{ '--stagger': index }} ref={ref}>
      <span className="stat-card__value text-gradient">
        {value}
        {stat.suffix}
      </span>
      <span className="stat-card__label">{stat.label}</span>
    </div>
  );
}

export default function About() {
  const textRef = useReveal();
  const statsRef = useReveal();

  return (
    <section id="about" className="section section--tinted">
      <div className="container about">
        <div className="about__text reveal" ref={textRef}>
          <span className="section__eyebrow">About us</span>
          <h2 className="section__title">{about.heading}</h2>
          {about.paragraphs.map((p) => (
            <p className="about__paragraph" key={p.slice(0, 24)}>
              {p}
            </p>
          ))}

          <h3 className="about__why-title">Why choose us</h3>
          <ul className="about__why" role="list">
            {about.whyChooseUs.map((item) => (
              <li key={item}>
                <span className="about__check">
                  <Icon name="check" size={14} />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="about__stats reveal-group" ref={statsRef}>
          {stats.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
