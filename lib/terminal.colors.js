'use strict';

/**
 * @typedef {object} TerminalColor
 * @property {string} name
 * @property {string} styleString
 */

const TerminalColors = {
    /**
     * The color black.
     * @type {TerminalColor}
     */
    black: { name:'black', styleString: 'black' },
    /**
     * The color blue.
     * @type {TerminalColor}
     */
    blue: { name:'blue', styleString: 'blue' },
    /**
     * The color cyan (blue-green).
     * @type {TerminalColor}
     */
    cyan: { name:'cyan', styleString: 'cyan' },
    /**
     * The color dark blue.
     * @type {TerminalColor}
     */
    darkBlue: { name:'darkBlue', styleString: 'darkblue' },
    /**
     * The color dark cyan (dark blue-green).
     * @type {TerminalColor}
     */
    darkCyan: { name:'darkCyan', styleString: 'darkcyan' },
    /**
     * The color dark gray.
     * @type {TerminalColor}
     */
    darkGray: { name:'darkGray', styleString: 'gray' },
    /**
     * The color dark green.
     * @type {TerminalColor}
     */
    darkGreen: { name:'darkGreen', styleString: 'darkgreen' },
    /**
     * The color dark magenta (dark purplish-red).
     * @type {TerminalColor}
     */
    darkMagenta: { name:'darkMagenta', styleString: 'darkmagenta' },
    /**
     * The color dark red.
     * @type {TerminalColor}
     */
    darkRed: { name:'darkRed', styleString: 'darkred' },
    /**
     * The color dark yellow (ochre).
     * @type {TerminalColor}
     */
    darkYellow: { name:'darkYellow', styleString: 'darkyellow' },
    /**
     * The color gray.
     * @type {TerminalColor}
     */
    gray: { name:'gray', styleString: 'darkgray' },
    /**
     * The color green.
     * @type {TerminalColor}
     */
    green: { name:'green', styleString: 'green' },
    /**
     * The color magenta (purplish-red).
     * @type {TerminalColor}
     */
    magenta: { name:'magenta', styleString: 'magenta' },
    /**
     * The color red.
     * @type {TerminalColor}
     */
    red: { name:'red', styleString: 'red' },
    /**
     * The color white.
     * @type {TerminalColor}
     */
    white: { name:'white', styleString: 'white' },
    /**
     * The color yellow.
     * @type {TerminalColor}
     */
    yellow: { name:'yellow', styleString: 'yellow' },
}

export default TerminalColors;
export {
    TerminalColors
}