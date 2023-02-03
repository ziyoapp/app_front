export interface pagination {
  current_page: number;
  from: number;
  last_page: number;
  path: string;
  per_page: number;
  to: number;
  total: number;
}

export interface story {
  id: number;
  title: string;
  preview_img_url: string;
  images: Array<string>;
}
