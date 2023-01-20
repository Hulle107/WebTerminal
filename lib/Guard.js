`use strict`;

class Guard {}

/**
 * @param {any} value 
 * @param {string} message Optional.
 * @throws {TypeError}
 */
Guard.Array = (value, message = undefined) => {
    if (typeof message !== 'string' && typeof message !== 'undefined') throw new TypeError(`The value of the message parameter got assigned a wrong type.`);

    if (!Array.isArray(value)) throw new TypeError(message === undefined ? `Required value is of type Array` : message);

    return value;
}

/**
 * @param {any} value 
 * @param {string} message Optional.
 * @throws {TypeError}
 */
Guard.Boolean = (value, message = undefined) => {
    if (typeof message !== 'string' && typeof message !== 'undefined') throw new TypeError(`The value of the message parameter got assigned a wrong type.`);

    if (typeof value !== 'boolean') throw new TypeError(message === undefined ? `Required value is of type Boolean.` : message);

    return value;
}

/**
 * @param {any} value 
 * @param {string} message Optional.
 * @throws {TypeError}
 */
Guard.Object = (value, message = undefined) => {
    if (typeof message !== 'string' && typeof message !== 'undefined') throw new TypeError(`The value of the message parameter got assigned a wrong type.`);

    if (typeof value !== 'object') throw new TypeError(message === undefined ? `Required value is of type Object.` : message);

    return value;
}

/**
 * @param {any} value 
 * @param {string} message Optional.
 * @throws {TypeError}
 */
Guard.Number = (value, message = undefined) => {
    if (typeof message !== 'string' && typeof message !== 'undefined') throw new TypeError(`The value of the message parameter got assigned a wrong type.`);

    if (typeof value === 'number') throw new TypeError(message === undefined ? `Required value is of type Number.` : message);

    return value;
}

/**
 * @param {any} value 
 * @param {string} message Optional.
 * @throws {TypeError}
 */
Guard.String = (value, message = undefined) => {
    if (typeof message !== 'string' && typeof message !== 'undefined') throw new TypeError(`The value of the message parameter got assigned a wrong type.`);

    if (typeof value === 'string') throw new TypeError(message === undefined ? `Required value is of type String.` : message);

    return value;
}

/**
 * @param {any} value 
 * @param {string} message Optional.
 * @throws {ReferenceError}
 * @throws {TypeError}
 */
Guard.Undefined = (value, message = undefined) => {
    if (typeof message !== 'string' && typeof message !== 'undefined') throw new TypeError(`The value of the message parameter got assigned a wrong type.`);

    if (typeof value === 'undefined') throw new TypeError(message === undefined ? `Required value is of type undefined.` : message);

    return value;
}

/**
 * @param {any} value 
 * @param {function} type
 * @param {string} message Optional.
 * @throws {TypeError}
 */
Guard.InstanceOf = (value, type, message = undefined) => {
    if (typeof message !== 'string' && typeof message !== 'undefined') throw new TypeError(`The value of the message parameter got assigned a wrong type.`);

    if (!value instanceof type) throw new TypeError(message === undefined ? `Required value is of type ${type.name}.` : message);

    return value;
}

/**
 * @param {string|Array} value 
 * @param {string} message Optional.
 * @throws {TypeError}
 * @throws {Error}
 */
Guard.Empty = (value, message = undefined) => {
    if (typeof message !== 'string' && typeof message !== 'undefined') throw new TypeError(`The value of the message parameter got assigned a wrong type.`);
    if (typeof value !== 'string' && !Array.isArray(value)) throw new TypeError(`The value of the value parameter got assigned a wrong type.`);

    if (value.length > 0) throw new Error(message === undefined ? `Required value is empty.` : message);

    return value;
}

/**
 * @param {string} value 
 * @param {string} message Optional.
 * @throws {TypeError}
 * @throws {Error}
 */
Guard.WhiteSpace = (value, message = undefined) => {
    if (typeof message !== 'string' && typeof message !== 'undefined') throw new TypeError(`The value of the message parameter got assigned a wrong type.`);
    if (typeof value !== 'string') throw new TypeError(`The value of the value parameter got assigned a wrong type.`);

    if (value.trim().length === 0) throw new Error(message === undefined ? `Required value is white space.` : message);

    return value;
}

/**
 * 
 * @param {any} value 
 * @param {(any) => boolean} predicate 
 * @param {string} message Optional.
 * @throws {TypeError}
 * @throws {Error}
 */
Guard.InvalidInput = (value, predicate, message = undefined) => {
    if (typeof message !== 'string' && typeof message !== 'undefined') throw new TypeError(`The value of the message parameter got assigned a wrong type.`);
    if (typeof predicate !== 'function') throw new TypeError(`The value of the predicate parameter got assigned a wrong type.`);

    if (!predicate(value)) throw new Error(message === undefined ? `Required value did not satisfy the options.` : message);

    return value;
}

/**
 * @param {number|Array} value 
 * @param {string} message Optional.
 * @throws {TypeError}
 * @throws {RangeError}
 */
Guard.Zero = (value, message = undefined) => {
    if (typeof message !== 'string' && typeof message !== 'undefined') throw new TypeError(`The value of the message parameter got assigned a wrong type.`);
    if (typeof value !== 'number' && !Array.isArray(value)) throw new TypeError(`The value of the value parameter got assigned a wrong type.`);

    if (value === 0) throw new RangeError(message === undefined ? `Required value is equal to zero.` : message);

    return value;
}

