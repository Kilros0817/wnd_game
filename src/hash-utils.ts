"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function createHashFunction(hashConstructor: any) {
    return function (msg: any) {
        const hash = hashConstructor();
        hash.update(msg);
        return Buffer.from(hash.digest());
    };
}
exports.createHashFunction = createHashFunction;
//# sourceMappingURL=hash-utils.js.map

export {}