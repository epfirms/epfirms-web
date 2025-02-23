import express from 'express';
import { matterController, matterIntakeController, matterTaskFileController } from '@modules/matter/controllers';
import { matterTaskController } from '@modules/matter/controllers';
import { matterNoteController } from '@modules/matter/controllers';

const passport = require('passport');

const matterRouter = express.Router();

matterRouter.get('/', passport.authenticate('bearer', { session: false }), (req, res) => matterController.getMattersForFirm(req, res));


matterRouter.post('/', passport.authenticate('bearer', { session: false }), (req, res) => matterController.createMatter(req, res));

matterRouter.delete('/', passport.authenticate('bearer', { session: false }), (req, res) => matterController.deleteMatter(req, res));

matterRouter.put('/', passport.authenticate('bearer', { session: false }), (req, res) => matterController.updateMatter(req, res));

matterRouter.post('/task', passport.authenticate('bearer', { session: false }), (req, res) => matterTaskController.createTask(req, res));

matterRouter.get('/:matter_id/notes', passport.authenticate('bearer', { session: false }), (req, res) => matterNoteController.getNotes(req, res));

matterRouter.post('/:matter_id/notes', passport.authenticate('bearer', { session: false }), (req, res) => matterNoteController.createNote(req, res));

matterRouter.delete('/notes/:note_id', passport.authenticate('bearer', { session: false }), (req, res) => matterNoteController.deleteNote(req, res));

matterRouter.patch('/task', passport.authenticate('bearer', { session: false }), (req, res) => matterTaskController.updateTask(req, res));

matterRouter.delete('/task', passport.authenticate('bearer', { session: false }), (req, res) => matterTaskController.deleteTask(req, res));

matterRouter.get('/user', passport.authenticate('bearer', { session: false }), (req, res) => matterController.getMattersForCurrentUser(req, res));


matterRouter.get('/:id', passport.authenticate('bearer', { session: false }), (req, res) => matterController.getMatterById(req, res));

matterRouter.post('/intake', passport.authenticate('bearer', { session: false }), (req, res) => matterIntakeController.create(req, res));

matterRouter.patch('/intake', passport.authenticate('bearer', { session: false }), (req, res) => matterIntakeController.update(req, res));

matterRouter.post('/intake/spouse', passport.authenticate('bearer', { session: false }), (req, res) => matterIntakeController.addSpouse(req, res));

matterRouter.patch('/intake/spouse', passport.authenticate('bearer', { session: false }), (req, res) => matterIntakeController.updateSpouse(req, res));

// Matter task files

matterRouter.get('/task/file/download', passport.authenticate('bearer', {session: false}), (req, res) => matterTaskFileController.getDownloadURL(req, res));

matterRouter.get('/task/file/upload', passport.authenticate('bearer', {session: false}), (req, res) => matterTaskFileController.getUploadURL(req, res));

matterRouter.post('/task/:matter_task_id/file', passport.authenticate('bearer', {session: false}), (req, res) => matterTaskFileController.add(req, res));

matterRouter.put('/task/file/:file_id', passport.authenticate('bearer', {session: false}), (req, res) => matterTaskFileController.update(req, res));

matterRouter.delete('/task/file/:file_id', passport.authenticate('bearer', {session: false}), (req, res) => matterTaskFileController.delete(req, res));
export { matterRouter };
