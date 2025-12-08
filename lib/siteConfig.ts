// Central site configuration. Update logoPath to change the navigation & homepage icon.
// Place your image in /public/images/ and reference it here.
export const siteConfig = {
	name: 'Itefafai',
	description: 'Professional web development and digital solutions',
	url: 'https://itefafai.vercel.app',
	baseUrl: process.env.NODE_ENV === 'production' ? 'https://itefafai.vercel.app' : 'http://localhost:3000',
	// Using placeholder PNG logo now in /public/images/logo.png. Replace logo.png with your own file when ready.
	logoPath: '/images/logo.png',
	author: {
		name: 'Efan Savage',
		email: 'efansavage@gmail.com',
		phone: '+46720062874'
	},
	social: {
		twitter: 'https://twitter.com/itefafai',
		linkedin: 'https://linkedin.com/company/itefafai',
		github: 'https://github.com/itemdrop'
	}
};

export type SiteConfig = typeof siteConfig;
