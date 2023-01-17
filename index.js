'use strict';

import Color from "./lib/color";

class TERMINAL {
    _buffer = [];
    _defaultForegroundColor;
    _defaultBackgroundColor;

    _windowLeft = 0;
    _windowTop = 0;
    _windowWidth;
    _windowHeight;
    _bufferWidth;
    _bufferHeight;
    _cursorVisible = true;
    _cursorSize = 100;
    _cursorLeft = 0;
    _cursorTop = 0;
    _backgroundColor;
    _foregroundColor;

    constructor(options) {
        this._updateBuffer();
    }

    _updateBuffer() {
        let x = this.bufferWidth;
        let y = this.bufferHeight;
        let buffer = [...Array(y)].map(_=>Array(x).fill({}));
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

    Write(string = '') {
        if (typeof(string) !== 'string') throw TypeError();
    }
    WriteLine(string = '') {
        if (typeof(string) !== 'string') throw TypeError();
    }
    Read() {}
    ReadKey(writeToStream = true) {
        if (typeof(writeToStream) !== 'boolean') throw TypeError();
    }
    MoveBufferArea(sourceLeft, sourceTop, sourceWidth, sourceHeight, targetLeft, targetTop, sourceChar = ' ', sourceForegroundColor = this.foregroundColor, sourceBackgroundColor = this.backgroundColor) {
        if (typeof(sourceLeft) !== 'number') throw TypeError();
        if (typeof(sourceTop) !== 'number') throw TypeError();
        if (typeof(sourceWidth) !== 'number') throw TypeError();
        if (typeof(sourceHeight) !== 'number') throw TypeError();
        if (typeof(targetLeft) !== 'number') throw TypeError();
        if (typeof(targetTop) !== 'number') throw TypeError();
        if (typeof(sourceChar) !== 'string') throw TypeError();
        if (sourceForegroundColor instanceof Color) throw TypeError();
        if (sourceBackgroundColor instanceof Color) throw TypeError();
    }
    Clear() {}
    ResetColor() {}

    GetBufferAtPosition(left, top) {
        if (typeof(left) !== 'number') throw TypeError();
        if (typeof(top) !== 'number') throw TypeError();
        if (left < 0 || left > this.bufferHeight) throw RangeError();
        if (top < 0 || top > this.bufferHeight) throw RangeError();

        return this._buffer[top][left];
    }
    GetCursorPosition() { return { left: this._cursorLeft, top: this._cursorTop } }

    SetCursorPosition(left, top) {
        if (typeof(left) !== 'number') throw TypeError();
        if (typeof(top) !== 'number') throw TypeError();

        this.cursorLeft = left;
        this.cursorTop = top;
    }
    SetBufferSize(width, height) {
        if (typeof(width) !== 'number') throw TypeError();
        if (typeof(height) !== 'number') throw TypeError();

        this.bufferWidth = width;
        this.bufferHeight = height;
    }
    SetWindowPosition(left, top) {
        if (typeof(left) !== 'number') throw TypeError();
        if (typeof(top) !== 'number') throw TypeError();

        this.windowLeft = left;
        this.windowTop = top;
    }
    SetWindowSize(width, height) {
        if (typeof(width) !== 'number') throw TypeError();
        if (typeof(height) !== 'number') throw TypeError();

        this.windowWidth = width;
        this.windowHeight = height;
    }

    get largestWindowWidth() {}
    get largestWindowHeight() {}
    get keyAvailable() {}
    get numberLock() {}
    get capsLock() {}

    get windowLeft() { return this._windowLeft; }
    set windowLeft(number) {
        if (typeof(number) !== 'number') throw TypeError();
        if (number < 0 || number + this.windowWidth > this.bufferWidth) throw RangeError();

        this._windowLeft = number;
    }

    get windowTop() { return this._windowTop; }
    set windowTop(number) {
        if (typeof(number) !== 'number') throw TypeError();
        if (number < 0 || number + this.windowHeight > this.bufferHeight) throw RangeError();

        this._windowTop = number;
    }

    get windowWidth() { return this._windowWidth; }
    set windowWidth(number) {
        if (typeof(number) !== 'number') throw TypeError();
        if (number <= 0 || number + this.windowLeft >= Infinity || number > this.largestWindowWidth) throw RangeError();

        this._windowWidth = number;
    }

    get windowHeight() { return this._windowHeight; }
    set windowHeight(number) {
        if (typeof(number) !== 'number') throw TypeError();
        if (number <= 0 || number + this.windowTop >= Infinity || number > this.largestWindowHeight) throw RangeError();

        this._windowHeight = number;
    }

    get bufferWidth() { return this._bufferWidth; }
    set bufferWidth(number) {
        if (typeof(number) !== 'number') throw TypeError();
        if (number <= 0 || number < this.windowLeft + this.windowWidth || number >= Infinity) throw RangeError();

        this._bufferWidth = number;
        this._updateBuffer();
    }

    get bufferHeight() { return this._bufferHeight; }
    set bufferHeight(number) {
        if (typeof(number) !== 'number') throw TypeError();
        if (number <= 0 || number < this.windowTop + this.windowHeight || number >= Infinity) throw RangeError();

        this._bufferHeight = number;
        this._updateBuffer();
    }

    get cursorVisible() { return this._cursorVisible; }
    set cursorVisible(boolean) {
        if (typeof(boolean) !== 'boolean') throw TypeError();

        if (boolean) this._cursorVisible = true;
        else this._cursorVisible = false;
    }

    get cursorSize() { return this._cursorSize; }
    set cursorSize(procent) {
        if (typeof(procent) !== 'number') throw TypeError();
        if (procent < 1 || procent > 100) throw RangeError();

        this.cursorSize = procent;
    }

    get cursorLeft() { return this._cursorLeft; }
    set cursorLeft(number) {
        if (typeof(number) !== 'number') throw TypeError();
        if (number < 0 || number > this._bufferWidth) throw RangeError();

        this.cursorLeft = number; 
    }

    get cursorTop() { return this._cursorTop; }
    set cursorTop(number) {
        if (typeof(number) !== 'number') throw TypeError();
        if (number < 0 || number > this._bufferWidth) throw RangeError();

        this.cursorTop = number; 
    }

    get foregroundColor() { return this._foregroundColor; }
    set foregroundColor(color) {
        if (color instanceof Color) throw TypeError();

        this._foregroundColor = color;
    }

    get backgroundColor() { return this._backgroundColor; }
    set backgroundColor(color) {
        if (color instanceof Color) throw TypeError();

        this._backgroundColor = color;
    }
}

const CreateTerminal = (options) => new TERMINAL(options);

export default CreateTerminal;
export {
    Color,
    CreateTerminal
}