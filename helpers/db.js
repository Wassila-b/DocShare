const config = require("config.json");
const mongoose = require("mongoose");
require('dotenv').config()

const connectionOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
mongoose.connect(
  process.env.MONGODB_URI || config.connectionString,
  connectionOptions
).then(() => {
  console.log('-----> DB connected');
  console.log('-----> API running...');
}).catch(err => {
  console.error('App starting error:', err.stack);
  process.exit(1)
});

mongoose.Promise = global.Promise;

module.exports = {
  User: require("../models/users/user.model"),
  Shoes: require("../models/shoes/shoes.model"),
  Shops: require("../models/shops/shops.model")
};