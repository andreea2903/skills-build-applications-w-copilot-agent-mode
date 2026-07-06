"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const LeaderboardEntry_1 = __importDefault(require("../models/LeaderboardEntry"));
const router = (0, express_1.Router)();
router.get('/', async (_req, res) => {
    try {
        const leaderboard = await LeaderboardEntry_1.default.find().populate('user team');
        res.json(leaderboard);
    }
    catch (error) {
        res.status(500).json({ error: 'Unable to fetch leaderboard entries' });
    }
});
exports.default = router;
