const express = require('express');
const mongoose = require("mongoose");
const expressionRouter = require("./routes/index");
const bodyParser = require('body-parser');
const cors = require('cors');

const port = 3000;
const app = express();
app.use(cors());


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.json());


mongoose.connect(
    process.env.MONGODB_URI || "mongodb://localhost/expression",
  );

app.use("/api", expressionRouter);

 
// app.use('/api', api);

app.listen(port, function () {
    console.log("Server is listening at port:" + port);
});