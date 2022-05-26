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
import { Service } from 'typedi';
const compression = require('compression');

@Service()
export class CommonMiddleware {
  constructor() {}

  usePassport() {
    passport.use(
      new Strategy(function (token, done) {
        jwt.verify(token, JWT_SECRET, function (err, user) {
          if (err) {
            return done(null, false, { message: err });
          }

          if (!user.id) {
            return done(null, false);
          }

          return done(null, user, { scope: 'all' });
        });
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
