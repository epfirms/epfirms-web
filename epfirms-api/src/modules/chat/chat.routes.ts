import express from 'express';
import Container from 'typedi';
import { ChatController } from './chat.controller';
const passport = require('passport');

const chatRouter = express.Router();
const chatController = Container.get(ChatController);

chatRouter.get('/', passport.authenticate('bearer', { session: false }), (req, res) => chatController.getAccessToken(req, res));
chatRouter.post('/', passport.authenticate('bearer', { session: false }), (req, res) => chatController.createConversationsUser(req, res));
chatRouter.post('/:conversationSid/participants', passport.authenticate('bearer', { session: false }), (req, res) => chatController.addParticipant(req, res));
chatRouter.post('/:conversationSid/messages', passport.authenticate('bearer', { session: false }), (req, res) => chatController.sendMessage(req, res))

export { chatRouter };