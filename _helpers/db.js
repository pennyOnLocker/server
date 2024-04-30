const express = require("express");
const mongoose = require("mongoose");
const app = express();

const uri = process.env.CONNECTION_STRING;

async function connect() {
  try {
    await mongoose.connect("mongodb+srv://pennyonlocker:pennyOnLockerAdmin1234!@pennyonlocker.q46sdsp.mongodb.net/pol?retryWrites=true&w=majority");
  } catch (error) {
    console.log(error)
  }
}

connect();

mongoose.Promise = global.Promise;

module.exports = {
  Account: require("../model/account"),
  Product: require("../model/product"),
  Store: require("../model/store"),
  Otp: require("../model/otp"),
};
