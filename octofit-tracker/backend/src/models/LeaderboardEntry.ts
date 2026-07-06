import mongoose from 'mongoose';

export interface ILeaderboardEntry {
  user?: mongoose.Types.ObjectId;
  team?: mongoose.Types.ObjectId;
  points: number;
  rank: number;
}

const leaderboardEntrySchema = new mongoose.Schema<ILeaderboardEntry>({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
  points: { type: Number, required: true },
  rank: { type: Number, required: true }
});

const LeaderboardEntry = mongoose.model<ILeaderboardEntry>('LeaderboardEntry', leaderboardEntrySchema);
export default LeaderboardEntry;
