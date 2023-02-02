`use strict`;

import Guard from "./guard";
import Terminal from "./terminal.core";
import TerminalColors from "./terminal.colors";
import TerminalKeyboard from "./terminal.keyboard";

/**
 * @enum {number}
 */
const RUNTIME_STATE = Object.freeze({
    STARTED: 1,
    UPDATING: 2,
    LATEUPDATING: 3,
    FINISHED: 4,
    ENDED: 5,
});
const UPDATE_TICK_RATE = 60 / 1000;

/**
 * @typedef {object} TerminalDisplayOptions
 * @property {HTMLCanvasElement} canvas
 * @property {number | undefined} canvasWidth
 * @property {number | undefined} canvasHeight
 */

class TerminalDisplay {
    /**
     * @type {CanvasRenderingContext2D}
     * @private
     */
    _context;

    /**
     * @type {HTMLCanvasElement}
     * @private
     */
    _canvas;

    /**
     * @type {number}
     * @private
     */
    _canvasHeight;

    /**
     * @type {number}
     * @private
     */
    _convasWidth;

    /**
     * @type {number}
     * @private
     */
    _lastUpdateTimestamp;

    /**
     * @type {number}
     * @private
     */
    _lastRenderTimestamp;

    /**
     * @type {RUNTIME_STATE}
     * @private
     */
    _runtimeState;

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

        this._canvas = options.canvas;
        this._convasWidth = options.canvasWidth;
        this._convasHeight = options.canvasHeight;

        this._context = this._canvas.getContext("2d");
        this._runtimeState = RUNTIME_STATE.ENDED;
    }

    _loop() {
        let time = performance.now();
        let tick = time - this._lastUpdateTimestamp;

        this._runtimeState = RUNTIME_STATE.UPDATING;
        this._lastUpdateTimestamp = time;

        this._update(tick);
        this._lateUpdate(tick);

        if (this._runtimeState !== RUNTIME_STATE.ENDED) setTimeout(this._loop, UPDATE_TICK_RATE);
    }

    /**
     * @param {number} tick
     * @private
     */
    _update(tick) {
        this._runtimeState = RUNTIME_STATE.UPDATING;
    }

    /**
     * @param {number} tick
     * @private
     */
    _lateUpdate(tick) {
        this._runtimeState = RUNTIME_STATE.LATEUPDATING;
    }

    /**
     * @type {FrameRequestCallback}
     * @private
     */
    _render(time) {
        let tick = time - this._lastRenderTimestamp;

        this._runtimeState = RUNTIME_STATE.RENDER;
        this._lastRenderTimestamp = time;

        if (this._runtimeState !== RUNTIME_STATE.ENDED) requestAnimationFrame(this._render);
    }

    /**
     * 
     */
    Start() {
        if (this._runtimeState !== RUNTIME_STATE.ENDED) return; 

        this._startTimestamp = performance.now();
        this._lastUpdateTimestamp = this._startTimestamp;
        this._lastRenderTimestamp = this._startTimestamp;
        this._runtimeState = RUNTIME_STATE.STARTED;

        setTimeout(this._loop, 0);
        requestAnimationFrame(this._render);
    }
}

export default TerminalDisplay;
export {
    TerminalDisplay
}