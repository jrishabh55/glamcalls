import { Router } from 'express';
import Api from '../Controllers/Api/APIController';
import PaymentController from '../Controllers/Api/PaymentController';
import PayTMController from '../Controllers/Api/PayTMController';

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
router.post('/feedback', Api.feedback);

router.post('/payment', PaymentController.genHash);
router.post('/payment/success', PaymentController.success);
router.get('/payment/failure', PaymentController.faliour);

router.get('/paytm/checksum/generate', PayTMController.genChecksum);
router.post('/paytm/checksum/verify', PayTMController.verifyCheksum);

export default router;
