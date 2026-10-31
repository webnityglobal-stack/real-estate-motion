
import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import siteConfig from "../config/siteConfig";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const closeMenu = () => setMenuOpen(false);

  const handleNavClick = (path) => {
    closeMenu();

    if (path === "/" && location.pathname === "/") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  const navItems = (siteConfig.navigation || []).filter(
    (item) =>
      item.path !== "/admin" &&
      item.path !== "/contact" &&
      item.path !== "/list-your-property"
  );

  const linkClass = ({ isActive }) =>
    `rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-300 ${isActive
      ? "bg-orange-100 text-orange-800 shadow-sm"
      : "text-stone-700 hover:bg-orange-50 hover:text-orange-700"
    }`;

  const propertyButtonClass =
    "inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#a94719] to-[#d97706] px-4 py-3 text-sm font-bold text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:from-[#873512] hover:to-[#b45309] hover:shadow-lg";

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      {/* Top Devotional Bar */}
      <div className="bg-gradient-to-r from-[#702b16] via-[#9a431d] to-[#702b16] px-3 py-2 text-center text-white">
        <p className="text-[11px] font-semibold tracking-[0.12em] sm:text-xs sm:tracking-[0.2em]">
          <span className="mr-2 text-amber-300">✦</span>
          || Shri Radhe Krishna ||
          <span className="mx-2 text-amber-300">•</span>
          Radhe Radhe
          <span className="ml-2 text-amber-300">✦</span>
        </p>
      </div>

      {/* Main Navbar */}
      <div className="border-b border-amber-100 bg-gradient-to-r from-[#fffdf8] via-white to-[#fff7ed]">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          {/* Brand Logo and Name */}
          <NavLink
            to="/"
            onClick={() => handleNavClick("/")}
            className="flex min-w-0 items-center gap-3 sm:gap-4"
            aria-label="Shri Radhe Krishna home"
          >
            <img
              src="/cottage-logo.png"
              alt="Shri Radhe Krishna Real Estate"
              className="h-12 w-12 rounded-full object-cover shrink-0 border-2 border-amber-300"
            />

            <div className="min-w-0">
              <span className="block text-lg font-extrabold tracking-tight text-[#762b13] sm:text-2xl lg:text-3xl">
                Shri Radhe Krishna
              </span>

              <span className="mt-1 block text-[10px] font-semibold tracking-[0.12em] text-amber-700 sm:text-xs sm:tracking-[0.18em]">
                Radhe Radhe • Shubh Mangal
              </span>
            </div>
          </NavLink>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={menuOpen}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-amber-200 bg-white text-2xl text-[#842f13] transition hover:border-orange-500 hover:bg-orange-50 md:hidden"
          >
            {menuOpen ? "×" : "☰"}
          </button>

          {/* Navigation Links */}
          <nav
            className={`${menuOpen ? "flex" : "hidden"
              } absolute left-0 right-0 top-full max-h-[80vh] flex-col gap-2 overflow-y-auto border-b border-amber-200 bg-[#fffdf8] p-4 shadow-xl md:static md:flex md:max-h-none md:flex-row md:items-center md:gap-1 md:overflow-visible md:border-0 md:bg-transparent md:p-0 md:shadow-none`}
          >
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/"}
                className={linkClass}
                onClick={() => handleNavClick(item.path)}
              >
                {item.label}
              </NavLink>
            ))}

            {/* List Your Property Button */}
            <NavLink
              to="/list-your-property"
              onClick={() => handleNavClick("/list-your-property")}
              className={`${propertyButtonClass} ${location.pathname === "/list-your-property"
                ? "ring-2 ring-amber-300 ring-offset-2"
                : ""
                } md:ml-2`}
            >
              List Your Property
              <span aria-hidden="true">↗</span>
            </NavLink>

            {/* Contact Button */}
            <NavLink
              to="/contact"
              onClick={() => handleNavClick("/contact")}
              className={`${propertyButtonClass} md:ml-1`}
            >
              Contact Us
              <span aria-hidden="true">↗</span>
            </NavLink>

            {/* Mobile Devotional Footer */}
            <div className="mt-2 border-t border-amber-200 pt-3 md:hidden">
              <p className="text-center text-xs font-semibold tracking-wider text-amber-800">
                || Jai Shri Radhe ||
              </p>
            </div>
          </nav>
        </div>
      </div>

      {/* Decorative Bottom Line */}
      <div className="h-1 bg-gradient-to-r from-amber-200 via-orange-500 to-amber-200" />
    </header>
  );
}
