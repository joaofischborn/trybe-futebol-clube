import Matches from '../database/models/MatchesModel';
import Teams from '../database/models/TeamsModel';
import ILeaderboard from '../interfaces/ILeaderboard';
import IMatch from '../interfaces/IMatch';

export default class LeaderboardService {
  public name: string;
  public totalPoints: number;
  public totalGames: number;
  public totalVictories: number;
  public totalDraws: number;
  public totalLosses: number;
  public goalsFavor: number;
  public goalsOwn: number;
  public goalsBalance: number;
  public efficiency: string | number;
  public result: ILeaderboard[];

  constructor() {
    this.name = '';
    this.totalPoints = 0;
    this.totalGames = 0;
    this.totalVictories = 0;
    this.totalDraws = 0;
    this.totalLosses = 0;
    this.goalsFavor = 0;
    this.goalsOwn = 0;
    this.goalsBalance = 0;
    this.efficiency = 0;
    this.result = [];
  }

  getHomeLeaderboard = async () => {
    this.result = [];
    const matches = await Matches.findAll();
    const teams = await Teams.findAll();
    teams.forEach((team) => {
      this.init();
      matches.forEach((match) => {
        if (match.inProgress === false && team.id === match.homeTeam) {
          this.name = team.teamName;
          this.calculate(match);
        }
      });
      this.add();
    });
    return this.result;
  };

  init = async () => {
    this.totalPoints = 0;
    this.totalGames = 0;
    this.totalVictories = 0;
    this.totalDraws = 0;
    this.totalLosses = 0;
    this.goalsFavor = 0;
    this.goalsOwn = 0;
    this.goalsBalance = 0;
    this.efficiency = 0;
  };

  calculate = async (match: IMatch) => {
    this.totalGames += 1;
    this.goalsFavor += match.homeTeamGoals;
    this.goalsOwn += match.awayTeamGoals;
    this.goalsBalance = this.goalsFavor - this.goalsOwn;
    if (match.homeTeamGoals > match.awayTeamGoals) {
      this.totalPoints += 3;
      this.totalVictories += 1;
    }

    if (match.homeTeamGoals === match.awayTeamGoals) {
      this.totalPoints += 1;
      this.totalDraws += 1;
    }

    if (match.homeTeamGoals < match.awayTeamGoals) {
      this.totalLosses += 1;
    }

    this.efficiency = ((this.totalPoints / (this.totalGames * 3)) * 100).toFixed(2);
  };

  add = async () => {
    const object = {
      name: this.name,
      totalPoints: this.totalPoints,
      totalGames: this.totalGames,
      totalVictories: this.totalVictories,
      totalDraws: this.totalDraws,
      totalLosses: this.totalLosses,
      goalsFavor: this.goalsFavor,
      goalsOwn: this.goalsOwn,
      goalsBalance: this.goalsBalance,
      efficiency: this.efficiency,
    };
    this.result.push(object);
  };
}
