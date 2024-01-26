const express = require('express');
const { createVideoContent, getVideoContent, updateVideoContent, deleteVideoContent, getVideoContents } = require('../controllers/content.controller');
const { authMiddleware, adminMiddleware } = require('../middlewares/auth.middleware');

const router = express.Router();

router.use(authMiddleware);

router.route('/').post(adminMiddleware, createVideoContent).get(getVideoContents);
router.route('/:id').get(getVideoContent).patch(adminMiddleware, updateVideoContent).delete(adminMiddleware, deleteVideoContent);

module.exports = router;
