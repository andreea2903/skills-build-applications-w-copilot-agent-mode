import mongoose from 'mongoose';

export interface IUser {
  name: string;
  email: string;
  role: string;
  team?: mongoose.Types.ObjectId;
  goals: string[];
}

const userSchema = new mongoose.Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, required: true },
  team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
  goals: { type: [String], default: [] }
});

const User = mongoose.model<IUser>('User', userSchema);
export default User;
