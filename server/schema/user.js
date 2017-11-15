export default function (sequelize, DataTypes) {
  return sequelize.define('user', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    user_name: {
      type: DataTypes.VARCHAR(255),
      allowNull: false
    },
    password: {
      type: DataTypes.VARCHAR(255),
      allowNull: false
    }
  }, {
    tableName: 'user'
  })
}
