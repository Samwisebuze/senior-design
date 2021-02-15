import * as express from 'express';

import logger from '../logs';

import rootApi from './public'
import machinesApi from './networks';
import networksApi from './machines';

function handleError(err, _, res, __) {
  logger.error(err.stack);

  res.json({ error: err.message || err.toString() });
}

export default function api(server: express.Express) {
    server.use('/api', rootApi, handleError)
    server.use('/api/networks', networksApi, handleError);
    server.use('/api/networks/:networkId/machines', machinesApi, handleError);
}