import { Logger } from '../utils/logger/Logger';
let bodyParser = require('body-parser');
let cors = require('cors');
const passport = require('passport');
const Strategy = require('passport-http-bearer').Strategy;
const helmet = require('helmet');
import { Service } from 'typedi';
import { AuthFirebaseService } from '@src/modules/auth/services/auth-firebase.service';
const compression = require('compression');

@Service()
export class CommonMiddleware {
  constructor(private authService: AuthFirebaseService) {}

  usePassport() {
    passport.use(
      new Strategy(async (token, done) => {
        try {
          const decodedIdToken = await this.authService.verifyIdToken(token);
          return done(null, decodedIdToken, { scope: 'all' });
        } catch (err) {
          console.log(err);
          return done(null, false, { message: err });
        }
      }),
    );
    return passport.initialize();
  }

  useHelmet() {
    return helmet();
  }

  useBodyParser() {
    return bodyParser.json({ limit: '5mb' });
  }

  useURLencoded() {
    return bodyParser.urlencoded({
      limit: '5mb',
      extended: true,
    });
  }

  useCors() {
    return cors();
  }

  useCompression() {
    return compression();
  }

  logRequests() {
    let logger = Logger.getLogger();
    return (req, res, done) => {
      logger.info(`[${req.ip}] ${req.method} ${req.originalUrl}`);
      done();
    };
  }
}
