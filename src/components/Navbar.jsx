
import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import siteConfig from '../config/siteConfig';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const closeMenu = () => setMenuOpen(false);

  const handleNavClick = (path) => {
    closeMenu();

    if (path === '/' && location.pathname === '/') {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'auto',
      });
    }
  };

  const linkClass = ({ isActive }) =>
    `nav-link${isActive ? ' active' : ''}`;

  const navItems = (siteConfig.navigation || []).filter(
    (item) => item.path !== '/admin'
  );

  return (
    <header className="site-header">
      <div className="navbar container">
        <NavLink
          to="/"
          className="brand"
          onClick={() => handleNavClick('/')}
          aria-label={`${siteConfig.brandName} home`}
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
        </NavLink>

        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="main-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? '✕' : '☰'}
        </button>

        <nav
          id="main-navigation"
          className={`nav-links ${menuOpen ? 'open' : ''}`}
        >
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              className={linkClass}
              onClick={() => handleNavClick(item.path)}
            >
              {item.label}
            </NavLink>
          ))}

          <NavLink
            to="/contact"
            className="nav-cta"
            onClick={() => handleNavClick('/contact')}
          >
            List Your Property <span aria-hidden="true">↗</span>
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
