import express from 'express';
import Container from 'typedi';
import { TeamController } from './team.controller';
const passport = require('passport');

const teamRouter = express.Router();
const teamController = Container.get(TeamController);

teamRouter.get('/', passport.authenticate('bearer', { session: false }), (req, res) =>
  teamController.getAll(req, res),
);
teamRouter.get('/:id', passport.authenticate('bearer', { session: false }), (req, res) =>
  teamController.getOne(req, res),
);
teamRouter.get('/:id/members', passport.authenticate('bearer', { session: false }), (req, res) =>
  teamController.getMembers(req, res),
);
teamRouter.post('/', passport.authenticate('bearer', { session: false }), (req, res) =>
  teamController.create(req, res),
);
teamRouter.get('/:id/add-user', passport.authenticate('bearer', { session: false }), (req, res) =>
  teamController.addUser(req, res),
);
teamRouter.get(
  '/:id/remove-user',
  passport.authenticate('bearer', { session: false }),
  (req, res) => teamController.removeUser(req, res),
);
teamRouter.put(
  '/:id/members/:member_id',
  passport.authenticate('bearer', { session: false }),
  (req, res) => teamController.updateMember(req, res),
);

export { teamRouter };
