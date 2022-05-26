
import express from 'express';
import { decedentPropertyController} from '@modules/decedent-property/controllers';

const passport = require('passport');

const decedentPropertyRouter = express.Router();

decedentPropertyRouter.post('/', passport.authenticate('bearer', { session: false }), (req, res) => decedentPropertyController.upsert(req, res));
decedentPropertyRouter.get('/:decedent_id', passport.authenticate('bearer', { session: false }), (req, res) => decedentPropertyController.getAllWithDecedentId(req, res));
decedentPropertyRouter.delete('/:id', passport.authenticate('bearer', { session: false }), (req, res) => decedentPropertyController.delete(req, res));



export { decedentPropertyRouter };



