const withImages = require('next-images');

const redirects = {
  async redirects() {
    return [
      {
        source: '/dashboards',
        destination: '/dashboards/crypto',
        permanent: true
      }
    ];
  },
  images: {
    domains: ['res.cloudinary.com', 'drive.google.com'],
    disableStaticImages: true,
    unoptimized: true
  },
  typescript: {
    ignoreBuildErrors: true
  }
};

module.exports = withImages(redirects);
