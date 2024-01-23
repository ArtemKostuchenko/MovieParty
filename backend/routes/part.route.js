const express = require('express');
const { createPart, getPart, updatePart, deletePart, getParts } = require('../controllers/part.controller');
const { authMiddleware, adminMiddleware } = require('../middlewares/auth.middleware');

const router = express.Router();

router.use(authMiddleware);

router.route('/').post(adminMiddleware, createPart).get(getParts);
router.route('/:id').get(getPart).patch(adminMiddleware, updatePart).delete(adminMiddleware, deletePart);

module.exports = router;