import mongoose, { Document, Model, Schema } from "mongoose";

export interface IAnnouncement extends Document {
  title: string;
  description: string;
}

const AnnouncementSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
  },
  { timestamps: true }
);

const Announcement: Model<IAnnouncement> =
  mongoose.models.Announcement ||
  mongoose.model<IAnnouncement>("Announcement", AnnouncementSchema);

export default Announcement;
