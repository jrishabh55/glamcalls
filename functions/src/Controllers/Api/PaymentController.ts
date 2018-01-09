import * as sha512 from 'js-sha512';
import { Response } from 'express';
import { Request } from 'express-serve-static-core';

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

        console.info(data);

        const hashData = { preHashString: key + '|' + data.txnid + '|' + data.amount + '|' + data.productinfo + '|' + data.firstname + '|' + data.email + '|||||||||||' };
        const hash = sha512(hashData.preHashString + salt);
        console.info(hash);
        return res.api({hash: hash});
    }

    success(req: Request, res: Response) {
        console.info("___PAYMENT_SUCCESS___");
        console.info(req.body, req.headers);
        console.info("___PAYMENT_SUCCESS___");
        return res.api("success");
    }

    faliour(req: Request, res: Response) {
        console.info("___PAYMENT_FALIOUR___");
        console.info(req.body, req.headers);
        console.info("___PAYMENT_FALIOUR___");
        return res.error("faliour");
    }
}

export default PaymentController.init();
