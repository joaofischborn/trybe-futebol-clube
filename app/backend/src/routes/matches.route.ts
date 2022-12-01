import { Router } from 'express';
import MatchesController from '../controllers/matches.controller';

const matchesController = new MatchesController();

const router = Router();

router.get('/', matchesController.getFilteredMatches.bind(matchesController));
router.get('/', matchesController.getAll.bind(matchesController));

export default router;
