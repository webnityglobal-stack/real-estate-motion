
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  getProperties,
  subscribeToProperties,
  formatPrice,
} from "../utils/properties";

function PropertyCard({ property, featured = false }) {
  const title = property.title || property.name || "Property";
  const image = property.image || property.images?.[0] || "";
  const status = property.status || "Available";
  const id = property.id || property._id;

  const isSold = status.toLowerCase() === "sold";

  return (
    <article
      className={`group flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-stone-200/80 bg-white shadow-[0_8px_30px_rgba(41,25,15,0.06)] transition-all duration-500 hover:-translate-y-2 hover:border-orange-200 hover:shadow-[0_22px_55px_rgba(120,53,15,0.14)] ${
        featured ? "ring-1 ring-amber-100" : ""
      }`}
    >
      {/* Property Image */}
      <Link
        to={`/properties/${id}`}
        className="relative block overflow-hidden bg-stone-100"
        aria-label={`View ${title}`}
      >
        {image ? (
          <img
            src={image}
            alt={title}
            loading="lazy"
            className="h-56 w-full object-cover transition-transform duration-700 group-hover:scale-110 sm:h-60"
          />
        ) : (
          <div className="flex h-56 items-center justify-center bg-gradient-to-br from-stone-100 to-amber-50 text-sm text-stone-500 sm:h-60">
            No image available
          </div>
        )}

        {/* Image Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/5 to-black/10 opacity-70 transition-opacity duration-300 group-hover:opacity-90" />

        {/* Property Type */}
        <span className="absolute left-4 top-4 rounded-full border border-white/30 bg-white/95 px-3.5 py-1.5 text-xs font-bold tracking-wide text-[#78350f] shadow-lg backdrop-blur-md">
          {property.type || "Property"}
        </span>

        {/* Availability */}
        <span
          className={`absolute right-4 top-4 rounded-full px-3 py-1.5 text-xs font-bold shadow-lg ${
            isSold
              ? "bg-red-600 text-white"
              : "bg-emerald-600 text-white"
          }`}
        >
          {status}
        </span>

        {/* Image Bottom Information */}
        <div className="absolute bottom-4 left-4 right-4">
          <p className="mb-1 text-xs font-medium text-white/80">
            <span aria-hidden="true">⌖ </span>
            {property.location || "Location not specified"}
          </p>

          <p className="text-2xl font-extrabold tracking-tight text-white drop-shadow sm:text-3xl">
            {formatPrice(property.price ?? property.salePrice)}
          </p>
        </div>
      </Link>

      {/* Property Details */}
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-3 flex items-start justify-between gap-3">
          <h3 className="line-clamp-2 text-lg font-extrabold leading-6 text-stone-900 transition-colors duration-300 group-hover:text-orange-800">
            {title}
          </h3>

          <span className="mt-1 shrink-0 text-xl text-amber-500">
            ✦
          </span>
        </div>

        {/* Property Features */}
        <div className="mb-5 grid grid-cols-3 divide-x divide-stone-200 rounded-xl border border-stone-100 bg-stone-50/80 py-3">
          <div className="px-2 text-center">
            <p className="text-base font-extrabold text-stone-800">
              {property.bedrooms ?? property.beds ?? 0}
            </p>
            <p className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-stone-500 sm:text-xs">
              Beds
            </p>
          </div>

          <div className="px-2 text-center">
            <p className="text-base font-extrabold text-stone-800">
              {property.bathrooms ?? property.baths ?? 0}
            </p>
            <p className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-stone-500 sm:text-xs">
              Baths
            </p>
          </div>

          <div className="px-2 text-center">
            <p className="text-base font-extrabold text-stone-800">
              {property.area ?? 0}
            </p>
            <p className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-stone-500 sm:text-xs">
              Sq. Ft.
            </p>
          </div>
        </div>

        {/* View Details Button */}
        <Link
          to={`/properties/${id}`}
          className="mt-auto inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#9a3412] via-orange-600 to-[#c2410c] px-4 py-3 text-sm font-bold text-white shadow-md shadow-orange-900/15 transition-all duration-300 hover:-translate-y-0.5 hover:from-[#7c2d12] hover:via-[#c2410c] hover:to-[#9a3412] hover:shadow-lg hover:shadow-orange-900/25 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
        >
          View Property Details
          <span className="transition-transform duration-300 group-hover:translate-x-1">
            ↗
          </span>
        </Link>
      </div>
    </article>
  );
}

