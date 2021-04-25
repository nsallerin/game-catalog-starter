import * as mongo from "mongodb";
import * as dotenv from "dotenv";

dotenv.config();

let databaseUrl = process.env.MONGO_URL || "";
const options = { useNewUrlParser: true, useUnifiedTopology: true };

if (process.env.HEROKU_APP_NAME) {
  const url = new URL(databaseUrl)
  url.pathname = `${process.env.HEROKU_APP_NAME}-${url.pathname.slice(1)}`
  databaseUrl = url.toString();
}

export function initDB(): Promise<mongo.MongoClient> {
  return mongo.MongoClient.connect(databaseUrl, options);
}
