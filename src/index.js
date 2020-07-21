require('./models/User');

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const requireAuth = require('./middlewares/requireAuth');

const app = express();

//body parser should be used before authRoutes to ensure that
//all json info is parsed first and then run request handler
app.use(bodyParser.json());
app.use(authRoutes);

const mongoUri = "mongodb+srv://admin:myp@ssword12@clustertracker.nry3n.mongodb.net/<dbname>?retryWrites=true&w=majority";
//connects to mongoose using your uri and an options object with settings for avoiding errors later.
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});

//code for detecting connection success
mongoose.connection.on('connected', () => {
  console.log("Connected to mongo instance!!!");
});

//code for detecting connection failure
mongoose.connection.on('error', (err) => {
  console.error('Error connectiong to mongo', err);
});

app.get('/', requireAuth, (req, res) => {
  res.send(`Your email: ${req.user.email}`);
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
