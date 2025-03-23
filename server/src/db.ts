import { Client } from "pg";
import dotenv from "dotenv";

dotenv.config();

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

client.connect()
  .then(() => console.log("PostgreSQL підключено"))
  .catch(err => console.error("Помилка підключення до БД", err));

export default client;
