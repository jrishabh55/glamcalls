import { Request, Response } from 'express';
import * as firebase from 'firebase-admin';
import { db2 } from '../Helpers';
import { User } from '../Interfaces';

export const FirebaseAuth = async function(req: Request, res: Response, next) {
    try {
        const token = req.get('jnex-authentication');
        if (!token) {
            res.json({ error: 'Invalid authentication.' });
            return;
        }

        const uuser = await firebase.auth().verifyIdToken(token);
        const users = await db2.collection('/users').doc(uuser.uid).get();
        const user: User = <User>await users.data();
        if (!user) {
            const rawUser: firebase.auth.UserRecord = await firebase.auth().getUser(uuser.uid);
            await db2.collection('/users').doc(uuser.uid).set({
                name: rawUser.displayName,
                email: rawUser.email,
                number: rawUser.phoneNumber,
                photo: rawUser.photoURL,
                referral: req.body('ref') || null
            });
            const usr = await db2.collection('/users').doc(uuser.uid).get();
            req.user = <User>usr.data();
        } else {
            req.user = user;
        }
        next();
    } catch (e) {
        console.log(e);
        res.error("Something went wrong in the authentication.");
        return;
    }

}

export const AdminAuth = function(req: Request, res: Response, next) {
    next();
}
