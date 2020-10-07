import { Schema, default as mongoose, Model } from "mongoose";

const userSchema = new Schema({
  name: String,
  email: {
    type: String,
    required: true,
  },
  password: { type: String, required: true },
});

interface IUser {
  name: string;
  email: string;
  password: string;
};

interface UserDoc extends mongoose.Document {
  name: string;
  email: string;
  password: string;
}

interface UserModelInterface extends Model<UserDoc> {
  build(attr: IUser): UserDoc
}

const User = mongoose.model<UserDoc, UserModelInterface>('User', userSchema)

userSchema.statics.build = (attr: IUser) => {
  return new User(attr);
}

export { User };