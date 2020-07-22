const mongoose = require('mongoose');

//point schema is not being turned into a mongoose.model
//because doing so would create a new db in mongoose for points
//we don't want that so instead we keep it here as an obj essentially
//for trackSchema/db

const pointSchema = new mongoose.Schema({
  timestamp: {
    type: Number
  },
  coords: {
    latitude: Number,
    longitude: Number,
    altitude: Number,
    accuracy: Number,
    heading: Number,
    speed: Number
  }
});

const trackSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  name: {
    type: String,
    default: ''
  },
  locations: {
    type: [pointSchema]
  }
});

mongoose.model("Track", trackSchema);
