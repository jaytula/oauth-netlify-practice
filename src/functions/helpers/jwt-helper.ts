export const JWT_PUBLIC_KEY = Buffer.from(
  process.env.JWT_PUBLIC_KEY as string,
  "base64"
).toString("ascii");