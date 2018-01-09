import { Router } from 'express';
import Api from '../Controllers/Api/APIController';
import PaymentController from '../Controllers/Api/PaymentController';

const router: Router = Router();

router.get('/profile', Api.profile);
router.get('/auditions', Api.auditions);
router.get('/blogs', Api.blogs);
router.get('/logs', Api.logs);
router.get('/quotes', Api.quote);
router.post('/profile', Api.register);
router.post('/auditions', Api.register);

router.post('/payment', PaymentController.genHash);
router.get('/payment/success', PaymentController.success);
router.get('/payment/faliour', PaymentController.faliour);

export default router;
