import { Router } from 'express';
import LeaderboardEntry from '../models/LeaderboardEntry.ts';

const router = Router();

router.get('/', async (_req, res) => {
  try {
    const leaderboard = await LeaderboardEntry.find().populate('user team');
    res.json(leaderboard);
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch leaderboard entries' });
  }
});

export default router;
