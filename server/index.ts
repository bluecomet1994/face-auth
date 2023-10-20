import * as dotenv from 'dotenv';
import * as express from "express";
import * as bodyParser from 'body-parser';
import * as logger from 'morgan';
import * as cors from 'cors';
import * as passport from 'passport';

import connectDB from './config/connectDB';
import api from './routes';
import passport_verify from './config/passport';

// config
dotenv.config();
connectDB();

const app = express();

// middleware
app.use(logger('dev'));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function (req: express.Request, res: express.Response, next: express.NextFunction) {
  res.header('Access-Control-Allow-Origin', 'https://face-verification.vercel.app');
  res.header('Access-Control-Allow-Methods', 'GET');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use(passport.initialize());
passport_verify(passport);

// routes
app.get('/', (req: express.Request, res: express.Response) => res.send("Response from the server"));
app.use('/api', api);

app.listen(process.env.PORT, () => console.log(`Server is running on port ${process.env.PORT}`));