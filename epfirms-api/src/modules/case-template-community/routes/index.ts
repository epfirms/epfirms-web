import express from 'express';
import { caseTemplateCommunityController } from '@modules/case-template-community/controllers';
const passport = require('passport');

const caseTemplateCommunityRouter = express.Router();
caseTemplateCommunityRouter.get('/:id', passport.authenticate('bearer', {session: false}), (req, res) => caseTemplateCommunityController.getById(req, res));

caseTemplateCommunityRouter.get('/', passport.authenticate('bearer', {session: false}), (req, res) => caseTemplateCommunityController.get(req, res));

caseTemplateCommunityRouter.post('/', passport.authenticate('bearer', {session: false}), (req, res) => caseTemplateCommunityController.create(req, res));

caseTemplateCommunityRouter.post('/save', passport.authenticate('bearer', {session: false}), (req, res) => caseTemplateCommunityController.copyTemplateToFirm(req, res));

caseTemplateCommunityRouter.put('/:case_template_id', passport.authenticate('bearer', {session: false}), (req, res) => caseTemplateCommunityController.update(req, res));

caseTemplateCommunityRouter.delete('/:case_template_id', passport.authenticate('bearer', {session: false}), (req, res) => caseTemplateCommunityController.delete(req, res));

caseTemplateCommunityRouter.post('/:case_template_id/task', passport.authenticate('bearer', {session: false}), (req, res) => caseTemplateCommunityController.addTask(req, res));

caseTemplateCommunityRouter.put('/task/:case_template_task_id', passport.authenticate('bearer', {session: false}), (req, res) => caseTemplateCommunityController.updateTask(req, res));

caseTemplateCommunityRouter.delete('/task/:case_template_task_id', passport.authenticate('bearer', {session: false}), (req, res) => caseTemplateCommunityController.deleteTask(req, res));

caseTemplateCommunityRouter.get('/task/file/download', passport.authenticate('bearer', {session: false}), (req, res) => caseTemplateCommunityController.getTaskFileDownloadURL(req, res));

caseTemplateCommunityRouter.get('/task/file/upload', passport.authenticate('bearer', {session: false}), (req, res) => caseTemplateCommunityController.getTaskFileUploadURL(req, res));

caseTemplateCommunityRouter.post('/task/:case_template_task_id/file', passport.authenticate('bearer', {session: false}), (req, res) => caseTemplateCommunityController.addTaskFile(req, res));

caseTemplateCommunityRouter.put('/task/file/:file_id', passport.authenticate('bearer', {session: false}), (req, res) => caseTemplateCommunityController.updateTaskFile(req, res));

caseTemplateCommunityRouter.delete('/task/file/:file_id', passport.authenticate('bearer', {session: false}), (req, res) => caseTemplateCommunityController.deleteTaskFile(req, res));

export { caseTemplateCommunityRouter };
