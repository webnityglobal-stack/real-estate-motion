import { useState } from "react";
import { Link } from "react-router-dom";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    propertyType: "",
    budget: "",
    location: "",
    message: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    setSubmitted(false);
  }

  function handleSubmit(event) {
    event.preventDefault();

    // Demo only: backend API is required to save enquiries.
    setSubmitted(true);
  }

  const inputClass =
    "mt-2 w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-3.5 text-sm text-stone-900 outline-none transition duration-300 placeholder:text-stone-400 hover:border-orange-200 focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-100";

  const primaryButton =
    "inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-orange-600 to-amber-500 px-6 py-3.5 text-sm font-bold !text-white shadow-lg shadow-orange-900/10 transition duration-300 hover:-translate-y-0.5 hover:from-orange-700 hover:to-amber-600 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-orange-200";

  const secondaryButton =
    "inline-flex items-center justify-center gap-2 rounded-xl border border-orange-200 bg-white px-6 py-3.5 text-sm font-bold !text-orange-800 transition duration-300 hover:-translate-y-0.5 hover:border-orange-400 hover:bg-orange-50 focus:outline-none focus:ring-4 focus:ring-orange-100";

  const contactFeatures = [
    {
      icon: "⌂",
      title: "Property Guidance",
      description:
        "Get help finding a home or investment that matches your requirements.",
    },
    {
      icon: "⌖",
      title: "Location Assistance",
      description:
        "Tell us your preferred city, locality and neighbourhood.",
    },
    {
      icon: "₹",
      title: "Budget Planning",
      description:
        "Share your budget so we can better understand your property needs.",
    },
  ];

  return (
    <main className="overflow-hidden bg-[#fffdf9] text-stone-800">
      {/* HERO SECTION */}
      <section className="relative isolate overflow-hidden bg-[#24150f] px-4 py-16 text-white sm:px-6 sm:py-20 lg:py-24">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,rgba(234,118,35,0.25),transparent_48%),radial-gradient(ellipse_at_bottom_left,rgba(166,91,35,0.2),transparent_45%)]" />

        <div className="absolute -right-20 top-10 -z-10 h-72 w-72 rounded-full border border-orange-300/10 sm:h-96 sm:w-96" />

        <div className="absolute -right-10 top-20 -z-10 h-56 w-56 rounded-full border border-orange-300/10 sm:h-80 sm:w-80" />

        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-orange-300/20 bg-white/5 px-4 py-2 backdrop-blur-sm">
              <span className="text-lg text-amber-400">ॐ</span>
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-200">
                Shri Radhe Krishna
              </span>
            </div>

            <p className="text-xs font-bold uppercase tracking-[0.25em] text-amber-400 sm:text-sm">
              Let&apos;s Talk Real Estate
            </p>

            <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-7xl">
              Let&apos;s Find Your
              <span className="mt-2 block bg-gradient-to-r from-amber-300 via-orange-300 to-amber-500 bg-clip-text text-transparent">
                Dream Home.
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-sm leading-7 text-stone-300 sm:text-base sm:leading-8">
              Every great home begins with a conversation. Tell us what you
              are looking for, and let&apos;s take the next step towards
              finding your perfect property.
            </p>

            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-stone-200">
              <span>
                <span className="mr-2 text-amber-400">✓</span>
                Personalised Guidance
              </span>

              <span>
                <span className="mr-2 text-amber-400">✓</span>
                Property Enquiries
              </span>

              <span>
                <span className="mr-2 text-amber-400">✓</span>
                Dedicated Assistance
              </span>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-orange-600 via-amber-400 to-orange-600" />
      </section>

      {/* CONTACT CONTENT */}
      <section className="px-4 py-12 sm:px-6 sm:py-16 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.85fr_1.35fr] lg:gap-12">
          {/* LEFT SIDE */}
          <aside className="flex flex-col gap-6">
            <div className="rounded-3xl border border-orange-100 bg-white p-6 shadow-[0_12px_50px_rgba(70,40,20,0.05)] sm:p-8">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-50 text-2xl text-orange-700">
                ✦
              </div>

              <p className="mt-5 text-xs font-bold uppercase tracking-[0.2em] text-orange-700">
                Get In Touch
              </p>

              <h2 className="mt-3 text-2xl font-bold leading-snug text-[#321d13] sm:text-3xl">
                We&apos;re Here to Help You Find Your Place.
              </h2>

              <p className="mt-4 text-sm leading-7 text-stone-600">
                Have questions about a property, location or budget? Share
                your requirements with us so we can understand what matters
                most to you.
              </p>

              <div className="mt-8 space-y-4">
                {contactFeatures.map((feature) => (
                  <div
                    key={feature.title}
                    className="group flex gap-4 rounded-2xl border border-stone-100 bg-[#fffdf9] p-4 transition duration-300 hover:-translate-y-0.5 hover:border-orange-200 hover:shadow-md"
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-orange-100 to-amber-50 text-xl font-bold text-orange-800 transition group-hover:from-orange-500 group-hover:to-amber-400 group-hover:text-white">
                      {feature.icon}
                    </div>

                    <div>
                      <h3 className="font-bold text-[#321d13]">
                        {feature.title}
                      </h3>

                      <p className="mt-1.5 text-sm leading-6 text-stone-600">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* PROPERTY CTA CARD */}
            <div className="relative isolate overflow-hidden rounded-3xl bg-gradient-to-br from-[#3b2115] via-[#2b190f] to-[#1f130d] p-6 text-white shadow-xl sm:p-8">
              <div className="absolute -right-12 -top-12 -z-10 h-44 w-44 rounded-full border border-amber-400/20" />

              <div className="absolute -right-6 -top-6 -z-10 h-32 w-32 rounded-full border border-amber-400/15" />

              <div className="inline-flex rounded-full border border-amber-300/20 bg-white/5 px-3 py-1.5 text-xs font-semibold uppercase tracking-widest text-amber-300">
                Explore Properties
              </div>

              <h3 className="mt-5 text-2xl font-bold leading-snug">
                Your Next Chapter Starts at Home.
              </h3>

              <p className="mt-3 text-sm leading-7 text-stone-300">
                Discover properties that suit your lifestyle, aspirations and
                budget.
              </p>

              <Link
                to="/properties"
                className={`${primaryButton} mt-6 w-full sm:w-auto`}
              >
                Explore Properties <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </aside>

          {/* RIGHT SIDE: CONTACT FORM */}
          <section
            id="contact-form"
            className="rounded-3xl border border-orange-100 bg-white p-5 shadow-[0_15px_60px_rgba(70,40,20,0.07)] sm:p-8 lg:p-10"
          >
            <div className="mb-8 border-b border-stone-100 pb-6 sm:mb-9">
              <div className="flex items-center gap-3">
                <span className="h-1 w-10 rounded-full bg-gradient-to-r from-orange-600 to-amber-400" />

                <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-700">
                  Property Enquiry
                </p>
              </div>

              <h2 className="mt-4 text-2xl font-bold text-[#321d13] sm:text-3xl">
                Tell Us What You Need
              </h2>

              <p className="mt-3 text-sm leading-7 text-stone-600">
                Fill in the details below and share your property
                requirements. Fields marked with an asterisk are required.
              </p>
            </div>

            {submitted && (
              <div
                role="status"
                className="mb-6 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm leading-6 text-amber-950"
              >
                <p className="font-bold">
                  ✓ Demo form submitted successfully.
                </p>

                <p className="mt-1">
                  Your details have not been sent or saved to a database.
                  Connect your backend API to receive and manage enquiries.
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-x-5 gap-y-5 sm:grid-cols-2">
                {/* FULL NAME */}
                <label className="block text-sm font-semibold text-stone-700">
                  Full Name <span className="text-red-500">*</span>

                  <input
                    className={inputClass}
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    autoComplete="name"
                    maxLength={100}
                    required
                  />
                </label>

                {/* EMAIL */}
                <label className="block text-sm font-semibold text-stone-700">
                  Email Address <span className="text-red-500">*</span>

                  <input
                    className={inputClass}
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    autoComplete="email"
                    maxLength={150}
                    required
                  />
                </label>

                {/* PHONE */}
                <label className="block text-sm font-semibold text-stone-700">
                  Phone Number <span className="text-red-500">*</span>

                  <input
                    className={inputClass}
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="Enter phone number"
                    autoComplete="tel"
                    inputMode="tel"
                    pattern="[+]?[0-9 ()-]{7,20}"
                    title="Enter a valid phone number."
                    required
                  />
                </label>

                {/* PROPERTY TYPE */}
                <label className="block text-sm font-semibold text-stone-700">
                  Property Type <span className="text-red-500">*</span>

                  <select
                    className={inputClass}
                    name="propertyType"
                    value={form.propertyType}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select property type</option>
                    <option value="Villa">Villa</option>
                    <option value="Apartment">Apartment</option>
                    <option value="Independent House">
                      Independent House
                    </option>
                    <option value="Commercial">Commercial</option>
                    <option value="Land">Land / Plot</option>
                    <option value="Other">Other</option>
                  </select>
                </label>

                {/* BUDGET */}
                <label className="block text-sm font-semibold text-stone-700">
                  Preferred Budget

                  <select
                    className={inputClass}
                    name="budget"
                    value={form.budget}
                    onChange={handleChange}
                  >
                    <option value="">Select your budget</option>
                    <option value="Below ₹25 lakh">Below ₹25 lakh</option>
                    <option value="₹25–50 lakh">₹25–50 lakh</option>
                    <option value="₹50 lakh–₹1 crore">
                      ₹50 lakh–₹1 crore
                    </option>
                    <option value="₹1–2 crore">₹1–2 crore</option>
                    <option value="Above ₹2 crore">Above ₹2 crore</option>
                    <option value="Flexible">Flexible</option>
                  </select>
                </label>

                {/* LOCATION */}
                <label className="block text-sm font-semibold text-stone-700">
                  Preferred Location

                  <input
                    className={inputClass}
                    type="text"
                    name="location"
                    value={form.location}
                    onChange={handleChange}
                    placeholder="City, area or locality"
                    autoComplete="address-level2"
                    maxLength={150}
                  />
                </label>
              </div>

              {/* MESSAGE */}
              <label className="block text-sm font-semibold text-stone-700">
                Tell Us More <span className="text-red-500">*</span>

                <textarea
                  className={`${inputClass} min-h-36 resize-y`}
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Are you buying or renting? Share your preferred size, location and other requirements..."
                  rows={5}
                  maxLength={3000}
                  required
                />
              </label>

              {/* FORM FOOTER */}
              <div className="flex flex-col gap-4 border-t border-stone-100 pt-6 sm:flex-row sm:items-center sm:justify-between">
                <p className="max-w-xs text-xs leading-5 text-stone-500">
                  Your property requirements help us understand what you are
                  looking for.
                </p>

                <button
                  type="submit"
                  className={`${primaryButton} w-full sm:w-auto`}
                >
                  Submit Enquiry <span aria-hidden="true">↗</span>
                </button>
              </div>
            </form>
          </section>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="px-4 pb-14 sm:px-6 sm:pb-20">
        <div className="mx-auto max-w-7xl rounded-3xl border border-orange-100 bg-gradient-to-r from-orange-50 via-amber-50 to-[#fff8ed] px-6 py-10 text-center sm:px-10 sm:py-14">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-700">
            Find Your Perfect Place
          </p>

          <h2 className="mt-4 text-2xl font-bold text-[#321d13] sm:text-4xl">
            A Better Home. A Brighter Tomorrow.
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-stone-600 sm:text-base">
            Explore available properties or reach out to discuss your
            requirements with Shri Radhe Krishna.
          </p>

          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <Link to="/properties" className={primaryButton}>
              Browse Properties <span aria-hidden="true">↗</span>
            </Link>

            <a href="#contact-form" className={secondaryButton}>
              Send An Enquiry <span aria-hidden="true">↑</span>
            </a>
          </div>

          <div className="mt-8 flex items-center justify-center gap-3 text-sm font-semibold text-orange-800">
            <span className="text-xl text-amber-600">ॐ</span>
            <span>Shri Radhe Krishna</span>
            <span className="text-amber-600">✦</span>
          </div>
        </div>
      </section>
    </main>
  );
}