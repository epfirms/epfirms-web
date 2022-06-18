import express from 'express';
import { firmController, firmEmployeeController } from '@modules/firm/controllers';
const passport = require('passport');

const firmRouter = express.Router();

firmRouter.get('/', passport.authenticate('bearer', { session: false }), (req, res) => firmController.getFirm(req, res));

firmRouter.post('/', (req, res) => firmController.createFirm(req, res));

firmRouter.put('/:id', passport.authenticate('bearer', { session: false }), (req, res) => firmController.updateFirm(req, res));

firmRouter.get('/clients', passport.authenticate('bearer', { session: false }), (req, res) => firmController.getClientList(req, res));

firmRouter.post('/clients', passport.authenticate('bearer', { session: false }), (req, res) => firmController.createClient(req, res));

firmRouter.get('/staff', passport.authenticate('bearer', { session: false }), (req, res) => firmController.getStaffList(req, res));

firmRouter.post('/staff', passport.authenticate('bearer', { session: false }), (req, res) => firmController.createClient(req, res));

firmRouter.get('/search-key', passport.authenticate('bearer', {session: false}), (req, res) => firmController.getSearchKey(req, res));

firmRouter.get('/employees', passport.authenticate('bearer', {session: false}), (req, res) => firmEmployeeController.getAll(req, res));

firmRouter.post('/employees', passport.authenticate('bearer', {session: false}), (req, res) => firmEmployeeController.create(req, res));

firmRouter.patch('/employees/:id', passport.authenticate('bearer', {session: false}), (req, res) => firmEmployeeController.update(req, res));

firmRouter.delete('/employees/:id', passport.authenticate('bearer', {session: false}), (req, res) => firmEmployeeController.delete(req, res));

firmRouter.get('/team', passport.authenticate('bearer', {session: false}), (req, res) => firmController.getTeams(req, res));

firmRouter.post('/team', passport.authenticate('bearer', {session: false}), (req, res) => firmController.createTeam(req, res));

// firmRouter.put('/team', passport.authenticate('bearer', {session: false}), (req, res) => firmController.update(req, res));

// firmRouter.delete('/team', passport.authenticate('bearer', {session: false}), (req, res) => firmController.delete(req, res));

firmRouter.get('/team/:teamId/members', passport.authenticate('bearer', {session: false}), (req, res) => firmController.getTeamMembers(req, res));

firmRouter.post('/team/members', passport.authenticate('bearer', {session: false}), (req, res) => firmController.addTeamMember(req, res));

firmRouter.get('/team/owner/:id', passport.authenticate('bearer', {session: false}), (req, res) => firmController.getTeamsByOwner(req, res));

firmRouter.delete('/team/members/:id', passport.authenticate('bearer', {session: false}), (req, res) => firmController.removeTeamMember(req, res));

export { firmRouter };
