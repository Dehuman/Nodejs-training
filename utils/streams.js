import {access, constants, createReadStream, createWriteStream, readdir} from 'fs';
import {extname, format, join, parse} from 'path';
import {promisify} from 'util';
import commander from 'commander';
import through2 from 'through2';
import csv from 'csvtojson';
import MultiStream from 'multistream';

const readdirPromise = promisify(readdir);

function reverse() {
    let str = '';
    process.stdin.on('data', chunk => str += chunk.toString());
    process.stdin.on('end', () => process.stdout.write([...str].reverse().join('')));
}

function transform() {
    process.stdin
        .pipe(through2(function (chunk, enc, callback) {
            this.push(chunk.toString().toUpperCase());
            callback();
        }))
        .pipe(process.stdout);
}

function outputFile(filePath) {
    access(filePath, constants.R_OK, error => {
        if (error) {
            console.error(`Error: ${filePath} is not exist or not readable`);
            return;
        }
        createReadStream(filePath).pipe(process.stdout);
    });
}

function convertFromFile(filePath) {
    access(filePath, constants.R_OK, error => {
        if (error) {
            console.error(`Error: ${filePath} is not exist or not readable`);
            return;
        }
        createReadStream(filePath).pipe(csv()).pipe(process.stdout);
    });
}

function convertToFile(filePath) {
    access(filePath, constants.R_OK, error => {
        if (error) {
            console.error(`Error: ${filePath} is not exist or not readable`);
            return;
        }

        const filePathObj = parse(filePath);
        filePathObj.ext = '.json';
        delete filePathObj.base;
        const outputFilePath = format(filePathObj);

        createReadStream(filePath).pipe(csv()).pipe(createWriteStream(outputFilePath));
    });
}

function cssBundler(dirPath) {
    access(dirPath, constants.R_OK | constants.W_OK | constants.X_OK, error => {
        if (error) {
            console.error(`Error: ${dirPath} is not exist or not writable`);
            return;
        }

        const finalCss = 'nodejs-homework3.css';
        const bundleCss = 'bundle.css';

        readdirPromise(dirPath)
            .then(files => {
                const cssFiles = files.filter(filename =>
                    extname(filename) === '.css' && filename !== finalCss && filename !== bundleCss);
                cssFiles.push(finalCss);
                const cssStreams = cssFiles.map(cssFile =>
                    () => createReadStream(join(dirPath, cssFile))
                );
                new MultiStream(cssStreams).pipe(createWriteStream(join(dirPath, bundleCss)));
            })
            .catch(error => console.error(error));
    });
}

function printWrongInput() {
    console.log('Wrong input');
    commander.help();
}

commander
    .version('1.0.0')
    .option('-a, --action <action>', 'action name (possible values: reverse, transform, outputFile, convertFromFile, convertToFile, cssBundler)')
    .option('-f, --file <file>', 'file name (for outputFile, convertFromFile, convertToFile actions)')
    .option('-p, --path <path>', 'path to a directory with css files (for the cssBundler action)')
    .parse(process.argv);

if (process.argv.length <= 2) {
    printWrongInput();
}

switch (commander.action) {
    case 'reverse':
        reverse();
        break;
    case 'transform':
        transform();
        break;
    case 'outputFile':
        if (commander.file) {
            outputFile(commander.file);
        } else {
            printWrongInput();
        }
        break;
    case 'convertFromFile':
        if (commander.file) {
            convertFromFile(commander.file);
        } else {
            printWrongInput();
        }
        break;
    case 'convertToFile':
        if (commander.file) {
            convertToFile(commander.file);
        } else {
            printWrongInput();
        }
        break;
    case 'cssBundler':
        if (commander.path) {
            cssBundler(commander.path);
        } else {
            printWrongInput();
        }
        break;
    default:
        printWrongInput();
}