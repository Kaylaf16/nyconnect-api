const express = require('express');
const router = express.Router();
// define routes here

router.use("/map", require("./map.js"));

module.exports=router;
