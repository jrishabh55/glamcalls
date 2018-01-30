import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import api from '../../routes/api';
import { FirebaseAuth } from '../../Middlewares/Authentication';
import { response, error } from '../../Helpers';

const app = express();

// Default Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use(function(req, res, next) {
    res.api = (data: Object | string, code: number = 200) => {
        res.json(response(data, code));
    };

    res.error = (err: string, code: number = 400, data: object | string) => {
        res.json(error(err, code, data));
    };

    next();
});

// NOTE Enable auth middleware for production
app.use( FirebaseAuth );

// Routes
app.use('/v1/', api);

export default app;
