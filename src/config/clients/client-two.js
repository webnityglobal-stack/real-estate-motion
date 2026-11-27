
const clientTwo = {
  clientId: 'client-two',

  brandName: 'PrimeNest Realty',
  tagline: 'Your Next Move Starts Here',

  logo: `${import.meta.env.BASE_URL}./cottage-logo.png`,
  favicon: `${import.meta.env.BASE_URL}favicon.svg`,

  theme: {
    primary: '#234B35',
    secondary: '#C69C50',
    background: '#FFFFFF',
    text: '#25352B',
  },

  seo: {
    title: 'PrimeNest Realty | Find Your Next Home',
    description:
      'Discover homes and real estate investment opportunities with PrimeNest Realty.',
    keywords: 'PrimeNest Realty, homes, real estate, property',
  },

  contact: {
    phone: '+91-APNA-NUMBER',
    email: 'apna-email@example.com',
    address: 'Office Address, City, India',
  },

  navigation: [
    { label: 'Home', path: '/' },
    { label: 'Properties', path: '/properties' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' },
  ],

  social: {
    instagram: '',
    facebook: '',
    linkedin: '',
  },
};

export default clientTwo;
