import mongoose from 'mongoose';

export interface IWorkout {
  name: string;
  category: string;
  durationMinutes: number;
  difficulty: string;
  description: string;
}

const workoutSchema = new mongoose.Schema<IWorkout>({
  name: { type: String, required: true },
  category: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  difficulty: { type: String, required: true },
  description: { type: String, required: true }
});

const Workout = mongoose.model<IWorkout>('Workout', workoutSchema);
export default Workout;
