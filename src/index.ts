import { createServer } from 'http';
import { app } from './app.js';
import createDebug from 'debug';
import { dbConnect } from './services/db.connect.js';

const debug = createDebug('W9E:index');
const PORT = process.env.PORT || 3030;

const server = createServer(app);

dbConnect()
  .then((mongoose) => {
    server.listen(PORT);
    debug('Connected to DB:', mongoose.connection.db.databaseName);
  })
  .catch((error) => server.emit(error));

server.on('listening', () => {
  console.log('Listening on port', PORT);
  debug('Listening on port', PORT);
});

server.on('error', (error) => {
  console.log(`Error ${error.message}`);
});
