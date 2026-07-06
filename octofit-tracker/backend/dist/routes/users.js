import { Router } from 'express';
import User from '../models/User';
const router = Router();
router.get('/', async (_req, res) => {
    try {
        const users = await User.find().populate('team');
        res.json(users);
    }
    catch (error) {
        res.status(500).json({ error: 'Unable to fetch users' });
    }
});
export default router;
