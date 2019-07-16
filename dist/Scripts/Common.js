"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//#region Global Imports
const fs = require("fs");
const logSymbols = require("log-symbols");
const mustache = require("mustache");
const path = require("path");
//#endregion Local Imports
exports.CommonHelper = {
    addToIndex: (params) => {
        fs.appendFile(path.resolve('', params.dirPath), `${params.getFileContent()}\n`, err => {
            if (err)
                throw err;
            console.log(logSymbols.success, params.message);
        });
    },
    createFile: (dirPath) => {
        fs.mkdirSync(path.resolve('', dirPath));
    },
    getTemplate: (templatePath, templateProps) => (
    // __dirname + ../../ path is root of the dist folder.
    mustache.render(fs.readFileSync(path.resolve(__dirname, '../../', templatePath), 'utf8'), templateProps)),
    isAlreadyExist: (startPath, val, isFile) => {
        val = val.replace(/\b\w/g, foo => foo.toUpperCase());
        const _path = isFile ? `${startPath}/${val}.ts` : `${startPath}/${val}`;
        return fs.existsSync(path.resolve('', _path));
    },
    replaceContent: (params) => {
        const replaceFile = params.filetoUpdate.replace(params.regexKey, params.getFileContent());
        const writeFileProps = {
            dirPath: params.fileDir,
            getFileContent: () => replaceFile,
            message: params.message
        };
        exports.CommonHelper.writeFile(writeFileProps);
    },
    writeFile: (params) => {
        fs.writeFile(path.resolve('', params.dirPath), params.getFileContent(), err => {
            if (err)
                throw err;
            console.log(logSymbols.success, params.message);
        });
    }
};
//# sourceMappingURL=Common.js.map