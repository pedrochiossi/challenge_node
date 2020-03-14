import { Router } from 'express';
import SessionController from '../controllers/session.controller';

const router = new Router();

router.post('/login', SessionController.login);
router.post('/signup', SessionController.signup);

export default router;



