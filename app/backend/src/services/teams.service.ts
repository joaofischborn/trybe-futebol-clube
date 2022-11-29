import ITeams from '../interfaces/ITeams';
import Teams from '../database/models/TeamsModel';

export default class TeamsService {
  getAll = async (): Promise<ITeams[]> => {
    const teams = await Teams.findAll();
    return teams;
  };

  getById = async (id: string): Promise<ITeams | undefined> => {
    const team = await Teams.findOne({ where: { id } });
    if (team) return team;
  };
}
