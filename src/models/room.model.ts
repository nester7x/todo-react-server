import mongoose, { Schema } from 'mongoose';

export interface IRoom {
  id: string;
  name: string;
  isDirectMessage: boolean;
  owner: mongoose.Types.ObjectId;
  members: mongoose.Types.ObjectId[];
}

const roomSchema = new Schema<IRoom>(
  {
    name: {
      type: String,
      required: true
    },
    isDirectMessage: { type: Boolean, default: false },
    owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }]
  },
  {
    timestamps: true,
    toJSON: {
      transform: (_doc, ret: Record<string, any>) => {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
      }
    }
  }
);

export default mongoose.model<IRoom>('Room', roomSchema);
