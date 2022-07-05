import { Service } from 'typedi';
import { Client as StytchClient, envs as stytchEnvs } from 'stytch';
import { ConfigService } from '@src/modules/config/config.service';
import { GetRequest, GetResponse, JwksResponse, AuthenticateRequest, AuthenticateResponse, RevokeRequest, RevokeResponse} from 'stytch/types/lib/sessions';

@Service()
export class AuthSessionService {
  stytch: StytchClient;
  
  projectId: string;

  constructor(private _configService: ConfigService) {
    this.projectId = this._configService.get<string>('STYTCH_PROJECT_ID');

    this.stytch = new StytchClient({
      project_id: this.projectId,
      secret: this._configService.get<string>('STYTCH_SECRET'),
      env: stytchEnvs.test
    });
  }

  async getJwks(): Promise<JwksResponse> {
    const jwks = await this.stytch.sessions.jwks(this.projectId);

    return jwks;
  }

  async getSessions(data: GetRequest): Promise<GetResponse> {
    const sessions = await this.stytch.sessions.get(data);

    return sessions;
  }

  async authenticate(data: AuthenticateRequest): Promise<AuthenticateResponse> {
    const auth = await this.stytch.sessions.authenticate(data);
    return auth;
  }

  async revoke(data: RevokeRequest): Promise<RevokeResponse> {
    const revoke = await this.stytch.sessions.revoke(data);
    return revoke;
  }
}
