import { Request, Response } from 'express';
import TeamsService from '../services/teams.service';

export default class TeamsController {
  public teamsService = new TeamsService();
  //
  async getAll(req: Request, res: Response) {
    const teams = await this.teamsService.getAll();
    res.status(200).json(teams);
  }

  async getById(req: Request, res: Response) {
    const team = await this.teamsService.getById(req.params.id);
    if (team) return res.status(200).json(team);
    res.status(400).end();
  }
}
