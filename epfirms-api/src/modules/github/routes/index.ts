
import express from 'express';
import { githubController} from '@modules/github/controllers';

const passport = require('passport');

const githubRouter = express.Router();

githubRouter.post('/issue', passport.authenticate('bearer', { session: false }), (req, res) => githubController.createGHIssue(req, res));



export { githubRouter };



