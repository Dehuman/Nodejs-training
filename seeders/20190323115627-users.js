'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('users', [
            {name: 'user1', password: 'password1', email: 'user1@mail.com'},
            {name: 'user2', password: 'password2', email: 'user2@mail.com'},
            {name: 'user3', password: 'password3', email: 'user3@mail.com'}
        ], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('users', null, {});
    }
};
