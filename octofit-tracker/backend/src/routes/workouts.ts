import { Router } from 'express';
import Workout from '../models/Workout.ts';

const router = Router();

router.get('/', async (_req, res) => {
  try {
    const workouts = await Workout.find();
    res.json(workouts);
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch workouts' });
  }
});

export default router;
