import EventEmitter from 'events';
import fs from 'fs';
import path from 'path';
import Set from 'collections/set';

export const watcherEmitter = new EventEmitter();
let processedFiles = new Set();

class DirWatcher {
    watch(pathToWatch, extToWatch, delay) {
        setInterval(() =>
            fs.readdir(pathToWatch, (error, filesInPath) => {
                if (error) {
                    throw error;
                }
                const filesToProcess = new Set(filesInPath).filter(filename => path.extname(filename) === extToWatch);
                const newFiles = filesToProcess.difference(processedFiles);
                if (newFiles.length > 0) {
                    newFiles.forEach(newFile => watcherEmitter.emit('changed', path.join(pathToWatch, newFile)));
                    processedFiles = filesToProcess;
                }
            }), delay);
    }
}

export default DirWatcher;