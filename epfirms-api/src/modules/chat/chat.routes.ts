import express from 'express';
import Container from 'typedi';
import { ChatController } from './chat.controller';
const passport = require('passport');

const chatRouter = express.Router();
const chatController = Container.get(ChatController);

chatRouter.get('/', passport.authenticate('bearer', { session: false }), (req, res) => chatController.getAccessToken(req, res));
chatRouter.post('/conversation', passport.authenticate('bearer', { session: false }),(req, res) => chatController.createConversation(req, res));
chatRouter.get('/conversation/:sid', passport.authenticate('bearer', { session: false }),(req, res) => chatController.getConversation(req, res));
chatRouter.post('/conversation/:conversationSid/participants', passport.authenticate('bearer', { session: false }),(req, res) => chatController.addParticipants(req, res));

chatRouter.post('/conversation/:conversationSid/messages', passport.authenticate('bearer', { session: false }), (req, res) => chatController.addConversationMessage(req, res));

chatRouter.get('/conversation/:conversationSid/messages', passport.authenticate('bearer', { session: false }), (req, res) => chatController.getConversationMessages(req, res));
export { chatRouter };