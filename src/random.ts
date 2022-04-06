"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var randombytes = require("randombytes");
function getRandomBytes(bytes: any) {
    return new Promise(function (resolve, reject) {
        randombytes(bytes, function (err: any, resp: unknown) {
            if (err) {
                reject(err);
                return;
            }
            resolve(resp);
        });
    });
}
exports.getRandomBytes = getRandomBytes;
function getRandomBytesSync(bytes: any) {
    return randombytes(bytes);
}
exports.getRandomBytesSync = getRandomBytesSync;
//# sourceMappingURL=random.js.map

export {}