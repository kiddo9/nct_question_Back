import dotenv from "dotenv";
dotenv.config();
import "./config/databases.js";
import express from "express";
const server = express();
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import routers from "./src/routes/admin.js";
import cronJobs from "./src/cron/cronjobs.js";

async function setupAndStartServer() {
  server.use(
    cors({
      origin:
        process.env.APP_MODE !== "production"
          ? [process.env.LOCAL_ORIGIN, process.env.NGINX_LOCAL_ORIGIN]
          : [process.env.PROD_ORIGIN, process.env.NGINX_PROD_ORIGIN],
      credentials: true,
      methods: ["POST", "GET", "PUT", "DELETE", "PATCH", "OPTIONS"],
    })
  );
  server.use(express.json());
  server.use(bodyParser.json());
  server.use(cookieParser());
  server.use(express.urlencoded({ extended: true }));
  server.use(bodyParser.urlencoded({ extended: true }));

  server.use("/u/", routers);

  cronJobs();
  server.listen(`${process.env.PORT}`);
}

await setupAndStartServer();
