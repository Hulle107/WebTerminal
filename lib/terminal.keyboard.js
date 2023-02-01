`use strict`;

import Guard from "./guard";
import Terminal from "./terminal.core";
import TerminalColors from "./terminal.colors";
import TerminalDisplay from "./terminal.display";

/**
 * @typedef {object} TerminalKeyboardOptions
 */

class TerminalKeyboard {
    /**
     * 
     * @param {TerminalKeyboardOptions} options
     * @throws {@link TypeError}
     * @throws {@link ReferenceError}
     */
    constructor(options) {
        Guard.Undefined(options, `The value of the option parameter got assigned as a undefined value.`);
    }
}

export default TerminalKeyboard;
export {
    TerminalKeyboard
}