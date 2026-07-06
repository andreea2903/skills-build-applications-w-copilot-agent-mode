import mongoose from 'mongoose';
const leaderboardEntrySchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
    points: { type: Number, required: true },
    rank: { type: Number, required: true }
});
const LeaderboardEntry = mongoose.model('LeaderboardEntry', leaderboardEntrySchema);
export default LeaderboardEntry;
