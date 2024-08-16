import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return res.status(401). json("unAuthorised");
  }
  jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) {
      return res.status(401).json("Unauthorized");
    }
    req.user = user;
    next();
  });
};