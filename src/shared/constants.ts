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

export { BLOCK_TYPES, BLOCK_TYPES_RECORD, USER_ROLES };
