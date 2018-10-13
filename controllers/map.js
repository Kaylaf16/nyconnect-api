const router = require("./index");
const user = require("../server/models/user");
const skill = require("../server/models/skill");
const userSkills = require("../server/models/user_skills");
const db = require("../server/models");

router.get("/filterUsers", (req, res) => {
  const { radius, lat, long } = req.body.filters;

  const query =
    "SELECT min(u.id) as id, u.name, group_concat(s.skill) as skills, min(( 3959 * acos( cos( radians(40.7308619) ) * cos" +
    "( radians( cast(substring_index(u.location, ',', 1) as decimal(10,6)) ) ) * cos( radians( cast(substring_index(u.location, ',', -1)" +
    " as decimal(10,6)) ) - radians(-73.9871558) ) + sin( radians(40.7308619) ) * sin( radians( cast(substring_index(u.location, ',', 1)" +
    " as decimal(10,6)) ) ) ) )) AS distance FROM user u" +
    " inner join user_skills us on u.id = us.user_id inner join skill s on s.id = us.skill_id group by u.name HAVING distance < 25 order by distance;";

  db.query(query, { type: sequelize.QueryTypes.SELECT }).then(users => {
    return res.json(users);
  });
});
