'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('reviews', [
            {productId: '1', content: 'review11'},
            {productId: '1', content: 'review12'},
            {productId: '1', content: 'review13'},
            {productId: '2', content: 'review21'},
            {productId: '2', content: 'review22'},
            {productId: '3', content: 'review31'}
        ], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('reviews', null, {});
    }
};
