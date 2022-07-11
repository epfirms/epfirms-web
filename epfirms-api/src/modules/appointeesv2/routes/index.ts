
import express from 'express';
import { appointeesv2Controller} from '@modules/appointeesv2/controllers';

const passport = require('passport');

const appointeesv2Router = express.Router();

appointeesv2Router.post('/', passport.authenticate('bearer', { session: false }), (req, res) => appointeesv2Controller.create(req, res));

appointeesv2Router.put('/', passport.authenticate('bearer', { session: false }), (req, res) => appointeesv2Controller.update(req, res));
appointeesv2Router.get('/:id', passport.authenticate('bearer', { session: false }), (req, res) => appointeesv2Controller.getOneWithId(req, res));
appointeesv2Router.delete('/:id', passport.authenticate('bearer', { session: false }), (req, res) => appointeesv2Controller.delete(req, res));



export { appointeesv2Router };



