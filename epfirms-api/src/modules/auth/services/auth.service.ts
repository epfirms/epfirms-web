import { Database } from '@src/core/Database';
import { UserService } from '@src/modules/user/services/user.service';
import { Service } from 'typedi';
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('@configs/vars');

export interface AccessToken {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  client_access: any;
  firm_access: any;
}

@Service()
export class AuthService {
  constructor(private _userService: UserService) {

  }
  public async validate(email, password): Promise<{valid: boolean, msg: string}> {
    const user = await Database.models.user.findOne({
      attributes: ['id', 'email', 'password'],
      where: {
        email
      }
    });

    if (user.password && user.password.startsWith("$2a")) {
      return Promise.resolve({valid: false, msg: "update"});
    }

    if (user && bcrypt.compareSync(password, user.password)) {
      return Promise.resolve({valid: true, msg: ''});
    }

    return Promise.reject({valid: false, msg: "incorrect username/password combination"});
  }

  public async generateToken(user, clientAccess, firmAccess): Promise<string> {
    let payload: AccessToken = {
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      client_access: clientAccess,
      firm_access: firmAccess
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '120h' });
    return Promise.resolve(token);
  }

  public async getFirmScope(userId: number): Promise<any> {
    const { firm_employee, firm_subscription } = Database.models;

    const firmScope = await firm_employee.findOne({
      attributes: {
        exclude: ['id', 'active', 'userId', 'firmId']
      },
      where: {
        user_id: userId,
        active: true
      }
    });

    if (firmScope && firmScope.firm_id) {
      const subscription = await firm_subscription.findOne({
        where: {
          firm_id: firmScope.firm_id
        }
      });

      const currentPeriodEnd = new Date(subscription.current_period_end);
      const subscriptionExpired = await this.isPastDate(currentPeriodEnd);

      if (subscription && !subscriptionExpired) {
        return Promise.resolve(firmScope);
      }
    }

    return Promise.resolve(null);
  }

  public async isPastDate(date: Date): Promise<boolean> {
    const today = new Date();

    if (date.setHours(0, 0, 0, 0) <= today.setHours(0, 0, 0, 0)) {
      return Promise.resolve(true);
    }

    return Promise.resolve(false);
  }

  public async getClientScope(userId: number): Promise<Array<any>> {
    const { user, firm, client } = Database.models;
    const clientScope = await user.findOne({
      where: { id: userId },
      attributes: [],
      include: {
        model: firm,
        attributes: ['id'],
        required: true,
        through: {
          model: client,
          where: { active: true },
          attributes: []
        }
      }
    });

    if (clientScope) {
      return Promise.resolve(clientScope.firms);
    } else {
      return Promise.resolve([]);
    }
  }

  public async verifyEmail(token): Promise<any> {
    var user_id;
    var booly = true;
    // verify token, and use database to connect with ID.
    jwt.verify(token, JWT_SECRET, (err, payload) => {
      if (err === null) {
        user_id = payload.user_id;
      }
      else if (err.name === 'TokenExpiredError') {
        booly = false;

      }
      else if (err.name === 'JsonWebTokenError') {
        booly = false;
      }
    });
    if(!booly){
      return Promise.resolve(false);
    }
    // Set user that's connected to user_id verified to 1 (True).
    await Database.models.user.update({ verified: 1 }, {
      where: {
        id: user_id
      }
    });
    // Remove row with token from verification_token
    await Database.models.verification_token.destroy({
      where: {
        user_id: user_id
      }
    });
    return Promise.resolve(true);
  }

  public async verifyPasswordToken(userId: number, token: string): Promise<boolean> {
    const { password_reset_token } = Database.models;
    const passwordResetToken = await password_reset_token.findOne({where: {user_id: userId}});

    if (!passwordResetToken) {
      return Promise.reject(false);
    }

    const isValid = await bcrypt.compare(token, passwordResetToken.token);

    if (!isValid) {
      return Promise.reject(false);
    }

    return Promise.resolve(true);
  }

  public async resetPassword(userId: number, token: string, password: string): Promise<boolean> {
    const { password_reset_token } = Database.models;
    const passwordResetToken = await password_reset_token.findOne({where: {user_id: userId}});

    if (!passwordResetToken) {
      return Promise.reject(false);
    }

    const isValid = await bcrypt.compare(token, passwordResetToken.token);

    if (!isValid) {
      return Promise.reject(false);
    }

    await this._userService.update({id: userId, password});

    await password_reset_token.destroy({where: {user_id: userId}});

    return Promise.resolve(true);
  }
}
