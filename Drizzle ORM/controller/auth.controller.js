import {
  comparePassword,
  createUser,
  generateToken,
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
  const token = generateToken({
    id: user.id,
    name: user.name,
    email: user.email,
  });
  res.cookie("access_token", token);

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

export const logoutUser = (req, res) => {
  res.clearCookie("access_token");
  return res.redirect("/login");
};
