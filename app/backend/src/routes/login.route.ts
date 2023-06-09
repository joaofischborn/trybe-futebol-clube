import { Router } from 'express';
import LoginController from '../controllers/login.controller';

const router = Router();

const loginController = new LoginController();

router.post('/', loginController.login.bind(loginController));
router.get('/validate', loginController.validateToken.bind(loginController));

export default router;
