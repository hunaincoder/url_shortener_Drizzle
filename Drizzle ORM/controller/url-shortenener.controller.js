import crypto from "crypto";
import {
  getAllShortLinks,
  getShortLinksByShortCode,
  inserShortLink,
} from "../services/shortener.services.js";
// import { getAllShortLinks } from "../../services/shortener.services.js";
// import {
//   loadLinks,
//   savelinks,
//   getLinkByShortCode,
// } from "../model/shortener.model.js";
// import { urls } from "../schema/url_schema.js";

export const getShortenerPage = async (req, res) => {
  try {
    if (!req.user) return res.redirect("/login");

    // const link = await loadLinks();
    const link = await getAllShortLinks(req.user.id);

    // let isLoggedIn = req.cookies.isLoggedIn;

    // const links = await urls.find();
    return res.render("index", {
      link,
      host: req.hostname,
      user: res.locals.user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send("internal server error");
  }
};

export const postURLShortener = async (req, res) => {
  try {
    // const link = await loadLinks();
    if (!req.user) return res.redirect("/login");

    const { url, shortcode } = req.body;
    const finalShortCode = shortcode || crypto.randomBytes(4).toString("hex");

    const link = await getShortLinksByShortCode(finalShortCode);
    // const links = await urls.find();
    if (link) {
      res
        .status(400)
        .send("short code already exists. please choose another one");
    }
    console.log("URL:", url);
    console.log("Shortcode:", finalShortCode);
    await inserShortLink({
      url,
      shortcode: finalShortCode,
      userId: req.user.id,
    });
    // await urls.create({ url, shortcode });
    return res.redirect("/shorten");
  } catch (error) {
    console.error(error);
  }
};

export const redirectToShortLink = async (req, res) => {
  try {
    // const link = await loadLinks();
    const shortcode = req.params.shortcode;
    // const link = await getLinkByShortCode(shortcode);
    const link = await getShortLinksByShortCode(shortcode);

    // const link = await urls.findOne({ shortcode });
    if (!link) {
      return res.status(404).send("not found");
    }
    return res.redirect(link.url);
  } catch (error) {
    console.error(error);
  }
};
