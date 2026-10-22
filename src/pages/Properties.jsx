
import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  getProperties,
  subscribeToProperties,
  formatPrice,
} from '../utils/properties';

export default function Properties() {
  const [properties, setProperties] = useState(() => getProperties());
  const [search, setSearch] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');

  useEffect(() => {
    return subscribeToProperties(setProperties);
  }, []);

  const propertyTypes = useMemo(
    () => [
      'All',
      ...new Set(
        properties
          .map((property) => property.type)
          .filter(Boolean)
      ),
    ],
    [properties]
  );

  const filteredProperties = useMemo(() => {
    const query = search.trim().toLowerCase();

    return properties.filter((property) => {
      const title = property.title || property.name || '';
      const location = property.location || '';
      const type = property.type || '';
      const status = property.status || 'Available';

      const matchesSearch =
        !query ||
        title.toLowerCase().includes(query) ||
        location.toLowerCase().includes(query) ||
        type.toLowerCase().includes(query);

      const matchesType =
        selectedType === 'All' || type === selectedType;

      const matchesStatus =
        selectedStatus === 'All' || status === selectedStatus;

      return matchesSearch && matchesType && matchesStatus;
    });
  }, [properties, search, selectedType, selectedStatus]);

  return (
    <section className="page-section">
      <div className="container">
        <div className="properties-heading">
          <p className="eyebrow">OUR PROPERTY COLLECTION</p>
          <h1 className="page-title">Find Your Perfect Property</h1>
          <p className="muted">
            Explore properties and find a place that feels like home.
          </p>
        </div>

        <div className="properties-filters">
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search by property, location or type..."
            aria-label="Search properties"
          />

          <select
            value={selectedType}
            onChange={(event) => setSelectedType(event.target.value)}
            aria-label="Filter by property type"
          >
            {propertyTypes.map((type) => (
              <option key={type} value={type}>
                {type === 'All' ? 'All property types' : type}
              </option>
            ))}
          </select>

          <select
            value={selectedStatus}
            onChange={(event) => setSelectedStatus(event.target.value)}
            aria-label="Filter by property status"
          >
            <option value="All">All statuses</option>
            <option value="Available">Available</option>
            <option value="Sold">Sold</option>
          </select>
        </div>

        <p className="muted properties-count">
          Showing {filteredProperties.length} of {properties.length} properties
        </p>

        {filteredProperties.length > 0 ? (
          <div className="properties-grid">
            {filteredProperties.map((property) => {
              const title = property.title || property.name || 'Property';
              const image = property.image || property.images?.[0] || '';
              const status = property.status || 'Available';

              return (
                <article className="property-card" key={property.id}>
                  {image ? (
                    <img
                      className="property-card-image"
                      src={image}
                      alt={title}
                      loading="lazy"
                    />
                  ) : (
                    <div className="property-card-image property-image-placeholder">
                      No image available
                    </div>
                  )}

                  <div className="property-card-content">
                    <div className="property-card-top">
                      <span className="property-type">{property.type || 'Property'}</span>
                      <span className={`property-status status-${status.toLowerCase()}`}>
                        {status}
                      </span>
                    </div>

                    <h2>{title}</h2>
                    <p className="muted">{property.location || 'Location not specified'}</p>
                    <p className="property-price">{formatPrice(property.price ?? property.salePrice)}</p>

                    <div className="property-card-meta">
                      <span>{property.bedrooms ?? property.beds ?? 0} Beds</span>
                      <span>{property.bathrooms ?? property.baths ?? 0} Baths</span>
                      <span>{property.area ?? 0} sq. ft.</span>
                    </div>

                    <Link
                      className="btn-primary"
                      to={`/properties/${property.id}`}
                    >
                      View Details
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="properties-empty">
            <h2>No properties found</h2>
            <p className="muted">
              Try another search term or change your filters.
            </p>
            <button
              className="btn-primary"
              type="button"
              onClick={() => {
                setSearch('');
                setSelectedType('All');
                setSelectedStatus('All');
              }}
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
