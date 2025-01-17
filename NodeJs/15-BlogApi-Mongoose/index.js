"use strict";

const express = require("express");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT;

app.use(express.json());
require("./src/configs/dbConnection");

// HomePage:
app.all("/", (req, res) => {
  res.send(
    "<h1 style='text-align:center;margin-top:150px'>WELCOME TO BLOG API</h1>"
  );
});
app.use("/blog", require("./src/routes/blogRoute")); //path "/blog" oldugunda blogRoute sayfasina git. Orada tanimlanan pathlari "/blog" sonuna ekle. calistir. Burada "/blog" blogRoute bir CRUD metoduyla tanimlanmadi, blogRoute sayfasindaki pathlarin baslangic yolu.--> "http://127.0.0.1:8000/blog/" hata döndürüyor

// errorHandler:
app.use(require("./src/middlewares/errorHandler"));

app.listen(PORT, () => console.log("Running: http://127.0.0.1:" + PORT));
