import Matches from '../database/models/MatchesModel';
import Teams from '../database/models/TeamsModel';

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
}
