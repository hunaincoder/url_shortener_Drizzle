import {
  comparePassword,
  createUser,
  generateToken,
  getUserByEmail,
  hashPassword,
} from "../services/auth.services.js";

export const getRegisterPage = (req, res) => {
  if (req.user) return res.redirect("/shorten");
  return res.render("auth/register");
};
export const getLoginPage = (req, res) => {
  if (req.user) return res.redirect("/shorten");

  return res.render("auth/login");
};
export const postLogin = async (req, res) => {
  if (req.user) return res.redirect("/shorten");

  const { email, password } = req.body;
  const user = await getUserByEmail(email);
  if (!user) return res.redirect("/login");

  const isPasswordValid = await comparePassword(password, user.password);

  if (!isPasswordValid) return res.redirect("/login");
  // res.setHeader("Set-Cookie" , "isLoggedIn=true; path=/;" )
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

  const { name, email, password } = req.body;
  const userExists = await getUserByEmail(email);
  if (userExists) return res.redirect("/register");

  const hashedPass = await hashPassword(password);

  const user = await createUser({ name, email, password: hashedPass });
  res.redirect("/login");
};

export const getMe = (req, res) => {
  
  if (!req.user) return req.send("not logged in");
  return res.send(`hey ${req.user.name}`);
};

export const logoutUser = (req, res) => {
  res.clearCookie("access_token")
  return res.redirect("/login");
};
