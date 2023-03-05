const express = require("express");
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const app = express();
const postCompaniesRouter = require('./routes/postRoutes.js'); 
const postUsersRouter = require('./routes/postUsers.js')
const cors = require("cors");




app.use(cors());
app.use(bodyParser.json({limit:'30mb',extended:true}));
app.use(bodyParser.urlencoded({limit:'30mb',extended:true}));
app.use('/api',postCompaniesRouter);
app.use('/apiusers',postUsersRouter)




let PORT = 5000; 
let password = encodeURIComponent("Merajsultana@13");
const connection_url = `mongodb+srv://abrar14:${password}@cluster0.asgjmaz.mongodb.net/?retryWrites=true&w=majority`;
mongoose
  .connect(connection_url)
  .then(() =>
    app.listen(PORT, () => console.log(`server is running at ${PORT}`))
  )
  .catch((error) => {
    console.log(error.message);
  });