const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const {Error,handlingError}= require('./_helpers/errorHandler')
const MongoDB = require('./config/dbconnect')
require("dotenv").config();

MongoDB();
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

 app.use('/user',require('./routers/userRoute'))
 app.use(Error,handlingError);


const port = 8000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
