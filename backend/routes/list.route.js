const express = require('express');
const { createList, getList, updateList, deleteList, getLists } = require('../controllers/list.controller');
const { authMiddleware, adminMiddleware } = require('../middlewares/auth.middleware');

const router = express.Router();

router.route('/').post(authMiddleware, adminMiddleware, createList).get(authMiddleware, getLists);
router.route('/:id').get(authMiddleware, getList).patch(authMiddleware, adminMiddleware, updateList).delete(authMiddleware, adminMiddleware, deleteList);

module.exports = router;