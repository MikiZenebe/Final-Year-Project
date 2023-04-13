import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: String, required: true, default: true },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.models("User", UserSchema);
export default User;
