import { Express } from "express";
import mongoose from "mongoose";
import { logger } from "../common/utils";

const Database = (app: Express) => {
  const MONGODB_URI = process.env.MONGODB_URI || "";
  mongoose
    .connect(MONGODB_URI)
    .then((mg) => {
      logger.info("Database connection successful");
      logger.data({ DB: mg.connection.db.databaseName }, "mongoose.connect()");
    })
    .catch((error) => {
      logger.info("Database connection failed");
      logger.error(error, "mongoose.connect()");
    });
  return app;
};

export default Database;
