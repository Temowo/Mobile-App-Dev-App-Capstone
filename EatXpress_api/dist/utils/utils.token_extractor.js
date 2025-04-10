"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenExtractor = void 0;
class TokenExtractor {
    extractTokenFromHeader(request) {
        var _a, _b;
        const [type, token] = (_b = (_a = request.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')) !== null && _b !== void 0 ? _b : [];
        return type === 'Bearer' ? token : undefined;
    }
}
exports.TokenExtractor = TokenExtractor;
//# sourceMappingURL=utils.token_extractor.js.map