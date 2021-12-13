import { Database } from '@src/core/Database';
import { Service } from 'typedi';

@Service()
export class FirmRoleService {
  private defaultRoles = ['admin', 'attorney', 'paralegal', 'legal assistant', 'secretary', 'other'];
  
  constructor() {}

  /**
   * Creates default roles for a newly created firm.
   *
   * @remarks
   * This method should
   *
   * @param firmId
   * @returns The newly created roles
   *
   */
  public async initDefault(firmId: number): Promise<any> {
    try {
      const { firm } = Database.models;
      const currentFirm = await firm.findByPk(firmId);

      if (currentFirm) {
        const roleCount = await currentFirm.countFirm_roles();
        if (roleCount <= 0) {
          for (const role of this.defaultRoles) {
            await currentFirm.createFirm_role({ name: role });
          }

          const addedRoles = await currentFirm.getFirm_roles();
          return Promise.resolve(addedRoles);
        }

        return Promise.reject(new Error('Roles not empty'));
      } else {
        return Promise.reject(new Error('Firm not found'));
      }
    } catch (err) {
      console.error(err);
    }
  }
}
