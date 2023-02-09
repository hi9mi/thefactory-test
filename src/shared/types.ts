export type Photo = {
  id: string;
  alt_description: string;
  links: {
    download: string;
  };
  urls: {
    full: string;
    small: string;
  };
  user: {
    first_name: string;
    last_name: string;
    username: string;
    profile_image: {
      medium: string;
    };
  };
};

export type SearchPhotosResult = {
  results: Photo[];
  total: number;
  total_pages: number;
};
