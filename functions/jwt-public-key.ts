const JWT_PUBLIC_KEY = Buffer.from(
  process.env.JWT_PUBLIC_KEY,
  "base64"
).toString("ascii");

export const handler = event => {
  return {
    statusCode: 200,
    body: JWT_PUBLIC_KEY,
  };
};
