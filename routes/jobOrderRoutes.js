const express = require('express');
const router = express.Router();

const jobOrderController = require('../controllers/jobOrderController');

router.get('/', jobOrderController.jobOrder_index);
router.get('/job-orders/:list', jobOrderController.jobOrder_list);
router.get('/job-details/:job_id', jobOrderController.jobOrder_update_get);
router.post('/job-details/:job_id', jobOrderController.jobOrder_update_post);
router.get('/add-job-order', jobOrderController.jobOrder_add_get);
router.post('/', jobOrderController.jobOrder_add_post);
router.delete('/job-details/:job_id', jobOrderController.jobOrder_delete);
router.post('/searchJO', jobOrderController.jobOrder_search);


module.exports = router;