// place files you want to import through the `$lib` alias in this folder.
import { POCKETBASE_URL } from './api-client';

export const imageurl = (collectionId: string, id: string, field: string) => {
  console.log(collectionId, id, field, `${POCKETBASE_URL}/api/files/${collectionId}/${id}/${field}`);
  return `${POCKETBASE_URL}/api/files/${collectionId}/${id}/${field}`;
};