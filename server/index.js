const express = require("express");
const mongoose = require("mongoose");
const app = express();

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
