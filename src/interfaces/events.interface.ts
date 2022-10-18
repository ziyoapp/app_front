import { pagination } from "@/interfaces/common.interface";

export interface label {
  code: string;
  name: string;
}

export interface event {
  id: number;
  labels: Array<label>;
  type: string;
  title: string;
  description: string;
  image_url: string;
  date_start: string;
  date_end: string;
  published_at: string;
  address: string;
  ball: number;
  content: string;
  price_ball: number;
  register_count: number;
  schedule_text: string;
  subscribed: boolean;
}

export interface eventsGetRequest {
  limit?: number;
  page?: number;
  per_page?: number;
}

export interface eventsState {
  shortList: Array<event>;
  list: Array<event>;
  eventError: string;
  pagination: pagination;
  event: event;
}
