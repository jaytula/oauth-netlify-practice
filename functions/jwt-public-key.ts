import { JWT_PUBLIC_KEY } from "./helpers/jwt-helper";

export const handler = event => {
  return {
    statusCode: 200,
    body: JWT_PUBLIC_KEY,
  };
};
