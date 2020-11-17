import { Router } from 'express';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProductsController from '../controllers/ProductsController';

const productsRouter = Router();
const productsRouterController = new ProductsController();

productsRouter.use(ensureAuthenticated);

productsRouter.post('/', productsRouterController.create);
productsRouter.get('/', productsRouterController.show);
productsRouter.get('/:provider_id/available', productsRouterController.index);
productsRouter.put('/', productsRouterController.update);

export default productsRouter;
