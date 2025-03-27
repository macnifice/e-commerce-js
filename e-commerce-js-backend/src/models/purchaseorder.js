'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PurchaseOrder extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // PurchaseOrder.hasMany(models.PurchaseOrderItem, { foreignKey: 'purchaseOrderId', as: 'purchaseOrderItems' });
      // PurchaseOrder.belongsTo(models.Business, { foreignKey: 'businessId', as: 'business' });
      PurchaseOrder.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
      // PurchaseOrder.belongsTo(models.OrderStatus, { foreignKey: 'statusId', as: 'status' });
    }
  }
  PurchaseOrder.init({
    total: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    subtotal: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    iva: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    statusId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'PurchaseOrder',
  });
  return PurchaseOrder;
};