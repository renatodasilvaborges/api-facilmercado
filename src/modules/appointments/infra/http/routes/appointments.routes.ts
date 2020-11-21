import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';


import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import AppointmentsController from '../controllers/AppointmentsController';
import ProviderAppointmentsController from '../controllers/ProviderAppointmentsController';
import ProviderAppointmentsProductsController from '../controllers/AppointmentsProductsController';


const appointmentsRouter = Router();
const appointmentsController = new AppointmentsController();
const appointmentsProductsController = new ProviderAppointmentsProductsController();

const providerAppointmentsController = new ProviderAppointmentsController();

appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      provider_id: Joi.string().uuid().required(),
      product_id: Joi.string().uuid(),
      date: Joi.date(),
    },
  }),
  appointmentsController.create,
);

appointmentsRouter.post('/products', appointmentsProductsController.create);
appointmentsRouter.get('/me', providerAppointmentsController.index);

export default appointmentsRouter;