export default function Properties() {
  const [properties, setProperties] = useState(() => getProperties());
  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");

  useEffect(() => {
    return subscribeToProperties(setProperties);
  }, []);

  const propertyTypes = useMemo(
    () => [
      "All",
      ...new Set(properties.map((property) => property.type).filter(Boolean)),
    ],
    [properties]
  );

  const filteredProperties = useMemo(() => {
    const query = search.trim().toLowerCase();

    return properties.filter((property) => {
      const title = property.title || property.name || "";
      const location = property.location || "";
      const type = property.type || "";
      const status = property.status || "Available";

      const matchesSearch =
        !query ||
        title.toLowerCase().includes(query) ||
        location.toLowerCase().includes(query) ||
        type.toLowerCase().includes(query);

      return (
        matchesSearch &&
        (selectedType === "All" || type === selectedType) &&
        (selectedStatus === "All" || status === selectedStatus)
      );
    });
  }, [properties, search, selectedType, selectedStatus]);

  const featuredProperties = filteredProperties.slice(0, 3);

  function resetFilters() {
    setSearch("");
    setSelectedType("All");
    setSelectedStatus("All");
  }

  const inputClass =
    "min-h-12 w-full rounded-xl border border-stone-200 bg-white px-4 py-3 text-sm text-stone-800 shadow-sm outline-none transition-all duration-300 placeholder:text-stone-400 hover:border-orange-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-100";

  const primaryButtonClass =
    "inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#9a3412] to-orange-600 px-5 py-3 text-sm font-bold text-white shadow-md shadow-orange-900/15 transition-all duration-300 hover:-translate-y-0.5 hover:from-[#7c2d12] hover:to-[#c2410c] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2";

  return (
    <main className="min-h-screen overflow-hidden bg-[#fffdf9] text-stone-900">
      {/* Premium Page Heading */}
      <section className="relative overflow-hidden border-b border-amber-100 bg-gradient-to-br from-[#fffaf1] via-white to-orange-50/70">
        <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-amber-200/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-28 left-1/4 h-64 w-64 rounded-full bg-orange-200/20 blur-3xl" />

        <div className="relative mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-4 py-9 sm:px-6 sm:py-12 md:flex-row md:items-center lg:px-8">
          <div className="max-w-2xl">
            <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-amber-200 bg-white/80 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.18em] text-orange-800 shadow-sm">
              <span className="text-amber-500">✦</span>
              Our Property Collection
            </p>

            <h1 className="text-3xl font-black leading-tight tracking-tight text-stone-950 sm:text-4xl lg:text-5xl">
              Find Your
              <span className="block bg-gradient-to-r from-orange-800 via-orange-600 to-amber-500 bg-clip-text text-transparent">
                Perfect Property
              </span>
            </h1>

            <p className="mt-4 max-w-xl text-sm leading-7 text-stone-600 sm:text-base">
              Explore exceptional homes, modern apartments and premium
              plots to find a place that feels right for your future.
            </p>

            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-xs font-semibold text-stone-600 sm:text-sm">
              <span>
                <span className="mr-2 text-orange-600">✓</span>
                Explore Properties
              </span>
              <span>
                <span className="mr-2 text-orange-600">✓</span>
                Compare Your Options
              </span>
              <span>
                <span className="mr-2 text-orange-600">✓</span>
                Find Your Next Home
              </span>
            </div>
          </div>

          <Link
            to="/list-your-property"
            className={`${primaryButtonClass} w-full sm:w-auto`}
          >
            <span className="text-lg">+</span>
            List Your Property
            <span>↗</span>
          </Link>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="relative z-10 mx-auto -mt-1 max-w-7xl px-4 pt-6 sm:px-6 sm:pt-8 lg:px-8">
        <div className="rounded-2xl border border-stone-200/80 bg-white p-4 shadow-[0_15px_45px_rgba(41,25,15,0.07)] sm:p-6">
          <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-extrabold text-stone-900 sm:text-xl">
                Find Your Ideal Property
              </h2>
              <p className="mt-1 text-sm text-stone-500">
                Search and filter to narrow down your options.
              </p>
            </div>

            <span className="inline-flex w-fit items-center rounded-full bg-amber-50 px-3 py-1.5 text-xs font-bold text-orange-800">
              {filteredProperties.length} Results
            </span>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_auto]">
            <label className="relative block">
              <span className="sr-only">Search properties</span>
              <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-lg text-orange-600">
                ⌕
              </span>

              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search property or location..."
                aria-label="Search properties"
                className={`${inputClass} pl-11`}
              />
            </label>

            <label>
              <span className="sr-only">Filter by property type</span>
              <select
                value={selectedType}
                onChange={(event) => setSelectedType(event.target.value)}
                aria-label="Filter by property type"
                className={inputClass}
              >
                {propertyTypes.map((type) => (
                  <option key={type} value={type}>
                    {type === "All" ? "All Property Types" : type}
                  </option>
                ))}
              </select>
            </label>

            <label>
              <span className="sr-only">Filter by status</span>
              <select
                value={selectedStatus}
                onChange={(event) => setSelectedStatus(event.target.value)}
                aria-label="Filter by status"
                className={inputClass}
              >
                <option value="All">All Statuses</option>
                <option value="Available">Available</option>
                <option value="Sold">Sold</option>
              </select>
            </label>

            <button
              type="button"
              onClick={resetFilters}
              className={`${primaryButtonClass} w-full lg:w-auto`}
            >
              Reset Filters
              <span>↻</span>
            </button>
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-stone-100 pt-4">
            <p className="text-sm text-stone-500">
              Showing{" "}
              <span className="font-extrabold text-stone-900">
                {filteredProperties.length}
              </span>{" "}
              of{" "}
              <span className="font-extrabold text-stone-900">
                {properties.length}
              </span>{" "}
              properties
            </p>

            {(search || selectedType !== "All" || selectedStatus !== "All") && (
              <button
                type="button"
                onClick={resetFilters}
                className="rounded-lg px-3 py-2 text-xs font-bold text-orange-800 underline decoration-orange-300 underline-offset-4 transition hover:text-orange-950"
              >
                Clear search and filters
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      {featuredProperties.length > 0 && (
        <section className="py-10 sm:py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-6 flex items-end justify-between gap-4">
              <div>
                <p className="mb-2 text-xs font-extrabold uppercase tracking-[0.18em] text-orange-700">
                  <span className="mr-2 text-amber-500">✦</span>
                  Handpicked for You
                </p>

                <h2 className="text-2xl font-black tracking-tight text-stone-950 sm:text-3xl">
                  Featured Properties
                </h2>

                <p className="mt-2 text-sm text-stone-500">
                  Discover a few standout options from your collection.
                </p>
              </div>

              <span className="hidden rounded-full border border-amber-200 bg-white px-4 py-2 text-xs font-bold text-orange-800 sm:inline-flex">
                Top Picks
              </span>
            </div>

            <div className="grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {featuredProperties.map((property) => (
                <PropertyCard
                  key={property.id || property._id}
                  property={property}
                  featured
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Properties */}
      <section className="border-y border-stone-100 bg-gradient-to-b from-[#faf7f2] to-white py-10 sm:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <p className="mb-2 text-xs font-extrabold uppercase tracking-[0.18em] text-orange-700">
              Explore Our Collection
            </p>

            <h2 className="text-2xl font-black tracking-tight text-stone-950 sm:text-3xl">
              All Properties
            </h2>

            <p className="mt-2 text-sm text-stone-500">
              Browse the collection and discover your next destination.
            </p>
          </div>

          {filteredProperties.length > 0 ? (
            <div className="grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filteredProperties.map((property) => (
                <PropertyCard
                  key={property.id || property._id}
                  property={property}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-dashed border-amber-300 bg-white px-5 py-12 text-center shadow-sm sm:px-8">
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-50 text-3xl text-orange-700">
                ⌕
              </div>

              <h3 className="text-xl font-extrabold text-stone-900 sm:text-2xl">
                No Properties Found
              </h3>

              <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-stone-500">
                We could not find a property matching your search.
                Try another location or change your filters.
              </p>

              <button
                type="button"
                onClick={resetFilters}
                className={`${primaryButtonClass} mt-6`}
              >
                Clear Filters
                <span>↻</span>
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Property Owner CTA */}
      <section className="relative isolate overflow-hidden bg-gradient-to-br from-[#32170f] via-[#542416] to-[#7c2d12] py-12 text-white sm:py-16">
        <div className="pointer-events-none absolute -right-20 -top-24 -z-10 h-80 w-80 rounded-full border border-amber-400/20" />
        <div className="pointer-events-none absolute -right-8 -top-12 -z-10 h-56 w-56 rounded-full border border-amber-400/20" />
        <div className="pointer-events-none absolute -bottom-32 left-10 -z-10 h-72 w-72 rounded-full bg-orange-500/10 blur-3xl" />

        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-7 px-4 sm:px-6 md:flex-row md:items-center lg:px-8">
          <div className="max-w-2xl">
            <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.2em] text-amber-300">
              Have a Property to Sell or Rent?
            </p>

            <h2 className="text-2xl font-black leading-tight tracking-tight text-white sm:text-3xl lg:text-4xl">
              Let the Right Buyer
              <span className="block text-amber-300">
                Find Your Property.
              </span>
            </h2>

            <p className="mt-4 max-w-xl text-sm leading-7 text-orange-50/80 sm:text-base">
              Share your property details with us and take the next
              step toward reaching potential buyers or tenants.
            </p>
          </div>

          <Link
            to="/list-your-property"
            className="inline-flex min-h-12 w-full shrink-0 items-center justify-center gap-3 rounded-xl border border-amber-200/40 bg-gradient-to-r from-amber-400 via-orange-500 to-amber-500 px-6 py-4 text-sm font-extrabold text-white shadow-xl shadow-black/20 transition-all duration-300 hover:-translate-y-1 hover:from-orange-500 hover:via-amber-500 hover:to-orange-500 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-amber-300 focus:ring-offset-2 focus:ring-offset-[#542416] sm:w-auto"
          >
            List Your Property
            <span className="text-lg transition-transform duration-300 hover:translate-x-1">
              ↗
            </span>
          </Link>
        </div>
      </section>
    </main>
  );
}
