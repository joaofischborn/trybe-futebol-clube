import { Request, Response } from 'express';
import MatchesService from '../services/matches.service';

export default class MatchesController {
  public matchesService = new MatchesService();

  async getAll(req: Request, res: Response) {
    const matches = await this.matchesService.getAll();
    res.status(200).json(matches);
  }

  async getFilteredMatches(req: Request, res: Response) {
    const query = req.query.inProgress as string;
    if (query) {
      const inProgressMatches = await this.matchesService.getFilteredMatches(query);
      return res.status(200).json(inProgressMatches);
    }
    return this.getAll(req, res);
  }
}
