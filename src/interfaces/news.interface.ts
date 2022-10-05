import { pagination } from "@/interfaces/common.interface";

export interface news {
  id: number;
  title: string;
  description: string;
  content: string;
  image_url: string;
  published_at: string;
}

export interface newsGetRequest {
  limit?: number;
  page?: number;
  per_page?: number;
}

export interface newsState {
  shortList: Array<news>;
  list: Array<news>;
  newsError: string;
  pagination: pagination;
  oneNews: news;
}