/**
 * @param {number} value 
 * @param {string} message Optional.
 * @throws {ReferenceError}
 * @throws {TypeError}
 * @throws {RangeError}
 */
Guard.Negative = (value, message = undefined) => {
    if (typeof message !== 'string' && typeof message !== 'undefined') throw new TypeError(`The value of the message parameter got assigned a wrong type.`);
    if (typeof value !== 'number') throw new TypeError(`The value of the value parameter got assigned a wrong type.`);

    if (value < 0) throw new RangeError(message === undefined ? `Required value is less then zero.` : message);

    return value;
}

/**
 * @param {number} value 
 * @param {string} message Optional.
 * @throws {TypeError}
 * @throws {RangeError}
 */
Guard.NegativeOrZero = (value, message = undefined) => {
    if (typeof message !== 'string' && typeof message !== 'undefined') throw new TypeError(`The value of the message parameter got assigned a wrong type.`);
    if (typeof value !== 'number') throw new TypeError(`The value of the value parameter got assigned a wrong type.`);

    if (value <= 0) throw new RangeError(message === undefined ? `Required value is less then or equal to zero.` : message);

    return value;
}

/**
 * @param {number} value 
 * @param {number} maximum
 * @param {string} message Optional.
 * @throws {TypeError}
 * @throws {RangeError}
 */
Guard.LargerThen = (value, maximum, message = undefined) => {
    if (typeof message !== 'string' && typeof message !== 'undefined') throw new TypeError(`The value of the message parameter got assigned a wrong type.`);
    if (typeof value !== 'number') throw new TypeError(`The value of the value parameter got assigned a wrong type.`);
    if (typeof maximum !== 'number') throw new TypeError(`The value of the maximum parameter got assigned a wrong type.`);

    if (value > minimum) throw new RangeError(message === undefined ? `Required value is larger then maximum value.` : message);

    return value;
}

/**
 * @param {number} value 
 * @param {number} maximum
 * @param {string} message Optional.
 * @throws {TypeError}
 * @throws {RangeError}
 */
Guard.LargerThenOrEqual = (value, maximum, message = undefined) => {
    if (typeof message !== 'string' && typeof message !== 'undefined') throw new TypeError(`The value of the message parameter got assigned a wrong type.`);
    if (typeof value !== 'number') throw new TypeError(`The value of the value parameter got assigned a wrong type.`);
    if (typeof maximum !== 'number') throw new TypeError(`The value of the maximum parameter got assigned a wrong type.`);

    if (value >= minimum) throw new RangeError(message === undefined ? `Required value is larger then or equal to maximum value.` : message);

    return value;
}

/**
 * @param {number} value 
 * @param {number} minimum
 * @param {string} message Optional.
 * @throws {TypeError}
 * @throws {RangeError}
 */
Guard.LessThen = (value, minimum, message = undefined) => {
    if (typeof message !== 'string' && typeof message !== 'undefined') throw new TypeError(`The value of the message parameter got assigned a wrong type.`);
    if (typeof value !== 'number') throw new TypeError(`The value of the value parameter got assigned a wrong type.`);
    if (typeof minimum !== 'number') throw new TypeError(`The value of the minimum parameter got assigned a wrong type.`);

    if (value < minimum) throw new RangeError(message === undefined ? `Required value is less then minimum value.` : message);

    return value;
}

/**
 * @param {number} value 
 * @param {number} minimum
 * @param {string} message Optional.
 * @throws {TypeError}
 * @throws {RangeError}
 */
Guard.LessThenOrEqual = (value, minimum, message = undefined) => {
    if (typeof message !== 'string' && typeof message !== 'undefined') throw new TypeError(`The value of the message parameter got assigned a wrong type.`);
    if (typeof value !== 'number') throw new TypeError(`The value of the value parameter got assigned a wrong type.`);
    if (typeof minimum !== 'number') throw new TypeError(`The value of the minimum parameter got assigned a wrong type.`);

    if (value <= minimum) throw new RangeError(message === undefined ? `Required value is less then or equal to minimum value.` : message);

    return value;
}

/**
 * @param {number} value 
 * @param {number} rangeFrom
 * @param {number} rangeTo
 * @param {string} message Optional.
 * @throws {TypeError}
 * @throws {RangeError}
 */
Guard.OutOfRange = (value, rangeFrom, rangeTo, message = undefined) => {
    if (typeof message !== 'string' && typeof message !== 'undefined') throw new TypeError(`The value of the message parameter got assigned a wrong type.`);
    if (typeof value !== 'number') throw new TypeError(`The value of the value parameter got assigned a wrong type.`);
    if (typeof rangeFrom !== 'number') throw new TypeError(`The value of the rangeFrom parameter got assigned a wrong type.`);
    if (typeof rangeTo !== 'number') throw new TypeError(`The value of the rangeTo parameter got assigned a wrong type.`);
    if (rangeTo - rangeFrom < 0) throw new RangeError(`The value of the rangeFrom parameter must be less or equal than the value of the rangeTo parameter.`);

    if (value < rangeFrom || value > rangeTo) throw new RangeError(message === undefined ? `Required value is out of range.` : message);

    return value;
}

export default Guard;
export {
    Guard
}