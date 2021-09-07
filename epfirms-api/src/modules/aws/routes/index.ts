import express from 'express';
import {awsController} from '@modules/aws/controllers';
const passport = require('passport');


const awsRouter = express.Router();

awsRouter.post('/generate', passport.authenticate('bearer', {session: false}),
(req, res) => awsController.generatePresignedURL(req, res));

awsRouter.post('/delete', passport.authenticate('bearer', {session: false}),
(req, res) => awsController.deleteDocument(req, res));

awsRouter.post('/download', passport.authenticate('bearer', {session: false}),
(req, res) => awsController.downloadDocumentFromPresignedURL(req, res));

awsRouter.put('/update', passport.authenticate('bearer', {session: false}),
(req, res) => awsController.updateDocument(req, res))

export {awsRouter}
