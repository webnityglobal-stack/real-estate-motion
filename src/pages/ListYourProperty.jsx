
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  getProperties,
  saveProperties,
} from "../utils/properties";

const initialForm = {
  ownerName: "",
  phone: "",
  email: "",
  title: "",
  type: "House",
  listingType: "Sale",
  price: "",
  location: "",
  area: "",
  bedrooms: "2",
  bathrooms: "2",
  description: "",
};

const propertyTypes = [
  "House",
  "Villa",
  "Apartment",
  "Flat",
  "Plot",
  "Commercial",
  "Farmhouse",
  "Other",
];

const MAX_IMAGES = 3;

function formatIndianPrice(value) {
  const amount = Number(value);

  if (!amount || amount < 0) return "";

  if (amount >= 10000000) {
    return `₹${(amount / 10000000).toFixed(2)} Crore`;
  }

  if (amount >= 100000) {
    return `₹${(amount / 100000).toFixed(2)} Lakh`;
  }

  return `₹${amount.toLocaleString("en-IN")}`;
}

// Resize and compress images to reduce localStorage usage.
function compressImage(file) {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith("image/")) {
      reject(new Error("Please select a valid image."));
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      const image = new Image();

      image.onload = () => {
        const maxWidth = 1100;
        const maxHeight = 900;
        const scale = Math.min(
          maxWidth / image.width,
          maxHeight / image.height,
          1
        );

        const canvas = document.createElement("canvas");
        canvas.width = Math.round(image.width * scale);
        canvas.height = Math.round(image.height * scale);

        const context = canvas.getContext("2d");

        if (!context) {
          reject(new Error("Unable to process this image."));
          return;
        }

        context.drawImage(image, 0, 0, canvas.width, canvas.height);

        resolve(canvas.toDataURL("image/jpeg", 0.72));
      };

      image.onerror = () => {
        reject(new Error("Unable to read one of the selected images."));
      };

      image.src = reader.result;
    };

    reader.onerror = () => {
      reject(new Error("Unable to upload the selected image."));
    };

    reader.readAsDataURL(file);
  });
}

