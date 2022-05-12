import express from 'express';
import Container from 'typedi';
import { TeamMemberController } from './team-member.controller';
const passport = require('passport');

const teamMemberRouter = express.Router();
const teamMemberController = Container.get(TeamMemberController);

teamMemberRouter.get('/', passport.authenticate('bearer', { session: false }), (req, res) =>
  teamMemberController.getAll(req, res),
);

export { teamMemberRouter };
