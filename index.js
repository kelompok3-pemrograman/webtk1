const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const db = require("./connection");
const response = require("./response");

app.use(bodyParser.json());

app.get("/", (req, res) => {
  db.query("SELECT * FROM developer", (error, result) => {
    if (error) {
      console.error(error);
      res.status(500).send("terjadi kesalahan saat mengambil data dari database");
    } else {
      // hasil dari database mysql

      const responseData = response();
      responseData.payload.status_code = 200;
      responseData.payload.datas = result;
      res.json(responseData);
    }
  });
});

app.get("/hello", (req, res) => {
  console.log({ urlParam: req.body });
  res.send("hello world");
});

app.post("/login", (req, res) => {
  console.log({ requestFromOutside: req.body });
  res.send("login berhasil");
});

app.put("/username", (req, res) => {
  console.log({ updateData: req.body });
  res.send("update berhasil");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

app.delete("/", (req, res) => {
  res.send("DELETE Request Reserved");
});
