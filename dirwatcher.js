import EventEmitter from 'events';
import Set from 'collections/set';
import {readdir} from 'fs';
import {extname, join} from 'path';

export const watcherEmitter = new EventEmitter();
let processedFiles = new Set();

class DirWatcher {
    watch(pathToWatch, extToWatch, delay) {
        setInterval(() =>
            readdir(pathToWatch, (error, filesInPath) => {
                if (error) {
                    throw error;
                }
                const filesToProcess = new Set(filesInPath).filter(filename => extname(filename) === extToWatch);
                const newFiles = filesToProcess.difference(processedFiles);
                if (newFiles.length > 0) {
                    newFiles.forEach(newFile => watcherEmitter.emit('changed', join(pathToWatch, newFile)));
                    processedFiles = filesToProcess;
                }
            }), delay);
    }
}

export default DirWatcher;