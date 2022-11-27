const mongoose = require('mongoose')
const DB = process.env.database

mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(() => {
    console.log("connected deatabase");
  }).catch((e) => {
    console.log(e, "faild to conect to database");
  });

module.exports = mongoose 