const jwt = require("jsonwebtoken");
const experss = require("express");
const router = experss.Router();
const bcrypt = require("bcryptjs");

require("../db/conn");
const User = require("../model/usermodel");
const Authenticate = require("../middelwear/authenticate");

router.post("/add", async (req, res) => {
  const { name, email, phone, place, password } = req.body;
  if (!name || !email || !phone || !place || !password) {
    return res.status(422).json({ err: "Please fill add data" });
  } else {
    try {
      const userexist = await User.findOne({ email: email });
      if (userexist) {
        return res.status(201).json({ err: "Email alraedy Exist" });
      } else {
        const user = new User({ name, email, phone, place, password });
        await user.save();
        res
          .status(200)
          .json({ message: "user addedd succesfull", data: req.body });
      }
    } catch (e) {
      console.log(e);
      res.status(400).json({ err: "unable to add user", data: req.body });
    }
  }
});

router.post("/sing", async (req, res) => {
  var token;
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ err: "please provid all data" });
  } else {
    const userLogin = await User.findOne({ email: email });
    if (userLogin) {
      const matchpass = await bcrypt.compare(password, userLogin.password);

      token = await userLogin.generateAuthToken()
      console.log(token);

      res.cookie("jwttoken", token, {
        expires: new Date(Date.now() + 259200000),
        httpOnly: true,
      });

    

      if (matchpass) {
        res.status(200).json({ message: "user login succefful" });
      } else {
        res.status(400).json({ err: "pass not match" });
      }
    } else {
      res.status(533).json({ err: "email are not valid" });
    }
  }
});

router.get("/about", Authenticate,(req, res) => {
console.log('vaibhav')
  res.send("hello");
});

router.get("/users", async (req, res) => {
  const data = await User.find();
  return res.status(200).json({ message: data });
});





module.exports = router;
