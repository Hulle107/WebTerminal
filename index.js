'use strict';

import TerminalColor from "./lib/terminalColor";
import TerminalField from "./lib/terminalField";

const EMPTY_CHARACTER = '';
const DEFUALT_BACKGROUND_COLOR = new TerminalColor();
const DEFAULT_FOREGROUND_COLOR = new TerminalColor();

class Terminal {

    /**
     * Gets or sets the background color of the terminal.
     * @private
     * @type {TerminalColor}
     */
    _backgroundColor;
    /**
     * @private
     * @type {TerminalField[][]}
     */
    _buffer;
    /**
     * Gets or sets the height of the buffer area.
     * @private
     * @type {number}
     */
    _bufferHeight;
    /**
     * Gets or sets the width of the buffer area.
     * @private
     * @type {number}
     */
    _bufferWidth;
    /**
     * Gets or sets the column position of the cursor within the buffer area.
     * @private
     * @type {number}
     */
    _cursorLeft;
    /**
     * Gets or sets the height of the cursor within a character cell.
     * @private
     * @type {number}
     */
    _cursorSize;
    /**
     * Gets or sets the row position of the cursor within the buffer area.
     * @private
     * @type {number}
     */
    _cursorTop;
    /**
     * Gets or sets a value indicating whether the cursor is visible.
     * @private
     * @type {boolean}
     */
    _cursorVisible;
    /**
     * Gets or sets the foreground color of the terminal.
     * @private
     * @type {TerminalColor}
     */
    _foregroundColor;
    /**
     * Gets or sets the height of the terminal window area.
     * @private
     * @type {number}
     */
    _windowHeight;
    /**
     * Gets or sets the leftmost position of the terminal window area relative to the screen buffer.
     * @private
     * @type {number}
     */
    _windowLeft;
    /**
     * Gets or sets the top position of the terminal window area relative to the screen buffer.
     * @private
     * @type {number}
     */
    _windowTop;
    /**
     * Gets or sets the width of the terminal window.
     * @private
     * @type {number}
     */
    _windowWidth;

    /**
     * Gets or sets the background color of the terminal.
     */
    get backgroundColor() { return this._backgroundColor; }
    /**
     * @throws {TypeError}
     */
    set backgroundColor(color) {
        if (color instanceof TerminalColor) throw new TypeError("The value of the backgroundColor property got assigned a wrong type.");

        this._backgroundColor = color;
    }

    /**
     * Gets or sets the height of the buffer area.
     * @type {number}
     */
    get bufferHeight() { 
        return this._bufferHeight; 
    }
    /**
     * @throws {TypeError}
     * @throws {RangeError}
     */
    set bufferHeight(number) {
        if (!Number.isInteger(number)) throw new TypeError("The value of the bufferHeight property got assigned a wrong type.");
        if (number <= 0) throw new RangeError("The value of the bufferHeight property is less than or equal to zero.");
        if (number >= Number.MAX_SAFE_INTEGER) throw new RangeError("The value of the bufferHeight property is greater than or equal to Number.MAX_SAFE_INTEGER.");
        if (number < this.windowTop + this.windowHeight) throw new RangeError("The value of the bufferHeight property is less than the windowTop property plus the windowHeight property.");

        this._bufferHeight = number;
        this._updateBuffer();
    }

    /**
     * Gets or sets the width of the buffer area.
     */
    get bufferWidth() { return this._bufferWidth; }
    /**
     * @throws {TypeError}
     * @throws {RangeError}
     */
    set bufferWidth(number) {
        if (!Number.isInteger(number)) throw new TypeError("The value of the bufferWidth property got assigned a wrong type.");
        if (number <= 0) throw new RangeError("The value of the bufferWidth property is less than or equal to zero.");
        if (number >= Number.MAX_SAFE_INTEGER) throw new RangeError("The value of the bufferWidth property is greater than or equal to Number.MAX_SAFE_INTEGER.");
        if (number < this.windowLeft + this.windowWidth) throw new RangeError("The value of the bufferWidth property is less than the windowLeft property plus the windowWidth property.");

        this._bufferWidth = number;
        this._updateBuffer();
    }

