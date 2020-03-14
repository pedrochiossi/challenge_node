import { Router } from 'express';
import authRoutes from '../routes/auth.routes';
import userRoutes from '../routes/user.routes';

const router  = new Router();

router.use('/auth', authRoutes);
router.use('/user', userRoutes);


export default router;


