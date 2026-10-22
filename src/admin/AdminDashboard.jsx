import {
  getProperties,
  saveProperties,
} from '../utils/properties';
import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

const STORAGE_KEY = 'estateluxe_properties';

const starterProperties = [
  {
    id: 'prop-101',
    title: 'Modern Luxury Villa',
    location: 'Gurugram, Haryana',
    price: 18500000,
    type: 'Villa',
    status: 'Available',
    bedrooms: 4,
    bathrooms: 4,
    area: 3200,
    image:
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=900&q=80',
    description: 'A spacious modern villa with elegant interiors and a private garden.',
  },
  {
    id: 'prop-102',
    title: 'Premium City Apartment',
    location: 'Noida, Uttar Pradesh',
    price: 7800000,
    type: 'Apartment',
    status: 'Available',
    bedrooms: 3,
    bathrooms: 2,
    area: 1450,
    image:
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=80',
    description: 'A comfortable apartment with a contemporary design.',
  },
  {
    id: 'prop-103',
    title: 'Greenview Family Home',
    location: 'Delhi, India',
    price: 12500000,
    type: 'House',
    status: 'Sold',
    bedrooms: 3,
    bathrooms: 3,
    area: 2100,
    image:
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=900&q=80',
    description: 'A welcoming family home in a well-connected neighbourhood.',
  },
];

const emptyForm = {
  title: '',
  location: '',
  price: '',
  type: 'Apartment',
  status: 'Available',
  bedrooms: '2',
  bathrooms: '2',
  area: '',
  image: '',
  description: '',
};

function readProperties() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved !== null) {
      const parsed = JSON.parse(saved);
      return Array.isArray(parsed) ? parsed : starterProperties;
    }
  } catch (error) {
    console.error('Unable to read saved properties:', error);
  }

  return starterProperties;
}

function formatPrice(price) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(Number(price) || 0);
}

