const express = require('express');
const router = express.Router();
const user = require("../server/models/user");
const skill = require("../server/models/skill");
const userSkills = require("../server/models/user_skills");
const db = require("../server/models").sequelize;
const sequelize = require("sequelize");

router.get("/filterUsers", (req, res) => {
  const {radius=10, lat, long} = req.query;
  console.log(radius);
  console.log(lat);
  console.log(long);
  const query =
    `SELECT min(u.id) as id, u.name, group_concat(s.skill) as skills, min(( 3959 * acos( cos( radians(${parseFloat(lat)}) ) * cos` +
    `( radians( cast(substring_index(u.location, ',', 1) as decimal(10,6)) ) ) * cos( radians( cast(substring_index(u.location, ',', -1)`+
    ` as decimal(10,6)) ) - radians(${parseFloat(long)}) ) + sin( radians(${parseFloat(lat)}) ) * sin( radians( cast(substring_index(u.location, ',', 1)` +
    " as decimal(10,6)) ) ) ) )) AS distance FROM user u" +
    ` inner join user_skills us on u.id = us.user_id inner join skill s on s.id = us.skill_id group by u.name HAVING distance < ${parseInt(radius)} order by` +" distance;";

  db.query(query, { type: db.QueryTypes.SELECT }).then(users => {
    return res.json(users);
  });
});

module.exports = router;
