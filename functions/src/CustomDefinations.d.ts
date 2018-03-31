import { User } from './Interfaces';

declare global {
    namespace Express {
        export interface Request {
            user?: User;
            admin?: User;
        }
        export interface Response {
            api,
            error
        }
    }
}
