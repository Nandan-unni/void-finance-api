import express, { Express } from "express";
import dotenv from "dotenv";

import Settings from "./settings";
import Middlewares from "./middlewares";
import Routers from "./routers";
import Database from "./database";

import config from "./common/config";
import { logger } from "./common/utils";

dotenv.config();

const PORT = process.env.PORT || 8000;

let app: Express = express();

app = Database(app);
app = Settings(app);
app = Middlewares(app);
app = Routers(app);

// Running server
app.listen(PORT, () => {
  logger.info(`Server running at http://localhost:${PORT}`, config.ENV);
});
