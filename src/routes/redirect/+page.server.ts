import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url }) => {
    // Get the hash from the URL (though it won't be available server-side)
    // We'll handle this client-side instead
    
    // For now, just return the URL info so the client can process it
    return {
        url: url.href,
        hash: url.hash || ''
    };
}; 