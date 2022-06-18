import express from 'express';
import Container from 'typedi';
import { CaseTemplateController } from './case-template.controller';
const passport = require('passport');

const caseTemplateRouter = express.Router();
const caseTemplateController = Container.get(CaseTemplateController);

// Case template routes
caseTemplateRouter.get('', passport.authenticate('bearer', {session: false}), (req, res) => caseTemplateController.get(req, res));

caseTemplateRouter.get('/:id', passport.authenticate('bearer', {session: false}), (req, res) => caseTemplateController.getOne(req, res));

caseTemplateRouter.post('', passport.authenticate('bearer', {session: false}), (req, res) => caseTemplateController.create(req, res));

caseTemplateRouter.put('/:firm_case_template_id', passport.authenticate('bearer', {session: false}), (req, res) => caseTemplateController.update(req, res));

caseTemplateRouter.delete('/:firm_case_template_id', passport.authenticate('bearer', {session: false}), (req, res) => caseTemplateController.delete(req, res));

// Template task routes
caseTemplateRouter.post('/:firm_case_template_id/task', passport.authenticate('bearer', {session: false}), (req, res) => caseTemplateController.addTask(req, res));

caseTemplateRouter.put('/task/:firm_template_task_id', passport.authenticate('bearer', {session: false}), (req, res) => caseTemplateController.updateTask(req, res));

caseTemplateRouter.delete('/task/:firm_template_task_id', passport.authenticate('bearer', {session: false}), (req, res) => caseTemplateController.deleteTask(req, res));

// Template task file routes
caseTemplateRouter.get('/task/file/download', passport.authenticate('bearer', {session: false}), (req, res) => caseTemplateController.getTaskFileDownloadURL(req, res));

caseTemplateRouter.get('/task/file/upload', passport.authenticate('bearer', {session: false}), (req, res) => caseTemplateController.getTaskFileUploadURL(req, res));

caseTemplateRouter.post('/task/:firm_template_task_id/file', passport.authenticate('bearer', {session: false}), (req, res) => caseTemplateController.addTaskFile(req, res));

caseTemplateRouter.put('/task/file/:file_id', passport.authenticate('bearer', {session: false}), (req, res) => caseTemplateController.updateTaskFile(req, res));

caseTemplateRouter.delete('/task/file/:file_id', passport.authenticate('bearer', {session: false}), (req, res) => caseTemplateController.deleteTaskFile(req, res));

// Template task sms routes

caseTemplateRouter.post('/task/:task_id/sms', passport.authenticate('bearer', {session: false}), (req, res) => caseTemplateController.createTaskSms(req, res));

caseTemplateRouter.put('/task/sms/:sms_id', passport.authenticate('bearer', {session: false}), (req, res) => caseTemplateController.updateTaskSms(req, res));

caseTemplateRouter.delete('/task/sms/:sms_id', passport.authenticate('bearer', {session: false}), (req, res) => caseTemplateController.deleteTaskSms(req, res));
export { caseTemplateRouter };
