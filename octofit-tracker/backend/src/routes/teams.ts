import { Router } from 'express';
import Team from '../models/Team.ts';

const router = Router();

router.get('/', async (_req, res) => {
  try {
    const teams = await Team.find().populate('members');
    res.json(teams);
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch teams' });
  }
});

export default router;
