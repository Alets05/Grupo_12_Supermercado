'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order_detail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Order, {foreignKey: 'idOrder'});
      this.belongsTo(models.Product, {foreignKey: 'idProduct'});
    }
  };
  Order_detail.init({
    order_idOrder: DataTypes.INTEGER,
    product_idProduct: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Order_detail',
  });
  return Order_detail;
};