import mongoose from 'mongoose';
const workoutSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    difficulty: { type: String, required: true },
    description: { type: String, required: true }
});
const Workout = mongoose.model('Workout', workoutSchema);
export default Workout;
