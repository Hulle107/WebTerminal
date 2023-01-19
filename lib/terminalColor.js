'use strict';

class TerminalColor {
    /**
     * @private
     * @type {string}
     */
    _colorString;

    /**
     * Get a value representing the color.
     */
    get colorString() { return this._colorString; }

    /**
     * 
     * @param {string} colorString The CSS color as a string
     */
    constructor(colorString) {
        this._colorString = colorString;
    }
}

/**
 * The color black.
 */
TerminalColor.Black = new TerminalColor(`black`);

/**
 * The color blue.
 */
TerminalColor.Blue = new TerminalColor(`blue`);

/**
 * The color cyan (blue-green).
 */
TerminalColor.Cyan = new TerminalColor(`cyan`);

/**
 * The color dark blue.
 */
TerminalColor.DarkBlue = new TerminalColor(`darkblue`);

/**
 * The color dark cyan (dark blue-green).
 */
TerminalColor.DarkCyan = new TerminalColor(`darkcyan`);

/**
 * The color dark gray.
 */
TerminalColor.DarkGray = new TerminalColor(`gray`);

/**
 * The color dark green.
 */
TerminalColor.DarkGreen = new TerminalColor(`darkgreen`);

/**
 * The color dark magenta (dark purplish-red).
 */
TerminalColor.DarkMagenta = new TerminalColor(`darkmagenta`);

/**
 * The color dark red.
 */
TerminalColor.DarkRed = new TerminalColor(`darkred`);

/**
 * The color dark yellow (ochre).
 */
TerminalColor.DarkYellow = new TerminalColor(`darkyellow`);

/**
 * The color gray.
 */
TerminalColor.Gray = new TerminalColor(`darkgray`);

/**
 * The color green.
 */
TerminalColor.Green = new TerminalColor(`green`);

/**
 * The color magenta (purplish-red).
 */
TerminalColor.Magenta = new TerminalColor(`magenta`);

/**
 * The color red.
 */
TerminalColor.Red = new TerminalColor(`red`);

/**
 * The color white.
 */
TerminalColor.White = new TerminalColor(`white`);

/**
 * The color yellow.
 */
TerminalColor.Yellow = new TerminalColor(`yellow`);

export default TerminalColor;
export {
    TerminalColor
}