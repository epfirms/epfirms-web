import express from 'express';
import { userController, familyMemberController, appointeeController } from '@modules/user/controllers';
const passport = require('passport');

const userRouter = express.Router();

userRouter.get('/',
  passport.authenticate('bearer', {session: false}),
  (req, res) => userController.getUser(req, res)
)

userRouter.post('/upsert', passport.authenticate('bearer', {session: false}), (req, res) => userController.upsertUser(req, res))

userRouter.post('/',
  (req, res) => userController.createUser(req, res)
)

userRouter.patch('/',
  (req, res) => userController.updateUser(req, res)
)

userRouter.get('/family-member/:id',
passport.authenticate('bearer', {session: false}),
  (req, res) => familyMemberController.getByUserId(req, res)
)

userRouter.get('/family-member',
passport.authenticate('bearer', {session: false}),
  (req, res) => familyMemberController.getAll(req, res)
)

userRouter.post('/:user_id/family-member',
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

userRouter.delete('/:user_id/family-member/:family_member_id',
passport.authenticate('bearer', {session: false}),
  (req, res) => familyMemberController.removeByUserId(req, res)
)

userRouter.get('/:id/appointee',
passport.authenticate('bearer', {session: false}),
  (req, res) => appointeeController.getByUserId(req, res)
)

userRouter.get('/appointee',
passport.authenticate('bearer', {session: false}),
  (req, res) => appointeeController.getAll(req, res)
)

userRouter.post('/:user_id/appointee',
passport.authenticate('bearer', {session: false}),
  (req, res) => appointeeController.create(req, res)
)

userRouter.patch('/appointee/:appointee_id',
passport.authenticate('bearer', {session: false}),
  (req, res) => appointeeController.update(req, res)
)

userRouter.delete('/:user_id/appointee/:appointee_id',
passport.authenticate('bearer', {session: false}),
  (req, res) => appointeeController.remove(req, res)
)

userRouter.get('/email-address/:email',
passport.authenticate('bearer', {session: false}),
  (req, res) => userController.validateEmailAddress(req, res)
)

userRouter.get('/:id', passport.authenticate('bearer', {session: false}), (req, res) => userController.getUser(req, res));

userRouter.get('/:id/teams', passport.authenticate('bearer', {session: false}), (req, res) => userController.getTeamsForUser(req, res));

export { userRouter };
