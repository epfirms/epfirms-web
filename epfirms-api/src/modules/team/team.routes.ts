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
teamRouter.post('/:id/add-employee', passport.authenticate('bearer', { session: false }), (req, res) =>
  teamController.addEmployee(req, res),
);
teamRouter.post(
  '/:id/remove-employee/:employeeId',
  passport.authenticate('bearer', { session: false }),
  (req, res) => teamController.removeEmployee(req, res),
);
teamRouter.put(
  '/:id/members/:member_id',
  passport.authenticate('bearer', { session: false }),
  (req, res) => teamController.updateMember(req, res),
);

export { teamRouter };
