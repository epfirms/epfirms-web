import { Express } from 'express';
import { Logger } from '../utils/logger/Logger';
let bodyParser = require('body-parser');
let cors = require('cors');
const passport = require('passport');
const Strategy = require('passport-http-bearer').Strategy;
const helmet = require('helmet');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('@configs/vars');
import { Database } from '@src/core/Database';
const compression = require('compression');

export class CommonMiddleware {
  app: Express;

  constructor(_app: Express) {
    this.app = _app;
  }

  public async usePassport() {
    passport.use(
      new Strategy(function (token, done) {
        jwt.verify(token, JWT_SECRET, function (err, user) {
          if (err) {
            return done(null, false, { message: err });
          }

          if (!user.id) {
            return done(null, false);
          }

          return done(null, user, {scope: 'all'})
        });
      })
    );
    this.app.use(passport.initialize());
  }

  public async useHelmet() {
    this.app.use(helmet());
  }

  public async useBodyParser() {
    this.app.use(bodyParser.json());
  }

  public async useURLencoded() {
    this.app.use(
      bodyParser.urlencoded({
        extended: true
      })
    );
  }

  public async useCors() {
    this.app.use(cors());
  }

  public async useCompression() {
    this.app.use(compression());
  }

  public async logRequests() {
    let logger = Logger.getLogger();
    this.app.use((req, res, done) => {
      logger.info(req.originalUrl);
      done();
    });
  }
}
