import { Database } from '@src/core/Database';

export class LegalAreaService {
  public static async create(legalArea): Promise<any> {
    const { legal_area } = Database.models;
    const newLegalArea = await legal_area.create(legalArea);

    return Promise.resolve(newLegalArea);
  }

  public static async getAll(firmId: number): Promise<any> {
    try {
      const { legal_area } = Database.models;
      const allLegalAreas = await legal_area.findAll({ where: { firm_id: firmId } });

      return Promise.resolve(allLegalAreas);
    } catch (err) {
      console.error(err);
    }
  }

  public static async delete(id: number): Promise<any> {
    const { legal_area } = Database.models;
    const deletedLegalArea = await legal_area.destroy({where: {id}});

    return Promise.resolve(deletedLegalArea);
  }
}
