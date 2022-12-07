import IMatches from '../interfaces/IMatches';
import Matches from '../database/models/MatchesModel';
import Teams from '../database/models/TeamsModel';
import IMatchesUpdate from '../interfaces/IMatchesUpdate';

export default class MatchesService {
  getAll = async () => {
    const matches = await Matches.findAll({ include: [
      { model: Teams, as: 'teamHome', attributes: { exclude: ['id'] } },
      { model: Teams, as: 'teamAway', attributes: { exclude: ['id'] } },
    ],
    });
    return matches;
  };

  getFilteredMatches = async (query: string) => {
    if (query === 'true') {
      const inProgress = await Matches.findAll({ where: { inProgress: true },
        include: [
          { model: Teams, as: 'teamHome', attributes: { exclude: ['id'] } },
          { model: Teams, as: 'teamAway', attributes: { exclude: ['id'] } },
        ],
      });
      return inProgress;
    } if (query === 'false') {
      const noProgress = await Matches.findAll({ where: { inProgress: false },
        include: [
          { model: Teams, as: 'teamHome', attributes: { exclude: ['id'] } },
          { model: Teams, as: 'teamAway', attributes: { exclude: ['id'] } },
        ],
      });
      return noProgress;
    }
  };

  insertNewMatch = async (body: IMatches) => {
    const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = body;
    if (homeTeam === awayTeam) {
      return { type: 422, message: 'It is not possible to create a match with two equal teams' };
    }

    const home = await this.findById(homeTeam);
    const away = await this.findById(awayTeam);

    if (!home || !away) return { type: 404, message: 'There is no team with such id!' };

    const newMatch = await Matches.create({
      homeTeam, homeTeamGoals, awayTeam, awayTeamGoals, inProgress: true });
    return { type: null, message: newMatch };
  };

  finishedMatch = async (id: string) => {
    const finished = await Matches.update({ inProgress: false }, { where: { id } });
    return finished;
  };

  findById = async (id: string | number) => {
    const match = await Matches.findOne({ where: { id } });
    return match;
  };

  updateMatch = async (id: number, body: IMatchesUpdate) => {
    const { homeTeamGoals, awayTeamGoals } = body;
    const updated = await Matches.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });
    return updated;
  };
}
