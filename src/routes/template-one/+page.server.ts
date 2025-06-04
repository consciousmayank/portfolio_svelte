import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ parent }) => {
    // Get data from parent layout
    const { personal, skills, experience, education } = await parent();
    
    // You can now use the data from layout.server.ts
    // You can also add page-specific data here if needed
    
    return {
        // Pass through the parent data
        personal,
        skills,
        experience,
        education,
        // Add any page-specific data here
        pageTitle: 'Template One'
    };
};


