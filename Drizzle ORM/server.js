import express from "express";
import "dotenv/config";
import { shortenerRoutes } from "./routes/shortener.routes.js";
import { authRoutes } from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
import session from "express-session";
import flash from "connect-flash";
import reqIp from "request-ip";
import { verifyAuthentication } from "./middlewares/verify-auth-middleware.js";
import { redirectToShortLink } from "./controller/url-shortenener.controller.js";


// import { connectDB } from "./config/db-client.js";
const app = express();

const port = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", "./views");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(
  session({
    secret: "hunain",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(flash());

app.use(reqIp.mw())

app.use(verifyAuthentication);
app.use((req, res, next) => {
  console.log("req.user:", req.user);
  res.locals.user = req.user;
  return next();
});

app.use("/shorten", shortenerRoutes);
app.use("/", authRoutes);

app.get('/:shortcode', redirectToShortLink);


try {
  // await connectDB();
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
} catch (error) {
  console.error(error);
}
