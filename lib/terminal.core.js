`use strict`;

import Guard from "./guard";
import TerminalColors from "./terminal.colors";
import TerminalDisplay from "./terminal.display";
import TerminalKeyboard from "./terminal.keyboard";

const COMPARE_TERMINAL_COLOR = {
    name: ``,
    styleString: ``
}
const EMPTY_CHARACTER = ``;
const DEFUALT_BACKGROUND_COLOR = TerminalColors.black;
const DEFAULT_FOREGROUND_COLOR = TerminalColors.white;

/**
* @typedef {object} TerminalSize
* @property {number} width
* @property {number} height
*/

/**
 * @typedef {object} TerminalCoordinate
 * @property {number} left
 * @property {number} top
 */

/**
 * @typedef {object} TerminalArea
 * @property {number} left
 * @property {number} top
 * @property {number} width
 * @property {number} height
 */

/**
 * @typedef {object} TerminalKeyInfo
 * @property {number} keyCode
 * @property {string} character
 */

/**
 * @typedef {object} TerminalField
 * @property {string} character
 * @property {TerminalColor} backgroundColor
 * @property {TerminalColor} foregroundColor
 */

/**
 * @typedef {object} TerminalColor
 * @property {string} name
 * @property {string} styleString
 */

/**
 * @typedef {object} TerminalOptions
 * @property {TerminalColor | undefined} defualtBackgroundColor
 * @property {TerminalColor | undefined} defualtForegroundColor
 * @property {TerminalDisplay | undefined} terminalDisplay
 * @property {TerminalKeyboard | undefined} terminalKeyboard
 */

class Terminal {

    /**
     * @private
     * @type {TerminalColor}
     */
    _backgroundColor;
    /**
     * @private
     * @type {TerminalField[]}
     */
    _buffer;
    /**
     * @private
     * @type {number}
     */
    _bufferHeight;
    /**
     * @private
     * @type {number}
     */
    _bufferWidth;
    /**
     * @private
     * @type {number}
     */
    _cursorLeft;
    /**
     * @private
     * @type {number}
     */
    _cursorSize;
    /**
     * @private
     * @type {number}
     */
    _cursorTop;
    /**
     * @private
     * @type {boolean}
     */
    _cursorVisible;
    /**
     * @private
     * @type {TerminalColor}
     */
    _defualtBackgroundColor;
    /**
     * @private
     * @type {TerminalColor}
     */
    _defualtForegroundColor;
    /**
     * @private
     * @type {TerminalDisplay}
     */
    _display;
    /**
     * @private
     * @type {TerminalColor}
     */
    _foregroundColor;
    /**
     * @private
     * @type {TerminalKeyboard}
     */
    _keyboard;
    /**
     * @private
     * @type {number}
     */
    _windowHeight;
    /**
     * @private
     * @type {number}
     */
    _windowLeft;
    /**
     * @private
     * @type {number}
     */
    _windowTop;
    /**
     * @private
     * @type {number}
     */
    _windowWidth;

    /**
     * Gets or sets the background color of the terminal.
     */
    get backgroundColor() { return this._backgroundColor; }
    /**
     * @throws {@link TypeError}
     */
    set backgroundColor(value) {
        Guard.NonSpecifikObject(value, COMPARE_TERMINAL_COLOR, `The value of the backgroundColor property got assigned a wrong type.`);

        this._backgroundColor = value;
    }

    /**
     * Gets or sets the height of the buffer area.
     * @type {number}
     */
    get bufferHeight() { 
        return this._bufferHeight; 
    }
    /**
     * @throws {@link TypeError}
     * @throws {@link RangeError}
     */
    set bufferHeight(value) {
        Guard.NonNumber(value, `The value of the bufferHeight property got assigned a wrong type.`);
        Guard.NegativeOrZero(value, `The value of the bufferHeight property is less than or equal to zero.`);
        Guard.BiggerThenOrEqual(value, Number.MAX_SAFE_INTEGER, `The value of the bufferHeight property is greater than or equal to Number.MAX_SAFE_INTEGER.`);
        Guard.LessThen(value, this._windowTop + this._windowHeight, `The value of the bufferHeight property is less than the windowTop property plus the windowHeight property.`);

        if (this._bufferHeight === value) return;

        let currentWidth = this._bufferWidth;
        let currentHeight = this._bufferHeight;

        this._bufferHeight = value;
        this._resizeBuffer(currentWidth, currentHeight);
    }

