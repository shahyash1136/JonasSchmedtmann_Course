const express = require('express');
const tourContorller = require('../controllers/tourController');

/* app.get('/api/v1/tours', getAllTours);
app.get('/api/v1/tours/:id', getTour);
app.post('/api/v1/tours', createTour);
app.patch('/api/v1/tours/:id', updateTour);
app.delete('/api/v1/tours/:id', deleteTour); */

const router = express.Router();

router.param('id', tourContorller.checkId);

router
  .route('/')
  .get(tourContorller.getAllTours)
  .post(tourContorller.checkBody, tourContorller.createTour);
router
  .route('/:id')
  .get(tourContorller.getTour)
  .patch(tourContorller.updateTour)
  .delete(tourContorller.deleteTour);

module.exports = router;
