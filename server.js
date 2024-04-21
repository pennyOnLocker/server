require("rootpath")();
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
// const jwt = require("_helpers/jwt");
const routes = require('routes/controllers');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use('/static/', express.static('static'))

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

app.use('/api/', routes);

const port =
  process.env.NODE_ENV === "production" ? process.env.PORT || 80 : 8000;
const server = app.listen(port, function () {
});