    /**
     * Gets or sets the width of the buffer area.
     */
    get bufferWidth() { return this._bufferWidth; }
    /**
     * @throws {@link TypeError}
     * @throws {@link RangeError}
     */
    set bufferWidth(value) {
        Guard.NonNumber(value, `The value of the bufferWidth property got assigned a wrong type.`);
        Guard.NegativeOrZero(value, `The value of the bufferWidth property is less than or equal to zero.`);
        Guard.BiggerThenOrEqual(value, Number.MAX_SAFE_INTEGER, `The value of the bufferWidth property is greater than or equal to Number.MAX_SAFE_INTEGER.`);
        Guard.LessThen(value, this._windowLeft + this._windowWidth, `The value of the bufferWidth property is less than the windowLeft property plus the windowWidth property.`);

        if (this._bufferWidth === value) return;

        let currentWidth = this._bufferWidth;
        let currentHeight = this._bufferHeight;

        this._bufferWidth = value;
        this._resizeBuffer(currentWidth, currentHeight);
    }

    /**
     * Gets or sets the column position of the cursor within the buffer area.
     */
    get cursorLeft() { return this._cursorLeft; }
    /**
     * @throws {@link TypeError}
     * @throws {@link RangeError}
     */
    set cursorLeft(value) {
        Guard.NonNumber(value, `The value of the cursorLeft property got assigned a wrong type.`);
        Guard.Negative(value, `The value of the cursorLeft property is less than zero.`);
        Guard.BiggerThen(value, this._bufferWidth, `The value of the cursorLeft property is greater than or equal to bufferWidth.`);

        if (this._cursorLeft === value) return;

        this._cursorLeft = value;
    }

    /**
     * Gets or sets the height of the cursor within a character cell.
     */
    get cursorSize() { return this._cursorSize; }
    /**
     * @throws {@link TypeError}
     * @throws {@link RangeError}
     */
    set cursorSize(value) {
        Guard.NonNumber(value, `The value of the cursorSize property got assigned a wrong type.`);
        Guard.LessThen(value, 1, `The value of the cursorSize property is less than one.`);
        Guard.BiggerThen(value, 100, `The value of the cursorSize property is greater than hundred.`);

        if (this._cursorSize === value) return;

        this._cursorSize = value;
    }

    /**
     * Gets or sets the row position of the cursor within the buffer area.
     */
    get cursorTop() { return this._cursorTop; }
    /**
     * @throws {@link TypeError}
     * @throws {@link RangeError}
     */
    set cursorTop(value) {
        Guard.NonNumber(value, `The value of the cursorTop property got assigned a wrong type.`);
        Guard.Negative(value, `The value of the cursorTop property is less than zero.`);
        Guard.BiggerThenOrEqual(value, this._bufferHeight, `The value of the cursorTop property is greater than or equal to bufferHeight.`);

        if (this._cursorTop === value) return;

        this._cursorTop = value;
    }

    /**
     * Gets or sets a value indicating whether the cursor is visible.
     * @type {boolean}
     */
    get cursorVisible() { return this._cursorVisible; }
    /**
     * @throws {@link TypeError}
     */
    set cursorVisible(value) {
        Guard.NonBoolean(value, `The value of the foregroundColor property got assigned a wrong type.`);

        if (value) this._cursorVisible = true;
        else this._cursorVisible = false;
    }

    /**
     * Gets or sets the foreground color of the terminal.
     * @type {TerminalColor}
     */
    get foregroundColor() { return this._foregroundColor; }
    /**
     * @throws {@link TypeError}
     */
    set foregroundColor(value) {
        Guard.NonSpecifikObject(value, COMPARE_TERMINAL_COLOR, `The value of the foregroundColor property got assigned a wrong type.`);

        this._foregroundColor = value;
    }

