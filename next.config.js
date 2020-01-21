// const Firebase = require('./lib/firebase')
// import {firestore} from './lib/firebase'
// const firestore = Firebase.firestore
// const fetch = require('isomorphic-unfetch');
const withOffline = require('next-offline')

require('dotenv').config()

const nextConfig = {
  // env: require('./.env')nv,
  env: {
    API_KEY: process.env.API_KEY,
    AUTH_DOMAIN: process.env.AUTH_DOMAIN,
    DATABASE_URL: process.env.DATABASE_URL,
    PROJECT_ID: process.env.PROJECT_ID,
    STORAGE_BUCKET: process.env.STORAGE_BUCKET,
    MESSAGING_SENDER_ID: process.env.MESSAGING_SENDER_ID,
    APP_ID: process.env.APP_ID,
  },
  // exportTrailingSlash: true,
  // exportPathMap: async function() {
  //   const paths = {
  //     '/': { page: '/' },
  //     '/about': { page: '/about' },
  //   }
  //   const snapshot = await firestore.collection('entries').get()
  //   snapshot.forEach(doc => {
  //     const entry = { ...doc.data(), id: doc.id }
  //     paths[`/product/${entry.id}`] = { page: '/product/[id]', query: { id: entry.id } }
  //   })
  //   return paths
  // },
  target: 'serverless',
  workboxOpts: {
    swDest: 'public/service-worker.js',
    runtimeCaching: [
      {
        urlPattern: /[.](png|jpg|ico|css)/,
        handler: 'CacheFirst',
        options: {
          cacheName: 'assets-cache',
          cacheableResponse: {
            statuses: [0, 200],
          },
        },
      },
      // {
      // 	urlPattern: /^https:\/\/code\.getmdl\.io.*/,
      // 	handler: 'CacheFirst',
      // 	options: {
      // 		cacheName: 'lib-cache'
      // 	}
      // },
      {
        urlPattern: /^http.*/,
        handler: 'NetworkFirst',
        options: {
          cacheName: 'http-cache',
        },
      },
    ],
  },
  experimental: {
    async rewrites() {
      return [
        {
          source: '/service-worker.js',
          destination: '/_next/static/service-worker.js',
        },
      ]
    },
  },
}

module.exports = withOffline(nextConfig)
