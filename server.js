  // require('dotenv').config();
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const bodyParser = require('body-parser');
const express = require("express");
const PORT = process.env.PORT || 3001;
const routes = require("./routes")
const app = express();

// Mongoose stuff
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/', {useMongoClient: true});

// Define middleware here
app.use(favicon(path.join(__dirname, 'client/public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));
app.use(express.static(path.resolve(__dirname, 'client', 'build')));

app.use(function(req, res, next) {
  // before every route, attach the flash messages and current user to res.locals
  res.locals.currentUser = req.user;
  next();
});
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Define API routes here
// app.use('/auth', require('./routes/auth'));
// app.use('/saved', require('./routes/saved'));
app.use(routes)


// Send every other request to the React app
// Define any API routes before this runs
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
module.exports = app;