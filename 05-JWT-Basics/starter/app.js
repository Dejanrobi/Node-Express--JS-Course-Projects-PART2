require('dotenv').config();
require('express-async-errors');

const express = require('express');
const app = express();

const mainRouter = require('./routes/main')

const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

// middleware
app.use(express.static('./public'));
app.use(express.json());

// main router
// add a base url and the middleware
app.use('/api/v1', mainRouter)

// when its done with all the routes above and route matches, it will immediately land in this middleware which automatically
// responds with an error message of Route not found
app.use("*", notFoundMiddleware);
// this error middleware is only executed, when the routes are present
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