export default function ListYourProperty() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [form, setForm] = useState(initialForm);
  const [images, setImages] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    return () => {
      // Image previews use data URLs, so no object URL cleanup is needed.
    };
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    setError("");
    setSuccess(false);
  };

  const handleImageChange = async (event) => {
    const files = Array.from(event.target.files || []);
    event.target.value = "";

    if (!files.length) return;

    const remainingSlots = MAX_IMAGES - images.length;

    if (remainingSlots <= 0) {
      setError(`You can upload a maximum of ${MAX_IMAGES} images.`);
      return;
    }

    const selectedFiles = files.slice(0, remainingSlots);

    if (files.length > remainingSlots) {
      setError(`Only ${MAX_IMAGES} images can be uploaded.`);
    } else {
      setError("");
    }

    try {
      const compressedImages = await Promise.all(
        selectedFiles.map((file) => compressImage(file))
      );

      setImages((previous) =>
        [...previous, ...compressedImages].slice(0, MAX_IMAGES)
      );
    } catch (imageError) {
      setError(
        imageError.message || "Unable to process the selected images."
      );
    }
  };

  const removeImage = (indexToRemove) => {
    setImages((previous) =>
      previous.filter((_, index) => index !== indexToRemove)
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");
    setSuccess(false);

    if (!images.length) {
      setError("Please upload at least one property image.");
      return;
    }

    if (Number(form.price) <= 0) {
      setError("Please enter a valid property price.");
      return;
    }

    if (Number(form.area) <= 0) {
      setError("Please enter a valid property area.");
      return;
    }

    setIsSubmitting(true);

    try {
      const existingProperties = getProperties();

      const newProperty = {
        id: `prop-${Date.now()}-${Math.random()
          .toString(36)
          .slice(2, 7)}`,
        title: form.title.trim(),
        name: form.title.trim(),
        location: form.location.trim(),
        price: Number(form.price),
        type: form.type,
        listingType: form.listingType,
        status: "Available",
        bedrooms: Number(form.bedrooms) || 0,
        bathrooms: Number(form.bathrooms) || 0,
        area: Number(form.area),
        image: images[0],
        images,
        description: form.description.trim(),
        ownerName: form.ownerName.trim(),
        ownerPhone: form.phone.trim(),
        ownerEmail: form.email.trim(),
        createdAt: new Date().toISOString(),
      };

      const saved = saveProperties([
        newProperty,
        ...existingProperties,
      ]);

      if (!saved) {
        throw new Error(
          "Browser storage is full. Try uploading fewer or smaller images."
        );
      }

      setSuccess(true);
      setForm(initialForm);
      setImages([]);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (submitError) {
      setError(
        submitError.message ||
          "Unable to save your property. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass =
    "mt-2 w-full rounded-xl border border-stone-200 bg-white px-4 py-3.5 text-sm text-stone-800 outline-none transition placeholder:text-stone-400 focus:border-amber-600 focus:ring-4 focus:ring-amber-100";

  const labelClass =
    "block text-sm font-semibold text-stone-700";

  return (
    <div className="min-h-screen bg-[#fffdf8]">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#57200f] via-[#843716] to-[#b45309] px-4 py-16 text-white sm:py-20">
        <div className="pointer-events-none absolute -right-16 -top-20 h-72 w-72 rounded-full border border-amber-200/20" />
        <div className="pointer-events-none absolute -bottom-32 -left-16 h-80 w-80 rounded-full border border-amber-200/20" />

        <div className="relative mx-auto max-w-4xl text-center">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.28em] text-amber-200">
            Shri Radhe Krishna Properties
          </p>

          <h1 className="text-3xl font-extrabold leading-tight sm:text-5xl">
            List Your Property
            <span className="mt-2 block text-amber-200">
              Find Your Right Buyer
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-orange-50/90 sm:text-base">
            Share your property details with us. Add the location,
            price and photos to create your property listing.
          </p>

          <div className="mt-7 flex flex-wrap justify-center gap-3 text-xs font-semibold sm:text-sm">
            <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2">
              ✦ Easy Submission
            </span>
            <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2">
              ✦ Image Preview
            </span>
            <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2">
              ✦ No Registration Required
            </span>
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="px-4 py-12 sm:py-16">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1fr_320px]">
          <div className="rounded-3xl border border-amber-100 bg-white p-5 shadow-xl shadow-amber-900/5 sm:p-9">
            {success && (
              <div
                role="status"
                className="mb-7 rounded-2xl border border-green-200 bg-green-50 p-5"
              >
                <div className="flex items-start gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-green-100 text-lg text-green-700">
                    ✓
                  </span>

                  <div>
                    <h2 className="font-bold text-green-900">
                      Property saved successfully!
                    </h2>
                    <p className="mt-1 text-sm leading-6 text-green-800">
                      Your property details have been saved in this
                      browser.
                    </p>

                    <Link
                      to="/properties"
                      className="mt-3 inline-flex font-bold text-green-800 underline underline-offset-4"
                    >
                      View Properties →
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {error && (
              <div
                role="alert"
                className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
              >
                {error}
              </div>
            )}

            <div className="mb-8">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-700">
                Property Submission
              </p>
              <h2 className="mt-2 text-2xl font-extrabold text-[#762b13] sm:text-3xl">
                Enter Property Details
              </h2>
              <p className="mt-2 text-sm leading-6 text-stone-500">
                Fields marked with * are required.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-9">
              {/* Owner Details */}
              <div>
                <h3 className="mb-5 flex items-center gap-3 text-lg font-bold text-stone-800">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-100 text-amber-800">
                    01
                  </span>
                  Owner Details
                </h3>

                <div className="grid gap-5 sm:grid-cols-2">
                  <label className={labelClass}>
                    Owner Name *
                    <input
                      className={inputClass}
                      type="text"
                      name="ownerName"
                      value={form.ownerName}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      autoComplete="name"
                      maxLength={100}
                      required
                    />
                  </label>

                  <label className={labelClass}>
                    Mobile Number *
                    <input
                      className={inputClass}
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="Enter mobile number"
                      autoComplete="tel"
                      inputMode="tel"
                      pattern="[0-9+\-\s()]{10,16}"
                      title="Enter a valid phone number"
                      required
                    />
                  </label>

                  <label className={`${labelClass} sm:col-span-2`}>
                    Email Address
                    <input
                      className={inputClass}
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@example.com (optional)"
                      autoComplete="email"
                    />
                  </label>
                </div>
              </div>

              {/* Property Details */}
              <div>
                <h3 className="mb-5 flex items-center gap-3 text-lg font-bold text-stone-800">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-100 text-amber-800">
                    02
                  </span>
                  Property Details
                </h3>

                <div className="grid gap-5 sm:grid-cols-2">
                  <label className={`${labelClass} sm:col-span-2`}>
                    Property Title *
                    <input
                      className={inputClass}
                      type="text"
                      name="title"
                      value={form.title}
                      onChange={handleChange}
                      placeholder="e.g. Beautiful 3 BHK Independent House"
                      maxLength={120}
                      required
                    />
                  </label>

                  <label className={labelClass}>
                    Property Type *
                    <select
                      className={inputClass}
                      name="type"
                      value={form.type}
                      onChange={handleChange}
                      required
                    >
                      {propertyTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className={labelClass}>
                    Listing Type *
                    <select
                      className={inputClass}
                      name="listingType"
                      value={form.listingType}
                      onChange={handleChange}
                      required
                    >
                      <option value="Sale">For Sale</option>
                      <option value="Rent">For Rent</option>
                    </select>
                  </label>

                  <label className={labelClass}>
                    Price (₹) *
                    <input
                      className={inputClass}
                      type="number"
                      name="price"
                      value={form.price}
                      onChange={handleChange}
                      placeholder="e.g. 7500000"
                      min="1"
                      step="1"
                      required
                    />
                    {form.price && Number(form.price) > 0 && (
                      <span className="mt-2 block text-xs font-semibold text-amber-800">
                        {formatIndianPrice(form.price)}
                      </span>
                    )}
                  </label>

                  <label className={labelClass}>
                    Property Area (sq. ft.) *
                    <input
                      className={inputClass}
                      type="number"
                      name="area"
                      value={form.area}
                      onChange={handleChange}
                      placeholder="e.g. 1800"
                      min="1"
                      step="1"
                      required
                    />
                  </label>

                  <label className={labelClass}>
                    Bedrooms
                    <select
                      className={inputClass}
                      name="bedrooms"
                      value={form.bedrooms}
                      onChange={handleChange}
                    >
                      {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((number) => (
                        <option key={number} value={number}>
                          {number === 0 ? "Not applicable" : number}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className={labelClass}>
                    Bathrooms
                    <select
                      className={inputClass}
                      name="bathrooms"
                      value={form.bathrooms}
                      onChange={handleChange}
                    >
                      {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((number) => (
                        <option key={number} value={number}>
                          {number === 0 ? "Not applicable" : number}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className={`${labelClass} sm:col-span-2`}>
                    Property Location *
                    <input
                      className={inputClass}
                      type="text"
                      name="location"
                      value={form.location}
                      onChange={handleChange}
                      placeholder="City, locality, state"
                      maxLength={200}
                      required
                    />
                  </label>

                  <label className={`${labelClass} sm:col-span-2`}>
                    Property Description *
                    <textarea
                      className={`${inputClass} min-h-36 resize-y`}
                      name="description"
                      value={form.description}
                      onChange={handleChange}
                      placeholder="Describe the property, nearby facilities, features and amenities..."
                      rows={5}
                      maxLength={3000}
                      required
                    />
                    <span className="mt-1 block text-right text-xs font-normal text-stone-400">
                      {form.description.length}/3000
                    </span>
                  </label>
                </div>
              </div>

              {/* Images */}
              <div>
                <h3 className="mb-5 flex items-center gap-3 text-lg font-bold text-stone-800">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-100 text-amber-800">
                    03
                  </span>
                  Property Images
                </h3>

                <div className="rounded-2xl border-2 border-dashed border-amber-300 bg-[#fffaf0] p-5 text-center sm:p-8">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-100 text-2xl">
                    📷
                  </div>

                  <h4 className="mt-4 font-bold text-stone-800">
                    Upload Property Photos
                  </h4>

                  <p className="mt-2 text-sm leading-6 text-stone-500">
                    Choose up to {MAX_IMAGES} images. Images are
                    compressed in your browser.
                  </p>

                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={images.length >= MAX_IMAGES}
                    className="mt-5 rounded-xl bg-[#843716] px-6 py-3 font-bold text-white transition hover:bg-[#702b16] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    + Choose Images
                  </button>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageChange}
                    className="hidden"
                  />

                  <p className="mt-3 text-xs text-stone-400">
                    {images.length} of {MAX_IMAGES} images selected
                  </p>
                </div>

                {images.length > 0 && (
                  <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3">
                    {images.map((image, index) => (
                      <div
                        key={`${index}-${image.slice(0, 30)}`}
                        className="group relative overflow-hidden rounded-2xl border border-amber-100 bg-white"
                      >
                        <img
                          src={image}
                          alt={`Property preview ${index + 1}`}
                          className="h-36 w-full object-cover sm:h-44"
                        />

                        {index === 0 && (
                          <span className="absolute bottom-2 left-2 rounded-lg bg-[#702b16] px-2 py-1 text-xs font-bold text-white">
                            Main Image
                          </span>
                        )}

                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          aria-label={`Remove image ${index + 1}`}
                          className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-white text-lg font-bold text-red-600 shadow transition hover:bg-red-50"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Submit */}
              <div className="border-t border-amber-100 pt-7">
                <p className="mb-5 text-xs leading-6 text-stone-500">
                  By submitting, you confirm that the information
                  provided is accurate and that you have permission
                  to list this property.
                </p>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-[#843716] to-[#c26313] px-6 py-4 font-bold text-white shadow-lg shadow-orange-900/15 transition hover:-translate-y-0.5 hover:from-[#702b16] hover:to-[#a94719] disabled:cursor-wait disabled:opacity-70 sm:w-auto sm:min-w-64"
                >
                  {isSubmitting ? "Saving Property..." : "Submit Property"}
                  {!isSubmitting && <span aria-hidden="true">↗</span>}
                </button>
              </div>
            </form>
          </div>

          {/* Side Information */}
          <aside className="space-y-5 lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-3xl bg-gradient-to-br from-[#702b16] to-[#a94719] p-6 text-white shadow-lg">
              <span className="text-3xl">🏡</span>
              <h3 className="mt-4 text-xl font-extrabold">
                List With Confidence
              </h3>
              <p className="mt-3 text-sm leading-7 text-orange-50/90">
                Provide clear details and good photographs to help
                people understand your property.
              </p>

              <div className="mt-6 space-y-4">
                {[
                  "Accurate property details",
                  "Clear property photographs",
                  "Correct location and price",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/15 text-amber-200">
                      ✓
                    </span>
                    <span className="text-sm font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-amber-100 bg-white p-6">
              <h3 className="font-extrabold text-[#762b13]">
                Need Assistance?
              </h3>
              <p className="mt-2 text-sm leading-6 text-stone-500">
                Have questions about listing your property? Get in
                touch with our team.
              </p>

              <Link
                to="/contact"
                className="mt-5 inline-flex w-full items-center justify-center rounded-xl border border-amber-200 px-4 py-3 text-sm font-bold text-[#843716] transition hover:bg-amber-50"
              >
                Contact Us ↗
              </Link>
            </div>

            <div className="rounded-2xl border border-amber-100 bg-amber-50/70 p-4">
              <p className="text-xs leading-6 text-stone-600">
                <strong className="text-stone-800">
                  Please note:
                </strong>{" "}
                This website currently saves submissions only in
                this browser. It does not send property details to
                the website owner or another device.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
