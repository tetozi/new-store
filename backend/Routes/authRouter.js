import express from "express";

const router =  express.Router()
import{isLoggedIn, login,signUp} from '../controllers/authController.js'

router.get('/isLoggedIn', isLoggedIn);
//router.get('/logout', logout)

router.post('/login', login);
router.post('/register', signUp)

export default router


