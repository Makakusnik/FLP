export default {
	apps: [
		{
			name: 'Makakify landingpage.',
			port: 3010,
			script: './app.js',
			env_production: {
				NODE_ENV: 'production'
			},
			env_development: {
				NODE_ENV: 'development'
			}
		}
	]
};
