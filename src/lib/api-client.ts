// Environment variables (will be replaced by Vite at build time)
export const POCKETBASE_URL = import.meta.env.VITE_POCKETBASE_URL || 'https://awspb.mayankjoshi.in';
export const MASTER_EMAIL = import.meta.env.VITE_MASTER_BUILDER_EMAIL || '';
export const MASTER_PASSWORD = import.meta.env.VITE_MASTER_BUILDER_PASSWORD || '';

export interface EmailPasswordLoginResponse {
    record: UserRecord;
    token:  string;
}

export interface UserRecord {
    avatar:          string;
    collectionId:    string;
    collectionName:  string;
    created:         Date;
    email:           string;
    emailVisibility: boolean;
    id:              string;
    name:            string;
    updated:         Date;
    verified:        boolean;
}

interface ListResult<T> {
    page: number;
    perPage: number;
    totalItems: number;
    totalPages: number;
    items: T[];
}

export class ApiClient {
    private static instance: ApiClient;

    // Singleton pattern to ensure only one instance exists
    public static getInstance(): ApiClient {
        if (!ApiClient.instance) {
            ApiClient.instance = new ApiClient();
        }
        return ApiClient.instance;
    }

    // Helper method to make HTTP requests
    private async makeRequest(
        endpoint: string, 
        options: RequestInit = {}
    ): Promise<Response> {
        const url = `${POCKETBASE_URL}/api${endpoint}`;
        
        let headers: HeadersInit = {
            'Content-Type': 'application/json',
            ...options.headers
        };

        // Add auth token if available
        headers = {
            ...headers,
            email: MASTER_EMAIL
        };

        console.log('POCKETBASE_URL', POCKETBASE_URL);
        console.log('url', url);
        console.log('options', options);
        console.log('headers', headers);

        const response = await fetch(url, {
            ...options,
            headers
        });

        if (!response.ok) {
            const errorText = await response.text();
            let errorMessage = `HTTP ${response.status}: ${response.statusText}`;
            
            try {
                const errorData = JSON.parse(errorText);
                errorMessage = errorData.message || errorMessage;
            } catch {
                // If error response is not JSON, use the text
                errorMessage = errorText || errorMessage;
            }
            
            throw new Error(errorMessage);
        }

        return response;
    }

    public async saveContactMeDetails(data: Record<string, string>) {
        const response = await this.makeRequest('/collections/contact_me/records', {
        // const response = await this.makeRequest('/collections/users/records', {
            method: 'POST',
            body: JSON.stringify(data)
            // body: JSON.stringify({
            //     "email": "mayankjoshi1325@gmail.com",
            //     "emailVisibility": true,
            //     "name": "test",
            //     "password": "12345678",
            //     "passwordConfirm": "12345678"
            // })
        });


        // if (response.ok) {
        //     // /api/collections/users/request-otp
        //     const otpResponse = await this.makeRequest('/collections/users/request-otp', {
        //         method: 'POST',
        //         // body: JSON.stringify(data)
        //         body: JSON.stringify({
        //             "email": "mayankjoshi1325@gmail.com"
        //         })
        //     });

        //     if (otpResponse.ok) {
        //         console.log('OTP sent successfully');
        //     } else {
        //         console.error('Failed to send OTP');
        //     }
    
        // }


        return await response.json();
    }

    // CRUD operations
    public async getList<T>(
        collection: string, 
        page: number = 1, 
        perPage: number = 50, 
        filters: Record<string, string> = {}
    ): Promise<T[]> {
        const params = new URLSearchParams({
            page: page.toString(),
            perPage: perPage.toString()
        });

        // Add filters as query parameters
        Object.entries(filters).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                params.append(key, value.toString());
            }
        });

        const response = await this.makeRequest(`/collections/${collection}/records?${params}`);
        const result: ListResult<T> = await response.json();
        return result.items;
    }

    public async getFullList<T>(collection: string, filters: Record<string, string> = {}): Promise<T[]> {
        const params = new URLSearchParams();

        // Add filters as query parameters
        Object.entries(filters).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                params.append(key, value.toString());
            }
        });

        const response = await this.makeRequest(`/collections/${collection}/records?${params}`);
        const result: ListResult<T> = await response.json();
        
        // If there are more pages, fetch them all
        let allItems = [...result.items];
        
        for (let page = 2; page <= result.totalPages; page++) {
            const pageParams = new URLSearchParams(params);
            pageParams.set('page', page.toString());
            
            const pageResponse = await this.makeRequest(`/collections/${collection}/records?${pageParams}`);
            const pageResult: ListResult<T> = await pageResponse.json();
            allItems = [...allItems, ...pageResult.items];
        }
        
        return allItems;
    }
    
    public async getFirstListItem<T>(collection: string, filter: string = ''): Promise<T> {
        const params = new URLSearchParams({
            perPage: '1'
        });

        if (filter) {
            params.append('filter', filter);
        }

        const response = await this.makeRequest(`/collections/${collection}/records?${params}`);
        const result: ListResult<T> = await response.json();
        
        if (result.items.length === 0) {
            throw new Error(`No records found in collection "${collection}"`);
        }
        
        return result.items[0];
    }

    public async getOne<T>(collection: string, id: string, expand: string = ''): Promise<T> {
        const params = new URLSearchParams();
        if (expand) {
            params.append('expand', expand);
        }

        const queryString = params.toString() ? `?${params}` : '';
        const response = await this.makeRequest(`/collections/${collection}/records/${id}${queryString}`);
        return await response.json();
    }

    public async create<T>(collection: string, data: Record<string, unknown>): Promise<T> {
        const response = await this.makeRequest(`/collections/${collection}/records`, {
            method: 'POST',
            body: JSON.stringify(data)
        });
        return await response.json();
    }

    public async update<T>(collection: string, id: string, data: Record<string, unknown>): Promise<T> {
        const response = await this.makeRequest(`/collections/${collection}/records/${id}`, {
            method: 'PATCH',
            body: JSON.stringify(data)
        });
        return await response.json();
    }

    public async delete(collection: string, id: string): Promise<void> {
        await this.makeRequest(`/collections/${collection}/records/${id}`, {
            method: 'DELETE'
        });
    }

    public async getPersonalData() {
        const records = await this.getFullList('personal_details', {
            expand: 'soceial_media,userid',
            // fields: 'id,name,email_id,phone_number,address,one_liner,about_me,typewrite_options,avatar,soceial_media.name,userid.name,userid.email,created,updated'
        });
        return records;
    }

    public async getEducationData () {
        const records = await this.getFullList('education_details', {
            // fields: 'id,name,email_id,phone_number,address,one_liner,about_me,typewrite_options,avatar,soceial_media.name,userid.name,userid.email,created,updated'
        });
        return records;
    }

    // Helper method for file URLs (keeping the same as your existing implementation)
    public getFileUrl(record: { id: string; collectionId: string; [key: string]: unknown }, field: string): string {
        if (!record || !record.id || !record.collectionId || !record[field]) {
            return '';
        }
        return `${POCKETBASE_URL}/api/files/${record.collectionId}/${record.id}/${record[field]}`;
    }

    // Backward compatibility - return self to match PocketBase interface
    public getPocketBase() {
        return this;
    }

    public async confirmEmailVerification(token: string): Promise<void> {
        await this.makeRequest('/collections/users/confirm-verification', {
            method: 'POST',
            body: JSON.stringify({
                token: token
            })
        });
        
        // If the response is successful, we don't need to return anything
        // PocketBase returns an empty response on successful verification
        return;
    }

}

// Export a default instance for convenience
export const pb = ApiClient.getInstance(); 