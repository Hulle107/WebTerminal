`use strict`;

import TerminalColor from "./terminalColor";

class TerminalField {
    /**
     * @private
     * @type {TerminalColor}
     */
    _backgroundColor;
    /**
     * @private
     * @type {string}
     */
    _character;
    /**
     * @private
     * @type {TerminalColor}
     */
    _foregroundColor;

    /**
     * 
     */
    get backgroundColor() { return this._backgroundColor; }
    /**
     * 
     */
    get character() { return this._character; }
    /**
     * 
     */
    get foregroundColor() { return this._foregroundColor; }

    /**
     * 
     * @param {string} character 
     * @param {TerminalColor} foregroundColor 
     * @param {TerminalColor} backgroundColor
     * @throws {TypeError}
     * @throws {RangeError}
     */
    constructor(character, foregroundColor, backgroundColor) {
        if (typeof(character) !== `string`) throw new TypeError(`The value of the character parameter got assigned a wrong type.`);
        if (!foregroundColor instanceof TerminalColor) throw new TypeError(`The value of the foregroundColor parameter got assigned a wrong type.`);
        if (!backgroundColor instanceof TerminalColor) throw new TypeError(`The value of the backgroundColor parameter got assigned a wrong type.`);
        if (character.length > 1) throw new RangeError(`The value of the character parameter was not a single char.`);

        this._character = character;
        this._foregroundColor = foregroundColor;
        this._backgroundColor = backgroundColor;
    }
}

export default TerminalField;
export {
    TerminalField
}