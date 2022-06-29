import { Response, Request } from "express";
import { AuthService } from "@modules/auth/services/auth.service";
import { StatusConstants } from "@src/constants/StatusConstants";
import { UserService } from "@src/modules/user/services/user.service";
import { emailsService } from "@src/modules/emails/services/emails.service";
import { Service } from "typedi";

@Service()
export class AuthController {
  constructor(private _userService: UserService, private _emailService: emailsService, private _authService: AuthService) {}

  public async login(req: Request, resp: Response): Promise<any> {
    try {
      const { email, password } = req.body;
      
      const {valid, msg} = await this._authService.validate(email, password);

      if (valid) {
        const user = await this._userService.get('email', email);
        const firmScope = await this._authService.getFirmScope(user.id);
        const clientScope = await this._authService.getClientScope(user.id);
        const token = await this._authService.generateToken(user, clientScope, firmScope);

        resp.status(StatusConstants.OK).send({success: true, access_token: token, msg});
      } else if (msg && msg === 'update'){
        // Send password reset email for users on the old password system
        await this._emailService.requestPasswordReset(email);
        
        resp.status(StatusConstants.OK).send({success: false, access_token: null, msg})
      } else {
        throw new Error(msg);
      }
    } catch (error) {
      console.error(error);
      resp.status(StatusConstants.UNAUTHORIZED).send({success: false, access_token: null, msg: error.message});
    }
  }

  public async getCurrentUserDetails(req: any, resp: Response): Promise<any> {
    try {
      const { user } = req;

      const scope = {
        client_access: user.client_access,
        firm_access: user.firm_access 
      };

      resp.status(StatusConstants.OK).send(scope);
    } catch (error) {
      resp.status(StatusConstants.UNAUTHORIZED).send(error.message);
    }
  }
  
  public async verifyEmailToken(req: any, resp: Response): Promise<any> {
    try {
      // query params
      const token = req.body.token;
      const isValid = await this._authService.verifyEmail(token);
      if(isValid){
        resp.status(StatusConstants.OK).send({success: true});
      } else {
      resp.status(StatusConstants.OK).send({success: false});
    }
    } catch (error) {
      resp.status(StatusConstants.INTERNAL_SERVER_ERROR).send(error.message);
    }
  }

  public async verifyPasswordToken(req: any, resp: Response): Promise<any> {
    try {
      const { token } = req.query;
      const { user_id } = req.params;

      const isValid = await this._authService.verifyPasswordToken(user_id, token);
      resp.status(StatusConstants.OK).send(isValid);
    } catch (error) {
      resp.status(StatusConstants.FORBIDDEN).send(error.message);
    }
  }

  public async updatePassword(req: any, resp: Response): Promise<any> {
    try {
      const { id, token, password } = req.body;
      await this._authService.resetPassword(id, token, password);
      resp.status(StatusConstants.OK).send(true);
    } catch (error) {
      resp.status(StatusConstants.UNAUTHORIZED).send(error.message);
    }
  }
}
