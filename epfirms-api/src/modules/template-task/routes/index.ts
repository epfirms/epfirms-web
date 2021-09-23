import express from 'express';
import { templateTaskController } from '@modules/template-task/controllers';
const passport = require('passport');

const templateTaskRouter = express.Router();

templateTaskRouter.post('/', passport.authenticate('bearer', { session: false }), (req, res) => templateTaskController.create(req, res));
// templateTaskRouter.get('/', passport.authenticate('bearer', { session: false }), (req, res) => templateTaskController.getAllFirmDocuments(req, res));
templateTaskRouter.delete('/:id', passport.authenticate('bearer', { session: false }), (req, res) => templateTaskController.delete(req, res));
templateTaskRouter.put('/', passport.authenticate('bearer', { session: false }), (req, res) => templateTaskController.update(req, res));
export { templateTaskRouter };
