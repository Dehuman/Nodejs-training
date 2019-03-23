import DirWatcher, {watcherEmitter} from './dirwatcher';
import Importer from './importer';

const dirwatcher = new DirWatcher();
const importer = new Importer(watcherEmitter, jsonContent => console.log(jsonContent));

dirwatcher.watch('./data', '.csv', 5000);