import express from 'express';
import { documentController } from '@modules/document/controllers';
const passport = require('passport');

const documentRouter = express.Router();

documentRouter.post('/', passport.authenticate('bearer', { session: false }), (req, res) => documentController.createDocument(req, res));
documentRouter.get('/', passport.authenticate('bearer', { session: false }), (req, res) => documentController.getAllFirmDocuments(req, res));
documentRouter.delete('/:id', passport.authenticate('bearer', { session: false }), (req, res) => documentController.delete(req, res));
documentRouter.put('/:id', passport.authenticate('bearer', { session: false }), (req, res) => documentController.update(req, res));
documentRouter.get('/own', passport.authenticate('bearer', { session: false }), (req, res) => documentController.getUserDocuments(req, res));
export { documentRouter };
