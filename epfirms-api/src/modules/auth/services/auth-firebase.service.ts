import { Service } from 'typedi';
import { ConfigService } from '@src/modules/config/config.service';
import * as FirebaseAdmin from 'firebase-admin';
import * as FirebaseApp from 'firebase-admin/app';
import * as FirebaseAuth from 'firebase-admin/auth';
import { emailsService } from '@src/modules/emails/services/emails.service';

export interface AuthClaims {
  id: number;
  admin: boolean;
  client_access: any[];
  firm_access: number;
}

@Service()
export class AuthFirebaseService {
  firebase: FirebaseApp.App;

  firebaseAuth: FirebaseAuth.Auth;

  constructor(private _configService: ConfigService, private _emailService: emailsService) {
    const serviceAccount: FirebaseAdmin.ServiceAccount = {
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: "firebase-adminsdk-b8x9n@epfirms-6ae71.iam.gserviceaccount.com",
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
    }
    

    const serviceAccountCredential: FirebaseApp.Credential = FirebaseAdmin.credential.cert(serviceAccount);
    
    this.firebase = FirebaseApp.initializeApp({
      credential: serviceAccountCredential,
    });

    this.firebaseAuth = FirebaseAdmin.auth();
  }

  async verifyIdToken(token: string): Promise<FirebaseAuth.DecodedIdToken> {
    const decodedIdToken = await this.firebaseAuth.verifyIdToken(token, true);
    return Promise.resolve(decodedIdToken);
  }

  async sendLink(email: string) {
    const link = await this.firebaseAuth.generateEmailVerificationLink(email);

    const sendEmail = await this._emailService.sendFromTemplate(email, 'Verify your email for epfirms.com', 'email-verification', {
      'v:url': link,
    });

    return Promise.resolve(sendEmail);
  } 

  async createUserWithEmailAndPassword(email: string, password: string) {
    const user = await this.firebaseAuth.createUser({
      email, password
    });

    this.firebaseAuth
    return Promise.resolve(user);
  }

  async setCustomUserClaims(uid: string, customUserClaims: AuthClaims) {
    const claims = await this.firebaseAuth.setCustomUserClaims(uid, customUserClaims);
  }
}
