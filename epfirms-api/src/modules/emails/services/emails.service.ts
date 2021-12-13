const bcrypt = require('bcrypt');
const crypto = require('crypto');
import { Database } from '@src/core/Database';
import { Service } from 'typedi';
const jwt = require('jsonwebtoken');
const { JWT_SECRET, EMAIL_API_KEY, EMAIL_DOMAIN, CLIENT_URL } = require('@configs/vars');
var mailgun = require('mailgun-js')({ apiKey: EMAIL_API_KEY, domain: EMAIL_DOMAIN });

export interface EmailContent {
  from: string;
  to: string;
  subject: string;
  html: string;
}

@Service()
export class emailsService {
  public async createEmailContent(from, to, subject, html: string): Promise<EmailContent> {
    const emailContent = {
      from,
      to,
      subject,
      html
    };

    return Promise.resolve(emailContent);
  }

  public async sendEmail(content: EmailContent): Promise<any> {
    const responseBody = await mailgun.messages().send(content);

    return Promise.resolve(responseBody);
  }

  public async createConfirmationToken(userT): Promise<String> {
    const user = await Database.models.user.findOne({
      attributes: ['id', 'email', 'password'],
      where: {
        email: userT.user.email,
        password: userT.user.password
      }
    });
    var veri = {
      user_id: user.id
    };
    var token = jwt.sign(veri, JWT_SECRET);

    var thing = {
      user_id: user.id,
      token: token
    };
    const verification = await Database.models.verification_token.create(thing);
    Promise.resolve(verification);
    return verification.dataValues.token;
  }

  public async verify(token): Promise<any> {
    var user_id;
    // verify token, and use database to connect with ID.
    jwt.verify(token, JWT_SECRET, (err, payload) => {
      if (err.name === 'TokenExpiredError') {
      }

      if (err.name === 'JsonWebTokenError') {
      }

      if (err === null) {
      }
      user_id = payload.user_id;
    });
    // Set user that's connected to user_id verified to 1 (True).
    await Database.models.user.update(
      { verified: 1 },
      {
        where: {
          id: user_id
        }
      }
    );
  }

  public async sendClientPortalInvite(email: string, firmName: string): Promise<boolean> {
    const { user, password_reset_token } = Database.models;
    const existingUser = await user.findOne({ where: { email } });

    if (!existingUser) {
      Promise.reject(new Error('User not found'));
    }

    const existingToken = await password_reset_token.findOne({
      where: { user_id: existingUser.id }
    });

    if (existingToken) {
      await password_reset_token.destroy({ where: { user_id: existingUser.id } });
    }

    const token = crypto.randomBytes(32).toString('hex');
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(token, salt);

    await password_reset_token.create({ token: hash, user_id: existingUser.id });

    const encodedToken = encodeURIComponent(token);
    const url = `${CLIENT_URL}/password-reset?token=${encodedToken}&id=${existingUser.id}`;

    const data = {
      from: 'EPFirms <postmaster@mg.epfirms.com>',
      to: email,
      subject: 'Confirm your account on EPFirms',
      template: 'client-portal-invite',
      'v:url': url,
      'v:firm_name': firmName
    };

    const responseBody = await mailgun.messages().send(data);

    return Promise.resolve(true);
  }

  public async requestPasswordReset(email: string): Promise<boolean> {
    const { user, password_reset_token } = Database.models;
    const existingUser = await user.findOne({ where: { email } });

    if (!existingUser) {
      Promise.reject(new Error('User not found'));
    }

    const existingToken = await password_reset_token.findOne({
      where: { user_id: existingUser.id }
    });

    if (existingToken) {
      await password_reset_token.destroy({ where: { user_id: existingUser.id } });
    }

    const token = crypto.randomBytes(32).toString('hex');
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(token, salt);

    await password_reset_token.create({ token: hash, user_id: existingUser.id });

    const encodedToken = encodeURIComponent(token);
    const url = `${CLIENT_URL}/password-reset?token=${encodedToken}&id=${existingUser.id}`;

    const data = {
      from: 'EPFirms <postmaster@mg.epfirms.com>',
      to: email,
      subject: 'Password reset request',
      template: 'password-reset-email',
      'v:url': url
    };

    const responseBody = await mailgun.messages().send(data);

    return Promise.resolve(true);
  }
}
