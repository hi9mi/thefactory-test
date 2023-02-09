import type { Photo, SearchPhotosResult } from './types';

const baseURL = 'https://api.unsplash.com/photos';
const photosCount = '8';

export const getRandomPhotos = async () => {
  const url = new URL('photos/random', baseURL);
  url.searchParams.append('count', photosCount);
  url.searchParams.append('client_id', import.meta.env.VITE_UNSPLASH_CLIENT_ID);

  const res = await fetch(url.toString());

  return res.json() as Promise<Photo[]>;
};

export const searchPhotos = async (term: string, page: number) => {
  const url = new URL('/search/photos', baseURL);
  url.searchParams.append('query', term);
  url.searchParams.append('page', page.toString())
  url.searchParams.append('client_id', import.meta.env.VITE_UNSPLASH_CLIENT_ID);
  const res = await fetch(url.toString());

  return res.json() as Promise<SearchPhotosResult>;
};

export const getPhotoDetails = async (id: string) => {
  const url = new URL(`/photos/${id}`, baseURL);
  url.searchParams.append('client_id', import.meta.env.VITE_UNSPLASH_CLIENT_ID);

  const res = await fetch(url.toString());

  return res.json() as Promise<Photo>;
};
