const Users = require("../models/UserModel");
const jwt = require("jsonwebtoken");

//REGISTER USER

exports.signUp = async (req, res, next) => {
  const { name, email, password, pic } = req.body;

  try {
    let existingUser;
    existingUser = await Users.findOne({ email: email });

    if (existingUser) {
      return res.json({ msg: "User Already Register" });
    }
    const addUser = new Users({
      name,
      email,
      password,
      pic,
    });
    await addUser.save();
    let token = jwt.sign(
      {
        userId: addUser._id,
        email: addUser.email,
      },
      "dont-show-this"
    );
    console.log("existingUser", existingUser);
    console.log("token", token);

    return res.json({ msg: "Register Succesfully...." });
  } catch (error) {
    console.log(error);
    return res.json({
      msg: "SignUp failed due to some reasons...",
    });
  }
};

//Login user

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    let existingUser;
    try {
      existingUser = await Users.findOne({ email: email });
      console.log("login user", existingUser);
    } catch (error) {
      return res.status(400).json({ msg: "SignUp Failed", error });
    }
    if (!existingUser && existingUser.password !== password) {
      console.log("f3f3f4S");
      return res.status(422).json({ msg: "Login Failled..." });
    } else {
      let token = jwt.sign(
        {
          userId: existingUser._id,
        },
        "dont-show-this"
      );
      res.status(201).json({
        data: {
          userId: existingUser._id,
          name: existingUser.name,
          email: existingUser.email,
          token: token,
        },
        msg: `Login SuccesFully`,
      });
    }
  } catch (err) {
    console.log("err", err);
    res.json({
      msg: "Something Went wrong",
    });
  }
};

//Search the user

exports.searchUser = async (req, res, next) => {
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};
  const user = await Users.find(keyword).find({ _id: { $ne: req.user._id } });
  res.json({ user });
};
