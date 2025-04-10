"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StringGenerator = void 0;
class StringGenerator {
    generateRandomString(length = 8) {
        const Chars = '#@^!_|?/<>&$~0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let randomString = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * Chars.length);
            randomString += Chars[randomIndex];
        }
        return randomString;
    }
}
exports.StringGenerator = StringGenerator;
//# sourceMappingURL=utils.string_generator.js.map