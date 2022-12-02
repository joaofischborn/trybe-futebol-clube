import { Router } from 'express';
import MatchesController from '../controllers/matches.controller';

const matchesController = new MatchesController();

const router = Router();

router.get('/', matchesController.getFilteredMatches.bind(matchesController));
router.get('/', matchesController.getAll.bind(matchesController));
router.post('/', matchesController.validateToken.bind(matchesController));
router.patch('/:id/finish', matchesController.finishedMatch.bind(matchesController));
router.patch('/:id', matchesController.updateMatch.bind(matchesController));

export default router;
