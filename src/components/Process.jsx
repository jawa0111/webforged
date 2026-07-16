import { processSteps } from '../data.js';
import { useReveal } from '../hooks.js';

export default function Process() {
  const headRef = useReveal();
  const timelineRef = useReveal({ threshold: 0.25 });

  return (
    <section id="process" className="section section--tinted">
      <div className="container">
        <div className="section__head reveal" ref={headRef}>
          <span className="section__eyebrow">How we work</span>
          <h2 className="section__title">
            From idea to launch in <span className="text-gradient">four steps</span>
          </h2>
        </div>

        <ol className="process reveal-group" role="list" ref={timelineRef}>
          <span className="process__track" aria-hidden="true" />
          {processSteps.map((step, i) => (
            <li className="process__step reveal" style={{ '--stagger': i * 2 }} key={step.number}>
              <span className="process__dot">
                <span className="process__number">{step.number}</span>
              </span>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
