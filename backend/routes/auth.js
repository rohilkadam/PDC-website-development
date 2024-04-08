const express = require('express');
const User = require('../models/UserSchema');
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser')


const JWT_SECRET = "pdc123$";

//ROUTE - 1 : Login a auth user using POST "/api/auth/login" require auth
router.post('/login',
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    let success = false;
    //If there are errors, return bad request and errows
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email: email });
      //console.log(user);
      if (!user) {
        success = false;
        return res.status(400).json({ success, error: "Wrong Credentials" });
      }

      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        success = false;
        return res.status(400).json({ success, error: "Wrong credentials password" });
      }

      const data = {
        user: {
          id: user.id,
        }
      }

      const authToken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({ success, authToken });
    }
    catch (error) {
      console.log(error.message);
      return res.status(500).send("some error occured");
    }
  }
);

// Change Password
router.put('/change-password', async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  try {
    // Assuming you have only one user
    const user = await User.findOne();

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid old password' });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);

    await user.save();

    res.json({ message: 'Password changed successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});



//ROUTE - 2 : get login user detail using POST "/api/auth/getuser"  login required
router.post('/getuser', fetchuser, async (req, res) => {
  try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password")
    res.send(user)
  } catch (error) {
    console.log(error.message);
    return res.status(500).send("some error occured");
  }
});


router.post("/tokenIsValid", async (req, res) => {
  try {
    const token = req.header("auth-token");
    if (!token) return res.json(false);
    const verified = jwt.verify(token, JWT_SECRET);
    if (!verified) return res.json(false);
    const user = await User.findById(verified.user.id);
    if (!user) return res.json(false);
    return res.json(true);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;