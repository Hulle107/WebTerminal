`use strict`;

class Guard {}

/**
 * Throws an {@link TypeError} if the given value parameter is not of type {@link Array}.
 * @param {any} value 
 * @param {string} message Optional.
 * @throws {@link TypeError}
 */
Guard.NonArray = (value, message = undefined) => {
    if (typeof message !== 'string' && typeof message !== 'undefined') throw new TypeError(`The value of the message parameter got assigned a wrong type.`);

    if (!Array.isArray(value) || typeof value === undefined) throw new TypeError(message === undefined ? `Required value is not of type Array` : message);

    return value;
}

/**
 * Throws an {@link TypeError} if the given value parameter is not of type {@link Boolean}.
 * @param {any} value 
 * @param {string} message Optional.
 * @throws {@link TypeError}
 */
Guard.NonBoolean = (value, message = undefined) => {
    if (typeof message !== 'string' && typeof message !== 'undefined') throw new TypeError(`The value of the message parameter got assigned a wrong type.`);

    if (typeof value !== 'boolean' || typeof value === undefined) throw new TypeError(message === undefined ? `Required value is not of type Boolean.` : message);

    return value;
}

/**
 * Throws an {@link TypeError} if the given value parameter is not of type {@link Object}.
 * @param {any} value 
 * @param {string} message Optional.
 * @throws {@link TypeError}
 */
Guard.NonObject = (value, message = undefined) => {
    if (typeof message !== 'string' && typeof message !== 'undefined') throw new TypeError(`The value of the message parameter got assigned a wrong type.`);

    if (typeof value !== 'object' || typeof value === undefined) throw new TypeError(message === undefined ? `Required value is not of type Object.` : message);

    return value;
}

/**
 * Throws an {@link TypeError} if the given value parameter is not of type {@link Number}.
 * @param {any} value 
 * @param {string} message Optional.
 * @throws {@link TypeError}
 */
Guard.NonNumber = (value, message = undefined) => {
    if (typeof message !== 'string' && typeof message !== 'undefined') throw new TypeError(`The value of the message parameter got assigned a wrong type.`);

    if (typeof value !== 'number' || typeof value === undefined) throw new TypeError(message === undefined ? `Required value is not of type Number.` : message);

    return value;
}

/**
 * Throws an {@link TypeError} if the given value parameter is not of type {@link String}.
 * @param {any} value 
 * @param {string} message Optional.
 * @throws {@link TypeError}
 */
Guard.NonString = (value, message = undefined) => {
    if (typeof message !== 'string' && typeof message !== 'undefined') throw new TypeError(`The value of the message parameter got assigned a wrong type.`);

    if (typeof value !== 'string' || typeof value === undefined) throw new TypeError(message === undefined ? `Required value is not of type String.` : message);

    return value;
}

/**
 * Throws an {@link TypeError} if the given value parameter is not of type {@link String} and throws an {@link RangeError} if not a single character.
 * @param {any} value 
 * @param {string} message Optional.
 * @throws {@link TypeError}
 * @throws {@link RangeError}
 */
Guard.NonChar = (value, message = undefined) => {
    if (typeof message !== 'string' && typeof message !== 'undefined') throw new TypeError(`The value of the message parameter got assigned a wrong type.`);

    if (typeof value !== 'string' || typeof value === undefined) throw new TypeError(message === undefined ? `Required value is not of type String.` : message);
    if (value.length > 1) throw new RangeError(message === undefined ? `Required value is not a single character.` : message);

    return value;
}

/**
 * Throws an {@link TypeError} if the given value parameter is not of type of given compere parameter.
 * @param {any} value 
 * @param {function} compere
 * @param {string} message Optional.
 * @throws {@link TypeError}
 */
Guard.NonInstanceOf = (value, compere, message = undefined) => {
    if (typeof message !== 'string' && typeof message !== 'undefined') throw new TypeError(`The value of the message parameter got assigned a wrong type.`);
    if (typeof compere !== 'function') throw new TypeError(`The value of the compere parameter got assigned a wrong type.`);

    if (!value instanceof compere) throw new TypeError(message === undefined ? `Required value is not of type ${compere.name}.` : message);

    return value;
}

/**
 * Throws an {@link ReferenceError} if the given value parameter is undefined.
 * @param {any} value 
 * @param {string} message Optional.
 * @throws {@link TypeError}
 * @throws {@link ReferenceError}
 */
