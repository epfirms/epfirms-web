import express from 'express';
import { firmController } from '@modules/firm/controllers';
const passport = require('passport');

const firmRouter = express.Router();

firmRouter.get('/', passport.authenticate('bearer', { session: false }), (req, res) => firmController.getFirm(req, res));

firmRouter.post('/', (req, res) => firmController.createFirm(req, res));

firmRouter.put('/:id', passport.authenticate('bearer', { session: false }), (req, res) => firmController.updateFirm(req, res));

firmRouter.get('/clients', passport.authenticate('bearer', { session: false }), (req, res) => firmController.getClientList(req, res));

firmRouter.post('/clients', passport.authenticate('bearer', { session: false }), (req, res) => firmController.createClient(req, res));

firmRouter.get('/staff', passport.authenticate('bearer', { session: false }), (req, res) => firmController.getStaffList(req, res));

firmRouter.post('/staff', passport.authenticate('bearer', { session: false }), (req, res) => firmController.createClient(req, res));
// public async InitializeGet() {
//   this.router
//     .get(
//       this.path,
//       passport.authenticate('bearer', { session: false, failureRedirect: '/login' }),
//       this.getService.bind(this)
//     )
//     .bind(this);
// }

export { firmRouter };
