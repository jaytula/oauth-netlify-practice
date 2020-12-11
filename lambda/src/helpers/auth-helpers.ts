import { User } from "../models/User";
import { connectToDatabase } from "./db-helpers";
import { createJwtPayload, createJwtCookieFromPayload, decodeJwtPayload } from "./jwt-helpers-instance";

export const authWithEmail = async (email: string) => {
  await connectToDatabase();

  let existingUser = await User.findOne({ email });

  if (!existingUser) {
    const newUser = User.build({
      email,
    });

    existingUser = await newUser.save();
  }

  if(!existingUser) {
    throw new Error('existingUser should not be null');
  }
  
  const jwtPayload = createJwtPayload(existingUser._id, email);
  const jwtCookie = createJwtCookieFromPayload(jwtPayload);

  const payload = decodeJwtPayload(jwtPayload);

  const searchParams = new URLSearchParams();
  searchParams.append('userId', existingUser._id);
  searchParams.append('email', existingUser.email);
  searchParams.append('iat', payload.iat.toString());
  searchParams.append('exp', payload.exp.toString());

  return {
    statusCode: 302,
    headers: {
      "Content-Type": "application/json",
      "Set-Cookie": jwtCookie,
      "Location": `/profile?${searchParams.toString()}`
    },
    body: JSON.stringify({ existingUser, jwtCookie, payload }, null, 2),
  };
}