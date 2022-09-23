const admin = require("../config/firebase_config");
const User = require("../model/user");


const authenticate = async (req, res, next) => {
  // return next();
  if (!req.headers.authorization)
    return res.status(401).json({ message: "Auth token not found!!" });

  const token = req.headers.authorization.split(" ")[1];

  try {
    const decodeValue = await admin.auth().verifyIdToken(token);
    if (decodeValue) {
      await checkAndRegisterUser(decodeValue); //check and register user
      req.firebaseUser = decodeValue; //add details of this user to req object,
      return next();
    }
  } catch (e) {
    res.status(401).json({ message: "Unauthorized, Firebase Token Expired" });
  }
};


const checkAndRegisterUser = async (user) => {
    //this function is called by authentication middleware, to check if user exists in our database or not?
    console.log("checking if user exists");
    console.log(user)
    const foundUser = await User.findOne({ user_id: user.uid });
  
    if (foundUser != null) return; //if user found with this uid then we have this user in our database.
    console.log("creating new user");
  
    //otherwise create a new user
    const newUser = await User.create({
      user_id: user.uid,
      email: user.email,
    });
};

module.exports = authenticate;
