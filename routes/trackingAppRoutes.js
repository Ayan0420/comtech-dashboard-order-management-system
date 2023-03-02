const express = require('express');
const router = express.Router();

const trackingAppController = require('../controllers/trackingAppController');

router.get('/', trackingAppController.trackingApp_index);
router.post('/', trackingAppController.trackingApp_search)
router.get('/:id', trackingAppController.trackingApp_result);

module.exports = router;