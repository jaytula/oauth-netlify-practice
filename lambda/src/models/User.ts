import { Schema, default as mongoose, Model } from "mongoose";

const userSchema = new Schema({
  name: String,
  email: {
    type: String,
    required: true,
  },
  password: String
});

userSchema.static('build', function(attr: IUser) {
  return new User(attr);
});

interface IUser {
  name?: string;
  email: string;
  password?: string;
};

interface UserDoc extends mongoose.Document {
  _id: string;
  name?: string;
  email: string;
  password?: string;
}

interface UserModelInterface extends Model<UserDoc> {
  build(attr: IUser): UserDoc
}

const User = mongoose.model<UserDoc, UserModelInterface>('User', userSchema)

export { User };