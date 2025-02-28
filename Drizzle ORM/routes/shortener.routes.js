import express from "express";

import {
  postURLShortener,
  getShortenerPage,
  redirectToShortLink,
} from "../controller/url-shortenener.controller.js";

const router = express.Router();

router.get("/", getShortenerPage);

router.post("/", postURLShortener);

router.get("/:shortcode", redirectToShortLink);

export const shortenerRoutes = router;
