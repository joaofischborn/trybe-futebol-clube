import { Request, Response } from 'express';
import LeaderboardService from '../services/leaderboard.service';

export default class LeaderboardController {
  public leaderboardService = new LeaderboardService();

  async getHome(req: Request, res: Response) {
    const homeLeaderboard = await this.leaderboardService.getHomeLeaderboard();
    if (homeLeaderboard) {
      homeLeaderboard.sort((a, b) => b
        .totalPoints - a.totalPoints || b
        .totalVictories - a.totalVictories || b
        .goalsBalance - a.goalsBalance || b
        .goalsFavor - a.goalsFavor || b
        .goalsOwn - a.goalsOwn);
    }
    return res.status(200).json(homeLeaderboard);
  }
}
