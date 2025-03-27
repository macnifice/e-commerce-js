'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      OrderItem.belongsTo(models.PurchaseOrder, { foreignKey: 'purchaseOrderId', as: 'purchaseOrder' });
      OrderItem.belongsTo(models.Product, { foreignKey: 'productId', as: 'product' });
    }
  }
  OrderItem.init({
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    subtotal: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    purchaseOrderId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'OrderItem',
  });
  return OrderItem;
};