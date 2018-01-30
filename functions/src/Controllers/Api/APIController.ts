import { Request, Response } from 'express';
import { db2, error, etc, auditions as _auditions } from '../../Helpers';
import { Audition, User } from '../../Interfaces';

import * as fs from 'fs';

export class Api {

    static init() {
        return (new Api());
    }

    async register(req: Request, res: Response) {
        try {
            const params = req.body;
            const required = ["name", "tattoos", "local_languages", "languages", "skills"];
            const user = {};

            if (req.user.newUser) {
                user['newUser'] = false;
                required.push('gender');
                required.push('number');
                required.push('ref');
                required.push("age_group");
            }

            for (const key in params) {
                if (params.hasOwnProperty(key) && required.indexOf(key) >= 0) {
                    user[key] = params[key].length > 0 ? params[key] : '';
                }
            }

            await db2.collection('/users').doc(req.user.uid).update(user);
            return res.api('User has been updated.');
        } catch (e) {
            console.error(e);
            return res.api(error(e.message));
        }
    }

    async profile(req: Request, res: Response) {
        const user: any = req.user;
        if (!user.newUser) {
            user.age_group = user.age_group.join(',');
        }
        return res.api({ user: user });
    }

    async auditions(req: Request, res: Response) {

        const auditions = await db2.collection('/auditions').get();
        const response = [];
        await auditions.forEach(aud => {
            const data = <Audition>aud.data();
            // console.log(data);
            if (req.user.age_group.indexOf(data.age_group) < 0) {
                return;
            }
            data.id = aud.id;
            data.title = data.casting_update_for;
            response.push(data);
        });
        // const aud = fs.readFileSync(etc("auditions.json"), { encoding: 'utf8' });
        return res.api(_auditions(response));
    }

    async audition(req: Request, res: Response) {
        const id = req.param('id', "");
        const audition = await db2.collection('/auditions').doc(id).get();
        if (!audition.exists) {
            return res.error("Invalid id");
        }
        // const aud = fs.readFileSync(etc("auditions.json"), { encoding: 'utf8' });
        return res.api({ audition: audition.data() });
    }

    async blogs(req: Request, res: Response) {
        const ref = await db2.collection('/blogs').limit(10).orderBy('id', 'desc').get();
        if (ref.empty) {
            return res.api({ blogs: [] });
        }
        const blogs = [];
        ref.forEach((doc) => {
            blogs.push(doc.data());
        });

        return res.api({ blogs: (blogs) });
    }

    async logs(req: Request, res: Response) {
        const ref = await db2.collection('/users').doc(req.user.uid).collection('logs').limit(10).orderBy('applied_on', 'desc').get();
        console.log("___LOGS___", req.user.uid);
        if (ref.empty) {
            return res.api({ logs: [] });
        }
        const r = [];
        ref.forEach(doc => r.push(doc.data()));
        return res.api({ logs: r });
    }

    async quotes(req: Request, res: Response) {
        // FIXME quote from a db
        const quotes = fs.readFileSync(etc("quotes.json"), { encoding: 'utf8' });
        return res.api({ quotes: JSON.parse(quotes) });
    }

    async quote(req: Request, res: Response) {

        const ref = await db2.collection('/quotes').get();
        console.log(ref.empty);
        //
        if (ref.empty) {
            return res.api({ quote: {} });
        }
        const ref2 = await ref.query.limit(1).orderBy('id', 'desc').get();
        let quote;
        ref2.forEach(q => {
            quote = q.data();
            quote.id = q.id;
        });

        res.api({ quote: quote});
    }

    async auditionAction(req: Request, res: Response) {
        const params = req.body;

        if (!params.id || !params.action) {
            return res.error("Invalid params");
        }

        if (params.action !== 'accepted') {// && params.action !== 'declined') {
            return res.error("Invalid action");
        }

        const logEntry = await db2.collection('/users').doc(req.user.uid)
            .collection('/logs').where("audition", '==', params.id).get();

        if (!logEntry.empty) {
            return res.error("Audition already applied.");
        }

        const audition = await db2.collection('/auditions').doc(params.id).get();

        if (!audition.exists) {
            return res.error("Invalid Audition");
        }

        if (req.user.auditions <= 0) {
            return res.error("No auditions left");
        }

        if (req.user.plan === 'free') {
            await db2.collection('/users').doc(req.user.uid).update({ auditions: --req.user.auditions });
        }

        const add = {
            action: params.action,
            audition: audition.id,
            applied_for: audition.data().casting_update_for,
            applied_on: Date.now().toString()
        };

        await db2.collection('/users').doc(req.user.uid).collection('/logs').add(add);
        res.api({ action: 'success' });
    }

    async checkUser(req: Request, res: Response) {
        return res.api(req.user.newUser);
    }

    async notifications(req: Request, res: Response) {

        const ref = await db2.collection('/notifications').limit(10).orderBy('time', 'desc').get();
        console.log(ref.empty);
        if (ref.empty) {
            return res.api({ notifications: [] });
        }
        const data = [];
        ref.forEach((doc) => {
            const temp = doc.data();
            temp._id = doc.id;
            data.push(temp);
        });

        return res.api({ notifications: data });
    }
}

export default (Api.init());