    /**
     * Gets a value indicating whether the CAPS LOCK keyboard toggle is turned on or turned off.
     */
    get capsLock() {
        
    }

    /**
     * Gets or sets the column position of the cursor within the buffer area.
     */
    get cursorLeft() { return this._cursorLeft; }
    /**
     * @throws {TypeError}
     * @throws {RangeError}
     */
    set cursorLeft(number) {
        if (!Number.isInteger(number)) throw new TypeError("The value of the cursorLeft property got assigned a wrong type.");
        if (number < 0) throw new RangeError("The value of the cursorLeft property is less than zero.");
        if (number > this.bufferWidth) throw new RangeError("The value of the cursorLeft property is greater than or equal to bufferWidth.");

        this._cursorLeft = number;
    }

    /**
     * Gets or sets the height of the cursor within a character cell.
     */
    get cursorSize() { return this._cursorSize; }
    /**
     * @throws {TypeError}
     * @throws {RangeError}
     */
    set cursorSize(procent) {
        if (!Number.isInteger(procent)) throw new TypeError("The value of the cursorSize property got assigned a wrong type.");
        if (procent < 1) throw new RangeError("The value of the cursorSize property is less than one.");
        if (procent > 100) throw new RangeError("The value of the cursorSize property is greater than hundred.");

        this._cursorSize = procent;
    }

    /**
     * Gets or sets the row position of the cursor within the buffer area.
     * @type {number}
     */
    get cursorTop() { return this._cursorTop; }
    /**
     * @throws {TypeError}
     * @throws {RangeError}
     */
    set cursorTop(number) {
        if (!Number.isInteger(number)) throw new TypeError("The value of the cursorTop property got assigned a wrong type.");
        if (number < 0) throw new RangeError("The value of the cursorTop property is less than zero.");
        if (number >= this.bufferHeight) throw new RangeError("The value of the cursorTop property is greater than or equal to bufferHeight.");

        this._cursorTop = number;
    }

    /**
     * Gets or sets a value indicating whether the cursor is visible.
     * @type {boolean}
     */
    get cursorVisible() { return this._cursorVisible; }
    /**
     * @throws {TypeError}
     */
    set cursorVisible(boolean) {
        if (typeof(boolean) !== typeof(true)) throw new TypeError("The value of the foregroundColor property got assigned a wrong type.");

        if (boolean) this._cursorVisible = true;
        else this._cursorVisible = false;
    }

