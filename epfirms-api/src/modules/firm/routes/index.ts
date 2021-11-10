import express from 'express';
import { firmController, firmTaskTemplateController } from '@modules/firm/controllers';
const passport = require('passport');

const firmRouter = express.Router();

firmRouter.get('/', passport.authenticate('bearer', { session: false }), (req, res) => firmController.getFirm(req, res));

firmRouter.post('/', (req, res) => firmController.createFirm(req, res));

firmRouter.put('/:id', passport.authenticate('bearer', { session: false }), (req, res) => firmController.updateFirm(req, res));

firmRouter.get('/clients', passport.authenticate('bearer', { session: false }), (req, res) => firmController.getClientList(req, res));

firmRouter.post('/clients', passport.authenticate('bearer', { session: false }), (req, res) => firmController.createClient(req, res));

firmRouter.get('/staff', passport.authenticate('bearer', { session: false }), (req, res) => firmController.getStaffList(req, res));

firmRouter.post('/staff', passport.authenticate('bearer', { session: false }), (req, res) => firmController.createClient(req, res));

firmRouter.get('/task-templates', passport.authenticate('bearer', {session: false}), (req, res) => firmTaskTemplateController.get(req, res));

firmRouter.post('/task-templates', passport.authenticate('bearer', {session: false}), (req, res) => firmTaskTemplateController.create(req, res));

firmRouter.put('/task-templates/:firm_task_template_id', passport.authenticate('bearer', {session: false}), (req, res) => firmTaskTemplateController.update(req, res));

firmRouter.delete('/task-templates/:firm_task_template_id', passport.authenticate('bearer', {session: false}), (req, res) => firmTaskTemplateController.delete(req, res));

firmRouter.post('/task-templates/:firm_task_template_id/task', passport.authenticate('bearer', {session: false}), (req, res) => firmTaskTemplateController.addTask(req, res));

firmRouter.put('/task-templates/task/:firm_template_task_id', passport.authenticate('bearer', {session: false}), (req, res) => firmTaskTemplateController.updateTask(req, res));

firmRouter.delete('/task-templates/task/:firm_template_task_id', passport.authenticate('bearer', {session: false}), (req, res) => firmTaskTemplateController.deleteTask(req, res));

export { firmRouter };
