export interface Image {
  id: string;
  urls: {
    small: string;
    regular: string;
  };
  alt_description?: string;
  likes: number;
  user: {
    username: string;
    name: string;
  };
}
