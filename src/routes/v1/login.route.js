import express from 'express';
import LoginController from "../../controllers/Login.controller";
const router = express.Router();

router.post('/login', LoginController.Login);

module.exports = router;
