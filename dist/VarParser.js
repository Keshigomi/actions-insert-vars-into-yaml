"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VarParser = void 0;
class VarParser {
    /**
     * Possibilities:
     * // this is a comment
     * # this is a comment
     *
     * # will create MYVAR2 variable entry and set its value to undefined
     * MYVAR2:
     * # will create MYVAR3 variable entry and set its value to 'some value'
     * MYVAR3: 'some value'
     * @returns a parsed environment variable info object
     */
    parseVars(varLines) {
        return (varLines || []).map(vl => VarParser.parseVarLine(vl))
            .filter(v => !!v)
            .map(v => v);
    }
    static parseVarLine(line) {
        var _a;
        line = line === null || line === void 0 ? void 0 : line.trim();
        if (!line) {
            return undefined;
        }
        const varAndValRegex = /^(?<name>[^:]+)\s*\:\s*(?<value>.*)$/g;
        const matchedGroups = ((_a = varAndValRegex.exec(line)) === null || _a === void 0 ? void 0 : _a.groups) || {};
        const name = matchedGroups["name"];
        const value = matchedGroups["value"];
        // line has no name
        if (!name) {
            return undefined;
        }
        // line has a colon, but no value. set value to undefined
        if (!value) {
            return { Name: name };
        }
        // line has a colon and a value. value may be wrapped in single or double quotes
        else {
            return { Name: name, Value: value };
        }
    }
}
exports.VarParser = VarParser;
