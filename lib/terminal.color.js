'use strict';

import Guard from "./guard";

class TerminalColor {
    /**
     * @private
     * @type {string}
     */
    _color;

    /**
     * Get or set a string representing the color.
     */
    get color() { return this._color; }
    /**
     * @throws {@link TypeError}
     */
    set color(value) {
        Guard.NonString(value, `The value of the color parameter got assigned a wrong type.`);

        this._color = value;
    }

    /**
     * 
     * @param {string} color The CSS color as a string
     * @throws {@link TypeError}
     */
    constructor(color) {
        Guard.NonString(color, `The value of the color parameter got assigned a wrong type.`);

        this._color = color;
    }
}

const TerminalColors = {
    /**
     * The color black.
     */
    black: new TerminalColor('black'),
    /**
     * The color blue.
     */
    blue: new TerminalColor('blue'),
    /**
     * The color cyan (blue-green).
     */
    cyan: new TerminalColor('cyan'),
    /**
     * The color dark blue.
     */
    darkBlue: new TerminalColor('darkblue'),
    /**
     * The color dark cyan (dark blue-green).
     */
    darkCyan: new TerminalColor('darkcyan'),
    /**
     * The color dark gray.
     */
    darkGray: new TerminalColor('gray'),
    /**
     * The color dark green.
     */
    darkGreen: new TerminalColor('darkgreen'),
    /**
     * The color dark magenta (dark purplish-red).
     */
    darkMagenta: new TerminalColor('darkmagenta'),
    /**
     * The color dark red.
     */
    darkRed: new TerminalColor('darkred'),
    /**
     * The color dark yellow (ochre).
     */
    darkYellow: new TerminalColor('darkyellow'),
    /**
     * The color gray.
     */
    gray: new TerminalColor('darkgray'),
    /**
     * The color green.
     */
    green: new TerminalColor('green'),
    /**
     * The color magenta (purplish-red).
     */
    magenta: new TerminalColor('magenta'),
    /**
     * The color red.
     */
    red: new TerminalColor('red'),
    /**
     * The color white.
     */
    white: new TerminalColor('white'),
    /**
     * The color yellow.
     */
    yellow: new TerminalColor('yellow')
}

export default TerminalColor;
export {
    TerminalColor,
    TerminalColors
}