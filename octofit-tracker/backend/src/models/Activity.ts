import mongoose from 'mongoose';

export interface IActivity {
  user: mongoose.Types.ObjectId;
  type: string;
  durationMinutes: number;
  caloriesBurned: number;
  date: Date;
}

const activitySchema = new mongoose.Schema<IActivity>({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  caloriesBurned: { type: Number, required: true },
  date: { type: Date, required: true }
});

const Activity = mongoose.model<IActivity>('Activity', activitySchema);
export default Activity;
