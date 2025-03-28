import { ACCESS_TOKEN_EXPIRY, REFRESH_TOKEN_EXPIRY } from "../config/constants.js";
import { refreshTokens, verifyJWTToken } from "../services/auth.services.js";

// export const verifyAuthentication = (req, res, next) => {
//     const token = req.cookies.access_token;
//     if (!token) {
//         req.user = null;
//         return next();
//     }
//     try {
//         const decodedToken = verifyJWTToken(token)
//         req.user = decodedToken;
//     } catch (error) {
//         req.user = null;
//     }
//     return next();
// };

export const verifyAuthentication = async (req, res, next) => {
  const accessToken = req.cookies.access_token;
  const refreshToken = req.cookies.refresh_token;

  req.user = null;

  if (!accessToken && !refreshToken) return next();

  if (accessToken) {
    try {
      const decodedToken = verifyJWTToken(accessToken);
      req.user = decodedToken;
      return next();
    } catch (error) {
      req.user = null;
    }
  }

  if (refreshToken) {
    try {
      const { newAccessToken, newRefreshToken, user } = await refreshTokens(
        refreshToken
      );
      req.user = user;

      res.cookie("access_token", newAccessToken, {
        httpOnly: true,
        secure: true,
        maxAge: ACCESS_TOKEN_EXPIRY,
      });

      res.cookie("refresh_token", newRefreshToken, {
        httpOnly: true,
        secure: true,
        maxAge: REFRESH_TOKEN_EXPIRY,
      });

      return next();
    } catch (error) {
      console.log("Token refresh failed:", error.message);
      res.clearCookie("access_token");
      res.clearCookie("refresh_token");
    }
  }

  return next();
};
