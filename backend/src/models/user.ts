import mongoose from "mongoose";

import bcrypt from "bcryptjs";

type UserType = {
  _id: string;
  name: string;
  username: string;
  email: string;
  password: string;
};

const UserSchema = new mongoose.Schema<UserType>({
  name: { type: String, required: [true, "Name is required"] },
  username: {
    type: String,
    unique: true,
    required: [true, "UserName is required"],
  },
  email: { type: String, unique: true, required: [true, "Email is required"] },
  password: { type: String, required: [true, "Password is required"] },
});

UserSchema.pre("save", function (next) {
  if (this.isModified("password")) {
    this.password = bcrypt.hashSync(this.password, 10);
    next();
  }
});

const User = mongoose.model<UserType>("User", UserSchema);
export default User;
