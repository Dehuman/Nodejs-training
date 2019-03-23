'use strict';
module.exports = (sequelize, DataTypes) =>
    sequelize.define('review', {
        content: DataTypes.STRING
    }, {timestamps: false});