import { Router } from "express";
import * as authControllers from "../controller/auth.controller.js";

const router = Router();

router.route("/register").get(authControllers.getRegisterPage).post(authControllers.postRegister)
// router.get("/login", authControllers.getLoginPage);

router.route("/login").get(authControllers.getLoginPage).post(authControllers.postLogin)


export const authRoutes = router;
