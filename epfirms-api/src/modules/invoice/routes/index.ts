
import express from 'express';
import { invoiceController} from '@modules/invoice/controllers';

const passport = require('passport');

const invoiceRouter = express.Router();

invoiceRouter.post('/', passport.authenticate('bearer', { session: false }), (req, res) => invoiceController.upsert(req, res));
invoiceRouter.get('/:id', passport.authenticate('bearer', { session: false }), (req, res) => invoiceController.getOneWithId(req, res));
invoiceRouter.delete('/:id', passport.authenticate('bearer', { session: false }), (req, res) => invoiceController.delete(req, res));

invoiceRouter.get('/firm/:id', passport.authenticate('bearer', { session: false }), (req, res) => invoiceController.getAllWithFirmId(req, res));


export { invoiceRouter };



