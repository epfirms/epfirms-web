import express from 'express';
import { templateTaskController } from '@modules/template-task/controllers';
const passport = require('passport');

const templateTaskRouter = express.Router();

// taskTemplate.post('/', passport.authenticate('bearer', { session: false }), (req, res) => taskTemplateController.createDocument(req, res));
// taskTemplate.get('/', passport.authenticate('bearer', { session: false }), (req, res) => taskTemplateController.getAllFirmDocuments(req, res));
// taskTemplate.delete('/:id', passport.authenticate('bearer', { session: false }), (req, res) => taskTemplateController.delete(req, res));
// taskTemplate.put('/:id', passport.authenticate('bearer', { session: false }), (req, res) => taskTemplateController.update(req, res));
export { templateTaskRouter };
