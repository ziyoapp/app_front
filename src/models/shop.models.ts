import { product, category } from "@/interfaces/shop.interface";

const defaultProduct: product = {
  id: 1,
  name: "Product #1",
  description: "Product description",
  price: 0,
  price_old: 0,
  quantity: 100,
  categories: [
    {
      id: 0,
      name: "Ziyo Forum",
    },
  ],
  images: ["string"],
};

const defaultCategory: category = {
  id: 0,
  name: "Ziyo Forum",
  products_count: 0,
};

export { defaultProduct, defaultCategory };
