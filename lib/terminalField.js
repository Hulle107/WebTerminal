`use strict`;

import Guard from "./guard";
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
     * @throws {@link TypeError}
     * @throws {@link RangeError}
     */
    constructor(character, foregroundColor, backgroundColor) {
        Guard.NonString(character, `The value of the character parameter got assigned a wrong type.`);
        Guard.NonInstanceOf(foregroundColor, TerminalColor, `The value of the foregroundColor parameter got assigned a wrong type.`);
        Guard.NonInstanceOf(backgroundColor, TerminalColor, `The value of the backgroundColor parameter got assigned a wrong type.`);
        Guard.NonChar(character, `The value of the character parameter was not a single char.`);

        this._character = character;
        this._foregroundColor = foregroundColor;
        this._backgroundColor = backgroundColor;
    }
}

export default TerminalField;
export {
    TerminalField
}