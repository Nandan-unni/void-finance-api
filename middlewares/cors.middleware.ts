import cors from "cors";
import { CORS_WHITELIST } from "../common/constants";

const corsMiddleware = cors({
  origin: (
    requestOrigin: string | undefined,
    callback: (err: Error | null, allow?: boolean) => void
  ): void => {
    if (requestOrigin && CORS_WHITELIST.indexOf(requestOrigin) === -1) {
      const message: string = `CORS ERROR: Access denied for ${requestOrigin}`;
      return callback(new Error(message), false);
    }
    return callback(null, true);
  },
  credentials: true,
});

export default corsMiddleware;
