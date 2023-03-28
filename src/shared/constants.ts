const BLOCK_TYPES: Array<string> = ["news", "events", "exercises", "goods"];

const BLOCK_TYPES_RECORD: Record<string, string> = {
  news: "news",
  events: "events",
  exercises: "exercises",
  goods: "goods",
  tasks: "tasks",
};

const USER_ROLES: Record<string, number> = {
  ADMIN: 1,
  MODERATOR: 2,
  USER: 3,
};

const TOKEN_KEY = "reservation_token";
const PUSH_TOKEN_KEY = "reservation_token";
const REFRESH_TOKEN_KEY = "refresh_token";

export {
  BLOCK_TYPES,
  BLOCK_TYPES_RECORD,
  USER_ROLES,
  TOKEN_KEY,
  PUSH_TOKEN_KEY,
  REFRESH_TOKEN_KEY,
};
