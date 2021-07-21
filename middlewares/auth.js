const jwt = require("jsonwebtoken");
const User = require("../models/User");

const auth = async (req, res, next) => {
  console.log("rergwr");
  try {
    console.log("walking");

    const token = req.header("Authorization").replace("Bearer ", "");
    console.log(token);

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    console.log(decoded);
    console.log(user);
    if (!user) {
      throw new Error();
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: error });
  }
};

// function Ban(){
//     console.log(secret)
// }

// Ban()
// const verifyToken = async(token, secret = secretKey) => {
//     const decoded = await jwt.verify(token, secret);
//     return decoded;
// }

module.exports = auth;
