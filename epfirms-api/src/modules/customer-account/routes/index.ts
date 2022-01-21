
import express from 'express';
import { customerAccountController} from '@modules/customer-account/controllers';

const passport = require('passport');

const customerAccountRouter = express.Router();

customerAccountRouter.post('/', passport.authenticate('bearer', {session: false}), (req, res) => customerAccountController.upsert(req,res));
customerAccountRouter.get('/:matterId', passport.authenticate('bearer', {session: false}), (req, res) => customerAccountController.getWithMatterId(req,res));

export { customerAccountRouter };



