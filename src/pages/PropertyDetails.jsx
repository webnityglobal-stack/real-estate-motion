
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  getProperties,
  subscribeToProperties,
  formatPrice,
} from '../utils/properties';

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
      <section className="page-section container">
        <h1 className="page-title">Property Not Found</h1>
        <p className="muted">
          This property may have been removed from the admin dashboard.
        </p>
        <Link className="btn-primary" to="/properties">
          Back to Properties
        </Link>
      </section>
    );
  }

  const title = property.title || property.name || 'Property';
  const image = property.image || property.images?.[0] || '';
  const status = property.status || 'Available';

  return (
    <section className="page-section">
      <div className="container property-details">
        <Link className="back-link" to="/properties">
          ← Back to Properties
        </Link>

        {image && (
          <img
            className="property-details-image"
            src={image}
            alt={title}
          />
        )}

        <div className="property-details-content">
          <div className="property-card-top">
            <span className="property-type">{property.type || 'Property'}</span>
            <span className={`property-status status-${status.toLowerCase()}`}>
              {status}
            </span>
          </div>

          <h1 className="page-title">{title}</h1>
          <p className="muted">{property.location || 'Location not specified'}</p>
          <h2 className="property-price">
            {formatPrice(property.price ?? property.salePrice)}
          </h2>

          <div className="property-details-meta">
            <div>
              <strong>{property.bedrooms ?? property.beds ?? 0}</strong>
              <span>Bedrooms</span>
            </div>
            <div>
              <strong>{property.bathrooms ?? property.baths ?? 0}</strong>
              <span>Bathrooms</span>
            </div>
            <div>
              <strong>{property.area ?? 0}</strong>
              <span>Sq. Ft.</span>
            </div>
          </div>

          <h2>Property Description</h2>
          <p className="property-description">
            {property.description || 'More information about this property will be available soon.'}
          </p>

          <Link className="btn-primary" to="/contact">
            Enquire About This Property
          </Link>
        </div>
      </div>
    </section>
  );
}
