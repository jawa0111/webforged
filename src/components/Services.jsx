import { services } from '../data.js';
import { useReveal, useTilt } from '../hooks.js';
import { Icon } from './Icons.jsx';

function ServiceCard({ service, index }) {
  const tiltRef = useTilt(6);
  return (
    <li className="reveal" style={{ '--stagger': index }}>
      <article className="glass-card service-card" ref={tiltRef}>
        <div
          className="service-card__bg"
          style={{ backgroundImage: `url(${service.image})` }}
          aria-hidden="true"
        />
        <div className="service-card__content">
          <div className="service-card__icon">
            <Icon name={service.icon} size={26} />
          </div>
          <h3>{service.title}</h3>
          <p>{service.description}</p>
        </div>
      </article>
    </li>
  );
}

export default function Services() {
  const headRef = useReveal();
  const gridRef = useReveal();

  return (
    <section id="services" className="section">
      <div className="container">
        <div className="section__head reveal" ref={headRef}>
          <span className="section__eyebrow">What we do</span>
          <h2 className="section__title">
            Everything your business needs <span className="text-gradient">online</span>
          </h2>
          <p className="section__lead">
            One team for design, development and everything after launch — whatever your size or budget.
          </p>
        </div>

        <ul className="services-grid reveal-group" role="list" ref={gridRef}>
          {services.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} />
          ))}
        </ul>
      </div>
    </section>
  );
}
