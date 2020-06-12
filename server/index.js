const express = require("express");
const app = express();
const port = 5000;
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const config = require("./config/key");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

const connect = mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => console.log("MongoDB connected..."))
  .catch(err => console.log(err));

app.get("/", (req, res) => res.send("Hello World!"));
app.get("/api/hello", (req, res) => res.send("안녕"));

app.use("/api/users", require("./routes/users"));
app.use("/api/video", require("./routes/video"));

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
