import mongoose, { Schema } from 'mongoose';

export interface IMessage {
  roomId: mongoose.Types.ObjectId;
  senderId: mongoose.Types.ObjectId;
  body: string;
}

const messageSchema = new Schema<IMessage>(
  {
    roomId: { type: Schema.Types.ObjectId, ref: 'Room', required: true },
    senderId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    body: { type: String, required: true }
  },
  {
    timestamps: true,
    toJSON: {
      transform: (_doc, ret: Record<string, any>) => {
        ret.id = ret._id.toString();
        ret.sender = ret.senderId;
        delete ret._id;
        delete ret.senderId;
        delete ret.__v;
      }
    }
  }
);

export default mongoose.model<IMessage>('Message', messageSchema);
