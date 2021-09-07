const bcrypt = require('bcrypt');
import { Database } from '@src/core/Database';
const { JWT_SECRET } = require('@configs/vars.js');
const jwt = require('jsonwebtoken');
const { EMAIL_API_KEY, EMAIL_DOMAIN } = require('@configs/vars.js');
var mailgun = require('mailgun-js')({apiKey: EMAIL_API_KEY, domain: EMAIL_DOMAIN});

export interface EmailContent {
  from: string;
  to: string;
  subject: string;
  html: string;
}
export class emailsService {
  public static async createEmailContent(from, to, subject, html:string): Promise<EmailContent> {
    const emailContent = {
      from,
      to,
      subject,
      html
    };

    return Promise.resolve(emailContent);
  }

    public static async sendEmail(content: EmailContent): Promise<any> {
      const responseBody = await mailgun.messages().send(content);

      return Promise.resolve(responseBody);
    }

    public static async createConfirmationToken(userT): Promise<String> {
      const user = await Database.models.user.findOne({
        attributes: ['id', 'email', 'password'],
        where: {
          "email": userT.user.email,
          "password": userT.user.password
        }
      });
        var veri = {
            user_id: user.id
        };
        var token = jwt.sign(veri,JWT_SECRET);

        var thing = {
            user_id: user.id,
            token: token
          };
        const verification = await Database.models.verification_token.create(thing);
        Promise.resolve(verification);
        return verification.dataValues.token;
      }

    public static async verify(token): Promise<any> {
      var user_id;
        // verify token, and use database to connect with ID.
        jwt.verify(token, JWT_SECRET, (err, payload) => {
          if (err.name === 'TokenExpiredError') {
              console.log('Whoops, your token has expired!');
          }
          
          if (err.name === 'JsonWebTokenError') {
              console.log('That JWT is malformed!');
          }
          
          if (err === null) {
              console.log('Your JWT was successfully validated!');
          }
          console.log(payload.user_id);
          user_id = payload.user_id;
      });
        // Set user that's connected to user_id verified to 1 (True).
        await Database.models.user.update({ verified: 1 }, {
          where: {
            id: user_id
          }
        });
      }
}