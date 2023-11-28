const WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = {
  // ... other configurations

  plugins: [
    // ... other plugins
    new WorkboxPlugin.GenerateSW({
      clientsClaim: true,
      skipWaiting: true,
    }),
  ],
};
