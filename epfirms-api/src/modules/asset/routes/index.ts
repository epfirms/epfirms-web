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
  '/money-account',
  passport.authenticate('bearer', { session: false }),
  (req, res) => moneyAccountController.addMoneyAccount(req, res)
);

assetRouter.delete(
  '/money-account',
  passport.authenticate('bearer', { session: false }),
  (req, res) => moneyAccountController.removeMoneyAccount(req, res)
);

assetRouter.post('/real-estate', passport.authenticate('bearer', { session: false }), (req, res) =>
  realEstateController.addRealEstate(req, res)
);

assetRouter.delete(
  '/real-estate',
  passport.authenticate('bearer', { session: false }),
  (req, res) => realEstateController.removeRealEstate(req, res)
);

assetRouter.post('/vehicle', passport.authenticate('bearer', { session: false }), (req, res) =>
  vehicleController.addVehicle(req, res)
);

assetRouter.delete('/vehicle', passport.authenticate('bearer', { session: false }), (req, res) =>
  vehicleController.removeVehicle(req, res)
);

export { assetRouter };
