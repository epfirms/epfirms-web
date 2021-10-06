import express from 'express';
import {
  assetController,
  moneyAccountController,
  realEstateController,
  vehicleController
} from '@modules/asset/controllers';
const passport = require('passport');

const assetRouter = express.Router();

assetRouter.get('/', passport.authenticate('bearer', { session: false }), (req, res) =>
  assetController.getAssetsForCurrentUser(req, res)
);

assetRouter.get('/:id', passport.authenticate('bearer', { session: false }), (req, res) =>
  assetController.getAssetsById(req, res)
);

assetRouter.post(
  '/money-account/:user_id',
  passport.authenticate('bearer', { session: false }),
  (req, res) => moneyAccountController.addMoneyAccount(req, res)
);

assetRouter.patch('/money-account/:id', passport.authenticate('bearer', { session: false }), (req, res) =>
moneyAccountController.updateMoneyAccount(req, res)
);

assetRouter.delete(
  '/money-account/:id',
  passport.authenticate('bearer', { session: false }),
  (req, res) => moneyAccountController.removeMoneyAccount(req, res)
);

assetRouter.post('/real-estate/:user_id', passport.authenticate('bearer', { session: false }), (req, res) =>
  realEstateController.addRealEstate(req, res)
);

assetRouter.patch('/real-estate/:id', passport.authenticate('bearer', { session: false }), (req, res) =>
  realEstateController.updateRealEstate(req, res)
);

assetRouter.delete(
  '/real-estate/:id',
  passport.authenticate('bearer', { session: false }),
  (req, res) => realEstateController.removeRealEstate(req, res)
);

assetRouter.post('/vehicle/:user_id', passport.authenticate('bearer', { session: false }), (req, res) =>
  vehicleController.addVehicle(req, res)
);

assetRouter.patch('/vehicle/:id', passport.authenticate('bearer', { session: false }), (req, res) =>
vehicleController.updateVehicle(req, res)
);

assetRouter.delete('/vehicle/:id', passport.authenticate('bearer', { session: false }), (req, res) =>
  vehicleController.removeVehicle(req, res)
);

export { assetRouter };
