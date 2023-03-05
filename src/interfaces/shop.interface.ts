import { pagination } from "@/interfaces/common.interface";

export interface category {
  id: number;
  name: string;
  products_count?: number;
}

export interface product {
  id: number;
  name: string;
  description: string;
  price: number;
  price_old: number;
  quantity: number;
  categories: Array<category>;
  images?: Array<string>;
  image_url?: string;
}

export interface productsRequest {
  page?: number;
  per_page?: number;
  category_id: number;
  isInfiniteScroll?: boolean;
}

export interface shopState {
  oneProduct: product;
  products: Array<product>;
  popularProducts: Array<product>;
  productsRandom: Array<product>;
  category: category;
  categories: Array<category>;
  pagination: pagination;
  shopError: string;
}
