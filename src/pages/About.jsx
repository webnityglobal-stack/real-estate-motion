
import { Link } from "react-router-dom";

const values = [
  {
    number: "01",
    title: "Our Mission",
    description:
      "Make property discovery simple, transparent and accessible for every buyer, seller and investor.",
    icon: "⌂",
  },
  {
    number: "02",
    title: "Our Approach",
    description:
      "Understand your needs, preferred location and budget to help you explore suitable opportunities.",
    icon: "◎",
  },
  {
    number: "03",
    title: "Our Vision",
    description:
      "Build a trusted property experience where finding the right place feels simple and rewarding.",
    icon: "✳",
  },
];

const benefits = [
  {
    title: "People First",
    text: "Your requirements and preferences guide the property search.",
    icon: "♡",
  },
  {
    title: "Clear Information",
    text: "Explore property details and compare your options with confidence.",
    icon: "✓",
  },
  {
    title: "Better Choices",
    text: "Discover different property types for living, working and investing.",
    icon: "⌂",
  },
];

const propertyTypes = [
  {
    title: "Independent Houses",
    description: "Space to make your own.",
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=900&q=85",
    number: "01",
  },
  {
    title: "Modern Apartments",
    description: "Contemporary everyday living.",
    image:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=900&q=85",
    number: "02",
  },
  {
    title: "Plots & Land",
    description: "Build with your future in mind.",
    image:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=900&q=85",
    number: "03",
  },
  {
    title: "Commercial Spaces",
    description: "Find room for your business.",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=85",
    number: "04",
  },
];

const primaryButton =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-orange-700 via-orange-600 to-amber-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-orange-950/15 transition-all duration-300 hover:-translate-y-1 hover:from-orange-800 hover:via-orange-700 hover:to-amber-700 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2";

