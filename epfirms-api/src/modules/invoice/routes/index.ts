
import express from 'express';
import { invoiceController} from '@modules/invoice/controllers';

const passport = require('passport');

const invoiceRouter = express.Router();

invoiceRouter.post('/', passport.authenticate('bearer', { session: false }), (req, res) => invoiceController.upsert(req, res));
invoiceRouter.get('/:id', passport.authenticate('bearer', { session: false }), (req, res) => invoiceController.getAllWithId(req, res));
invoiceRouter.delete('/:id', passport.authenticate('bearer', { session: false }), (req, res) => invoiceController.delete(req, res));



export { invoiceRouter };



