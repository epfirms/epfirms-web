import { Database } from '@src/core/Database';
import { Service } from 'typedi';

@Service()
export class BetaSignupService {
  public async create(contactDetails: any): Promise<any> {
    try {
      await Database.models.beta_signup.create(contactDetails);
      return Promise.resolve(true);
    } catch (err) {
      console.error(err);
    }
  }
}
