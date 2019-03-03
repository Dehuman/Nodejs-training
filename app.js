import config from './config/config';
import {Product, User} from './models';
import DirWatcher, {watcherEmitter} from './dirwatcher';
import Importer from './importer';

console.log(`Application name: ${config.name}`);

const product = new Product();
const user = new User();

const dirwatcher = new DirWatcher();
const importer = new Importer(watcherEmitter, jsonContent => console.log(jsonContent));

dirwatcher.watch('./data', '.csv', 5000);