import * as sha512 from 'js-sha512';
import { Response } from 'express';
import { Request } from 'express-serve-static-core';
import { db2, addYear } from '../../Helpers';

export class PaymentController {

    constructor() {
        console.info("___PAYMENT_CONTROLLER___");
    }

    static init() {
        return new PaymentController();
    }

    genHash(req: Request, res: Response) {
        console.info("___GENERATE_HASH___");
        const key: string = "H76h7VnG";
        const salt: string = "Su2txzs6rL";
        const data = req.body;

        const hashData = { preHashString: key + '|' + data.txnid + '|' + data.amount + '|' + data.productinfo + '|' + data.firstname + '|' + data.email + '|||||||||||' };
        const hash = sha512(hashData.preHashString + salt);
        return res.api({ hash: hash });
    }

    async success(req: Request, res: Response) {
        console.info("___PAYMENT_SUCCESS___");
        await db2.collection('users').doc(req.user.uid).collection('payment').add(req.body);
        await db2.collection('users').doc(req.user.uid).update({
            plan: 'paid',
            auditions: 2,
            planValid: addYear().getTime()
        });

        return res.api("success");
    }

    faliour(req: Request, res: Response) {
        console.info("___PAYMENT_FALIOUR___");
        return res.error("faliour");
    }
}

export default PaymentController.init();
