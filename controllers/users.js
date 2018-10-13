const express = require('express');
const router = express.Router();
const user = require("../server/models/user");
const userSkills = require("../server/models/user_skills");
const db = require("../server/models").sequelize;
const sequelize = require("sequelize");

router.get("/fetchProfile", (req, res) => {
  const id = req.query.id;
  const query = `select u.id, u.name, min(substring_index(u.location, ',', 1)) as lat, min(substring_index(u.location, ',', -1)) as lon, group_concat(s.skill) as skills from user u inner join user_skills us on u.id = us.user_id join skill s on s.id = us.skill_id and u.id = ${parseInt(id)} group by u.name;`;

  db.query(query, { type: db.QueryTypes.SELECT }).then(user => {
    return res.json(user);
  });
});

module.exports = router;