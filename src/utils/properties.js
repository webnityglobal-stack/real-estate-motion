
const STORAGE_KEY = 'estateluxe_properties';

export const starterProperties = [
  {
    id: 'prop-101',
    title: 'Modern Luxury Villa',
    name: 'Modern Luxury Villa',
    location: 'Gurugram, Haryana',
    price: 18500000,
    type: 'Villa',
    status: 'Available',
    bedrooms: 4,
    bathrooms: 4,
    area: 3200,
    image:
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80',
    description:
      'A spacious luxury villa with contemporary architecture, generous living spaces and premium finishes.',
  },
  {
    id: 'prop-102',
    title: 'Premium City Apartment',
    name: 'Premium City Apartment',
    location: 'Noida, Uttar Pradesh',
    price: 7800000,
    type: 'Apartment',
    status: 'Available',
    bedrooms: 3,
    bathrooms: 2,
    area: 1450,
    image:
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
    description:
      'A modern city apartment with a comfortable layout and convenient access to everyday amenities.',
  },
  {
    id: 'prop-103',
    title: 'Greenview Family Home',
    name: 'Greenview Family Home',
    location: 'Delhi, India',
    price: 12500000,
    type: 'House',
    status: 'Sold',
    bedrooms: 3,
    bathrooms: 3,
    area: 2100,
    image:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    description:
      'A welcoming family home with spacious rooms and a practical layout for everyday living.',
  },
];

export function getProperties() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);

    if (stored !== null) {
      const parsed = JSON.parse(stored);
      return Array.isArray(parsed) ? parsed : starterProperties;
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(starterProperties));
    return starterProperties;
  } catch (error) {
    console.error('Unable to load properties:', error);
    return starterProperties;
  }
}

export function saveProperties(properties) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(properties));

    // Notify components in this tab that property data changed.
    window.dispatchEvent(new Event('estateluxe-properties-updated'));

    return true;
  } catch (error) {
    console.error('Unable to save properties:', error);
    return false;
  }
}

export function subscribeToProperties(callback) {
  const handleUpdate = () => callback(getProperties());

  window.addEventListener('estateluxe-properties-updated', handleUpdate);
  window.addEventListener('storage', handleUpdate);

  return () => {
    window.removeEventListener('estateluxe-properties-updated', handleUpdate);
    window.removeEventListener('storage', handleUpdate);
  };
}

export function formatPrice(price) {
  const amount = Number(price) || 0;

  if (amount >= 10000000) {
    return `₹${(amount / 10000000).toFixed(amount % 10000000 === 0 ? 0 : 2)} Cr`;
  }

  if (amount >= 100000) {
    return `₹${(amount / 100000).toFixed(amount % 100000 === 0 ? 0 : 1)} Lac`;
  }

  return `₹${amount.toLocaleString('en-IN')}`;
}
