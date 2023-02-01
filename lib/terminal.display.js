`use strict`;

import Guard from "./guard";
import Terminal from "./terminal.core";
import TerminalColors from "./terminal.colors";
import TerminalKeyboard from "./terminal.keyboard";

/**
 * @typedef {object} TerminalDisplayOptions
 * @property {HTMLCanvasElement} canvas
 * @property {number | undefined} canvasWidth
 * @property {number | undefined} canvasHeight
 */

class TerminalDisplay {
    /**
     * 
     * @param {TerminalDisplayOptions} options
     * @throws {@link TypeError}
     * @throws {@link ReferenceError}
     */
    constructor(options) {
        Guard.Undefined(options, `The value of the option parameter got assigned as a undefined value.`);
        Guard.NonInstanceOf(options.canvas, HTMLCanvasElement, `The value of the options.canvas parameter got assigned a wrong type.`);
        Guard.NonNumber(options.canvasWidth, `The value of the options.canvasWidth parameter got assigned a wrong type.`);
        Guard.NonNumber(options.canvasHeight, `The value of the options.canvasHeight parameter got assigned a wrong type.`);
    }
}

export default TerminalDisplay;
export {
    TerminalDisplay
}