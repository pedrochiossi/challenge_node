import { Router } from 'express';
import jwt from 'jsonwebtoken';
import authRoutes from './auth.routes';
import userRoutes from './user.routes';

const router = new Router();

const verifyToken = () => (req, res, next) => {
  const { token } = req.body;
  if (!token) {
    res.status(401).json({ error: 'token was not sent' });
    return;
  }
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: payload.id };
    next();
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};

router.use('/auth', authRoutes);

router.use(verifyToken());

router.use('/user', userRoutes);


export default router;
