const express = require('express');
const mongoose = require('mongoose');
const requireAuth = require('../middlewares/requireAuth');

const Track = mongoose.model('Track');
const jwt = require('jsonwebtoken');

const router = express.Router();
router.use(requireAuth);

router.get('/tracks', async (req, res) => {
  const tracks = await Track.find({userId: req.user._id});
  res.send(tracks);
});

router.post('/tracks', async(req, res) => {
  const {name, locations} = req.body;
  const userId = req.user._id;

  if (!name || !locations) {
    return res.status(422).send({error: 'You must provide a name and locations.'});
  }

  try {
    const track = new Track({userId, name, locations});
    await track.save();
    res.send(track);
  } catch(err) {
      return res.status(422).send("An unknown error occured. Did you enter in all the correct fields?");
  }
});

module.exports = router;
