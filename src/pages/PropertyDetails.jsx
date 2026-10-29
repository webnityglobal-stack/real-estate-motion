import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  getProperties,
  subscribeToProperties,
  formatPrice,
} from "../utils/properties";

export default function PropertyDetails() {
  const { id } = useParams();
  const [properties, setProperties] = useState(() => getProperties());

  useEffect(() => {
    return subscribeToProperties(setProperties);
  }, []);

  const property = properties.find(
    (item) => String(item.id) === String(id)
  );

  if (!property) {
    return (
      <main className="min-h-[65vh] bg-[#faf9f5] px-5 py-16 text-[#193c32]">
        <div className="mx-auto max-w-2xl rounded-2xl border border-[#e8e5dc] bg-white p-8 text-center sm:p-12">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#eaf0e8] text-2xl">
            ⌂
          </span>
          <h1 className="mt-4 text-2xl font-semibold">
            Property Not Found
          </h1>
          <p className="mt-2 text-sm leading-6 text-gray-600">
            This property may have been removed or is no longer available.
          </p>
          <Link
            to="/properties"
            className="mt-6 inline-flex rounded-lg bg-[#193c32] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#285442]"
          >
            ← Back to Properties
          </Link>
        </div>
      </main>
    );
  }

  const title = property.title || property.name || "Property";
  const image =
    property.image ||
    property.images?.[0] ||
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1400&q=85";

  const status = property.status || "Available";
  const statusClass =
    status.toLowerCase() === "sold"
      ? "bg-red-100 text-red-700"
      : status.toLowerCase() === "rented"
        ? "bg-blue-100 text-blue-700"
        : "bg-emerald-100 text-emerald-800";

  const bedrooms = property.bedrooms ?? property.beds ?? 0;
  const bathrooms = property.bathrooms ?? property.baths ?? 0;
  const area = property.area ?? 0;
  const description =
    property.description ||
    "Contact our team to learn more about this property and its features.";

  const details = [
    { label: "Bedrooms", value: bedrooms, icon: "▦" },
    { label: "Bathrooms", value: bathrooms, icon: "◉" },
    {
      label: "Property Area",
      value: `${area} sq. ft.`,
      icon: "↗",
    },
  ];

  const highlights = [
    { label: "Property Type", value: property.type || "Residential" },
    { label: "Location", value: property.location || "Not specified" },
    { label: "Availability", value: status },
  ];

  return (
    <main className="min-h-screen bg-[#faf9f5] text-[#193c32]">
      {/* TOP NAVIGATION / BREADCRUMB */}
      <section className="px-5 pb-4 pt-6 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <Link
            to="/properties"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-[#193c32]"
          >
            <span>←</span> Back to Properties
          </Link>
        </div>
      </section>

      {/* PROPERTY IMAGE */}
      <section className="px-5 sm:px-8 lg:px-12">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-2xl bg-[#e8e5dc]">
          <img
            src={image}
            alt={title}
            className="h-64 w-full object-cover sm:h-[380px] lg:h-[480px]"
          />

          <div className="absolute left-4 top-4 flex flex-wrap gap-2 sm:left-6 sm:top-6">
            <span className="rounded-md bg-white px-3 py-2 text-xs font-semibold text-[#193c32] shadow-sm">
              {property.type || "Property"}
            </span>
            <span
              className={`rounded-md px-3 py-2 text-xs font-semibold shadow-sm ${statusClass}`}
            >
              {status}
            </span>
          </div>
        </div>
      </section>

      {/* PROPERTY CONTENT */}
      <section className="px-5 py-7 sm:px-8 sm:py-9 lg:px-12">
        <div className="mx-auto grid max-w-7xl items-start gap-7 lg:grid-cols-[1fr_340px] lg:gap-10">
          {/* LEFT CONTENT */}
          <div className="min-w-0">
            <div className="border-b border-[#e5e1d8] pb-6">
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#a67a3f]">
                Estate Luxe · Property Details
              </p>

              <h1 className="text-2xl font-semibold leading-tight sm:text-3xl lg:text-4xl">
                {title}
              </h1>

              <p className="mt-3 flex items-start gap-2 text-sm text-gray-600 sm:text-base">
                <span className="text-[#a67a3f]">⌖</span>
                <span>{property.location || "Location not specified"}</span>
              </p>

              <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-xs text-gray-500">Asking Price</p>
                  <p className="mt-1 text-2xl font-bold text-[#193c32] sm:text-3xl">
                    {formatPrice(property.price ?? property.salePrice)}
                  </p>
                </div>

                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center rounded-lg bg-[#193c32] px-5 py-3 text-sm font-semibold !text-white transition hover:bg-[#285442]"
                >
                  Enquire Now ↗
                </Link>
              </div>
            </div>

            {/* PROPERTY SPECS */}
            <div className="grid grid-cols-3 gap-3 border-b border-[#e5e1d8] py-6">
              {details.map((item) => (
                <div
                  key={item.label}
                  className="rounded-xl border border-[#e8e5dc] bg-white p-3 sm:p-4"
                >
                  <span className="text-lg text-[#a67a3f]">
                    {item.icon}
                  </span>
                  <p className="mt-2 break-words text-lg font-bold sm:text-xl">
                    {item.value}
                  </p>
                  <p className="mt-1 text-[11px] leading-4 text-gray-500 sm:text-xs">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>

            {/* DESCRIPTION */}
            <div className="border-b border-[#e5e1d8] py-6">
              <h2 className="text-xl font-semibold sm:text-2xl">
                About This Property
              </h2>
              <p className="mt-3 whitespace-pre-line text-sm leading-7 text-gray-600 sm:text-base">
                {description}
              </p>
            </div>

            {/* PROPERTY INFORMATION */}
            <div className="py-6">
              <h2 className="text-xl font-semibold sm:text-2xl">
                Property Information
              </h2>

              <div className="mt-4 overflow-hidden rounded-xl border border-[#e8e5dc] bg-white">
                {highlights.map((item, index) => (
                  <div
                    key={item.label}
                    className={`flex flex-col gap-1 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4 ${index !== highlights.length - 1
                        ? "border-b border-[#eeeae2]"
                        : ""
                      }`}
                  >
                    <span className="text-sm text-gray-500">
                      {item.label}
                    </span>
                    <span className="break-words text-sm font-semibold sm:text-right">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT ENQUIRY CARD */}
          <aside className="lg:sticky lg:top-6">
            <div className="rounded-2xl border border-[#e8e5dc] bg-white p-5 shadow-sm sm:p-6">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#a67a3f]">
                Interested?
              </p>

              <h2 className="mt-2 text-xl font-semibold">
                Make this property yours.
              </h2>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                Want to know more about this property? Send an enquiry to
                discuss the details with our team.
              </p>

              <div className="my-5 rounded-xl bg-[#edf0e8] p-4">
                <p className="text-xs text-gray-600">Property of interest</p>
                <p className="mt-1 break-words text-sm font-semibold">
                  {title}
                </p>
                <p className="mt-2 text-lg font-bold">
                  {formatPrice(property.price ?? property.salePrice)}
                </p>
              </div>

              <Link
                to="/contact"
                className="flex w-full items-center justify-center rounded-lg bg-[#23443a] px-4 py-3 text-sm font-semibold !text-white transition hover:bg-[#285442]"
              >
                Enquire About Property ↗
              </Link>

              <Link
                to="/properties"
                className="mt-3 flex w-full items-center justify-center rounded-lg border border-[#d9ded5] px-4 py-3 text-sm font-semibold text-[#193c32] transition hover:bg-[#edf0e8]"
              >
                Browse More Properties
              </Link>

              <p className="mt-4 text-center text-xs leading-5 text-gray-500">
                Property details are based on the information currently
                available on this website.
              </p>
            </div>
          </aside>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="px-5 pb-10 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 rounded-2xl bg-[#193c32] p-6 text-white sm:p-8 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-xl font-semibold sm:text-2xl">
              Still exploring your options?
            </h2>
            <p className="mt-2 text-sm leading-6 text-white/75">
              Discover more properties that match your plans.
            </p>
          </div>

          <Link
            to="/properties"
            className="inline-flex shrink-0 items-center justify-center rounded-lg bg-[#e8bd79] px-5 py-3 text-sm font-semibold text-[#193c32] transition hover:bg-white"
          >
            Explore All Properties ↗
          </Link>
        </div>
      </section>
    </main>
  );
}