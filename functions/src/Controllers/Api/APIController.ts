import { Request, Response } from 'express';
import { db2, error, etc, auditions as _auditions } from '../../Helpers';
import { User } from '../../Interfaces';

import * as fs from 'fs';

export class Api {

    static init() {
        return (new Api());
    }

    async register(req: Request, res: Response) {
        try {
            const params = req.body;
            await db2.collection('/users').doc(req.user.uid).set(params);
            return res.api('User has been updated.');
        } catch (e) {
            console.error(e);
            return res.api(error(e.message));
        }
    }

    async profile(req: Request, res: Response) {
        // FIXME add req.user instead of the following.
        const users = fs.readFileSync(etc('users.json'), { encoding: 'utf8' });
        return res.api({ user: JSON.parse(users)[0] });
    }

    async auditions(req: Request, res: Response) {
        // FIXME add auditions from db instead of sample json.
        const aud = fs.readFileSync(etc("auditions.json"), { encoding: 'utf8' });
        return res.api(_auditions(JSON.parse(aud)));
    }

    async blogs(req: Request, res: Response) {
        // FIXME add correct blogs from db
        const blogs = fs.readFileSync(etc("blogs.json"), { encoding: 'utf8' });
        return res.api({ blogs: JSON.parse(blogs) });
    }

    async logs(req: Request, res: Response) {
        // FIXME add correct logs from db
        const logs = fs.readFileSync(etc("logs.json"), { encoding: 'utf8' });
        return res.api({ logs: JSON.parse(logs) });
    }

    async quote(req: Request, res: Response) {
        // FIXME quote from a db
        const quotes = fs.readFileSync(etc("quotes.json"), { encoding: 'utf8' });
        return res.api({ quotes: JSON.parse(quotes) });
    }

    async audition(req: Request, res: Response) {
        // const accepted = req.body.action;
    }
}

export default (Api.init());
