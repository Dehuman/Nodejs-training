'use strict';
module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define('product', {
        name: DataTypes.STRING
    }, {timestamps: false});
    Product.associate = models => Product.hasMany(models.review, {as: 'reviews'});
    return Product;
};