    /**
     * Gets or sets the height of the terminal window area.
     */
    get windowHeight() { return this._windowHeight; }
    /**
     * @throws {@link TypeError}
     * @throws {@link RangeError}
     */
    set windowHeight(value) {
        Guard.NonNumber(value, `The value of the windowHeight property got assigned a wrong type.`);
        Guard.NegativeOrZero(value, `The value of the windowHeight property is less than or equal to zero.`);
        Guard.BiggerThenOrEqual(value + this.windowTop, Number.MAX_SAFE_INTEGER, `The value of the windowHeight property plus the value of the windowTop property is greater than or equal to Number.MAX_SAFE_INTEGER.`);
        Guard.BiggerThen(value, this.largestWindowHeight, `The value of the windowHeight property is greater than the largest possible window height for the current screen resolution and font.`);

        if (this._windowHeight === value) return;

        this._windowHeight = value;
        // MISSING Call to display to update size of canvas.
    }

    /**
     * Gets or sets the leftmost position of the terminal window area relative to the screen buffer.
     */
    get windowLeft() { return this._windowLeft; }
    /**
     * @throws {@link TypeError}
     * @throws {@link RangeError}
     */
    set windowLeft(value) {
        Guard.NonNumber(value, `The value of the windowLeft property got assigned a wrong type.`);
        Guard.Negative(value, `The value of the windowLeft property is less than zero.`);
        Guard.BiggerThen(value + this._windowWidth, this._bufferWidth, `The value of the windowLeft property plus the value of the windowWidth property is greater than bufferWidth.`);

        if (this._windowLeft === value) return;

        this._windowLeft = value;
        // MISSING Call to display to move viewed area.
    }

    /**
     * Gets or sets the top position of the terminal window area relative to the screen buffer.
     */
    get windowTop() { return this._windowTop; }
    /**
     * @throws {@link TypeError}
     * @throws {@link RangeError}
     */
    set windowTop(value) {
        Guard.NonNumber(value, `The value of the windowTop property got assigned a wrong type.`);
        Guard.Negative(value, `The value of the windowTop property is less than zero.`);
        Guard.BiggerThen(value + this._windowHeight, this._bufferHeight, `The value of the windowTop property plus the value of the windowHeight property is greater than bufferHeight.`);

        if (this._windowTop === value) return;

        this._windowTop = value;
        // MISSING Call to display to move viewed area.
    }

    /**
     * Gets or sets the width of the terminal window.
     */
    get windowWidth() { return this._windowWidth; }
    /**
     * @throws {@link TypeError}
     * @throws {@link RangeError}
     */
    set windowWidth(value) {
        Guard.NonNumber(value, `The value of the windowWidth property got assigned a wrong type.`);
        Guard.NegativeOrZero(value, `The value of the windowWidth property is less than or equal to zero.`);
        Guard.BiggerThenOrEqual(value + this._windowLeft, Number.MAX_SAFE_INTEGER, `The value of the windowWidth property plus the value of the windowLeft property is greater than or equal to Number.MAX_SAFE_INTEGER.`);
        Guard.BiggerThen(value, this.largestWindowWidth, `The value of the windowWidth property is greater than the largest possible window width for the current screen resolution and font.`);

        if (this._windowWidth === value) return;

        this._windowWidth = value;
        // MISSING Call to display to update size of canvas.
    }

    /**
     * Gets the buffer of the terminal.
     */
    get buffer() {
        return this._buffer;
    }

    /**
     * Gets a value indicating whether the CAPS LOCK keyboard toggle is turned on or turned off.
     */
    get capsLock() {
        
    }

    /**
     * Gets a value indicating whether a key press is available in the input stream.
     */
    get keyAvailable() {

    }

    /**
     * The height of the largest possible terminal window measured in rows.
     */
    get largestWindowHeight() {

    }

    /**
     * The width of the largest possible terminal window measured in columns.
     */
    get largestWindowWidth() {

    }

