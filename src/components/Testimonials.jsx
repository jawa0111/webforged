import { testimonials } from '../data.js';
import { useReveal } from '../hooks.js';
import AnimatedTestimonials from './AnimatedTestimonials.jsx';

export default function Testimonials() {
  const headRef = useReveal();
  const bodyRef = useReveal();

  return (
    <section id="testimonials" className="section">
      <div className="container">
        <div className="section__head reveal" ref={headRef}>
          <span className="section__eyebrow">Kind words</span>
          <h2 className="section__title">
            Clients who <span className="text-gradient">stuck around</span>
          </h2>
        </div>

        <div className="reveal" ref={bodyRef}>
          <AnimatedTestimonials testimonials={testimonials} autoplay />
        </div>
      </div>
    </section>
  );
}
