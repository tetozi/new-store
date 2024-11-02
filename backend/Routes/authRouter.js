import express from "express";

const router =  express.Router()
import{login,signUp} from '../controllers/authController.js'

router.post('/login', login);
router.post('/register', signUp)

export default router