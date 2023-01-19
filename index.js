`use strict`;

import TerminalColor from "./lib/terminalColor";
import TerminalField from "./lib/terminalField";

const EMPTY_CHARACTER = ``;
const DEFUALT_BACKGROUND_COLOR = TerminalColor.Black;
const DEFAULT_FOREGROUND_COLOR = TerminalColor.White;

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
     * @type {TerminalField[][]}
     */
    _bufferBackup;
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
    _foregroundColor;
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
     * @throws {TypeError}
     */
    set backgroundColor(color) {
        if (!color instanceof TerminalColor) throw new TypeError(`The value of the backgroundColor property got assigned a wrong type.`);

        this._backgroundColor = color;
    }

    /**
     * Gets the buffer of the terminal.
     */
    get buffer() {
        let width = this._bufferWidth;
        let height = this._bufferHeight;
        let size = this._buffer.length;

        /**
         * @type {TerminalField[][]}
         */
        let buffer = [...Array(height)].map(_=>Array(width).fill(new TerminalField()));

        for (let i = 0; i < size; i++) {
            y = i / width;
            x = i % width;

            buffer[y][x] = this._buffer[i];
        }

        return buffer;
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
    set bufferHeight(value) {
        if (!Number.isInteger(value)) throw new TypeError(`The value of the bufferHeight property got assigned a wrong type.`);
        if (value <= 0) throw new RangeError(`The value of the bufferHeight property is less than or equal to zero.`);
        if (value >= Number.MAX_SAFE_INTEGER) throw new RangeError(`The value of the bufferHeight property is greater than or equal to Number.MAX_SAFE_INTEGER.`);
        if (value < this._windowTop + this._windowHeight) throw new RangeError(`The value of the bufferHeight property is less than the windowTop property plus the windowHeight property.`);

        if (this._bufferHeight === value) return;

        this._backupBuffer();
        this._bufferHeight = value;
        this._resizeBuffer();
    }

    /**
     * Gets or sets the width of the buffer area.
     */
    get bufferWidth() { return this._bufferWidth; }
    /**
     * @throws {TypeError}
     * @throws {RangeError}
     */
    set bufferWidth(value) {
        if (!Number.isInteger(value)) throw new TypeError(`The value of the bufferWidth property got assigned a wrong type.`);
        if (value <= 0) throw new RangeError(`The value of the bufferWidth property is less than or equal to zero.`);
        if (value >= Number.MAX_SAFE_INTEGER) throw new RangeError(`The value of the bufferWidth property is greater than or equal to Number.MAX_SAFE_INTEGER.`);
        if (value < this._windowLeft + this._windowWidth) throw new RangeError(`The value of the bufferWidth property is less than the windowLeft property plus the windowWidth property.`);

        if (this._bufferWidth === value) return;

        this._backupBuffer();
        this._bufferWidth = value;
        this._resizeBuffer();
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
    set cursorLeft(value) {
        if (!Number.isInteger(value)) throw new TypeError(`The value of the cursorLeft property got assigned a wrong type.`);
        if (value < 0) throw new RangeError(`The value of the cursorLeft property is less than zero.`);
        if (value > this._bufferWidth) throw new RangeError(`The value of the cursorLeft property is greater than or equal to bufferWidth.`);

        if (this._cursorLeft === value) return;

        this._cursorLeft = value;
    }

    /**
     * Gets or sets the height of the cursor within a character cell.
     */
    get cursorSize() { return this._cursorSize; }
    /**
     * @throws {TypeError}
     * @throws {RangeError}
     */
    set cursorSize(value) {
        if (!Number.isInteger(value)) throw new TypeError(`The value of the cursorSize property got assigned a wrong type.`);
        if (value < 1) throw new RangeError(`The value of the cursorSize property is less than one.`);
        if (value > 100) throw new RangeError(`The value of the cursorSize property is greater than hundred.`);

        if (this._cursorSize === value) return;

        this._cursorSize = value;
    }

    /**
     * Gets or sets the row position of the cursor within the buffer area.
     */
    get cursorTop() { return this._cursorTop; }
    /**
     * @throws {TypeError}
     * @throws {RangeError}
     */
    set cursorTop(value) {
        if (!Number.isInteger(value)) throw new TypeError(`The value of the cursorTop property got assigned a wrong type.`);
        if (value < 0) throw new RangeError(`The value of the cursorTop property is less than zero.`);
        if (value >= this._bufferHeight) throw new RangeError(`The value of the cursorTop property is greater than or equal to bufferHeight.`);

        if (this._cursorTop === value) return;

        this._cursorTop = value;
    }

    /**
     * Gets or sets a value indicating whether the cursor is visible.
     * @type {boolean}
     */
    get cursorVisible() { return this._cursorVisible; }
    /**
     * @throws {TypeError}
     */
    set cursorVisible(value) {
        if (typeof(value) !== typeof(true)) throw new TypeError(`The value of the foregroundColor property got assigned a wrong type.`);

        if (value) this._cursorVisible = true;
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
    set foregroundColor(value) {
        if (!value instanceof TerminalColor) throw new TypeError(`The value of the foregroundColor property got assigned a wrong type.`);

        this._foregroundColor = value;
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
        if (!Number.isInteger(value)) throw TypeError(`The value of the windowHeight property got assigned a wrong type.`);
        if (value <= 0) throw new RangeError(`The value of the windowHeight property is less than or equal to zero.`);
        if (value + this.windowTop >= Number.MAX_SAFE_INTEGER) throw new RangeError(`The value of the windowHeight property plus the value of the windowTop property is greater than or equal to Number.MAX_SAFE_INTEGER.`);
        if (value > this.largestWindowHeight) throw new RangeError(`The value of the windowHeight property is greater than the largest possible window height for the current screen resolution and font.`);

        if (this._windowHeight === value) return;

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
        if (!Number.isInteger(value)) throw TypeError(`The value of the windowLeft property got assigned a wrong type.`);
        if (value < 0) throw new RangeError(`The value of the windowLeft property is less than zero.`);
        if (value + this._windowWidth > this._bufferWidth) throw new RangeError(`The value of the windowLeft property plus the value of the windowWidth property is greater than bufferWidth.`);

        if (this._windowLeft === value) return;

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
        if (!Number.isInteger(value)) throw new TypeError(`The value of the windowTop property got assigned a wrong type.`);
        if (value < 0) throw new RangeError(`The value of the windowTop property is less than zero.`);
        if (value + this._windowHeight > this._bufferHeight) throw new RangeError(`The value of the windowTop property plus the value of the windowHeight property is greater than bufferHeight.`);

        if (this._windowTop === value) return;

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
        if (!Number.isInteger(value)) throw new TypeError(`The value of the windowWidth property got assigned a wrong type.`);
        if (value <= 0) throw new RangeError(`The value of the windowWidth property is less than or equal to zero.`);
        if (value + this._windowLeft >= Number.MAX_SAFE_INTEGER) throw new RangeError(`The value of the windowWidth property plus the value of the windowLeft property is greater than or equal to Number.MAX_SAFE_INTEGER.`);
        if (value > this.largestWindowWidth) throw new RangeError(`The value of the windowWidth property is greater than the largest possible window width for the current screen resolution and font.`);

        if (this._windowWidth === value) return;

        this._windowWidth = value;
        // MISSING Call to display to update size of canvas.
    }

    /**
     * 
     * @param {*} options 
     */
    constructor(options) {
        this._resizeBuffer();
    }

    /**
     * 
     */
    _backupBuffer() {
        this._bufferBackup = Array.from(this.buffer);
    }

    /**
     * Resize the buffer of the terminal.
     * @private
     */
    _resizeBuffer() {
        let width = this._bufferWidth;
        let height = this._bufferHeight;
        let size = width * height;
        let buffer = [...Array(size)].fill(new TerminalField(EMPTY_CHARACTER, this._foregroundColor, this._backgroundColor));

        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                let index = y * width + x;
                if (index >= this._buffer.length) break;
                
                buffer[index] = this._bufferBackup[y][x];
            }
        }

        this._buffer = buffer;
    }

    /**
     * 
     */
    _revertBuffer() {
        let width = this._bufferBackup[0].length;
        let height = this._bufferBackup.length;
        let size = width * height;
        let buffer = [...Array(size)];

        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                let index = y * width + x;
                buffer[index] = this._bufferBackup[y][x];
            }
        }

        this._backupBuffer();
        this._buffer = buffer;
    }

    /**
     * Clears the terminal buffer and corresponding terminal window of display information.
     */
    Clear() {
        for (let i = 0; i < this._buffer.length; i++) {
            this._buffer[i] = new TerminalField(EMPTY_CHARACTER, this._foregroundColor, this._backgroundColor);
        }
    }

    /**
     * Gets the position of the cursor.
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
     * @throws {TypeError}
     * @throws {RangeError}
     */
    MoveBufferArea(sourceLeft, sourceTop, sourceWidth, sourceHeight, targetLeft, targetTop, sourceChar = EMPTY_CHARACTER, sourceForegroundColor = this.foregroundColor, sourceBackgroundColor = this.backgroundColor) {
        if (!Number.isInteger(sourceLeft)) throw new TypeError(`The value of the sourceLeft parameter got assigned a wrong type.`);
        if (!Number.isInteger(sourceTop)) throw new TypeError(`The value of the sourceTop parameter got assigned a wrong type.`);
        if (!Number.isInteger(sourceWidth)) throw new TypeError(`The value of the sourceWidth parameter got assigned a wrong type.`);
        if (!Number.isInteger(sourceHeight)) throw new TypeError(`The value of the sourceHeight parameter got assigned a wrong type.`);
        if (!Number.isInteger(targetLeft)) throw new TypeError(`The value of the targetLeft parameter got assigned a wrong type.`);
        if (!Number.isInteger(targetTop)) throw new TypeError(`The value of the targetTop parameter got assigned a wrong type.`);
        if (typeof(sourceChar) !== `string`) throw new TypeError(`The value of the sourceChar parameter got assigned a wrong type.`);
        if (!sourceForegroundColor instanceof Color) throw new TypeError(`The value of the sourceForegroundColor parameter got assigned a wrong type.`);
        if (!sourceBackgroundColor instanceof Color) throw new TypeError(`The value of the sourceBackgroundColor parameter got assigned a wrong type.`);
        if (sourceLeft < 0) throw new RangeError(`The value of the sourceLeft parameter is less than zero.`);
        if (sourceTop < 0) throw new RangeError(`The value of the sourceTop parameter is less than zero.`);
        if (sourceWidth < 0) throw new RangeError(`The value of the sourceWidth parameter is less than zero.`);
        if (sourceHeight < 0) throw new RangeError(`The value of the sourceHeight parameter is less than zero.`);
        if (targetLeft < 0) throw new RangeError(`The value of the targetLeft parameter is less than zero.`);
        if (targetTop < 0) throw new RangeError(`The value of the targetTop parameter is less than zero.`);
        if (sourceLeft >= this._bufferWidth) throw new RangeError(`The value of the sourceLeft parameter is greater than or equal to bufferWidth.`);
        if (sourceTop >= this._bufferHeight) throw new RangeError(`The value of the sourceTop parameter is greater than or equal to bufferHeight.`);
        if (targetLeft >= this._bufferWidth) throw new RangeError(`The value of the targetLeft parameter is greater than or equal to bufferWidth.`);
        if (targetTop >= this._bufferHeight) throw new RangeError(`The value of the targetTop parameter is greater than or equal to bufferHeight.`);
        if (sourceLeft + sourceWidth >= this._bufferWidth) throw new RangeError(`The value of the sourceLeft parameter plus the value of the sourceWidth parameter is greater than or equal to bufferWidth.`);
        if (sourceTop + sourceHeight >= this._bufferHeight) throw new RangeError(`The value of the sourceTop parameter plus the value of the sourceHeight parameter is greater than or equal to bufferHeight.`);
        if (sourceChar.length > 1) throw new RangeError(`The value of the sourceChar parameter was not a single char.`);

        if (sourceLeft === targetLeft && sourceTop === targetTop) return;

        let width = this._bufferWidth;
        let size = sourceWidth * sourceHeight;
        let buffer = [...Array(size)];

        for (let y = sourceTop; y < sourceTop + sourceHeight; y++) {
            for (let x = sourceLeft; x < sourceLeft + sourceWidth; x++) {
                let index = y * width + y;
                let offsetY = y - sourceTop;
                let offsetX = x - sourceLeft;
                let offsetIndex = offsetY * width + offsetX;

                buffer[offsetIndex] = this._buffer[index];
                this._buffer[index] = new TerminalField(sourceChar, sourceForegroundColor, sourceBackgroundColor);
            }
        }

        for (let y = targetTop; y < targetTop + sourceHeight; y++) {
            for (let x = targetLeft; x < targetLeft + sourceWidth; x++) {
                let index = y * width + x;
                let offsetY = y - targetTop;
                let offsetX = x - targetLeft;
                let offsetIndex = offsetY * width + offsetX;

                this._buffer[index] = buffer[offsetIndex];
            }
        }
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
        if (typeof(intercept) !== `boolean`) throw new TypeError(`The value of the intercept parameter got assigned a wrong type.`);
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
        this._foregroundColor = DEFAULT_FOREGROUND_COLOR;
        this._backgroundColor = DEFUALT_BACKGROUND_COLOR;
    }

    /**
     * Sets the height and width of the screen buffer area to the specified values.
     * @param {number} width The width of the buffer area measured in columns.
     * @param {number} height The height of the buffer area measured in rows.
     * @throws {TypeError}
     * @throws {RangeError}
     */
    SetBufferSize(width, height) {
        if (!Number.isInteger(width)) throw new TypeError(`The value of the width parameter got assigned a wrong type.`);
        if (!Number.isInteger(height)) throw new TypeError(`The value of the height parameter got assigned a wrong type.`);
        if (width <= 0) throw new RangeError(`The value of the width parameter is less than or equal to zero.`);
        if (height <= 0) throw new RangeError(`The value of the height parameter is less than or equal to zero.`);
        if (width >= Number.MAX_SAFE_INTEGER) throw new RangeError(`The value of the width parameter is greater than or equal to Number.MAX_SAFE_INTEGER.`);
        if (height >= Number.MAX_SAFE_INTEGER) throw new RangeError(`The value of the height parameter is greater than or equal to Number.MAX_SAFE_INTEGER.`);
        if (width < this._windowLeft + this._windowWidth) throw new RangeError(`The value of the width parameter is less than the windowLeft property plus the windowWidth property.`);
        if (height < this._windowTop + this._windowHeight) throw new RangeError(`The value of the height parameter is less than the windowTop property plus the windowHeight property.`);

        if (this._bufferWidth === width && this._bufferHeight === height) return;

        this._backupBuffer();
        this._bufferWidth = width;
        this._bufferHeight = height;
        this._resizeBuffer();
    }

    /**
     * Sets the position of the cursor.
     * @param {number} left The column position of the cursor. Columns are numbered from left to right starting at 0.
     * @param {number} top The row position of the cursor. Rows are numbered from top to bottom starting at 0.
     * @throws {TypeError}
     * @throws {RangeError}
     */
    SetCursorPosition(left, top) {
        if (!Number.isInteger(left)) throw new TypeError(`The value of the left parameter got assigned a wrong type.`);
        if (!Number.isInteger(top)) throw new TypeError(`The value of the top parameter got assigned a wrong type.`);
        if (left < 0) throw new RangeError(`The value of the left parameter is less than zero.`);
        if (top < 0) throw new RangeError(`The value of the top parameter is less than zero.`);
        if (left > this._bufferWidth) throw new RangeError(`The value of the left parameter is greater than or equal to bufferWidth.`);
        if (top >= this._bufferHeight) throw new RangeError(`The value of the top parameter is greater than or equal to bufferHeight.`);

        if (this._cursorLeft === left && this._cursorTop === top) return;

        this._cursorLeft = left;
        this._cursorTop = top;
    }

    /**
     * Sets the position of the terminal window relative to the screen buffer.
     * @param {number} left The column position of the upper left corner of the terminal window.
     * @param {number} top The row position of the upper left corner of the terminal window.
     * @throws {TypeError}
     * @throws {RangeError}
     */
    SetWindowPosition(left, top) {
        if (!Number.isInteger(left)) throw new TypeError(`The value of the left parameter got assigned a wrong type.`);
        if (!Number.isInteger(top)) throw new TypeError(`The value of the top parameter got assigned a wrong type.`);
        if (left < 0) throw new RangeError(`The value of the left parameter is less than zero.`);
        if (top < 0) throw new RangeError(`The value of the top parameter is less than zero.`);
        if (left + this._windowWidth > this._bufferWidth) throw new RangeError(`The value of the left parameter plus the value of the windowWidth property is greater than bufferWidth.`);
        if (top + this._windowHeight > this._bufferHeight) throw new RangeError(`The value of the top parameter plus the value of the windowHeight property is greater than bufferHeight.`);

        if (this._windowLeft === left && this._windowTop === top) return;

        this._windowLeft = left;
        this._windowTop = top;
    }

    /**
     * Sets the height and width of the terminal window to the specified values.
     * @param {number} width The width of the terminal window measured in columns.
     * @param {number} height The height of the terminal window measured in rows.
     * @throws {TypeError}
     * @throws {RangeError}
     */
    SetWindowSize(width, height) {
        if (!Number.isInteger(width)) throw new TypeError(`The value of the width parameter got assigned a wrong type.`);
        if (!Number.isInteger(height)) throw new TypeError(`The value of the height parameter got assigned a wrong type.`);
        if (width <= 0) throw new RangeError(`The value of the width parameter is less than or equal to zero.`);
        if (height <= 0) throw new RangeError(`The value of the height parameter is less than or equal to zero.`);
        if (width + this._windowLeft >= Number.MAX_SAFE_INTEGER) throw new RangeError(`The value of the width parameter plus the value of the windowLeft property is greater than or equal to Number.MAX_SAFE_INTEGER.`);
        if (height + this._windowTop >= Number.MAX_SAFE_INTEGER) throw new RangeError(`The value of the height parameter plus the value of the windowTop property is greater than or equal to Number.MAX_SAFE_INTEGER.`);
        if (width > this.largestWindowWidth) throw new RangeError(`The value of the width parameter is greater than the largest possible window width for the current screen resolution and font.`);
        if (height > this.largestWindowHeight) throw new RangeError(`The value of the height parameter is greater than the largest possible window height for the current screen resolution and font.`);

        if (this._windowWidth === width && this._windowHeight === height) return;

        this._windowWidth = width;
        this._windowHeight = height;
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

export default Terminal;
export {
    Terminal,
    TerminalColor,
    TerminalField
}