const express = require('express');
const { createList, getList, updateList, deleteList, getLists } = require('../controllers/list.controller');
const { authMiddleware, adminMiddleware } = require('../middlewares/auth.middleware');

const router = express.Router();

router.use(authMiddleware);

router.route('/').post(adminMiddleware, createList).get(getLists);
router.route('/:id').get(getList).patch(adminMiddleware, updateList).delete(adminMiddleware, deleteList);

module.exports = router;