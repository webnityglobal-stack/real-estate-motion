
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import siteConfig from "../config/siteConfig";

const heroImages = [
  {
    url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2200&q=85",
    alt: "Luxury contemporary home",
    label: "Exceptional Living",
  },
  {
    url: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=2200&q=85",
    alt: "Premium modern home interior",
    label: "Designed for Life",
  },
  {
    url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2200&q=85",
    alt: "Contemporary luxury property",
    label: "A Place to Belong",
  },
];

const highlights = [
  {
    number: "01",
    title: "Find a home",
    description: "Discover a space that feels like yours.",
  },
  {
    number: "02",
    title: "Explore land",
    description: "Find room for your next big idea.",
  },
  {
    number: "03",
    title: "Invest in the future",
    description: "Explore property opportunities.",
  },
];

const propertyTypes = [
  { label: "All properties", value: "" },
  { label: "Residential", value: "residential" },
  { label: "Commercial", value: "commercial" },
  { label: "Industrial", value: "industrial" },
  { label: "Land & Plots", value: "plot" },
];

export default function Home() {
  const navigate = useNavigate();

  const [activeBanner, setActiveBanner] = useState(0);
  const [search, setSearch] = useState("");
  const [purpose, setPurpose] = useState("buy");
  const [type, setType] = useState("");

  const brandName = siteConfig?.brandName || "EstateLuxe";

  const tagline =
    siteConfig?.tagline ||
    "Discover exceptional spaces for living, working and investing.";

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveBanner((current) => (current + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const handleSearch = (event) => {
    event.preventDefault();

    const params = new URLSearchParams();

    if (search.trim()) params.set("search", search.trim());
    if (type) params.set("type", type);
    if (purpose) params.set("purpose", purpose);

    navigate(`/properties?${params.toString()}`);
  };

  return (
    <main className="overflow-hidden bg-[#171816] text-white selection:bg-[#e97842] selection:text-white">

      {/* HERO: CINEMATIC ANIMATED BANNER */}
      <section className="relative isolate min-h-[600px] overflow-hidden sm:min-h-[650px] lg:min-h-[690px]">

        {/* Animated background images */}
        <div className="absolute inset-0 -z-30 overflow-hidden bg-[#20211e]">
          {heroImages.map((banner, index) => (
            <img
              key={banner.url}
              src={banner.url}
              alt={banner.alt}
              fetchPriority={index === 0 ? "high" : "auto"}
              loading={index === 0 ? "eager" : "lazy"}
              className={`absolute inset-0 h-full w-full object-cover object-center transition-[opacity,transform] duration-[1600ms] ease-in-out motion-reduce:transition-none ${
                activeBanner === index
                  ? "scale-110 opacity-100"
                  : "scale-100 opacity-0"
              }`}
            />
          ))}
        </div>

        {/* Cinematic overlays */}
        <div className="absolute inset-0 -z-20 bg-black/25" />
        <div className="absolute inset-0 -z-20 bg-gradient-to-r from-[#11120f]/95 via-[#11120f]/65 to-transparent" />
        <div className="absolute inset-0 -z-20 bg-gradient-to-t from-[#171816] via-transparent to-black/20" />

        {/* Floating decorative ring */}
        <div className="pointer-events-none absolute right-[8%] top-[18%] -z-10 hidden h-64 w-64 animate-[spin_35s_linear_infinite] rounded-full border border-white/15 lg:block xl:h-80 xl:w-80">
          <div className="absolute -left-2 top-1/2 h-4 w-4 rounded-full bg-[#f28a52] shadow-[0_0_30px_#f28a52]" />
        </div>

        <div className="mx-auto flex min-h-[600px] max-w-[1600px] flex-col px-5 pb-7 pt-4 sm:min-h-[650px] sm:px-8 sm:pb-8 sm:pt-5 lg:min-h-[690px] lg:px-14">

          {/* Small top label */}
          <div className="flex items-center justify-between gap-3">
            <p className="flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.22em] text-white/70 sm:text-[10px]">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#f28a52]" />
              Real estate · Redefined
            </p>

            <Link
              to="/properties"
              className="border border-white/25 px-3 py-2 text-[10px] font-medium transition hover:border-[#f28a52] hover:text-[#f28a52] sm:px-4 sm:text-xs"
            >
              Explore homes ↗
            </Link>
          </div>

          {/* Hero content */}
          <div className="flex flex-1 items-center py-7 sm:py-9">
            <div className="max-w-4xl">

              <div
                key={heroImages[activeBanner].label}
                className="animate-[fadeUp_700ms_ease-out_both]"
              >
                <div className="mb-4 flex items-center gap-3 sm:mb-5">
                  <span className="h-px w-9 bg-[#f28a52] sm:w-12" />
                  <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-[#ffb58e] sm:text-xs sm:tracking-[0.3em]">
                    {heroImages[activeBanner].label}
                  </p>
                </div>

                <h1 className="max-w-4xl text-[clamp(3rem,8vw,7rem)] font-medium leading-[0.96] tracking-[-0.065em]">
                  Find a place
                  <br />
                  to call{" "}
                  <span className="font-serif italic text-[#f28a52]">
                    your own.
                  </span>
                </h1>

                <p className="mt-5 max-w-lg text-sm leading-6 text-white/75 sm:mt-6 sm:text-base sm:leading-7">
                  {tagline}
                </p>

                <div className="mt-5 flex flex-wrap items-center gap-3 sm:mt-6 sm:gap-5">
                  <Link
                    to="/properties"
                    className="group inline-flex items-center gap-5 bg-[#e97842] px-5 py-3.5 text-xs font-semibold transition duration-300 hover:-translate-y-1 hover:bg-[#cf6030] hover:shadow-[0_12px_35px_rgba(233,120,66,0.22)] sm:px-6 sm:text-sm"
                  >
                    Explore properties
                    <span className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                      ↗
                    </span>
                  </Link>

                  <Link
                    to="/about"
                    className="inline-flex items-center gap-3 border-b border-white/50 py-3 text-xs font-semibold transition hover:border-[#f28a52] hover:text-[#f28a52] sm:text-sm"
                  >
                    Discover our story <span>→</span>
                  </Link>
                </div>

                {/* Slider indicators */}
                <div className="mt-7 flex items-center gap-3 sm:mt-9">
                  {heroImages.map((banner, index) => (
                    <button
                      key={banner.url}
                      type="button"
                      onClick={() => setActiveBanner(index)}
                      aria-label={`Show banner ${index + 1}`}
                      aria-pressed={activeBanner === index}
                      className={`h-1 transition-all duration-500 ${
                        activeBanner === index
                          ? "w-12 bg-[#f28a52]"
                          : "w-5 bg-white/50 hover:bg-white"
                      }`}
                    />
                  ))}

                  <span className="ml-1 text-[10px] tracking-[0.2em] text-white/70">
                    0{activeBanner + 1} / 0{heroImages.length}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Hero bottom highlights */}
          <div className="grid grid-cols-1 gap-4 border-t border-white/20 pt-5 sm:grid-cols-3 sm:gap-5 sm:pt-6">
            {highlights.map((item, index) => (
              <div
                key={item.number}
                className="group flex gap-3 transition-transform duration-300 hover:translate-x-1"
              >
                <span className="pt-0.5 text-[10px] text-[#f28a52]">
                  {item.number}
                </span>

                <div>
                  <h2 className="text-xs font-semibold sm:text-sm">
                    {item.title}
                  </h2>
                  <p className="mt-1 text-[11px] leading-5 text-white/60 sm:text-xs">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Vertical side label */}
        <div className="pointer-events-none absolute bottom-32 right-5 hidden [writing-mode:vertical-rl] text-[9px] uppercase tracking-[0.3em] text-white/50 xl:block">
          Discover your next chapter
        </div>
      </section>

      {/* PROPERTY SEARCH */}
      <section className="relative z-10 mx-auto -mt-1 max-w-[1500px] px-4 pb-10 sm:px-8 sm:pb-12 lg:px-14">

        <div className="border border-white/10 bg-[#222320] p-4 shadow-2xl sm:p-6 lg:p-7">

          <div className="mb-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-[#f28a52] sm:text-[10px]">
                Find your property
              </p>

              <h2 className="mt-2 text-xl font-medium tracking-tight sm:text-2xl">
                What are you looking for?
              </h2>
            </div>

            <div className="flex w-fit border border-white/15 p-1">
              {[
                { label: "Buy", value: "buy" },
                { label: "Rent", value: "rent" },
              ].map((item) => (
                <button
                  key={item.value}
                  type="button"
                  onClick={() => setPurpose(item.value)}
                  className={`min-w-20 px-5 py-2 text-xs transition duration-300 ${
                    purpose === item.value
                      ? "bg-[#e97842] text-white"
                      : "text-white/65 hover:text-white"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <form
            onSubmit={handleSearch}
            className="grid gap-3 md:grid-cols-[1.3fr_1fr_auto] md:items-end"
          >
            <label className="block">
              <span className="mb-2 block text-[11px] text-white/60">
                Location or keyword
              </span>

              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Enter city, location or keyword"
                className="h-12 w-full rounded-none border border-white/15 bg-[#171816] px-4 text-xs text-white outline-none transition focus:border-[#e97842] sm:text-sm"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-[11px] text-white/60">
                Property type
              </span>

              <select
                value={type}
                onChange={(event) => setType(event.target.value)}
                className="h-12 w-full rounded-none border border-white/15 bg-[#171816] px-4 text-xs text-white outline-none transition focus:border-[#e97842] sm:text-sm"
              >
                {propertyTypes.map((item) => (
                  <option
                    key={item.value || "all"}
                    value={item.value}
                    className="bg-[#222320]"
                  >
                    {item.label}
                  </option>
                ))}
              </select>
            </label>

            <button
              type="submit"
              className="group h-12 bg-[#e97842] px-6 text-xs font-semibold transition duration-300 hover:bg-[#cf6030] md:text-sm"
            >
              Search properties{" "}
              <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">
                ↗
              </span>
            </button>
          </form>
        </div>
      </section>

      {/* INTRODUCTION */}
      <section className="mx-auto max-w-[1500px] px-5 pb-12 sm:px-8 sm:pb-16 lg:px-14 lg:pb-20">
        <div className="grid gap-5 lg:grid-cols-2 lg:items-end lg:gap-10">

          <div>
            <p className="flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.25em] text-[#f28a52] sm:text-[10px]">
              <span className="h-px w-6 bg-[#f28a52]" />
              More than a property
            </p>

            <h2 className="mt-3 max-w-2xl text-3xl font-medium leading-tight tracking-[-0.05em] sm:text-4xl lg:text-5xl">
              Space for the life
              <span className="font-serif italic text-[#f28a52]">
                {" "}you imagine.
              </span>
            </h2>
          </div>

          <div>
            <p className="max-w-xl text-xs leading-6 text-white/60 sm:text-sm sm:leading-7">
              Every property search begins with a vision. Whether you are
              looking for a place to call home, a space for your business or
              land for the future, explore your possibilities in one place.
            </p>

            <Link
              to="/about"
              className="group mt-4 inline-flex items-center gap-3 border-b border-[#e97842]/70 pb-2 text-xs font-semibold transition hover:text-[#f28a52] sm:text-sm"
            >
              Discover {brandName}
              <span className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">
                ↗
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* PROPERTY COLLECTION */}
      <section className="border-y border-white/10 bg-[#20211e] px-5 py-10 sm:px-8 sm:py-14 lg:px-14 lg:py-16">
        <div className="mx-auto grid max-w-[1450px] gap-7 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-10">

          <div>
            <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-[#f28a52] sm:text-[10px]">
              The property collection
            </p>

            <h2 className="mt-3 text-3xl font-medium leading-tight tracking-[-0.05em] sm:text-4xl lg:text-5xl">
              Find the one
              <br />
              that feels right.
            </h2>

            <p className="mt-4 max-w-lg text-xs leading-6 text-white/60 sm:text-sm sm:leading-7">
              Explore the properties in our listing directory and review the
              available details to find options that fit your requirements.
            </p>

            <Link
              to="/properties"
              className="group mt-5 inline-flex items-center gap-4 bg-[#e97842] px-5 py-3.5 text-xs font-semibold transition duration-300 hover:-translate-y-1 hover:bg-[#cf6030] sm:text-sm"
            >
              View all properties
              <span className="transition-transform group-hover:translate-x-1">
                ↗
              </span>
            </Link>
          </div>

          {/* 3D-style interactive image card */}
          <Link
            to="/properties"
            className="group relative block min-h-[280px] overflow-hidden border border-white/10 bg-[#171816] [perspective:1200px] sm:min-h-[380px] lg:min-h-[430px]"
          >
            <img
              src="https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1400&q=85"
              alt="Contemporary luxury residential architecture"
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover transition duration-700 ease-out group-hover:scale-110 group-hover:[transform:rotateY(-2deg)_scale(1.08)] motion-reduce:transition-none"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-black/10 transition duration-500 group-hover:from-black/75" />

            {/* Floating corner detail */}
            <div className="absolute right-5 top-5 border border-white/30 bg-black/20 px-3 py-2 text-[9px] uppercase tracking-[0.2em] backdrop-blur-sm sm:right-7 sm:top-7">
              Curated spaces
            </div>

            <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between gap-4 p-5 sm:p-7">
              <div className="transition-transform duration-500 group-hover:translate-x-1">
                <p className="text-[9px] uppercase tracking-[0.25em] text-[#ffad7c]">
                  Explore the collection
                </p>

                <h3 className="mt-2 text-xl font-medium sm:text-3xl">
                  Your search starts here.
                </h3>
              </div>

              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#e97842] text-lg transition duration-300 group-hover:rotate-45 group-hover:bg-white group-hover:text-[#171816] sm:h-12 sm:w-12">
                ↗
              </span>
            </div>
          </Link>
        </div>
      </section>

      {/* THREE HIGHLIGHT CARDS */}
      <section className="mx-auto max-w-[1500px] px-5 py-10 sm:px-8 sm:py-14 lg:px-14">
        <div className="mb-5 flex items-end justify-between gap-4">
          <div>
            <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-[#f28a52] sm:text-[10px]">
              Your next chapter
            </p>

            <h2 className="mt-2 text-2xl font-medium tracking-tight sm:text-3xl">
              Start exploring.
            </h2>
          </div>

          <Link
            to="/properties"
            className="shrink-0 text-[10px] text-white/60 transition hover:text-[#f28a52] sm:text-xs"
          >
            All properties ↗
          </Link>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          {[
            {
              number: "01",
              title: "Find your home",
              description: "Discover a space that fits your lifestyle.",
              icon: "⌂",
            },
            {
              number: "02",
              title: "Grow your business",
              description: "Explore spaces for your next big move.",
              icon: "↗",
            },
            {
              number: "03",
              title: "Invest in land",
              description: "Find opportunities for the future.",
              icon: "◈",
            },
          ].map((item) => (
            <Link
              to="/properties"
              key={item.number}
              className="group relative overflow-hidden border border-white/10 bg-[#20211e] p-5 transition duration-300 hover:-translate-y-1 hover:border-[#e97842]/60 hover:bg-[#262722] sm:p-6"
            >
              <div className="flex items-start justify-between">
                <span className="text-3xl text-[#f28a52] transition-transform duration-300 group-hover:scale-110">
                  {item.icon}
                </span>

                <span className="text-[10px] tracking-widest text-white/35">
                  {item.number}
                </span>
              </div>

              <h3 className="mt-6 text-base font-semibold sm:text-lg">
                {item.title}
              </h3>

              <p className="mt-2 text-xs leading-6 text-white/55">
                {item.description}
              </p>

              <span className="mt-4 inline-block text-xs text-[#f28a52] transition-transform group-hover:translate-x-2">
                Explore ↗
              </span>

              <div className="absolute -bottom-10 -right-10 h-24 w-24 rounded-full border border-[#e97842]/10 transition-transform duration-500 group-hover:scale-150" />
            </Link>
          ))}
        </div>
      </section>

      {/* CONTACT CTA */}
      <section className="mx-auto max-w-[1500px] px-5 py-8 sm:px-8 sm:py-12 lg:px-14 lg:py-14">
        <div className="relative overflow-hidden border border-white/10 bg-[#222320] p-6 sm:p-9 lg:p-12">

          {/* Animated rings */}
          <div className="pointer-events-none absolute -right-16 -top-20 h-52 w-52 animate-[spin_40s_linear_infinite] rounded-full border border-[#e97842]/20 sm:h-72 sm:w-72" />

          <div className="pointer-events-none absolute -right-4 -top-8 h-36 w-36 rounded-full border border-[#e97842]/20 sm:h-52 sm:w-52" />

          <div className="relative z-10 max-w-3xl">
            <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-[#f28a52] sm:text-[10px]">
              Let's make your next move
            </p>

            <h2 className="mt-3 text-3xl font-medium leading-tight tracking-[-0.05em] sm:text-4xl lg:text-6xl">
              The right property
              <span className="font-serif italic text-[#f28a52]">
                {" "}changes everything.
              </span>
            </h2>

            <p className="mt-4 max-w-xl text-xs leading-6 text-white/60 sm:text-sm sm:leading-7">
              Have a question or need help finding the right space? Contact
              our team to discuss your requirements and next steps.
            </p>

            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                to="/contact"
                className="group inline-flex items-center gap-4 bg-[#e97842] px-5 py-3.5 text-xs font-semibold transition duration-300 hover:-translate-y-1 hover:bg-[#cf6030] sm:text-sm"
              >
                Contact our team
                <span className="transition-transform group-hover:translate-x-1">
                  ↗
                </span>
              </Link>

              <Link
                to="/properties"
                className="inline-flex items-center gap-3 border border-white/25 px-5 py-3.5 text-xs font-semibold transition duration-300 hover:border-[#e97842] hover:text-[#f28a52] sm:text-sm"
              >
                Browse properties →
              </Link>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