    /**
     * Gets or sets the foreground color of the terminal.
     * @type {TerminalColor}
     */
    get foregroundColor() { return this._foregroundColor; }
    /**
     * @throws {TypeError}
     */
    set foregroundColor(color) {
        if (color instanceof TerminalColor) throw new TypeError("The value of the foregroundColor property got assigned a wrong type.");

        this._foregroundColor = color;
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
     * Gets or sets the height of the terminal window area.
     */
    get windowHeight() { return this._windowHeight; }
    /**
     * @throws {TypeError}
     * @throws {RangeError}
     */
    set windowHeight(value) {
        if (!Number.isInteger(value)) throw TypeError("The value of the windowHeight property got assigned a wrong type.");
        if (value <= 0) throw new RangeError("The value of the windowHeight property is less than or equal to zero.");
        if (value + this.windowTop >= Number.MAX_SAFE_INTEGER) throw new RangeError("The value of the windowHeight property plus the value of the windowTop property is greater than or equal to Number.MAX_SAFE_INTEGER.");
        if (value > this.largestWindowHeight) throw new RangeError("The value of the windowHeight property is greater than the largest possible window height for the current screen resolution and font.");

        this._windowHeight = value;
        // MISSING Call to display to update size of canvas.
    }

    /**
     * Gets or sets the leftmost position of the terminal window area relative to the screen buffer.
     */
    get windowLeft() { return this._windowLeft; }
    /**
     * @throws {TypeError}
     * @throws {RangeError}
     */
    set windowLeft(value) {
        if (!Number.isInteger(value)) throw TypeError("The value of the windowLeft property got assigned a wrong type.");
        if (value < 0) throw new RangeError("The value of the windowTop property is less than zero.");
        if (value + this.windowWidth > this.bufferWidth) throw new RangeError("The value of the windowLeft property plus the value of the windowWidth property is greater than bufferWidth.");

        this._windowLeft = value;
        // MISSING Call to display to move viewed area.
    }

    /**
     * Gets or sets the top position of the terminal window area relative to the screen buffer.
     */
    get windowTop() { return this._windowTop; }
    /**
     * @throws {TypeError}
     * @throws {RangeError}
     */
    set windowTop(value) {
        if (!Number.isInteger(value)) throw new TypeError("The value of the windowTop property got assigned a wrong type.");
        if (value < 0) throw new RangeError("The value of the windowTop property is less than zero.");
        if (value + this.windowHeight > this.bufferHeight) throw new RangeError("The value of the windowTop property plus the value of the windowHeight property is greater than bufferHeight.");

        this._windowTop = value;
        // MISSING Call to display to move viewed area.
    }

    /**
     * Gets or sets the width of the terminal window.
     */
    get windowWidth() { return this._windowWidth; }
    /**
     * @throws {TypeError}
     * @throws {RangeError}
     */
    set windowWidth(value) {
        if (!Number.isInteger(value)) throw new TypeError("The value of the windowWidth property got assigned a wrong type.");
        if (value <= 0) throw new RangeError("The value of the windowWidth property is less than or equal to zero.");
        if (value + this.windowLeft >= Number.MAX_SAFE_INTEGER) throw new RangeError("The value of the windowWidth property plus the value of the windowLeft property is greater than or equal to Number.MAX_SAFE_INTEGER.");
        if (value > this.largestWindowWidth) throw new RangeError("The value of the windowWidth property is greater than the largest possible window width for the current screen resolution and font.");

        this._windowWidth = value;
        // MISSING Call to display to update size of canvas.
    }

    /**
     * 
     * @param {*} options 
     */
    constructor(options) {
        this._updateBuffer();
    }

    /**
     * @private
     */
    _updateBuffer() {
        let x = this.bufferWidth;
        let y = this.bufferHeight;
        let buffer = [...Array(y)].map(_=>Array(x).fill(new TerminalField()));
        let old = [];
        let counter = 0;

        for (let y = 0; y < this._buffer.length; y++) {
            for (let x = 0; x < this._buffer[y].length; x++) {
                old[counter] = this._buffer[y][x];
                counter++;
            }
        }

        counter = 0;

        for (let y = 0; y < buffer.length; y++) {
            for (let x = 0; x < buffer[y].length; x++) {
                buffer[y][x] = old[counter];
                counter++;
            }
        }

        this._buffer = buffer;
    }

    /**
     * Clears the terminal buffer and corresponding terminal window of display information.
     */
    Clear() {
        for (let y = 0; y < this._buffer.length; y++) {
            for (let x = 0; x < this._buffer[y].length; x++) {
                buffer[y][x].char = EMPTY_CHARACTER;
                buffer[y][x].foregroundColor = this.foregroundColor;
                buffer[y][x].backgroundColor = this.backgroundColor;
            }
        }
    }

    /**
     * Gets the position of the cursor.
     * @returns {{left: number, top: number}}
     */
    GetCursorPosition() { 
        return { 
            left: this._cursorLeft, 
            top: this._cursorTop 
        };
    }

    /**
     * Copies a specified source area of the screen buffer to a specified destination area.
     * @param {number} sourceLeft The leftmost column of the source area.
     * @param {number} sourceTop The topmost row of the source area.
     * @param {number} sourceWidth The number of columns in the source area.
     * @param {number} sourceHeight The number of rows in the source area.
     * @param {number} targetLeft The leftmost column of the destination area.
     * @param {number} targetTop The topmost row of the destination area.
     * @param {string} sourceChar The TerminalField used to fill the source area.
     * @param {Color} sourceForegroundColor The foreground color used to fill the source area.
     * @param {Color} sourceBackgroundColor The background color used to fill the source area.
     */
    MoveBufferArea(sourceLeft, sourceTop, sourceWidth, sourceHeight, targetLeft, targetTop, sourceChar = EMPTY_CHARACTER, sourceForegroundColor = this.foregroundColor, sourceBackgroundColor = this.backgroundColor) {
        if (typeof(sourceLeft) !== 'number') throw TypeError("");
        if (typeof(sourceTop) !== 'number') throw TypeError("");
        if (typeof(sourceWidth) !== 'number') throw TypeError("");
        if (typeof(sourceHeight) !== 'number') throw TypeError("");
        if (typeof(targetLeft) !== 'number') throw TypeError("");
        if (typeof(targetTop) !== 'number') throw TypeError("");
        if (typeof(sourceChar) !== 'string') throw TypeError("");
        if (sourceForegroundColor instanceof Color) throw TypeError("");
        if (sourceBackgroundColor instanceof Color) throw TypeError("");
    }

    /**
     * Reads the next TerminalField from the standard input stream.
     */
    Read() {

    }

    /**
     * Obtains the next TerminalField or function key pressed by the user. The pressed key is displayed in the terminal window.
     * @param {boolean} intercept Determines whether to display the pressed key in the terminal window. `true` to not display the pressed key; otherwise, `false`.
     */
    ReadKey(intercept = false) {
        if (typeof(intercept) !== 'boolean') throw TypeError();
    }

    /**
     * Reads the next line of TerminalFields from the standard input stream.
     */
    ReadLine() {

    }

    /**
     * Sets the foreground and background terminal colors to their defaults.
     */
    ResetColor() {
        this.foregroundColor = DEFAULT_FOREGROUND_COLOR;
        this.backgroundColor = DEFUALT_BACKGROUND_COLOR;
    }

    /**
     * Sets the height and width of the screen buffer area to the specified values.
     * @param {number} width The width of the buffer area measured in columns.
     * @param {number} height The height of the buffer area measured in rows.
     */
    SetBufferSize(width, height) {
        if (typeof(width) !== 'number') throw TypeError();
        if (typeof(height) !== 'number') throw TypeError();

        this.bufferWidth = width;
        this.bufferHeight = height;
    }

    /**
     * Sets the position of the cursor.
     * @param {number} left The column position of the cursor. Columns are numbered from left to right starting at 0.
     * @param {number} top The row position of the cursor. Rows are numbered from top to bottom starting at 0.
     */
    SetCursorPosition(left, top) {
        if (typeof(left) !== 'number') throw TypeError();
        if (typeof(top) !== 'number') throw TypeError();

        this.cursorLeft = left;
        this.cursorTop = top;
    }

    /**
     * Sets the position of the terminal window relative to the screen buffer.
     * @param {number} left The column position of the upper left corner of the terminal window.
     * @param {number} top The row position of the upper left corner of the terminal window.
     */
    SetWindowPosition(left, top) {
        if (typeof(left) !== 'number') throw TypeError();
        if (typeof(top) !== 'number') throw TypeError();

        this.windowLeft = left;
        this.windowTop = top;
    }

    /**
     * Sets the height and width of the terminal window to the specified values.
     * @param {number} width The width of the terminal window measured in columns.
     * @param {number} height The height of the terminal window measured in rows.
     */
    SetWindowSize(width, height) {
        if (typeof(width) !== 'number') throw TypeError();
        if (typeof(height) !== 'number') throw TypeError();

        this.windowWidth = width;
        this.windowHeight = height;
    }

    /**
     * Writes the text representation of the specified value to the standard output stream.
     * @param {any} string 
     */
    Write(value) {

    }

    /**
     * Writes the current line terminator to the standard output stream.
     * @param {any} string 
     */
    WriteLine(value = undefined) {

    }

}

const CreateTerminal = (options) => new Terminal(options);

export default CreateTerminal;
export {
    Color,
    CreateTerminal
}