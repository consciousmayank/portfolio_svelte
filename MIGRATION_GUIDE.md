# Migration from PocketBase Library to Direct REST API

This guide explains the migration from using the PocketBase JavaScript library to making direct REST API calls to your PocketBase backend.

## What Changed

### Files Modified
- `src/lib/pocketbase.ts` → `src/lib/api-client.ts` (complete rewrite)
- `src/lib/index.ts` - Updated import
- `src/routes/+layout.server.ts` - Updated import
- `src/routes/+page.svelte` - Updated import  
- `src/routes/auth/callback/+page.svelte` - Updated import
- `src/hooks.server.ts` - Updated import and method calls
- `src/app.d.ts` - Updated type definitions
- `package.json` - Removed PocketBase dependency

### Key Benefits
1. **Reduced Bundle Size**: No longer need to include the PocketBase library (~50KB)
2. **Better Control**: Direct control over HTTP requests and error handling
3. **Transparency**: See exactly what API calls are being made
4. **Flexibility**: Easier to customize request behavior

## API Changes

### Authentication
```typescript
// Before (PocketBase library)
import PocketBase from 'pocketbase';
const pb = new PocketBase('http://your-pocketbase-url');
await pb.collection('users').authWithPassword(email, password);

// After (Direct API)
import { pb } from '$lib/api-client';
await pb.loginWithPassword(email, password);
```

### Data Fetching
```typescript
// Before
const records = await pb.collection('posts').getFullList();

// After  
const records = await pb.getFullList('posts');
```

### CRUD Operations
```typescript
// Before
await pb.collection('posts').create(data);
await pb.collection('posts').update(id, data);
await pb.collection('posts').delete(id);

// After (same interface)
await pb.create('posts', data);
await pb.update('posts', id, data);
await pb.delete('posts', id);
```

## New Features

### Enhanced Error Handling
The new API client provides better error messages by parsing PocketBase error responses.

### Persistent Authentication
Authentication state is automatically saved to localStorage and restored on page reload.

### Type Safety
Better TypeScript support with generic methods:
```typescript
const posts = await pb.getFullList<PostType>('posts');
```

## Migration Steps

1. **Install dependencies**: `npm install` (PocketBase library is now removed)
2. **Test authentication**: Verify login still works with your credentials
3. **Test data fetching**: Ensure all your collections are loading correctly
4. **Check OAuth flows**: If using OAuth, test the complete authentication flow

## Environment Variables

The same environment variables are still used:
- `VITE_POCKETBASE_URL` - Your PocketBase instance URL
- `VITE_MASTER_BUILDER_EMAIL` - Auto-login email (optional)
- `VITE_MASTER_BUILDER_PASSWORD` - Auto-login password (optional)

## Debugging

To debug API calls, check the browser's Network tab to see the actual HTTP requests being made to your PocketBase instance.

## Rollback Plan

If you need to rollback to the PocketBase library:
1. Run: `npm install pocketbase@^0.26.0`
2. Restore the original `src/lib/pocketbase.ts` file
3. Revert the import changes in all files
4. Restore the original `src/app.d.ts` types

## Support

The new API client maintains the same interface as your original PocketBase wrapper, so existing code should work without changes. 