    /**
     * Gets a value indicating whether the NUM LOCK keyboard toggle is turned on or turned off.
     */
    get numberLock() {

    }

    /**
     * 
     * @param {TerminalOptions} options
     * @throws {@link TypeError}
     * @throws {@link ReferenceError}
     */
    constructor(options) {
        Guard.Undefined(options, `The value of the option parameter got assigned as a undefined value.`);

        this._defualtBackgroundColor = DEFUALT_BACKGROUND_COLOR;
        this._defualtForegroundColor = DEFAULT_FOREGROUND_COLOR;
        this._display = new TerminalDisplay({});

        if (options.defualtBackgroundColor) {
            Guard.NonSpecifikObject(options.defualtBackgroundColor, COMPARE_TERMINAL_COLOR, `The value of the options.defualtBackgroundColor parameter got assigned a wrong type.`);
            this._defualtBackgroundColor = options.defualtBackgroundColor;
        }

        if (options.defualtForegroundColor) {
            Guard.NonSpecifikObject(options.defualtForegroundColor, COMPARE_TERMINAL_COLOR, `The value of the options.defualtForegroundColor parameter got assigned a wrong type.`);
            this._defualtForegroundColor = options.defualtForegroundColor;
        }

        if (options.terminalDisplay) {
            Guard.NonInstanceOf(options.terminalDisplay, TerminalDisplay, `The value of the options.defualtForegroundColor parameter got assigned a wrong type.`);
            this._display = options.terminalDisplay;
        }

        this._resizeBuffer();
        this._display = new TerminalDisplay(displayOptions);
        this._keyboard = new TerminalKeyboard();
    }

    /**
     * Create an empty field.
     * @private
     */
    _createEmptyField() {
        return { character: EMPTY_CHARACTER, backgroundColor: this._backgroundColor, foregroundColor: this._foregroundColor };
    }

