import jwt from "jsonwebtoken";

const jwtEncode = (payload: any) => {
  const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "";
  return jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: "28d" });
};

const jwtDecode = (token: string) => {
  const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "";
  return jwt.verify(token, JWT_SECRET_KEY);
};

export const jwtAuth = {
  encode: jwtEncode,
  decode: jwtDecode,
};
