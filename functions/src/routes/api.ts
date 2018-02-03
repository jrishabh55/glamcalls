import { Router } from 'express';
import Api from '../Controllers/Api/APIController';
import PaymentController from '../Controllers/Api/PaymentController';

const router: Router = Router();

router.get('/profile', Api.profile);
router.get('/check', Api.checkUser);
router.get('/auditions', Api.auditions);
router.get('/audition/:id', Api.audition);

router.get('/blogs', Api.blogs);
router.get('/logs', Api.logs);
router.get('/quotes', Api.quote);
router.get('/notifications', Api.notifications);

router.post('/profile', Api.register);
router.post('/auditions', Api.auditionAction);

router.post('/payment', PaymentController.genHash);
router.post('/payment/success', PaymentController.success);
router.get('/payment/failure', PaymentController.faliour);

router.get('/test', Api.test);

export default router;
