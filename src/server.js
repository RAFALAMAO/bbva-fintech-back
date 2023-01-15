'use strict';

// Config
require('dotenv').config();
import { corsOptions } from './config/cors';

import routesV1 from './routes/v1';
import express from 'express';
import logger from 'morgan';
import cors from 'cors';
import helmet from 'helmet';

// Middlewares
import { validateApiToken } from './middlewares/apiAuth';

// Create Express webapp and connect socket.io
const app = express();
const port = process.env.PORT || 3000;

app.enable("trust proxy");

app.use(helmet.frameguard({ action: 'DENY' }));
app.use(helmet.hidePoweredBy());
app.use(logger('combined'));
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(express.json({ limit: '60mb' }));

// Auth API Token
app.use(validateApiToken);

app.set('port', port);

app.use('/v1', routesV1.healt);
app.use('/v1', routesV1.login);

// Create http server and run it.
app.listen(port, function () {
	console.log('Express server running on *: http://localhost:' + port);
});
