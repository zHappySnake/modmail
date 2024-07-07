import dotenv from "dotenv";
import client from "./client";
import database from "./database";
dotenv.config();

database.initialize();
client.login(process.env.TOKEN);
