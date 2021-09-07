import express from 'express';
import { appointeeController } from '@modules/appointee/controllers';

const appointeeRouter = express.Router();

appointeeRouter.post('/:id', (req, res) => appointeeController.createAppointee(req, res));

export { appointeeRouter };
