import { useState } from 'react';
import { contact, site } from '../data.js';
import { useReveal } from '../hooks.js';
import { Icon } from './Icons.jsx';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const initialForm = { name: '', email: '', projectType: '', message: '' };

function validate(form) {
  const errors = {};
  if (!form.name.trim()) errors.name = 'Please tell us your name.';
  if (!form.email.trim()) errors.email = 'We need an email to reply to.';
  else if (!EMAIL_RE.test(form.email)) errors.email = 'That email doesn’t look right — check for typos.';
  if (!form.projectType) errors.projectType = 'Pick the option closest to your project.';
  if (form.message.trim().length < 10) errors.message = 'Give us at least a sentence about your project.';
  return errors;
}

function Field({ id, label, error, filled, children }) {
  return (
    <div className={`field${filled ? ' field--filled' : ''}${error ? ' field--error' : ''}`}>
      {children}
      <label htmlFor={id}>{label}</label>
      {error && (
        <span className="field__error" id={`${id}-error`} role="alert">
          {error}
        </span>
      )}
    </div>
  );
}

export default function Contact() {
  const headRef = useReveal();
  const panelRef = useReveal();
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | sent

  const set = (key) => (e) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    setErrors((prev) => {
      if (!prev[key]) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  const onBlur = (key) => () => {
    const fieldErrors = validate(form);
    if (fieldErrors[key]) setErrors((prev) => ({ ...prev, [key]: fieldErrors[key] }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const nextErrors = validate(form);
    setErrors(nextErrors);
    const firstError = Object.keys(nextErrors)[0];
    if (firstError) {
      document.getElementById(`contact-${firstError}`)?.focus();
      return;
    }

    // Build a WhatsApp message from the form and open a chat.
    const waNumber = site.phones[0].replace(/[^\d]/g, '');
    const text = [
      `Hi, I'd like to start a project.`,
      ``,
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      `Project type: ${form.projectType}`,
      `Details: ${form.message}`,
    ].join('\n');
    const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(text)}`;

    setStatus('sending');
    setTimeout(() => {
      window.open(waUrl, '_blank', 'noopener,noreferrer');
      setStatus('sent');
    }, 600);
  };

  const reset = () => {
    setForm(initialForm);
    setErrors({});
    setStatus('idle');
  };

  return (
    <section id="contact" className="section section--tinted">
      <div className="container">
        <div className="section__head reveal" ref={headRef}>
          <span className="section__eyebrow">Get in touch</span>
          <h2 className="section__title section__title--lg">
            Have a project in mind? <span className="text-gradient">Let&rsquo;s build it.</span>
          </h2>
          <p className="section__lead">{contact.subheading}</p>
        </div>

        <div className="contact reveal" ref={panelRef}>
          <div className="glass-card contact__form-card">
            {status === 'sent' ? (
              <div className="contact__success" role="status">
                <span className="contact__success-ring">
                  <svg viewBox="0 0 52 52" aria-hidden="true">
                    <circle className="contact__success-circle" cx="26" cy="26" r="24" fill="none" />
                    <path className="contact__success-check" fill="none" d="M14 27l8 8 16-17" />
                  </svg>
                </span>
                <h3>Message sent!</h3>
                <p>Thanks for reaching out — we&rsquo;ll get back to you within one business day.</p>
                <button type="button" className="btn btn--ghost" onClick={reset}>
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={onSubmit} noValidate>
                <div className="contact__grid">
                  <Field id="contact-name" label="Your name" error={errors.name} filled={!!form.name}>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      value={form.name}
                      onChange={set('name')}
                      onBlur={onBlur('name')}
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? 'contact-name-error' : undefined}
                      placeholder=" "
                      required
                    />
                  </Field>
                  <Field id="contact-email" label="Email address" error={errors.email} filled={!!form.email}>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      value={form.email}
                      onChange={set('email')}
                      onBlur={onBlur('email')}
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? 'contact-email-error' : undefined}
                      placeholder=" "
                      required
                    />
                  </Field>
                </div>

                <Field
                  id="contact-projectType"
                  label="Project type"
                  error={errors.projectType}
                  filled={!!form.projectType}
                >
                  <select
                    id="contact-projectType"
                    name="projectType"
                    value={form.projectType}
                    onChange={set('projectType')}
                    onBlur={onBlur('projectType')}
                    aria-invalid={!!errors.projectType}
                    aria-describedby={errors.projectType ? 'contact-projectType-error' : undefined}
                    required
                  >
                    <option value="" disabled hidden />
                    {contact.projectTypes.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field id="contact-message" label="Tell us about your project" error={errors.message} filled={!!form.message}>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={5}
                    value={form.message}
                    onChange={set('message')}
                    onBlur={onBlur('message')}
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? 'contact-message-error' : undefined}
                    placeholder=" "
                    required
                  />
                </Field>

                <button
                  type="submit"
                  className="btn btn--primary btn--lg contact__submit"
                  disabled={status === 'sending'}
                >
                  {status === 'sending' ? (
                    <>
                      <Icon name="spinner" size={18} className="spin" />
                      Sending…
                    </>
                  ) : (
                    'Send Message'
                  )}
                </button>
              </form>
            )}
          </div>

          <aside className="contact__aside">
            <a className="glass-card contact__channel" href={`mailto:${site.email}`}>
              <Icon name="mail" size={22} />
              <div>
                <span className="contact__channel-label">Email us</span>
                <span className="contact__channel-value">{site.email}</span>
              </div>
            </a>
            <a
              className="glass-card contact__channel"
              href={`tel:${site.phones[0].replace(/[^+\d]/g, '')}`}
            >
              <Icon name="phone" size={22} />
              <div>
                <span className="contact__channel-label">Call us</span>
                {site.phones.map((phone) => (
                  <span className="contact__channel-value" key={phone}>
                    {phone}
                  </span>
                ))}
              </div>
            </a>
            <div className="glass-card contact__channel">
              <Icon name="pin" size={22} />
              <div>
                <span className="contact__channel-label">Based in</span>
                <span className="contact__channel-value">{site.location}</span>
              </div>
            </div>
            <div className="contact__socials">
              {site.socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="social-btn"
                >
                  <Icon name={s.icon} size={20} />
                </a>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
