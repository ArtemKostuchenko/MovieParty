const express = require('express');
const { createSelection, getSelection, updateSelection, deleteSelection, getSelections } = require('../controllers/selection.controller');
const { authMiddleware, adminMiddleware } = require('../middlewares/auth.middleware');

const router = express.Router();

router.use(authMiddleware);

router.route('/').post(adminMiddleware, createSelection).get(getSelections);
router.route('/:id').get(getSelection).patch(adminMiddleware, updateSelection).delete(adminMiddleware, deleteSelection);

module.exports = router;