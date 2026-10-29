import { Link, useLocation } from "react-router-dom";
import siteConfig from "../config/siteConfig";

export default function Footer() {
  const location = useLocation();

  const contact = siteConfig.contact || {};
  const social = siteConfig.social || {};

  const exploreLinks = (siteConfig.navigation || []).filter(
    (item) => item.path !== "/admin"
  );

  const handleLinkClick = (path) => {
    if (path === location.pathname) {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    }
  };

  const phoneHref = contact.phone
    ? `tel:${contact.phone.replace(/[^\d+]/g, "")}`
    : "";

  const emailHref = contact.email
    ? `mailto:${contact.email}`
    : "";

  return (
    <footer className="relative overflow-hidden bg-[#20130f] text-orange-50">
      {/* Decorative Top Border */}
      <div className="h-1.5 bg-gradient-to-r from-amber-200 via-orange-500 to-amber-200" />

      {/* Devotional Banner */}
      <div className="border-b border-amber-800/40 bg-gradient-to-r from-[#502316] via-[#79351b] to-[#502316] px-4 py-4 text-center">
        <p className="text-xs font-semibold tracking-[0.12em] text-amber-100 sm:text-sm sm:tracking-[0.2em]">
          <span className="mr-2 text-amber-300">✦</span>
          || Shri Radhe Krishna ||
          <span className="mx-2 text-amber-300">•</span>
          Radhe Radhe
          <span className="ml-2 text-amber-300">✦</span>
        </p>
      </div>

      {/* Main Footer */}
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-5 py-12 sm:px-6 md:grid-cols-2 md:py-14 lg:grid-cols-4 lg:gap-12 lg:px-8">

        {/* Brand Section */}
        <div className="lg:col-span-2">
          <Link
            to="/"
            onClick={() => handleLinkClick("/")}
            className="group mb-5 inline-flex items-center gap-4"
          >
            {siteConfig.logo ? (
              <img
                src={siteConfig.logo}
                alt="Shri Radhe Krishna logo"
                className="h-14 w-14 shrink-0 rounded-xl object-contain sm:h-16 sm:w-16"
              />
            ) : (
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-amber-500/50 bg-gradient-to-br from-amber-200 to-orange-400 text-3xl font-bold text-[#502316] shadow-lg sm:h-16 sm:w-16">
                ॐ
              </span>
            )}

            <span>
              <span className="block text-xl font-extrabold tracking-tight text-amber-100 transition-colors group-hover:text-amber-300 sm:text-2xl">
                Shri Radhe Krishna
              </span>

              <span className="mt-1 block text-xs font-medium tracking-wider text-amber-400">
                Radhe Radhe • Shubh Mangal
              </span>

            </span>
          </Link>

          <p className="mb-6 max-w-md text-sm leading-7 text-orange-100/70">
            {siteConfig.tagline ||
              "Discover exceptional properties and find a place that feels like home."}
          </p>

          <p className="mb-5 max-w-md text-sm leading-7 text-orange-100/60">
            Find a place where comfort, happiness, and beautiful
            beginnings come together. We are here to help you take
            the next step toward your dream property.
          </p>

          {/* Social Links */}
          <div className="flex flex-wrap gap-3">
            {social.instagram && (
              <a
                href={social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="rounded-lg border border-amber-800/60 px-4 py-2 text-sm font-medium text-orange-100/80 transition-all duration-300 hover:-translate-y-0.5 hover:border-amber-400 hover:bg-amber-500/10 hover:text-amber-200"
              >
                Instagram ↗
              </a>
            )}

            {social.facebook && (
              <a
                href={social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="rounded-lg border border-amber-800/60 px-4 py-2 text-sm font-medium text-orange-100/80 transition-all duration-300 hover:-translate-y-0.5 hover:border-amber-400 hover:bg-amber-500/10 hover:text-amber-200"
              >
                Facebook ↗
              </a>
            )}

            {social.linkedin && (
              <a
                href={social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="rounded-lg border border-amber-800/60 px-4 py-2 text-sm font-medium text-orange-100/80 transition-all duration-300 hover:-translate-y-0.5 hover:border-amber-400 hover:bg-amber-500/10 hover:text-amber-200"
              >
                LinkedIn ↗
              </a>
            )}
          </div>
        </div>

        {/* Explore Links */}
        <div>
          <h3 className="mb-5 flex items-center gap-3 text-lg font-bold text-amber-100">
            Explore
            <span className="h-px flex-1 bg-amber-800/60" />
          </h3>

          <div className="flex flex-col items-start gap-3">
            {exploreLinks.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => handleLinkClick(item.path)}
                className="text-sm text-orange-100/70 transition-all duration-200 hover:translate-x-1 hover:text-amber-300"
              >
                <span className="mr-2 text-amber-500">›</span>
                {item.label === "Properties"
                  ? "Our Properties"
                  : item.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Contact Section */}
        <div>
          <h3 className="mb-5 flex items-center gap-3 text-lg font-bold text-amber-100">
            Get in Touch
            <span className="h-px flex-1 bg-amber-800/60" />
          </h3>

          <p className="mb-5 text-sm leading-6 text-orange-100/70">
            Have a property in mind? Let us help you find the right
            place for your next chapter.
          </p>

          {contact.phone && (
            <a
              href={phoneHref}
              className="mb-4 flex items-start gap-3 text-sm text-orange-100/80 transition-colors hover:text-amber-300"
            >
              <span className="text-lg text-amber-400">☎</span>
              <span className="break-all">{contact.phone}</span>
            </a>
          )}

          {contact.email && (
            <a
              href={emailHref}
              className="mb-4 flex items-start gap-3 text-sm text-orange-100/80 transition-colors hover:text-amber-300"
            >
              <span className="text-lg text-amber-400">✉</span>
              <span className="break-all">{contact.email}</span>
            </a>
          )}

          {contact.address && (
            <p className="mb-5 flex items-start gap-3 text-sm leading-6 text-orange-100/80">
              <span className="text-lg text-amber-400">⌖</span>
              <span>{contact.address}</span>
            </p>
          )}

          <Link
            to="/contact"
            onClick={() => handleLinkClick("/contact")}
            className="mt-2 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 px-5 py-3 text-sm font-bold text-[#32170d] shadow-lg transition-all duration-300 hover:-translate-y-1 hover:from-amber-300 hover:to-orange-400 hover:shadow-orange-900/40"
          >
            Talk to Our Team
            <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-amber-900/50 bg-black/20">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-5 py-5 text-center sm:px-6 md:flex-row md:px-8 md:text-left">
          <p className="text-xs leading-6 text-orange-100/60">
            © {new Date().getFullYear()} Shri Radhe Krishna. All
            rights reserved.
          </p>

          <p className="text-xs font-medium tracking-wide text-amber-400">
            Made with devotion • Designed for better living
          </p>

          <button
            type="button"
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              })
            }
            className="rounded-lg border border-amber-800/60 px-3 py-2 text-xs font-semibold text-amber-200 transition hover:border-amber-400 hover:bg-amber-500/10"
          >
            Back to Top ↑
          </button>
        </div>
      </div>
    </footer>
  );
}