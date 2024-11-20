import express from 'express';
import Container from 'typedi';
import { TaskController } from './task.controller';
const passport = require('passport');

const taskRouter = express.Router();
const taskController = Container.get(TaskController);

taskRouter.get('/', passport.authenticate('bearer', { session: false }), (req, res) => taskController.getAll(req, res));

taskRouter.put('/:task_id', passport.authenticate('bearer', { session: false }), (req, res) => taskController.update(req, res));

taskRouter.post('/', passport.authenticate('bearer', { session: false }), (req, res) => taskController.create(req, res));

taskRouter.delete('/:task_id', passport.authenticate('bearer', { session: false }), (req, res) => taskController.delete(req, res));

taskRouter.put('/:id', passport.authenticate('bearer', { session: false }), (req, res) => taskController.getOne(req, res));

export { taskRouter };