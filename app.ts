import express, { Express } from "express";
import dotenv from "dotenv";

import Settings from "./settings";
import Middlewares from "./middlewares";
import Routers from "./routers";

dotenv.config();

const PORT = process.env.PORT || 8000;

let app: Express = express();

app = Settings(app);
app = Middlewares(app);
app = Routers(app);

// Running server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
