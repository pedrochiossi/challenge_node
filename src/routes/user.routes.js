import { Router } from 'express';
import UserController from '../controllers/user.controller';

const router = new Router();

router.post('/cpf', UserController.addCpf);
router.post('/full-name', UserController.addNames);
router.post('/birthday', UserController.addBirthday);
router.post('/phone-number', UserController.addPhoneNumber);
router.post('/address', UserController.addAddress);
router.post('/amount-requested', UserController.addRequestedAmount);

export default router;
