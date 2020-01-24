// const Firebase = require('./lib/firebase')
// import {firestore} from './lib/firebase'
// const firestore = Firebase.firestore
// const fetch = require('isomorphic-unfetch');
const withOffline = require('next-offline')

require('dotenv').config()

const fs = require('fs')
const path = require('path')

const withPlugins = require('next-compose-plugins')
const bundleAnalyzer = require('@next/bundle-analyzer')

const nextConfig = {
  env: {
    FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
    FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
    FIREBASE_DATABASE_URL: process.env.FIREBASE_DATABASE_URL,
    FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
    FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
    FIREBASE_MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGING_SENDER_ID,
    FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
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

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withOffline(nextConfig)
