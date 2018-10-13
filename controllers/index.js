const express = require('express');
const router = express.Router();
// define routes here

router.use("/map", require("./map.js"));
router.use("/user", require("./users.js"));

module.exports=router;
