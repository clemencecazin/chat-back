const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

const formidable = require("express-formidable");

app.use(formidable());
app.use(cors());

const conversation = require("./routes/conversation");
const messages = require("./routes/messages");

app.use(conversation);
app.use(messages);

mongoose.connect("mongodb://localhost/chat", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
});

app.get("/", (req, res) => {
    res.json("API chat");
});

app.all("*", (req, res) => {
    res.status(404).json({ message: "Cette route n'existe pas" });
});

app.listen(3000, () => {
    console.log("Server Started");
});
