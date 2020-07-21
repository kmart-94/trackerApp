const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = mongoose.model('User');

const router = express.Router();

router.post('/signup', async (req, res) => {
  const {email, password} = req.body;

  try {
    const user = new User({email, password});
    await user.save();

    const token = jwt.sign({userId: user._id}, 'MY_SECRET_KEY');
    res.send({token});
  } catch(err) {
    if(err.code === 11000) {
      return res.status(422).send("You used a duplicate email, please try again with unique credentials.");
    }
    else {
      return res.status(422).send("An unknown error occured. Did enter in all the correct fields?");
    }

  }

});

module.exports = router;
