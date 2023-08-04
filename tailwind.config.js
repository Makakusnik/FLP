import colors from 'tailwindcss/colors';

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			backgroundImage: {
				'line-gradient': `linear-gradient(to right, ${colors.gray['700']}, ${colors.gray['300']} 30%, ${colors.gray['200']} 70%, ${colors.gray['700']} )`,
				'purple-radial-gradient-top': `radial-gradient(circle at 50% 10%, ${
					colors.purple['900'] + '3A'
				} , ${colors.transparent} 45%)`,
				'purple-radial-gradient-center': `radial-gradient(circle at center, ${
					colors.purple['800'] + '3A'
				} , ${colors.transparent} 45%)`,
				'button-gradient': `linear-gradient(60deg, ${colors.purple['700']},${colors.purple['800']})`,
				'card-gradient': `radial-gradient(circle at bottom left, ${colors.purple['800']} ,${colors.purple['950']} 100%)`
			}
		}
	},
	plugins: [require('@tailwindcss/container-queries')]
};