Guard.Undefined = (value, message = undefined) => {
    if (typeof message !== 'string' && typeof message !== 'undefined') throw new TypeError(`The value of the message parameter got assigned a wrong type.`);

    if (typeof value === 'undefined') throw new ReferenceError(message === undefined ? `Required value is of type undefined.` : message);

    return value;
}

/**
 * Throws an {@link Error} if the given value parameter is empty.
 * @param {string|Array} value 
 * @param {string} message Optional.
 * @throws {@link TypeError}
 * @throws {@link Error}
 */
Guard.Empty = (value, message = undefined) => {
    if (typeof message !== 'string' && typeof message !== 'undefined') throw new TypeError(`The value of the message parameter got assigned a wrong type.`);
    if (typeof value !== 'string' && !Array.isArray(value)) throw new TypeError(`The value of the value parameter got assigned a wrong type.`);

    if (value.length === 0) throw new Error(message === undefined ? `Required value is empty.` : message);

    return value;
}

/**
 * Throws an {@link Error} if the given value parameter is white space.
 * @param {string} value 
 * @param {string} message Optional.
 * @throws {@link TypeError}
 * @throws {@link Error}
 */
Guard.WhiteSpace = (value, message = undefined) => {
    if (typeof message !== 'string' && typeof message !== 'undefined') throw new TypeError(`The value of the message parameter got assigned a wrong type.`);
    if (typeof value !== 'string') throw new TypeError(`The value of the value parameter got assigned a wrong type.`);

    if (value.trim().length === 0) throw new Error(message === undefined ? `Required value is white space.` : message);

    return value;
}

/**
 * Throws an {@link Error} if the given value parameter did not satisfy the predicate parameter.
 * @param {any} value 
 * @param {(any) => boolean} predicate 
 * @param {string} message Optional.
 * @throws {@link TypeError}
 * @throws {@link Error}
 */
Guard.InvalidInput = (value, predicate, message = undefined) => {
    if (typeof message !== 'string' && typeof message !== 'undefined') throw new TypeError(`The value of the message parameter got assigned a wrong type.`);
    if (typeof predicate !== 'function') throw new TypeError(`The value of the predicate parameter got assigned a wrong type.`);

    if (!predicate(value)) throw new Error(message === undefined ? `Required value did not satisfy the options.` : message);

    return value;
}

/**
 * Throws an {@link RangeError} if the given value parameter is equal to zero.
 * @param {number|Array} value 
 * @param {string} message Optional.
 * @throws {@link TypeError}
 * @throws {@link RangeError}
 */
Guard.Zero = (value, message = undefined) => {
    if (typeof message !== 'string' && typeof message !== 'undefined') throw new TypeError(`The value of the message parameter got assigned a wrong type.`);
    if (typeof value !== 'number' && !Array.isArray(value)) throw new TypeError(`The value of the value parameter got assigned a wrong type.`);

    let check = false;

    if (Array.isArray(value)) check = value.length === 0;
    if (typeof value === 'number') check = value === 0;
    if (check) throw new RangeError(message === undefined ? `Required value is equal to zero.` : message);

    return value;
}

/**
 * Throws an {@link RangeError} if the given value parameter is less then zero.
 * @param {number} value 
 * @param {string} message Optional.
 * @throws {@link TypeError}
 * @throws {@link RangeError}
 */
Guard.Negative = (value, message = undefined) => {
    if (typeof message !== 'string' && typeof message !== 'undefined') throw new TypeError(`The value of the message parameter got assigned a wrong type.`);
    if (typeof value !== 'number') throw new TypeError(`The value of the value parameter got assigned a wrong type.`);

    if (value < 0) throw new RangeError(message === undefined ? `Required value is less then zero.` : message);

    return value;
}

/**
 * Throws an {@link RangeError} if the given value parameter is less then or equal to zero.
 * @param {number} value 
 * @param {string} message Optional.
 * @throws {@link TypeError}
 * @throws {@link RangeError}
 */
Guard.NegativeOrZero = (value, message = undefined) => {
    if (typeof message !== 'string' && typeof message !== 'undefined') throw new TypeError(`The value of the message parameter got assigned a wrong type.`);
    if (typeof value !== 'number') throw new TypeError(`The value of the value parameter got assigned a wrong type.`);

    if (value <= 0) throw new RangeError(message === undefined ? `Required value is less then or equal to zero.` : message);

    return value;
}

