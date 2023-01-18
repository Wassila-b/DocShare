require("rootpath")();
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
//const jwt = require("_helpers/jwt");
const errorHandler = require("_helpers/error-handler");
const PORT = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());


// use JWT auth to secure the api
//app.use(jwt());

// api routes
app.use("/users", require("./models/users/user.controller"));
app.use("/shops", require("./models/shops/shops.controller"));
app.use("/shoes", require("./models/shoes/shoes.controller"));

 
// global error handler
app.use(errorHandler);



app.listen(PORT, () => {
  console.log("-----> Running API server...")
  console.log("-----> Server started on : localhost:" + PORT);
});