const secondaryButton =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/40 bg-white/5 px-6 py-3 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-1 hover:border-amber-300 hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-amber-300 focus:ring-offset-2 focus:ring-offset-[#28150f]";

export default function About() {
  return (
    <main className="overflow-hidden bg-[#fffdf9] text-stone-900">
      {/* HERO SECTION */}
      <section className="relative isolate overflow-hidden bg-[#24150f] text-white">
        <div className="pointer-events-none absolute -right-32 -top-32 -z-10 h-96 w-96 rounded-full bg-orange-600/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-40 left-1/4 -z-10 h-96 w-96 rounded-full bg-amber-500/10 blur-3xl" />

        <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-12 sm:px-8 sm:py-16 md:grid-cols-[1.05fr_0.95fr] md:gap-12 lg:px-8 lg:py-20">
          <div className="animate-[fadeUp_0.7s_ease-out_both]">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-white/5 px-4 py-2 backdrop-blur-sm">
              <span className="text-amber-300">✦</span>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-amber-200">
                About Shri Radhe Krishna
              </span>
            </div>

            <h1 className="max-w-2xl text-4xl font-black leading-[1.12] tracking-tight text-white sm:text-5xl lg:text-6xl">
              More Than Real Estate.
              <span className="mt-2 block bg-gradient-to-r from-amber-200 via-orange-300 to-amber-500 bg-clip-text text-transparent">
                A Place to Belong.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-sm leading-7 text-orange-50/75 sm:text-base sm:leading-8">
              Finding the right property is about more than four walls.
              It is about your lifestyle, your ambitions and the future
              you want to build. We make your property journey simpler
              and more meaningful.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/properties" className={primaryButton}>
                Explore Properties
                <span>↗</span>
              </Link>

              <Link to="/contact" className={secondaryButton}>
                Talk to Our Team
              </Link>
            </div>

            <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3 border-t border-white/10 pt-6">
              <div>
                <p className="text-sm font-bold text-white">People First</p>
                <p className="mt-1 text-xs text-white/55">
                  Your needs matter
                </p>
              </div>

              <div className="h-10 w-px bg-white/15" />

              <div>
                <p className="text-sm font-bold text-white">
                  Clear Information
                </p>
                <p className="mt-1 text-xs text-white/55">
                  Explore with confidence
                </p>
              </div>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-xl animate-[fadeUp_0.9s_ease-out_both]">
            <div className="absolute -inset-3 rounded-[2rem] border border-amber-400/20" />

            <div className="relative overflow-hidden rounded-[1.6rem] border border-white/10 bg-white/5 p-2 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=90"
                alt="Contemporary luxury home surrounded by greenery"
                className="h-[320px] w-full rounded-[1.2rem] object-cover transition-transform duration-700 hover:scale-[1.03] sm:h-[430px]"
              />

              <div className="absolute inset-x-2 bottom-2 rounded-b-[1.2rem] bg-gradient-to-t from-black/80 via-black/30 to-transparent p-5 pt-16 sm:p-7 sm:pt-20">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-amber-300">
                  Your Next Chapter
                </p>
                <h2 className="mt-2 text-xl font-extrabold text-white sm:text-2xl">
                  Find a Place to Call Home
                </h2>
                <p className="mt-2 text-sm text-white/75">
                  A thoughtful way to explore property.
                </p>
              </div>
            </div>

            <div className="absolute -left-2 top-8 hidden rounded-2xl border border-white/20 bg-[#fffaf1] px-5 py-4 text-stone-900 shadow-xl sm:block md:-left-5">
              <p className="text-xs font-semibold text-stone-500">
                Your Property Journey
              </p>
              <p className="mt-1 text-base font-extrabold text-orange-800">
                Starts Here ✦
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* INTRODUCTION */}
      <section className="px-5 py-12 sm:px-8 sm:py-16 lg:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-8 md:grid-cols-2 md:gap-14">
          <div>
            <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.2em] text-orange-700">
              Who We Are
            </p>

            <h2 className="max-w-xl text-3xl font-black leading-tight tracking-tight text-stone-950 sm:text-4xl">
              Helping You Make Your Next Property Move With Confidence.
            </h2>

            <div className="mt-5 h-1 w-20 rounded-full bg-gradient-to-r from-orange-700 to-amber-400" />
          </div>

          <div className="space-y-4 text-sm leading-7 text-stone-600 sm:text-base">
            <p>
              Shri Radhe Krishna is dedicated to making property
              discovery easier to navigate. Whether you are searching
              for a comfortable home, a commercial space or land for
              the future, our goal is to give you a clear starting point.
            </p>

            <p>
              We bring property discovery, useful information and a
              straightforward enquiry experience together in one place,
              so you can explore your options with greater confidence.
            </p>

            <Link
              to="/properties"
              className="group inline-flex items-center gap-2 pt-1 text-sm font-extrabold text-orange-800 transition-colors hover:text-orange-600"
            >
              Discover Our Properties
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* MISSION, APPROACH AND VISION */}
      <section className="border-y border-stone-100 bg-gradient-to-b from-[#fff9ef] to-white px-5 py-12 sm:px-8 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 max-w-2xl">
            <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.2em] text-orange-700">
              What Guides Us
            </p>

            <h2 className="text-3xl font-black tracking-tight text-stone-950 sm:text-4xl">
              Built Around What Matters to You.
            </h2>

            <p className="mt-3 text-sm leading-7 text-stone-600 sm:text-base">
              Our values shape how we present properties and support
              your journey toward the right space.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((item) => (
              <article
                key={item.number}
                className="group relative overflow-hidden rounded-2xl border border-stone-200/80 bg-white p-6 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:border-amber-300 hover:shadow-[0_20px_50px_rgba(120,53,15,0.10)] sm:p-7"
              >
                <div className="absolute right-0 top-0 h-24 w-24 rounded-bl-full bg-gradient-to-bl from-amber-100/70 to-transparent transition-transform duration-500 group-hover:scale-125" />

                <div className="relative mb-6 flex items-center justify-between">
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-100 to-amber-50 text-3xl text-orange-800 transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110">
                    {item.icon}
                  </span>

                  <span className="text-sm font-black tracking-widest text-amber-600/70">
                    {item.number}
                  </span>
                </div>

                <h3 className="relative text-xl font-extrabold text-stone-900 transition-colors group-hover:text-orange-800">
                  {item.title}
                </h3>

                <p className="relative mt-3 text-sm leading-7 text-stone-600">
                  {item.description}
                </p>

                <div className="mt-6 h-1 w-10 rounded-full bg-gradient-to-r from-orange-700 to-amber-400 transition-all duration-300 group-hover:w-20" />
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="px-5 py-12 sm:px-8 sm:py-16 lg:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-10 md:grid-cols-2 md:gap-14">
          <div>
            <div className="mb-5 inline-flex rounded-full border border-amber-200 bg-amber-50 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.15em] text-orange-800">
              The Difference
            </div>

            <h2 className="max-w-xl text-3xl font-black leading-tight tracking-tight text-stone-950 sm:text-4xl">
              A Thoughtful Approach to Every Property Search.
            </h2>

            <p className="mt-5 max-w-xl text-sm leading-7 text-stone-600 sm:text-base">
              Every property search is different. We aim to make the
              journey easier with a straightforward experience that
              keeps your priorities at the centre.
            </p>

            <Link to="/properties" className={`${primaryButton} mt-7`}>
              Browse Properties
              <span>↗</span>
            </Link>
          </div>

          <div className="space-y-4">
            {benefits.map((benefit, index) => (
              <article
                key={benefit.title}
                className="group flex gap-4 rounded-2xl border border-stone-200/80 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-amber-300 hover:shadow-lg sm:p-6"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-orange-100 to-amber-50 text-2xl text-orange-800 transition-transform duration-300 group-hover:scale-110">
                  {benefit.icon}
                </span>

                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="font-extrabold text-stone-900">
                      {benefit.title}
                    </h3>
                    <span className="text-xs font-bold text-amber-600">
                      0{index + 1}
                    </span>
                  </div>

                  <p className="mt-2 text-sm leading-6 text-stone-600">
                    {benefit.text}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* PROPERTY TYPES */}
      <section className="bg-[#f8f4ed] px-5 py-12 sm:px-8 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.2em] text-orange-700">
                Explore Possibilities
              </p>

              <h2 className="text-3xl font-black tracking-tight text-stone-950 sm:text-4xl">
                Find a Space for Every Plan.
              </h2>

              <p className="mt-3 max-w-xl text-sm leading-7 text-stone-600">
                Explore property categories and discover the space
                that suits your lifestyle or business goals.
              </p>
            </div>

            <Link
              to="/properties"
              className="group inline-flex items-center gap-2 text-sm font-extrabold text-orange-800 transition-colors hover:text-orange-600"
            >
              View All Properties
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {propertyTypes.map((item) => (
              <Link
                key={item.number}
                to="/properties"
                className="group relative overflow-hidden rounded-2xl bg-stone-900 shadow-md transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
              >
                <div className="overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    className="h-64 w-full object-cover transition-transform duration-700 group-hover:scale-110 sm:h-72"
                  />
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/15 to-black/5 transition-opacity duration-300 group-hover:from-black/95" />

                <div className="absolute inset-x-0 bottom-0 p-5">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-xs font-bold tracking-[0.2em] text-amber-300">
                      PROPERTY {item.number}
                    </span>

                    <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/40 bg-white/10 text-white transition-all duration-300 group-hover:border-amber-300 group-hover:bg-orange-600">
                      ↗
                    </span>
                  </div>

                  <h3 className="text-lg font-extrabold text-white">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-sm text-white/75">
                    {item.description}
                  </p>

                  <div className="mt-4 h-0.5 w-10 rounded-full bg-amber-400 transition-all duration-300 group-hover:w-20" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CALL TO ACTION */}
      <section className="px-5 py-12 sm:px-8 sm:py-16 lg:px-8">
        <div className="relative isolate mx-auto max-w-7xl overflow-hidden rounded-3xl bg-gradient-to-br from-[#28150f] via-[#542416] to-[#873b19] px-6 py-9 text-white shadow-xl sm:px-10 sm:py-12 lg:px-14">
          <div className="pointer-events-none absolute -right-16 -top-24 -z-10 h-72 w-72 rounded-full border border-amber-300/20" />
          <div className="pointer-events-none absolute -right-4 -top-12 -z-10 h-48 w-48 rounded-full border border-amber-300/20" />
          <div className="pointer-events-none absolute -bottom-24 left-1/3 -z-10 h-64 w-64 rounded-full bg-orange-500/15 blur-3xl" />

          <div className="flex flex-col gap-7 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl">
              <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.2em] text-amber-300">
                Your Next Chapter Starts Here
              </p>

              <h2 className="text-3xl font-black leading-tight tracking-tight text-white sm:text-4xl">
                Ready to Find Your Place?
              </h2>

              <p className="mt-4 max-w-xl text-sm leading-7 text-orange-50/75 sm:text-base">
                Explore available properties or tell us what you are
                looking for. Let us help you take the next step.
              </p>
            </div>

            <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
              <Link to="/properties" className={primaryButton}>
                Explore Properties
                <span>↗</span>
              </Link>

              <Link to="/contact" className={secondaryButton}>
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* DEVOTIONAL BRAND ACCENT */}
      <div className="border-t border-amber-100 bg-[#fff8ed] px-4 py-4 text-center">
        <p className="text-xs font-bold tracking-[0.15em] text-orange-900 sm:text-sm">
          <span className="mr-2 text-amber-600">✦</span>
          Shri Radhe Krishna
          <span className="mx-2 text-amber-600">•</span>
          Radhe Radhe
          <span className="ml-2 text-amber-600">✦</span>
        </p>
      </div>
    </main>
  );
}
