import express from 'express';
import { taskController } from '@modules/task/controllers';
const passport = require('passport');

const taskRouter = express.Router();

taskRouter.get('/', (req, res) => taskController.getTasks(req, res));

taskRouter.delete('/', (req, res) => taskController.deleteTask(req, res));

taskRouter.post('/', passport.authenticate('bearer', { session: false }), (req, res) => taskController.createTask(req, res));

export { taskRouter };