export default function AdminDashboard() {
  const [properties, setProperties] = useState(readProperties);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [message, setMessage] = useState('');

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(properties));
    } catch (error) {
      console.error('Unable to save properties:', error);
      setMessage('Unable to save data in this browser.');
    }
  }, [properties]);

  const filteredProperties = useMemo(() => {
    const term = search.trim().toLowerCase();

    return properties.filter((property) => {
      const matchesSearch =
        property.title?.toLowerCase().includes(term) ||
        property.location?.toLowerCase().includes(term);

      const matchesStatus =
        statusFilter === 'All' || property.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [properties, search, statusFilter]);

  const availableCount = properties.filter(
    (property) => property.status === 'Available'
  ).length;

  const soldCount = properties.filter(
    (property) => property.status === 'Sold'
  ).length;

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  function resetForm() {
    setForm(emptyForm);
    setEditingId(null);
  }

  function handleSubmit(event) {
    event.preventDefault();

    const price = Number(form.price);
    const bedrooms = Number(form.bedrooms);
    const bathrooms = Number(form.bathrooms);
    const area = Number(form.area);

    if (!form.title.trim() || !form.location.trim()) {
      setMessage('Please enter the property name and location.');
      return;
    }

    if (
      !Number.isFinite(price) ||
      price <= 0 ||
      !Number.isFinite(area) ||
      area <= 0
    ) {
      setMessage('Enter a valid price and property area.');
      return;
    }

    const propertyData = {
      ...form,
      title: form.title.trim(),
      location: form.location.trim(),
      price,
      bedrooms,
      bathrooms,
      area,
      image: form.image.trim(),
      description: form.description.trim(),
    };

    if (editingId) {
      setProperties((current) =>
        current.map((property) =>
          property.id === editingId
            ? { ...property, ...propertyData }
            : property
        )
      );
      setMessage('Property updated successfully.');
    } else {
      setProperties((current) => [
        {
          id: `prop-${Date.now()}`,
          ...propertyData,
        },
        ...current,
      ]);
      setMessage('Property added successfully.');
    }

    resetForm();
  }

  function handleEdit(property) {
    setEditingId(property.id);
    setForm({
      title: property.title ?? '',
      location: property.location ?? '',
      price: String(property.price ?? ''),
      type: property.type ?? 'Apartment',
      status: property.status ?? 'Available',
      bedrooms: String(property.bedrooms ?? 2),
      bathrooms: String(property.bathrooms ?? 2),
      area: String(property.area ?? ''),
      image: property.image ?? '',
      description: property.description ?? '',
    });

    setMessage('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function handleDelete(property) {
    const confirmed = window.confirm(
      `Delete "${property.title}"? This action cannot be undone.`
    );

    if (!confirmed) return;

    setProperties((current) =>
      current.filter((item) => item.id !== property.id)
    );

    if (editingId === property.id) resetForm();

    setMessage('Property deleted.');
  }

  function handleStatusChange(id, status) {
    setProperties((current) =>
      current.map((property) =>
        property.id === id ? { ...property, status } : property
      )
    );

    setMessage('Property status updated.');
  }

  return (
    <div className="admin-page">
      <aside className="admin-sidebar">
        <Link to="/" className="admin-brand">
          <span className="admin-brand-icon">E</span>
          <span>
            ESTATE<span>LUXE</span>
            <small>ADMIN PANEL</small>
          </span>
        </Link>

        <p className="admin-nav-label">WORKSPACE</p>

        <a className="admin-nav-item active" href="#overview">
          <span>▦</span> Dashboard
        </a>

        <a className="admin-nav-item" href="#properties-list">
          <span>⌂</span> Properties
        </a>

        <a className="admin-nav-item" href="#property-form">
          <span>＋</span> Add Property
        </a>

        <div className="admin-sidebar-bottom">
          <Link to="/" className="admin-back-link">
            ← View Website
          </Link>
          <p>EstateLuxe Management</p>
        </div>
      </aside>

      <main className="admin-main">
        <header className="admin-topbar">
          <div>
            <p className="admin-breadcrumb">Workspace / Dashboard</p>
            <h1>Property Dashboard</h1>
          </div>
          <Link className="admin-view-site" to="/">
            View Website ↗
          </Link>
        </header>

        <section className="admin-content" id="overview">
          <div className="admin-welcome">
            <div>
              <p className="admin-kicker">PROPERTY MANAGEMENT</p>
              <h2>Manage your listings</h2>
              <p>Add, update, and organize your property inventory.</p>
            </div>
            <a className="admin-primary-button" href="#property-form">
              + Add New Property
            </a>
          </div>

          <div className="admin-stats">
            <article className="admin-stat-card">
              <span className="admin-stat-icon">⌂</span>
              <p>Total Properties</p>
              <strong>{properties.length}</strong>
              <small>All listings in this browser</small>
            </article>

            <article className="admin-stat-card">
              <span className="admin-stat-icon">✓</span>
              <p>Available</p>
              <strong>{availableCount}</strong>
              <small>Currently available listings</small>
            </article>

            <article className="admin-stat-card">
              <span className="admin-stat-icon">↗</span>
              <p>Sold</p>
              <strong>{soldCount}</strong>
              <small>Marked as sold</small>
            </article>
          </div>

          <section className="admin-panel" id="property-form">
            <div className="admin-panel-heading">
              <div>
                <p className="admin-kicker">
                  {editingId ? 'EDIT LISTING' : 'NEW LISTING'}
                </p>
                <h2>{editingId ? 'Update Property' : 'Add Property'}</h2>
              </div>
              {editingId && (
                <button
                  className="admin-secondary-button"
                  type="button"
                  onClick={resetForm}
                >
                  Cancel Edit
                </button>
              )}
            </div>

            {message && (
              <p className="admin-message" role="status">
                {message}
              </p>
            )}

            <form className="admin-form" onSubmit={handleSubmit}>
              <label>
                Property Name *
                <input
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="e.g. Luxury Villa"
                  required
                />
              </label>

              <label>
                Location *
                <input
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  placeholder="City, State"
                  required
                />
              </label>

              <label>
                Price (₹) *
                <input
                  name="price"
                  type="number"
                  min="1"
                  value={form.price}
                  onChange={handleChange}
                  placeholder="8500000"
                  required
                />
              </label>

              <label>
                Property Type
                <select name="type" value={form.type} onChange={handleChange}>
                  <option>Apartment</option>
                  <option>Villa</option>
                  <option>House</option>
                  <option>Plot</option>
                  <option>Commercial</option>
                  <option>Penthouse</option>
                </select>
              </label>

              <label>
                Listing Status
                <select
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                >
                  <option>Available</option>
                  <option>Sold</option>
                  <option>Under Offer</option>
                </select>
              </label>

              <label>
                Bedrooms
                <input
                  name="bedrooms"
                  type="number"
                  min="0"
                  value={form.bedrooms}
                  onChange={handleChange}
                />
              </label>

              <label>
                Bathrooms
                <input
                  name="bathrooms"
                  type="number"
                  min="0"
                  value={form.bathrooms}
                  onChange={handleChange}
                />
              </label>

              <label>
                Area (sq. ft.) *
                <input
                  name="area"
                  type="number"
                  min="1"
                  value={form.area}
                  onChange={handleChange}
                  placeholder="1500"
                  required
                />
              </label>

              <label className="admin-full-width">
                Image URL
                <input
                  name="image"
                  type="url"
                  value={form.image}
                  onChange={handleChange}
                  placeholder="https://example.com/property.jpg"
                />
              </label>

              <label className="admin-full-width">
                Description
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Describe the property..."
                />
              </label>

              <div className="admin-form-actions admin-full-width">
                <button className="admin-primary-button" type="submit">
                  {editingId ? 'Save Changes' : 'Add Property'}
                </button>
                <button
                  className="admin-secondary-button"
                  type="button"
                  onClick={resetForm}
                >
                  Clear Form
                </button>
              </div>
            </form>
          </section>

          <section className="admin-panel" id="properties-list">
            <div className="admin-panel-heading">
              <div>
                <p className="admin-kicker">YOUR INVENTORY</p>
                <h2>All Properties</h2>
              </div>
              <span className="admin-list-count">
                {filteredProperties.length} listings
              </span>
            </div>

            <div className="admin-toolbar">
              <input
                type="search"
                aria-label="Search properties"
                placeholder="Search name or location..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />

              <select
                aria-label="Filter by status"
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value)}
              >
                <option>All</option>
                <option>Available</option>
                <option>Sold</option>
                <option>Under Offer</option>
              </select>
            </div>

            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Property</th>
                    <th>Price</th>
                    <th>Type</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredProperties.map((property) => (
                    <tr key={property.id}>
                      <td>
                        <div className="admin-property-cell">
                          {property.image ? (
                            <img
                              src={property.image}
                              alt=""
                              onError={(event) => {
                                event.currentTarget.style.visibility = 'hidden';
                              }}
                            />
                          ) : (
                            <div className="admin-image-placeholder">⌂</div>
                          )}
                          <div>
                            <strong>{property.title}</strong>
                            <small>{property.location}</small>
                          </div>
                        </div>
                      </td>

                      <td>{formatPrice(property.price)}</td>
                      <td>{property.type}</td>

                      <td>
                        <select
                          className={`admin-status-select status-${property.status
                            .toLowerCase()
                            .replaceAll(' ', '-')}`}
                          aria-label={`Status for ${property.title}`}
                          value={property.status}
                          onChange={(event) =>
                            handleStatusChange(property.id, event.target.value)
                          }
                        >
                          <option>Available</option>
                          <option>Sold</option>
                          <option>Under Offer</option>
                        </select>
                      </td>

                      <td>
                        <div className="admin-row-actions">
                          <button
                            className="admin-edit-button"
                            type="button"
                            onClick={() => handleEdit(property)}
                          >
                            Edit
                          </button>
                          <button
                            className="admin-delete-button"
                            type="button"
                            onClick={() => handleDelete(property)}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}

                  {filteredProperties.length === 0 && (
                    <tr>
                      <td colSpan="5" className="admin-empty">
                        No properties match your search.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </section>
      </main>
    </div>
  );
}
