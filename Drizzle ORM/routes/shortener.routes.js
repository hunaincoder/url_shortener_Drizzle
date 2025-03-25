import express from "express";

import {
  postURLShortener,
  getShortenerPage,
  redirectToShortLink,
  getShortenerEditPage,
  postShortenerEditPage,
} from "../controller/url-shortenener.controller.js";

const router = express.Router();

router.get("/", getShortenerPage);

router.post("/", postURLShortener);

router.get("/:shortcode", redirectToShortLink);

router.route("/edit/:id").get(getShortenerEditPage).post(postShortenerEditPage)

export const shortenerRoutes = router;
