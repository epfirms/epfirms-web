import { Response, Request } from "express";
import { AuthService } from "@modules/auth/services/auth.service";
import { StatusConstants } from "@src/constants/StatusConstants";
import { UserService } from "@src/modules/user/services/user.service";
import { emailsService } from "@src/modules/emails/services/emails.service";

export class AuthController {
  constructor() {}

  public async login(req: Request, resp: Response): Promise<any> {
    try {
      const { email, password } = req.body;
      
      const {valid, msg} = await AuthService.validate(email, password);

      if (valid) {
        const user = await UserService.get('email', email);
        const firmScope = await AuthService.getFirmScope(user.id);
        const clientScope = await AuthService.getClientScope(user.id);
        const token = await AuthService.generateToken(user, clientScope, firmScope);

        resp.status(StatusConstants.OK).send({success: true, access_token: token, msg});
      } else if (msg && msg === 'update'){
        // Send password reset email for users on the old password system
        await emailsService.requestPasswordReset(email);
        
        resp.status(StatusConstants.OK).send({success: false, access_token: null, msg})
      } else {
        throw new Error(msg);
      }
    } catch (error) {
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
      const isValid = await AuthService.verifyEmail(token);
      if(isValid){
        resp.status(StatusConstants.OK).send({success: true});
      } else {
      resp.status(StatusConstants.OK).send({success: false});
    }
    } catch (error) {
      resp.status(StatusConstants.INTERNAL_SERVER_ERROR).send(error.message);
    }
  }

  public async updatePassword(req: any, resp: Response): Promise<any> {
    try {
      const { id, token, password } = req.body;
      await AuthService.resetPassword(id, token, password);
      resp.status(StatusConstants.OK).send(true);
    } catch (error) {
      resp.status(StatusConstants.UNAUTHORIZED).send(error.message);
    }
  }
}
