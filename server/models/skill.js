/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('skill', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    skill: {
      type: DataTypes.STRING(256),
      allowNull: true
    }
  }, {
    tableName: 'skill'
  });
};
