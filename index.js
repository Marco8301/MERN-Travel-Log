const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const config = dotenv.config({ path: './config/config.env' });

// Middlewares
const authMiddleware = require('./middlewares/authMiddleware');
// const middlewares = require('./middlewares/middlewares');

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
app.use(cookieParser());

// router routes
// eslint-disable-next-line import/newline-after-import
const logsRoute = require('./api/logs');
app.use('/api/logs', authMiddleware, logsRoute);
const authRoute = require('./api/auth/auth');
app.use('/api/auth', authRoute);

// // Not found middleware
// app.use(middlewares.notFoundMiddleware);

// // Error handling middleware
// app.use(middlewares.errorsMiddleware);

if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// Server listening
const PORT = process.env.PORT || 1337;
app.listen(PORT, () => console.log(`listening at http://localhost:${PORT}`));
