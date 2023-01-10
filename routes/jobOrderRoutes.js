const express = require('express');
const router = express.Router();

const jobOrderControllers = require('../controllers/jobOrderControllers');

router.get('/', jobOrderControllers.jobOrder_index);
router.get('/add-job-order', jobOrderControllers.jobOrder_add_get);
router.post('/', jobOrderControllers.jobOrder_add_post);


module.exports = router;