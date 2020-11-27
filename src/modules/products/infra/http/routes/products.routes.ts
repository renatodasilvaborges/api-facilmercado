import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProductsController from '../controllers/ProductsController';

const productsRouter = Router();
const productsRouterController = new ProductsController();

productsRouter.use(ensureAuthenticated);

const upload = multer(uploadConfig.multer);

productsRouter.post('/', productsRouterController.create);
productsRouter.get('/', productsRouterController.show);
productsRouter.get('/:provider_id/available', productsRouterController.index);
productsRouter.get('/:product_id', productsRouterController.showProduct);
productsRouter.put('/', productsRouterController.update);
productsRouter.patch('/image/:product_id', upload.single('image'), productsRouterController.updateImage);


export default productsRouter;
