import json from './config/json';
import {Product, User} from './models/models';

console.log(`Application name: ${json.name}`);
const product = new Product();
const user = new User();