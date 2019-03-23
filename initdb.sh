#!/bin/sh

# create role node createdb login password 'node';

./node_modules/.bin/sequelize db:create

./node_modules/.bin/sequelize model:generate --name user --attributes name:string,password:string,email:string
./node_modules/.bin/sequelize model:generate --name product --attributes name:string
./node_modules/.bin/sequelize model:generate --name review --attributes content:string

./node_modules/.bin/sequelize db:seed:all