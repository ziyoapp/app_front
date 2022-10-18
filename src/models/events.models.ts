import { event } from "@/interfaces/events.interface";

const defaultEvent: event = {
  address: "",
  ball: 0,
  content: "",
  price_ball: 0,
  register_count: 0,
  schedule_text: "",
  id: 1,
  labels: [
    {
      code: "",
      name: "",
    },
  ],
  type: "",
  title: "",
  description: "",
  image_url: "",
  date_start: "",
  date_end: "",
  published_at: "",
  subscribed: false,
};

export { defaultEvent };
