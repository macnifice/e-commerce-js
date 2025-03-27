import { createProduct, deleteProduct, getProducts, getProductsByBusinessId, updateProduct } from "../controllers/product.controller";
import { Router } from "express";
import { authMiddleware, checkRole } from "../middlewares/auth.middleware";

const router: Router = Router();

router.get('/', getProducts);

router.get('/business/:id', authMiddleware, checkRole('business'), getProductsByBusinessId);

// router.get('/:id', getProductById);

router.post('/', authMiddleware, checkRole('business'), createProduct);

router.put('/:id', authMiddleware, checkRole('business'), updateProduct);

router.delete('/:id', authMiddleware, checkRole('business'), deleteProduct);

export { router };
