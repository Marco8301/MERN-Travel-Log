const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config({
  path: './src/config/config.env',
});

const middlewares = require('./middlewares/middlewares');
// APP init
const app = express();

// DB setup
// eslint-disable-next-line operator-linebreak
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
const db = mongoose.connection;
db.on('error', () => console.log('connection error:'));
db.once('open', () => {
  console.log('Connected to DB');
});

// APP middlewares
app.use(express.json());
app.use(morgan('common'));
app.use(helmet());
app.use(cors({ origin: process.env.CORS_ORIGIN }));

// router routes
// eslint-disable-next-line import/newline-after-import
const logsRoute = require('./api/logs');
app.use('/api/logs', logsRoute);

// Not found middleware
app.use(middlewares.notFoundMiddleware);

// Error handling middleware
app.use(middlewares.errorsMiddleware);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(__dirname + 'client/build'));
}

// Server listening
const PORT = process.env.PORT || 1337;
app.listen(PORT, () => console.log(`listening at http://localhost:${PORT}`));
