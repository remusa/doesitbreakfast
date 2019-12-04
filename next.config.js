// const fetch = require('isomorphic-unfetch');
const withOffline = require('next-offline')

const nextConfig = {
  target: 'serverless',
  // exportTrailingSlash: true,
  // exportPathMap: async function() {
  //   const paths = {
  //     '/': { page: '/' },
  //     '/about': { page: '/about' }
  //   };
  //   const res = await fetch('https://api.tvmaze.com/search/shows?q=batman');
  //   const data = await res.json();
  //   const shows = data.map(entry => entry.show);

  //   shows.forEach(show => {
  //     paths[`/show/${show.id}`] = { page: '/show/[id]', query: { id: show.id } };
  //   });

  //   return paths;
  // },
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
