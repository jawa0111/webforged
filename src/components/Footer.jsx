import { navLinks, site } from '../data.js';
import { scrollToSection } from '../hooks.js';
import { Icon } from './Icons.jsx';

export default function Footer() {
  const go = (e, href) => {
    e.preventDefault();
    scrollToSection(href);
  };

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <a href="#home" className="footer__logo" onClick={(e) => go(e, '#home')}>
            <img className="logo-wordmark" src="/webforged-logo.png" alt={site.name} />
          </a>
          <p className="footer__tagline">{site.tagline}</p>
        </div>

        <nav className="footer__nav" aria-label="Footer navigation">
          <span className="footer__heading">Explore</span>
          <ul role="list">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} onClick={(e) => go(e, link.href)}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="footer__social">
          <span className="footer__heading">Follow us</span>
          <div className="footer__social-row">
            {site.socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="social-btn"
              >
                <Icon name={s.icon} size={18} />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="container footer__bottom">
        <p>
          &copy; {new Date().getFullYear()} {site.name}. All rights reserved.
        </p>
        <p className="footer__made">Designed &amp; built with care.</p>
      </div>
    </footer>
  );
}
