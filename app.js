const express = require('express');
const app = express();
const port = 3000;

const postsRouter = require("./routes/posts");
const commentsRouter = require("./routes/comments.js");

const connect = require("./schemas");
connect();


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("assets"));
app.use("/api", [postsRouter, commentsRouter]);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(port, '포트로 서버가 열렸어요!');
});