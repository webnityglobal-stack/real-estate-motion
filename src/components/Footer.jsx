
import { Link, useLocation } from 'react-router-dom';
import siteConfig from '../config/siteConfig';

export default function Footer() {
  const location = useLocation();

  const contact = siteConfig.contact || {};
  const social = siteConfig.social || {};

  const exploreLinks = (siteConfig.navigation || []).filter(
    (item) => item.path !== '/admin'
  );

  const handleLinkClick = (path) => {
    if (path === location.pathname) {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'auto',
      });
    }
  };

  const phoneHref = contact.phone
    ? `tel:${contact.phone.replace(/[^\d+]/g, '')}`
    : '';

  const emailHref = contact.email
    ? `mailto:${contact.email}`
    : '';

  return (
    <footer className="site-footer">
      <div className="container footer-main">
        <div className="footer-brand">
          <Link
            to="/"
            className="brand footer-logo"
            onClick={() => handleLinkClick('/')}
          >
            {siteConfig.logo ? (
              <img
                src={siteConfig.logo}
                alt={`${siteConfig.brandName} logo`}
                className="brand-logo"
              />
            ) : (
              <span className="brand-icon">
                {siteConfig.brandName.charAt(0)}
              </span>
            )}

            <span className="brand-name">
              {siteConfig.brandName}
              <small>{siteConfig.tagline}</small>
            </span>
          </Link>

          <p>
            {siteConfig.tagline ||
              'Discover exceptional properties and find a place that feels like home.'}
          </p>

          <div className="footer-social">
            {social.instagram && (
              <a
                href={social.instagram}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
              >
                Instagram
              </a>
            )}

            {social.facebook && (
              <a
                href={social.facebook}
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
              >
                Facebook
              </a>
            )}

            {social.linkedin && (
              <a
                href={social.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
              >
                LinkedIn
              </a>
            )}
          </div>
        </div>

        <div className="footer-column">
          <h3>Explore</h3>

          {exploreLinks.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => handleLinkClick(item.path)}
            >
              {item.label === 'Properties'
                ? 'Our Properties'
                : item.label}
            </Link>
          ))}
        </div>

        <div className="footer-column">
          <h3>Get in Touch</h3>

          <p>Have a property in mind?</p>

          {contact.phone && (
            <p>
              <a href={phoneHref}>{contact.phone}</a>
            </p>
          )}

          {contact.email && (
            <p>
              <a href={emailHref}>{contact.email}</a>
            </p>
          )}

          {contact.address && <p>{contact.address}</p>}

          <Link
            to="/contact"
            className="footer-contact-link"
            onClick={() => handleLinkClick('/contact')}
          >
            Talk to our team ↗
          </Link>
        </div>
      </div>

      <div className="container footer-bottom">
        <p>
          © {new Date().getFullYear()} {siteConfig.brandName}.
          {' '}All rights reserved.
        </p>

        <p>Designed for better living.</p>
      </div>
    </footer>
  );
}
