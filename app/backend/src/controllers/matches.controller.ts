import { Request, Response } from 'express';
import * as jsonwebtoken from 'jsonwebtoken';
import MatchesService from '../services/matches.service';

export default class MatchesController {
  public matchesService = new MatchesService();
  public jwt = jsonwebtoken;

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

  async validateUserToken(req: Request, res: Response) {
    const { authorization } = req.headers;
    if (authorization) {
      this.jwt.verify(authorization, `${process.env.JWT_SECRET as string}`, (error: unknown) => {
        if (error) {
          return res.status(401).json({ message: 'Token must be a valid token' });
        }
        this.insertNewMatch(req, res);
      });
    }
  }

  async insertNewMatch(req: Request, res: Response) {
    const { type, message } = await this.matchesService.insertNewMatch(req.body);
    if (type) return res.status(type).json({ message });
    res.status(201).json(message);
  }

  async finishedMatch(req: Request, res: Response) {
    const { id } = req.params;
    const finished = await this.matchesService.finishedMatch(id);
    if (finished) return res.status(200).json({ message: 'Finished' });
  }

  async updateMatch(req: Request, res: Response) {
    const id = Number(req.params.id);
    const updated = await this.matchesService.updateMatch(id, req.body);
    if (updated) return res.status(200).json({ message: 'Match updated successfully' });
  }
}
