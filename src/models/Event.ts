import mongoose, { Document, Model, Schema } from "mongoose";

export interface IEvent extends Document {
  eventName: string;
  clubName: string;
  registrationFee: number;
  image: string;
  description: string;
  endDate: Date;
  venue: string;
  time: string;
  date: Date;
  registrations: {
    user: mongoose.Schema.Types.ObjectId;
    registeredAt: Date;
  }[];
}

const EventSchema: Schema = new Schema(
  {
    eventName: { type: String, required: true },
    clubName: { type: String, required: true },
    registrationFee: { type: Number, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
    endDate: { type: Date, required: true },
    venue: { type: String, required: true },
    time: { type: String, required: true },
    date: { type: Date, required: true },
    registrations: {
      type: [
        {
          user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
          registeredAt: { type: Date, default: Date.now },
        },
      ],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const Event: Model<IEvent> =
  mongoose.models.Event || mongoose.model<IEvent>("Event", EventSchema);

export default Event;