    /**
     * Resize the buffer of the terminal.
     * @param {number} currentWidth
     * @param {number} currentHeight
     * @throws {@link TypeError}
     * @throws {@link RangeError}
     * @private
     */
    _resizeBuffer(currentWidth, currentHeight) {
        Guard.NonNumber(currentWidth, `The value of the currentWidth parameter got assigned a wrong type.`);
        Guard.NonNumber(currentHeight, `The value of the currentHeight parameter got assigned a wrong type.`);
        Guard.NegativeOrZero(currentWidth, `The value of the currentWidth parameter is less than or equal to zero.`);
        Guard.NegativeOrZero(currentHeight, `The value of the currentHeight parameter is less than or equal to zero.`);

        let width = this._bufferWidth;
        let height = this._bufferHeight;
        let size = this._bufferWidth * this._bufferHeight;
        let newBuffer = [...Array(size)].fill(this._createEmptyField());
        let oldBufferAs2dArray = [...Array(currentHeight)].map(_=>Array(currentWidth).fill(new TerminalField()));
        let oldLength = this._buffer.length;

        for (let i = 0; i < size; i++) {
            y = i / currentWidth;
            x = i % currentWidth;

            oldBufferAs2dArray[y][x] = this._buffer[i];
        }

        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                let index = y * width + x;
                if (index >= oldLength) break;
                
                newBuffer[index] = oldBufferAs2dArray[y][x];
            }
        }

        this._buffer = newBuffer;
    }

    /**
     * Clears the terminal buffer and corresponding terminal window of display information.
     */
    Clear() {
        for (let i = 0; i < this._buffer.length; i++) {
            this._buffer[i] = this._createEmptyField();
        }
    }

    /**
     * Gets the position of the cursor.
     * @returns {TerminalCoordinate}
     */
    GetCursorPosition() { 
        return { 
            left: this._cursorLeft, 
            top: this._cursorTop 
        };
    }

    /**
     * Copies a specified source area of the screen buffer to a specified destination area.
     * @param {TerminalArea} sourceArea The source area to move.
     * @param {TerminalCoordinate} targetCoordinate The target coordinate of the source area.
     * @param {TerminalField} replace The properties used to fill the source area.
     * @throws {@link TypeError}
     * @throws {@link RangeError}
     */
    MoveBufferArea(sourceArea, targetCoordinate, replace = this._createEmptyField()) {
        Guard.NonObject(sourceArea, `The value of the sourceArea parameter get assigned a non object.`);
        Guard.NonObject(targetCoordinate, `The value of the targetCoordinate parameter get assigned a non object.`);
        Guard.NonObject(replace, `The value of the replace parameter get assigned a non object.`);
        Guard.NonNumber(sourceArea.left, `The value of the sourceArea.left parameter got assigned a wrong type.`);
        Guard.NonNumber(sourceArea.top, `The value of the sourceArea.top parameter got assigned a wrong type.`);
        Guard.NonNumber(sourceArea.width, `The value of the sourceArea.width parameter got assigned a wrong type.`);
        Guard.NonNumber(sourceArea.height, `The value of the sourceArea.height parameter got assigned a wrong type.`);
        Guard.NonNumber(targetCoordinate.left, `The value of the targetCoordinate.left parameter got assigned a wrong type.`);
        Guard.NonNumber(targetCoordinate.top, `The value of the targetCoordinate.top parameter got assigned a wrong type.`);
        Guard.NonString(replace.character, `The value of the replace.character parameter got assigned a wrong type.`);
        Guard.NonSpecifikObject(replace.backgroundColor, COMPARE_TERMINAL_COLOR, `The value of the replace.backgroundColor parameter got assigned a wrong type.`);
        Guard.NonSpecifikObject(replace.foregroundColor, COMPARE_TERMINAL_COLOR, `The value of the replace.foregroundColor parameter got assigned a wrong type.`);
        Guard.Negative(sourceArea.left, `The value of the sourceArea.left parameter is less than zero.`);
        Guard.Negative(sourceArea.top, `The value of the sourceArea.top parameter is less than zero.`);
        Guard.Negative(sourceArea.width, `The value of the sourceArea.width parameter is less than zero.`);
        Guard.Negative(sourceArea.height, `The value of the sourceArea.height parameter is less than zero.`);
        Guard.Negative(targetCoordinate.left, `The value of the targetCoordinate.left parameter is less than zero.`);
        Guard.Negative(targetCoordinate.top, `The value of the targetCoordinate.top parameter is less than zero.`);
        Guard.BiggerThenOrEqual(sourceArea.left, this._bufferWidth, `The value of the sourceArea.left parameter is greater than or equal to bufferWidth.`);
        Guard.BiggerThenOrEqual(sourceArea.top, this._bufferHeight, `The value of the sourceArea.top parameter is greater than or equal to bufferHeight.`);
        Guard.BiggerThenOrEqual(targetCoordinate.left, this._bufferWidth, `The value of the targetCoordinate.left parameter is greater than or equal to bufferWidth.`);
        Guard.BiggerThenOrEqual(targetCoordinate.top, this._bufferHeight, `The value of the targetCoordinate.top parameter is greater than or equal to bufferWidth.`);
        Guard.BiggerThenOrEqual(sourceArea.left + sourceArea.width, this._bufferWidth, `The value of the sourceArea.left parameter plus the value of the sourceArea.width parameter is greater than or equal to bufferWidth.`);
        Guard.BiggerThenOrEqual(sourceArea.top + sourceArea.height, this._bufferHeight, `The value of the sourceArea.top parameter plus the value of the sourceArea.height parameter is greater than or equal to bufferHeight.`);
        Guard.NonChar(replace.character, `The value of the replace.character parameter was not a single char.`);

        if (sourceArea.left === targetCoordinate.left && sourceArea.top === targetCoordinate.top) return;

        let width = this._bufferWidth;
        let size = sourceArea.width * sourceArea.height;
        let buffer = [...Array(size)];

        for (let y = sourceArea.top; y < sourceArea.top + sourceArea.height; y++) {
            for (let x = sourceArea.left; x < sourceArea.left + sourceArea.width; x++) {
                let index = y * width + y;
                let offsetY = y - sourceArea.top;
                let offsetX = x - sourceArea.left;
                let offsetIndex = offsetY * width + offsetX;

                buffer[offsetIndex] = this._buffer[index];
                this._buffer[index] = {...replace};
            }
        }

        for (let y = targetCoordinate.top; y < targetCoordinate.top + sourceArea.height; y++) {
            for (let x = targetCoordinate.left; x < targetCoordinate.left + sourceArea.width; x++) {
                let index = y * width + x;
                let offsetY = y - targetCoordinate.top;
                let offsetX = x - targetCoordinate.left;
                let offsetIndex = offsetY * width + offsetX;

                this._buffer[index] = buffer[offsetIndex];
            }
        }
    }

    /**
     * Obtains the next character or function key pressed by the user. The pressed key is displayed in the terminal window.
     * @param {boolean} intercept Determines whether to display the pressed key in the terminal window. `true` to not display the pressed key; otherwise, `false`.
     * @throws {@link TypeError}
     */
    async Read(intercept = false) {
        Guard.NonBoolean(intercept, `The value of the intercept parameter got assigned a wrong type.`);
    }

    /**
     * Obtains the next line of characters pressed by the user and is ended by the `Enter` key. The pressed keys is displayed in the terminal window.
     * @param {boolean} intercept Determines whether to display the pressed keys in the terminal window. `true` to not display the pressed keys; otherwise, `false`.
     * @throws {@link TypeError}
     */
    async ReadLine(intercept = false) {
        Guard.NonBoolean(intercept, `The value of the intercept parameter got assigned a wrong type.`);
    }

    /**
     * Sets the foreground and background terminal colors to their defaults.
     */
    ResetColor() {
        this._foregroundColor = this._defualtBackgroundColor;
        this._backgroundColor = this._defualtForegroundColor;
    }

    /**
     * Sets the height and width of the screen buffer area to the specified values.
     * @param {TerminalSize} size The size of the buffer area measured in columns and rows.
     * @throws {@link TypeError}
     * @throws {@link RangeError}
     */
    SetBufferSize(size) {
        Guard.NonObject(size, `The value of the size parameter get assigned a non object.`);
        Guard.NonNumber(size.width, `The value of the size.width parameter got assigned a wrong type.`);
        Guard.NonNumber(size.height, `The value of the size.height parameter got assigned a wrong type.`);
        Guard.NegativeOrZero(size.width, `The value of the size.width parameter is less than or equal to zero.`);
        Guard.NegativeOrZero(size.height, `The value of the size.height parameter is less than or equal to zero.`);
        Guard.BiggerThenOrEqual(size.width, Number.MAX_SAFE_INTEGER, `The value of the size.width parameter is greater than or equal to Number.MAX_SAFE_INTEGER.`);
        Guard.BiggerThenOrEqual(size.height, Number.MAX_SAFE_INTEGER, `The value of the size.height parameter is greater than or equal to Number.MAX_SAFE_INTEGER.`);
        Guard.LessThen(size.width, this._windowLeft + this._windowWidth, `The value of the size.width parameter is less than the windowLeft property plus the windowWidth property.`);
        Guard.LessThen(size.height, this._windowTop + this._windowHeight, `The value of the size.height parameter is less than the windowTop property plus the windowHeight property.`);

        if (this._bufferWidth === size.width && this._bufferHeight === size.height) return;

        let currentWidth = this._bufferWidth;
        let currentHeight = this._bufferHeight;

        this._bufferWidth = size.width;
        this._bufferHeight = size.height;
        this._resizeBuffer(currentWidth, currentHeight);
    }

    /**
     * Sets the position of the cursor.
     * @param {TerminalCoordinate} position The position of the cursor measured in columns and rows. Columns and rows are numbered from left to right, top to bottom, starting at 0.
     * @throws {@link TypeError}
     * @throws {@link RangeError}
     */
    SetCursorPosition(position) {
        Guard.NonObject(position, `The value of the position parameter get assigned a non object.`);
        Guard.NonNumber(position.left, `The value of the position.left parameter got assigned a wrong type.`);
        Guard.NonNumber(position.top, `The value of the position.top parameter got assigned a wrong type.`);
        Guard.Negative(position.left, `The value of the position.left parameter is less than zero.`);
        Guard.Negative(position.top, `The value of the position.top parameter is less than zero.`);
        Guard.BiggerThenOrEqual(position.left, this._bufferWidth, `The value of the position.left parameter is greater than or equal to bufferWidth.`);
        Guard.BiggerThenOrEqual(position.top, this._bufferHeight, `The value of the position.top parameter is greater than or equal to bufferHeight.`);

        if (this._cursorLeft === position.left && this._cursorTop === position.top) return;

        this._cursorLeft = position.left;
        this._cursorTop = position.top;
    }

    /**
     * Sets the position of the terminal window relative to the screen buffer.
     * @param {TerminalCoordinate} position The position of the upper left and top corner of the terminal window.
     * @throws {@link TypeError}
     * @throws {@link RangeError}
     */
    SetWindowPosition(position) {
        Guard.NonObject(position, `The value of the position parameter get assigned a non object.`);
        Guard.NonNumber(position.left, `The value of the position.left parameter got assigned a wrong type.`);
        Guard.NonNumber(position.top, `The value of the position.top parameter got assigned a wrong type.`);
        Guard.Negative(position.left, `The value of the position.left parameter is less than zero.`);
        Guard.Negative(position.top, `The value of the position.top parameter is less than zero.`);
        Guard.BiggerThen(position.left + this._windowWidth, this._bufferWidth, `The value of the position.left parameter plus the value of the windowWidth property is greater than bufferWidth.`);
        Guard.BiggerThen(position.top + this._windowHeight, this._bufferHeight, `The value of the position.top parameter plus the value of the windowHeight property is greater than bufferHeight.`);

        if (this._windowLeft === position.left && this._windowTop === position.top) return;

        this._windowLeft = position.left;
        this._windowTop = position.top;
    }

    /**
     * Sets the height and width of the terminal window to the specified values.
     * @param {TerminalSize} size The width and height of the terminal window measured in columns and rows.
     * @throws {@link TypeError}
     * @throws {@link RangeError}
     */
    SetWindowSize(size) {
        Guard.NonObject(size, `The value of the size parameter get assigned a non object.`);
        Guard.NonNumber(size.width, `The value of the size.width parameter got assigned a wrong type.`);
        Guard.NonNumber(size.height, `The value of the size.height parameter got assigned a wrong type.`);
        Guard.NegativeOrZero(size.width, `The value of the size.width parameter is less than or equal to zero.`);
        Guard.NegativeOrZero(size.height, `The value of the size.height parameter is less than or equal to zero.`);
        Guard.BiggerThenOrEqual(size.width + this._windowLeft, Number.MAX_SAFE_INTEGER, `The value of the size.width parameter plus the value of the windowLeft property is greater than or equal to Number.MAX_SAFE_INTEGER.`);
        Guard.BiggerThenOrEqual(size.height + this._windowTop, Number.MAX_SAFE_INTEGER, `The value of the size.height parameter plus the value of the windowTop property is greater than or equal to Number.MAX_SAFE_INTEGER.`);
        Guard.BiggerThen(size.width, this.largestWindowWidth, `The value of the size.width parameter is greater than the largest possible window size.width for the current screen resolution and font.`);
        Guard.BiggerThen(size.height, this.largestWindowHeight, `The value of the size.height parameter is greater than the largest possible window height for the current screen resolution and font.`);

        if (this._windowWidth === size.width && this._windowHeight === size.height) return;

        this._windowWidth = size.width;
        this._windowHeight = size.height;
    }

    /**
     * Writes the text representation of the specified value to the standard output stream.
     * @param {any} value 
     */
    Write(value) {

    }

    /**
     * Writes the current line terminator to the standard output stream.
     * @param {any} value 
     */
    WriteLine(value = undefined) {

    }

}

export default Terminal;
export {
    Terminal
}