import express from 'express';
import { statementController } from '../controllers';

const passport = require('passport');


const statementRouter = express.Router();

statementRouter.post('/', passport.authenticate('bearer', { session: false }), (req, res) => statementController.create(req, res));
statementRouter.get('/:matter_id', passport.authenticate('bearer', { session: false }), (req, res) => statementController.getAllByMatterId(req, res));
statementRouter.delete('/:id', passport.authenticate('bearer', { session: false }), (req, res) => statementController.delete(req, res));
statementRouter.put('/', passport.authenticate('bearer', { session: false }), (req, res) => statementController.update(req, res));
statementRouter.get('/download/:statement_id',passport.authenticate('bearer', { session: false }), (req, res) => statementController.download(req, res));
export {statementRouter}
