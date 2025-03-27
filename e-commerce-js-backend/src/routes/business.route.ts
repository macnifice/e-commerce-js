import { Router } from 'express';
import { authMiddleware, checkRole } from '../middlewares/auth.middleware';
import { createBusiness, getBusiness } from '../controllers/business.controller';

const router: Router = Router();

router.get('/', getBusiness);

// router.get('/:id', getBusinessById);

router.post('/', authMiddleware, checkRole('admin'), createBusiness);

// router.put('/:id', authMiddleware, checkRole('admin'), updateBusiness);

// router.delete('/:id', authMiddleware, checkRole('admin'), deleteBusiness);

export { router };


