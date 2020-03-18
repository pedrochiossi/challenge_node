import { Router } from 'express';

const { signup, login } = require('../controllers/session.controller');

const router = new Router();

router.post('/login', login);
router.post('/signup', signup);

export default router;
