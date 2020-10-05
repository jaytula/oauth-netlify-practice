import mongoose, { Mongoose } from 'mongoose';
const MONGODB_URI = process.env.MONGODB_URI as string;

let cachedDb: Mongoose | null = null;

export const connectToDatabase = (uri: string = MONGODB_URI) => {
  if(cachedDb)  {
    return Promise.resolve(cachedDb)
  }

  return mongoose.connect(uri).then(db => {
    cachedDb = db;
    return cachedDb;
  })
}