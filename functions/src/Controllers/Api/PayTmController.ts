// import * as qs from 'querystring';
import { Request, Response } from 'express';
import * as checksum from '../../Providers/PayTm/checksum';
import { paytm_config as config } from '../../Providers/PayTm/config';
import { db2 } from '../../Helpers';

class PayTmController {
  constructor() {
    console.log("PayTM");
  }
  async genChecksum(request: Request, response: Response) {
    const paramarray = {};
      paramarray['MID'] = config.MID;
      paramarray['ORDER_ID'] = request.user.uid +'.' + Date.now();
      paramarray['CUST_ID'] = request.user.uid;
      paramarray['INDUSTRY_TYPE_ID'] = config.INDUSTRY_TYPE_ID;
      paramarray['CHANNEL_ID'] = config.CHANNEL_ID;
      paramarray['TXN_AMOUNT'] = 999;
      paramarray['WEBSITE'] = config.WEBSITE;
      paramarray['CALLBACK_URL'] = config.CALLBACK_URL;
      paramarray['EMAIL'] = request.user.email;
      paramarray['MOBILE_NO'] = request.user.number;
      checksum.genchecksum(paramarray, config.MERCHANT_KEY, function (err, res) {
        db2.collection('/users').doc(request.user.uid).collection('checksums').add({order_id: paramarray['ORDER_ID'], checksum: res});
        return response.api(res);
      });
  }

  async verifyCheksum(request: Request, response: Response) {
    if(checksum.verifychecksum((request.body), config.MERCHANT_KEY)) {
      return response.api()
    } else {
      return response.error("Invalid checksum.")
    }
  }
}

const instance = new PayTmController();
export default instance;
