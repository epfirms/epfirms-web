import express from 'express';
import { taskTemplateController } from '@modules/task-template/controllers';
const passport = require('passport');

const taskTemplateRouter = express.Router();

taskTemplateRouter.post('/', passport.authenticate('bearer', { session: false }), (req, res) => taskTemplateController.create(req, res));
// taskTemplateRouter.get('/', passport.authenticate('bearer', { session: false }), (req, res) => taskTemplateController.getAllFirmDocuments(req, res));
taskTemplateRouter.delete('/:id', passport.authenticate('bearer', { session: false }), (req, res) => taskTemplateController.delete(req, res));
taskTemplateRouter.put('/', passport.authenticate('bearer', { session: false }), (req, res) => taskTemplateController.update(req, res));
export { taskTemplateRouter };
