import { Router } from 'express';
import TeamsController from '../controllers/teams.controller';

const router = Router();

const teamsController = new TeamsController();

router.get('/', teamsController.getAll.bind(teamsController));
router.get('/:id', teamsController.getById.bind(teamsController));

export default router;
