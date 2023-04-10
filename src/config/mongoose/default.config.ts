export default {
  id: "default",
  url: process.env.DB_DEFAULT_URL || "mongodb://localhost:27017/newsdb",
  connectionOptions: { }
};
