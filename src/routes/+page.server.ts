import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ parent }) => {
	// Get data from the layout
	const { personal, skills, experience, education } = await parent();
	
	// Return the data for the page
	// You can add page-specific data loading here if needed
	return {
		personal,
		skills,
		experience,
		education
	};
};
