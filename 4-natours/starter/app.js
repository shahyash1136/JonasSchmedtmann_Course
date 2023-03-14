const express = require('express');
const morgon = require('morgan');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

//1) Middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgon('dev'));
}
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

/* app.use((req, res, next) => {
  console.log('Hello from middleware');
  next();
}); */

//3) Routes
//app.get('/api/v1/tours', getAllTours);
//app.post('/api/v1/tours', createTour);
/* app.get('/api/v1/tours/:id', getTour);
app.patch('/api/v1/tours/:id', updateTour);
app.delete('/api/v1/tours/:id', deleteTour); */

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

//4) Server
module.exports = app;
