const express = require('express');
const { createActor, getActor, updateActor, deleteActor, getActors } = require('../controllers/actor.controller');
const { authMiddleware, adminMiddleware } = require('../middlewares/auth.middleware');

const router = express.Router();

router.use(authMiddleware);

router.route('/').post(adminMiddleware, createActor).get(getActors);
router.route('/:id').get(getActor).patch(adminMiddleware, updateActor).delete(adminMiddleware, deleteActor);

module.exports = router;