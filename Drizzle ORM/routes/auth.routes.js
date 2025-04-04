import { Router } from "express";
import * as authControllers from "../controller/auth.controller.js";

const router = Router();

router.route("/register").get(authControllers.getRegisterPage).post(authControllers.postRegister)
// router.get("/login", authControllers.getLoginPage);

router.route("/login").get(authControllers.getLoginPage).post(authControllers.postLogin)

router.route("/me").get(authControllers.getMe)

router.route("/profile").get(authControllers.getProfilePage)

router.route("/logout").get(authControllers.logoutUser)

router.route("/verify-email").get(authControllers.getVerifyEmailPage)

router.route("/resend-verification-link").post(authControllers.resendVerificationLink)

router.route("/verify-email-token").get(authControllers.verifyEmailToken)


export const authRoutes = router;
