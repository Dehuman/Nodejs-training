import json from './config/config';
import {Product, User} from './models';

console.log(`Application name: ${json.name}`);
const product = new Product();
const user = new User();