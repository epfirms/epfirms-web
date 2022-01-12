import { Database } from '@src/core/Database';
import { Service } from 'typedi';

@Service()
export class FirmRoleService {
  private defaultRoles = ['attorney', 'associate attorney', 'paralegal', 'legal assistant', 'receptionist', 'office manager', 'other'];
  
  constructor() {}

  /**
   * Creates default roles for a newly created firm.
   *
   * @remarks
   * This method should only be used on creation of a firm.
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
        const roleCount = await currentFirm.countFirm_role();
        if (roleCount <= 0) {
          for (const role of this.defaultRoles) {
            await currentFirm.createFirm_role({ name: role });
          }

          const addedRoles = await currentFirm.getFirm_role({attributes: ['id', 'name']});
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

    /**
   * Gets a list of roles for a specified firm.
   *
   * @param firmId
   * @returns Roles belonging to a firm
   *
   */
     public async get(firmId: number): Promise<any> {
      try {
        const { firm } = Database.models;
        const currentFirm = await firm.findByPk(firmId);
  
        if (currentFirm) {
            const roles = await currentFirm.getFirm_role({attributes: ['id', 'name']});
            return Promise.resolve(roles);
        } else {
          return Promise.reject(new Error('Firm not found'));
        }
      } catch (err) {
        console.error(err);
      }
    }
}
