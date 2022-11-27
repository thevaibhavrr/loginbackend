const jwt = require("jsonwebtoken");
const User = require("../model/usermodel");

const Authenticate = async (req, res, next) => {
  try {
    const usertoken = req.cookies.jwttoken;
    const verfiToken = jwt.verify(usertoken, process.env.SECRET_KEY);
    console.log(verfiToken);
    const rootUser = await User.findOne({
      _id: verfiToken._id,
      "tokens.token": usertoken,
    });

    if (!rootUser) {
      throw new Error("User not Found");
    } else {
      req.token = usertoken;
      req.rootUser = rootUser;
      console.log(rootUser);
      req.userID = rootUser._id;
    }

    next();
  } catch (e) {
    res.status(401).send("Unauthorized : No token provided", e);
    console.log(e);
  }
};

module.exports = Authenticate;
