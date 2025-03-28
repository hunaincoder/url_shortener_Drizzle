import {
  ACCESS_TOKEN_EXPIRY,
  REFRESH_TOKEN_EXPIRY,
} from "../config/constants.js";
import {
  clearUserSession,
  comparePassword,
  createAccessToken,
  createRefreshToken,
  CreateSession,
  createUser,
  findUserById,
  getAllShortLinks,
  // generateToken,
  getUserByEmail,
  hashPassword,
} from "../services/auth.services.js";
import {
  loginUserSchema,
  registerUserSchema,
} from "../validators/auth-validators.js";

export const getRegisterPage = (req, res) => {
  if (req.user) return res.redirect("/shorten");
  return res.render("auth/register", { errors: req.flash("errors") });
};
export const getLoginPage = (req, res) => {
  if (req.user) return res.redirect("/shorten");

  return res.render("auth/login", { errors: req.flash("errors") });
};
export const postLogin = async (req, res) => {
  if (req.user) return res.redirect("/shorten");

  const { data, error } = loginUserSchema.safeParse(req.body);
  console.log(data);

  if (error) {
    const errors = error.errors[0].message;
    req.flash("errors", errors);
    return res.redirect("/login");
  }

  const { name, email, password } = data;
  const user = await getUserByEmail(email);
  if (!user) {
    req.flash("errors", "Invalid email or password");
    return res.redirect("/login");
  }
  const isPasswordValid = await comparePassword(password, user.password);

  if (!isPasswordValid) {
    req.flash("errors", "Invalid email or password");
    return res.redirect("/login");
  }
  // const token = generateToken({
  //   id: user.id,
  //   name: user.name,
  //   email: user.email,
  // });
  // res.cookie("access_token", token);

  const session = await CreateSession(user.id, {
    ip: req.clientIp,
    userAgent: req.headers["user-agent"],
  });

  const accessToken = createAccessToken({
    id: user.id,
    name: user.name,
    email: user.email,
    sessionId: session.id,
  });

  const refreshToken = createRefreshToken(session.id);

  const baseConfig = { httpOnly: true, secure: true };

  res.cookie("access_token", accessToken, {
    ...baseConfig,
    maxAge: ACCESS_TOKEN_EXPIRY,
  });

  res.cookie("refresh_token", refreshToken, {
    ...baseConfig,
    maxAge: REFRESH_TOKEN_EXPIRY,
  });
  res.redirect("/shorten");
};

export const postRegister = async (req, res) => {
  if (req.user) return res.redirect("/shorten");

  const { data, error } = registerUserSchema.safeParse(req.body);
  console.log(data);

  if (error) {
    const errors = error.errors[0].message;
    req.flash("errors", errors);
    return res.redirect("/register");
  }

  const { name, email, password } = data;

  const userExists = await getUserByEmail(email);
  if (userExists) {
    req.flash("errors", "user already exists");
    return res.redirect("/register");
  }

  const hashedPass = await hashPassword(password);

  const user = await createUser({ name, email, password: hashedPass });
  res.redirect("/login");
};

export const getMe = (req, res) => {
  if (!req.user) return res.send("not logged in");
  return res.send(`hey ${req.user.name}`);
};

export const getProfilePage = async (req, res) => {
  if (!req.user) return res.redirect("/login");
  const user = await findUserById(req.user.id);
  const userShortLinks = await getAllShortLinks(user.id);

  return res.render("auth/profile", {
    user: {
      name: user.name,
      email: user.email,
      links: userShortLinks,
      createdAt: user.createdAt,
      id: user.id,
    },
  });
};

export const logoutUser = async (req, res) => {
  await clearUserSession(req.user.sessionId);

  res.clearCookie("access_token");
  res.clearCookie("refresh_token");
  return res.redirect("/login");
};
