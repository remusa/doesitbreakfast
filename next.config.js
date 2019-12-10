// const fetch = require('isomorphic-unfetch');
const withOffline = require('next-offline')
// import {firestore} from './lib/firebase'
const env = require('./.env')

const nextConfig = {
  // exportTrailingSlash: true,
  // exportPathMap: async function() {
  //   const paths = {
  //     '/': { page: '/' },
  //     '/about': { page: '/about' }
  //   }

  //   const snapshot = await firestore.collection('entries').get()

  //   snapshot.forEach(doc => {
  //     const entry = { ...doc.data(), id: doc.id }
  //     paths[`/product/${entry.id}`] = { page: '/product/[id]', query: { id: entry.id } }
  //   })

  //   return paths
  // },
  env: env,
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
						statuses: [0, 200]
					}
				}
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
					cacheName: 'http-cache'
				}
			}
		]
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
