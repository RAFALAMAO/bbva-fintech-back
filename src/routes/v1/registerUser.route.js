import express from 'express';

import RegisterUserController from "../../controllers/RegisterUser.controller";
const router = express.Router();

router.post('/user/create-update', RegisterUserController.RegisterUpdateUser);

module.exports = router;
