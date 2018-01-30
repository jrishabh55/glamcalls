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
        if (!users.exists) {
            const rawUser: firebase.auth.UserRecord = await firebase.auth().getUser(uuser.uid);
            await db2.collection('/users').doc(uuser.uid).set({
                uid: rawUser.uid,
                name: rawUser.displayName || "",
                email: rawUser.email || "",
                number: rawUser.phoneNumber || "",
                photo: rawUser.photoURL || "",
                auditions: 2,
                newUser: true,
                plan: 'free',
            });
            const usr = await db2.collection('/users').doc(uuser.uid).get();
            req.user = <User>usr.data();
        } else {
            // console.log(users);
            const user = users.data();
            if (!user.newUser) {
                user.age_group = user.age_group.split(',').map(age => age.trim());
            }
            req.user = <User> user;
        }
        next();
    } catch (e) {
        console.error(e);
        res.error("Something went wrong in the authentication.");
        return;
    }

}

export const AdminAuth = function(req: Request, res: Response, next) {
    next();
}

// Sample user

// const users = await db2.collection('/users').doc("3jSTSXoA88eztiSVJcqfTawfeV13").get();
// const user = users.data();
// if (!user.newUser) {
//     user.age_group = user.age_group.split(',').map(age => age.trim());
// }
// req.user = <User>user;