'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Business extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Business.hasMany(models.Product, {
        foreignKey: 'businessId',
        as: 'products',
      });

      Business.belongsTo(models.User, {
        foreignKey: 'id',
        as: 'user',
      });
    }
  }
  Business.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'Business',
  });
  return Business;
};