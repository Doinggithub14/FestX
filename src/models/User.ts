import mongoose, { Document, Model, Schema } from "mongoose";

export interface ParticipationHistory {
  eventName: string;
  participatedAt?: Date;
}

export interface IUser extends Document {
  fullName: string;
  email: string;
  password: string;
  college: string;
  year: string;
  degree: string;
  branch: string;
  enrollmentNumber: string;
  phoneNumber: number;
  participationHistory: ParticipationHistory[];
}

const ParticipationHistorySchema: Schema = new Schema({
  eventName: { type: String, required: true },
  participatedAt: { type: Date, default: Date.now },
});

const UserSchema: Schema = new Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    college: { type: String, required: true },
    year: { type: String, required: true },
    degree: { type: String, required: true },
    branch: { type: String, required: true },
    enrollmentNumber: { type: String, required: true, unique: true },
    phoneNumber: { type: Number, required: true },
    participationHistory: {
      type: [ParticipationHistorySchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;
