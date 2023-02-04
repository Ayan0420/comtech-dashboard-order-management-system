const express = require('express');
const router = express.Router();

const jobOrderControllers = require('../controllers/jobOrderControllers');

router.get('/', jobOrderControllers.jobOrder_index);
router.get('/job-details/:job_id', jobOrderControllers.jobOrder_update_get);
router.post('/job-details/:job_id', jobOrderControllers.jobOrder_update_post);
router.get('/add-job-order', jobOrderControllers.jobOrder_add_get);
router.post('/', jobOrderControllers.jobOrder_add_post);
router.delete('/job-details/:job_id', jobOrderControllers.jobOrder_delete);


module.exports = router;