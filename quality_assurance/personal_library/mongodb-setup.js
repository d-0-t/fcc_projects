const mongoose = require("mongoose");

const db = mongoose.connect(process.env.MONGO_DB, {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

module.exports = db;