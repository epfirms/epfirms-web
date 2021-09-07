import express from 'express';
import { userController, familyMemberController, appointeeController } from '@modules/user/controllers';
const passport = require('passport');

const userRouter = express.Router();

userRouter.get('/',
  passport.authenticate('bearer', {session: false}),
  (req, res) => userController.getUser(req, res)
)

userRouter.post('/',
  (req, res) => userController.createUser(req, res)
)

userRouter.patch('/',
  (req, res) => userController.updateUser(req, res)
)

userRouter.get('/family-member',
passport.authenticate('bearer', {session: false}),
  (req, res) => familyMemberController.getAll(req, res)
)

userRouter.post('/family-member',
passport.authenticate('bearer', {session: false}),
  (req, res) => familyMemberController.create(req, res)
)

userRouter.patch('/family-member',
passport.authenticate('bearer', {session: false}),
  (req, res) => familyMemberController.update(req, res)
)

userRouter.delete('/family-member',
passport.authenticate('bearer', {session: false}),
  (req, res) => familyMemberController.remove(req, res)
)

userRouter.get('/appointee',
passport.authenticate('bearer', {session: false}),
  (req, res) => appointeeController.getAll(req, res)
)

userRouter.post('/appointee',
passport.authenticate('bearer', {session: false}),
  (req, res) => appointeeController.create(req, res)
)

userRouter.patch('/appointee',
passport.authenticate('bearer', {session: false}),
  (req, res) => appointeeController.update(req, res)
)

userRouter.delete('/appointee',
passport.authenticate('bearer', {session: false}),
  (req, res) => appointeeController.remove(req, res)
)



export { userRouter };
