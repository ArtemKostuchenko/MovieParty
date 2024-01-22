const express = require('express');
const { createCountry, getCountry, updateCountry, deleteCountry, getCountries } = require('../controllers/country.controller');
const { authMiddleware, adminMiddleware } = require('../middlewares/auth.middleware');

const router = express.Router();

router.use(authMiddleware);

router.route('/').post(adminMiddleware, createCountry).get(getCountries);
router.route('/:id').get(getCountry).patch(adminMiddleware, updateCountry).delete(adminMiddleware, deleteCountry);

module.exports = router;