"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const leaderboardEntrySchema = new mongoose_1.default.Schema({
    user: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User' },
    team: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Team' },
    points: { type: Number, required: true },
    rank: { type: Number, required: true }
});
const LeaderboardEntry = mongoose_1.default.model('LeaderboardEntry', leaderboardEntrySchema);
exports.default = LeaderboardEntry;
