import './env'

import * as compression from 'compression';
import * as mongoSessionStore from 'connect-mongo';
import * as cors from 'cors';
import * as express from 'express';
import * as session from 'express-session';
import * as helmet from 'helmet';
import * as httpModule from 'http';
import * as mongoose from 'mongoose';
import * as path from 'path';

import api from './api';
import logger from './logs';

import {
    COOKIE_DOMAIN,
    IS_DEV,
    MONGO_URL,
    PORT_API as PORT,
    SESSION_NAME,
    SESSION_SECRET,
    URL_API as ROOT_URL,
    URL_APP,
  } from './consts';
  
const server = express()

const mongoOptions: mongoose.ConnectionOptions = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
}

mongoose.connect(MONGO_URL, mongoOptions)


server.listen(PORT, () => logger.info("Hello World!"))
