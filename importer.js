import {readFile, readFileSync} from 'fs';
import {promisify} from 'util';
import csv from 'csvtojson';

const readFilePromise = promisify(readFile);

class Importer {
    constructor(watcherEmitter, callback) {
        watcherEmitter.on('changed', file => {
            // Asynchronous import
            this.import(file)
                .then(content => this.convertToJSON(content, callback))
                .catch(error => console.error(error));

            // Synchronous import
            // this.convertToJSON(this.importSync(file), callback);
        });
    }

    import(file) {
        return readFilePromise(file, 'utf8');
    }

    importSync(file) {
        try {
            return readFileSync(file, 'utf8');
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    convertToJSON(content, callback) {
        csv().fromString(content).then(callback);
    }
}

export default Importer;