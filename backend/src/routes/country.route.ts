import express, { Router } from 'express';
import { createCountry, getCountry, updateCountry, deleteCountry, getCountries } from '../controllers/country.controller';
import { authMiddleware, adminMiddleware } from '../middlewares/auth.middleware';
import uploadFile from '../utils/upload';

const router: Router = express.Router();

router.use(authMiddleware);

router
  .route("/")
  .post(
    adminMiddleware,
    uploadFile("./files/crs").single("icon"),
    createCountry
  )
  .get(getCountries);

router.route('/:id')
    .get(getCountry)
    .patch(adminMiddleware, updateCountry)
    .delete(adminMiddleware, deleteCountry);

export default router;
