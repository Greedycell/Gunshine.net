const express = require("express")
var app = express()
app.use('/', express.static(__dirname))
app.listen(5000, "0.0.0.0", () => {
  console.log("listening on port 5000");
});