/**
 * Throws an {@link RangeError} if the given value parameter is larger then the given maximum parameter value.
 * @param {number|Array} value 
 * @param {number} maximum
 * @param {string} message Optional.
 * @throws {@link TypeError}
 * @throws {@link RangeError}
 */
Guard.BiggerThen = (value, maximum, message = undefined) => {
    if (typeof message !== 'string' && typeof message !== 'undefined') throw new TypeError(`The value of the message parameter got assigned a wrong type.`);
    if (typeof value !== 'number' && !Array.isArray(value)) throw new TypeError(`The value of the value parameter got assigned a wrong type.`);
    if (typeof maximum !== 'number') throw new TypeError(`The value of the maximum parameter got assigned a wrong type.`);

    let check = false;

    if (Array.isArray(value)) check = value.length > maximum;
    if (typeof value === 'number') check = value > maximum;
    if (check) throw new RangeError(message === undefined ? `Required value is larger then maximum value.` : message);

    return value;
}

/**
 * Throws an {@link RangeError} if the given value parameter is larger then or equal to the given maximum parameter value.
 * @param {number|Array} value 
 * @param {number} maximum
 * @param {string} message Optional.
 * @throws {@link TypeError}
 * @throws {@link RangeError}
 */
Guard.BiggerThenOrEqual = (value, maximum, message = undefined) => {
    if (typeof message !== 'string' && typeof message !== 'undefined') throw new TypeError(`The value of the message parameter got assigned a wrong type.`);
    if (typeof value !== 'number' && !Array.isArray(value)) throw new TypeError(`The value of the value parameter got assigned a wrong type.`);
    if (typeof maximum !== 'number') throw new TypeError(`The value of the maximum parameter got assigned a wrong type.`);

    let check = false;

    if (Array.isArray(value)) check = value.length >= maximum;
    if (typeof value === 'number') check = value >= maximum;
    if (check) throw new RangeError(message === undefined ? `Required value is larger then or equal to maximum value.` : message);

    return value;
}

/**
 * Throws an {@link RangeError} if the given value parameter is less then the given minimum parameter value.
 * @param {number|Array} value 
 * @param {number} minimum
 * @param {string} message Optional.
 * @throws {@link TypeError}
 * @throws {@link RangeError}
 */
Guard.LessThen = (value, minimum, message = undefined) => {
    if (typeof message !== 'string' && typeof message !== 'undefined') throw new TypeError(`The value of the message parameter got assigned a wrong type.`);
    if (typeof value !== 'number' && !Array.isArray(value)) throw new TypeError(`The value of the value parameter got assigned a wrong type.`);
    if (typeof minimum !== 'number') throw new TypeError(`The value of the minimum parameter got assigned a wrong type.`);

    let check = false;

    if (Array.isArray(value)) check = value.length < minimum;
    if (typeof value === 'number') check = value < minimum;
    if (check) throw new RangeError(message === undefined ? `Required value is less then minimum value.` : message);

    return value;
}

/**
 * Throws an {@link RangeError} if the given value parameter is less then or equal to the given minimum parameter value.
 * @param {number|Array} value 
 * @param {number} minimum
 * @param {string} message Optional.
 * @throws {@link TypeError}
 * @throws {@link RangeError}
 */
Guard.LessThenOrEqual = (value, minimum, message = undefined) => {
    if (typeof message !== 'string' && typeof message !== 'undefined') throw new TypeError(`The value of the message parameter got assigned a wrong type.`);
    if (typeof value !== 'number' && !Array.isArray(value)) throw new TypeError(`The value of the value parameter got assigned a wrong type.`);
    if (typeof minimum !== 'number') throw new TypeError(`The value of the minimum parameter got assigned a wrong type.`);

    let check = false;

    if (Array.isArray(value)) check = value.length <= minimum;
    if (typeof value === 'number') check = value <= minimum;
    if (check) throw new RangeError(message === undefined ? `Required value is less then or equal to minimum value.` : message);

    return value;
}

/**
 * Throws an {@link RangeError} if the given value parameter is out of range of the given rangeFrom parameter and the given rangeTo parameter.
 * @param {number} value 
 * @param {number} rangeFrom
 * @param {number} rangeTo
 * @param {string} message Optional.
 * @throws {@link TypeError}
 * @throws {@link RangeError}
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
