#!/usr/bin/env node
var __import_meta_url__ = require('url').pathToFileURL(__filename).href;

var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// ../packages/curness-core/node_modules/@sindresorhus/is/distribution/utilities.js
function keysOf(value) {
  return Object.keys(value);
}
var init_utilities = __esm({
  "../packages/curness-core/node_modules/@sindresorhus/is/distribution/utilities.js"() {
  }
});

// ../packages/curness-core/node_modules/@sindresorhus/is/distribution/index.js
function isTypedArrayName(name) {
  return typedArrayTypeNames.includes(name);
}
function isObjectTypeName(name) {
  return objectTypeNames.includes(name);
}
function isPrimitiveTypeName(name) {
  return primitiveTypeNames.includes(name);
}
function detect(value) {
  if (value === null) {
    return "null";
  }
  switch (typeof value) {
    case "undefined": {
      return "undefined";
    }
    case "string": {
      return "string";
    }
    case "number": {
      return Number.isNaN(value) ? "NaN" : "number";
    }
    case "boolean": {
      return "boolean";
    }
    case "function": {
      return "Function";
    }
    case "bigint": {
      return "bigint";
    }
    case "symbol": {
      return "symbol";
    }
    default:
  }
  if (isObservable(value)) {
    return "Observable";
  }
  if (isArray(value)) {
    return "Array";
  }
  if (isBuffer(value)) {
    return "Buffer";
  }
  const tagType = getObjectType(value);
  if (tagType && tagType !== "Object") {
    return tagType;
  }
  if (hasPromiseApi(value)) {
    return "Promise";
  }
  if (value instanceof String || value instanceof Boolean || value instanceof Number) {
    throw new TypeError("Please don't use object wrappers for primitive types");
  }
  return "Object";
}
function hasPromiseApi(value) {
  return isFunction(value == null ? void 0 : value.then) && isFunction(value == null ? void 0 : value.catch);
}
function isAbsoluteModule2(remainder) {
  return (value) => isInteger(value) && Math.abs(value % 2) === remainder;
}
function validatePredicateArray(predicateArray, allowEmpty) {
  if (predicateArray.length === 0) {
    if (allowEmpty) {
    } else {
      throw new TypeError("Invalid predicate array");
    }
    return;
  }
  for (const predicate of predicateArray) {
    if (!isFunction(predicate)) {
      throw new TypeError(`Invalid predicate: ${JSON.stringify(predicate)}`);
    }
  }
}
function isAll(predicate, ...values) {
  if (Array.isArray(predicate)) {
    const predicateArray = predicate;
    validatePredicateArray(predicateArray, values.length === 0);
    const combinedPredicate = (value) => predicateArray.every((singlePredicate) => singlePredicate(value));
    if (values.length === 0) {
      return combinedPredicate;
    }
    return predicateOnArray(Array.prototype.every, combinedPredicate, values);
  }
  return predicateOnArray(Array.prototype.every, predicate, values);
}
function isAny(predicate, ...values) {
  if (Array.isArray(predicate)) {
    const predicateArray = predicate;
    validatePredicateArray(predicateArray, values.length === 0);
    const combinedPredicate = (value) => predicateArray.some((singlePredicate) => singlePredicate(value));
    if (values.length === 0) {
      return combinedPredicate;
    }
    return predicateOnArray(Array.prototype.some, combinedPredicate, values);
  }
  return predicateOnArray(Array.prototype.some, predicate, values);
}
function isOptional(value, predicate) {
  return isUndefined(value) || predicate(value);
}
function isArray(value, assertion) {
  if (!Array.isArray(value)) {
    return false;
  }
  if (!isFunction(assertion)) {
    return true;
  }
  return value.every((element) => assertion(element));
}
function isArrayBuffer(value) {
  return getObjectType(value) === "ArrayBuffer";
}
function isArrayLike(value) {
  return !isNullOrUndefined(value) && !isFunction(value) && isValidLength(value.length);
}
function isAsyncFunction(value) {
  return getObjectType(value) === "AsyncFunction";
}
function isAsyncGenerator(value) {
  return isAsyncIterable(value) && isFunction(value.next) && isFunction(value.throw);
}
function isAsyncGeneratorFunction(value) {
  return getObjectType(value) === "AsyncGeneratorFunction";
}
function isAsyncIterable(value) {
  return isFunction(value == null ? void 0 : value[Symbol.asyncIterator]);
}
function isBigint(value) {
  return typeof value === "bigint";
}
function isBigInt64Array(value) {
  return getObjectType(value) === "BigInt64Array";
}
function isBigUint64Array(value) {
  return getObjectType(value) === "BigUint64Array";
}
function isBlob(value) {
  return getObjectType(value) === "Blob";
}
function isBoolean(value) {
  return value === true || value === false;
}
function isBoundFunction(value) {
  return isFunction(value) && !Object.hasOwn(value, "prototype");
}
function isBuffer(value) {
  var _a, _b;
  return ((_b = (_a = value == null ? void 0 : value.constructor) == null ? void 0 : _a.isBuffer) == null ? void 0 : _b.call(_a, value)) ?? false;
}
function isClass(value) {
  return isFunction(value) && /^class(\s+|{)/.test(value.toString());
}
function isDataView(value) {
  return getObjectType(value) === "DataView";
}
function isDate(value) {
  return getObjectType(value) === "Date";
}
function isDirectInstanceOf(instance, class_) {
  if (instance === void 0 || instance === null) {
    return false;
  }
  return Object.getPrototypeOf(instance) === class_.prototype;
}
function isEmptyArray(value) {
  return isArray(value) && value.length === 0;
}
function isEmptyMap(value) {
  return isMap(value) && value.size === 0;
}
function isEmptyObject(value) {
  return isObject(value) && !isMap(value) && !isSet(value) && Object.keys(value).length === 0;
}
function isEmptySet(value) {
  return isSet(value) && value.size === 0;
}
function isEmptyString(value) {
  return isString(value) && value.length === 0;
}
function isEmptyStringOrWhitespace(value) {
  return isEmptyString(value) || isWhitespaceString(value);
}
function isEnumCase(value, targetEnum) {
  return Object.values(targetEnum).includes(value);
}
function isError(value) {
  return getObjectType(value) === "Error";
}
function isEvenInteger(value) {
  return isAbsoluteModule2(0)(value);
}
function isFalsy(value) {
  return !value;
}
function isFloat32Array(value) {
  return getObjectType(value) === "Float32Array";
}
function isFloat64Array(value) {
  return getObjectType(value) === "Float64Array";
}
function isFormData(value) {
  return getObjectType(value) === "FormData";
}
function isFunction(value) {
  return typeof value === "function";
}
function isGenerator(value) {
  return isIterable(value) && isFunction(value == null ? void 0 : value.next) && isFunction(value == null ? void 0 : value.throw);
}
function isGeneratorFunction(value) {
  return getObjectType(value) === "GeneratorFunction";
}
function isHtmlElement(value) {
  return isObject(value) && value.nodeType === NODE_TYPE_ELEMENT && isString(value.nodeName) && !isPlainObject(value) && DOM_PROPERTIES_TO_CHECK.every((property) => property in value);
}
function isInfinite(value) {
  return value === Number.POSITIVE_INFINITY || value === Number.NEGATIVE_INFINITY;
}
function isInRange(value, range) {
  if (isNumber(range)) {
    return value >= Math.min(0, range) && value <= Math.max(range, 0);
  }
  if (isArray(range) && range.length === 2) {
    return value >= Math.min(...range) && value <= Math.max(...range);
  }
  throw new TypeError(`Invalid range: ${JSON.stringify(range)}`);
}
function isInt16Array(value) {
  return getObjectType(value) === "Int16Array";
}
function isInt32Array(value) {
  return getObjectType(value) === "Int32Array";
}
function isInt8Array(value) {
  return getObjectType(value) === "Int8Array";
}
function isInteger(value) {
  return Number.isInteger(value);
}
function isIterable(value) {
  return isFunction(value == null ? void 0 : value[Symbol.iterator]);
}
function isMap(value) {
  return getObjectType(value) === "Map";
}
function isNan(value) {
  return Number.isNaN(value);
}
function isNativePromise(value) {
  return getObjectType(value) === "Promise";
}
function isNegativeNumber(value) {
  return isNumber(value) && value < 0;
}
function isNodeStream(value) {
  return isObject(value) && isFunction(value.pipe) && !isObservable(value);
}
function isNonEmptyArray(value) {
  return isArray(value) && value.length > 0;
}
function isNonEmptyMap(value) {
  return isMap(value) && value.size > 0;
}
function isNonEmptyObject(value) {
  return isObject(value) && !isMap(value) && !isSet(value) && Object.keys(value).length > 0;
}
function isNonEmptySet(value) {
  return isSet(value) && value.size > 0;
}
function isNonEmptyString(value) {
  return isString(value) && value.length > 0;
}
function isNonEmptyStringAndNotWhitespace(value) {
  return isString(value) && !isEmptyStringOrWhitespace(value);
}
function isNull(value) {
  return value === null;
}
function isNullOrUndefined(value) {
  return isNull(value) || isUndefined(value);
}
function isNumber(value) {
  return typeof value === "number" && !Number.isNaN(value);
}
function isNumericString(value) {
  return isString(value) && !isEmptyStringOrWhitespace(value) && !Number.isNaN(Number(value));
}
function isObject(value) {
  return !isNull(value) && (typeof value === "object" || isFunction(value));
}
function isObservable(value) {
  var _a, _b;
  if (!value) {
    return false;
  }
  if (Symbol.observable !== void 0 && value === ((_a = value[Symbol.observable]) == null ? void 0 : _a.call(value))) {
    return true;
  }
  if (value === ((_b = value["@@observable"]) == null ? void 0 : _b.call(value))) {
    return true;
  }
  return false;
}
function isOddInteger(value) {
  return isAbsoluteModule2(1)(value);
}
function isPlainObject(value) {
  if (typeof value !== "object" || value === null) {
    return false;
  }
  const prototype = Object.getPrototypeOf(value);
  return (prototype === null || prototype === Object.prototype || Object.getPrototypeOf(prototype) === null) && !(Symbol.toStringTag in value) && !(Symbol.iterator in value);
}
function isPositiveNumber(value) {
  return isNumber(value) && value > 0;
}
function isPrimitive(value) {
  return isNull(value) || isPrimitiveTypeName(typeof value);
}
function isPromise(value) {
  return isNativePromise(value) || hasPromiseApi(value);
}
function isPropertyKey(value) {
  return isAny([isString, isNumber, isSymbol], value);
}
function isRegExp(value) {
  return getObjectType(value) === "RegExp";
}
function isSafeInteger(value) {
  return Number.isSafeInteger(value);
}
function isSet(value) {
  return getObjectType(value) === "Set";
}
function isSharedArrayBuffer(value) {
  return getObjectType(value) === "SharedArrayBuffer";
}
function isString(value) {
  return typeof value === "string";
}
function isSymbol(value) {
  return typeof value === "symbol";
}
function isTruthy(value) {
  return Boolean(value);
}
function isTupleLike(value, guards) {
  if (isArray(guards) && isArray(value) && guards.length === value.length) {
    return guards.every((guard, index) => guard(value[index]));
  }
  return false;
}
function isTypedArray(value) {
  return isTypedArrayName(getObjectType(value));
}
function isUint16Array(value) {
  return getObjectType(value) === "Uint16Array";
}
function isUint32Array(value) {
  return getObjectType(value) === "Uint32Array";
}
function isUint8Array(value) {
  return getObjectType(value) === "Uint8Array";
}
function isUint8ClampedArray(value) {
  return getObjectType(value) === "Uint8ClampedArray";
}
function isUndefined(value) {
  return value === void 0;
}
function isUrlInstance(value) {
  return getObjectType(value) === "URL";
}
function isUrlSearchParams(value) {
  return getObjectType(value) === "URLSearchParams";
}
function isUrlString(value) {
  if (!isString(value)) {
    return false;
  }
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
}
function isValidDate(value) {
  return isDate(value) && !isNan(Number(value));
}
function isValidLength(value) {
  return isSafeInteger(value) && value >= 0;
}
function isWeakMap(value) {
  return getObjectType(value) === "WeakMap";
}
function isWeakRef(value) {
  return getObjectType(value) === "WeakRef";
}
function isWeakSet(value) {
  return getObjectType(value) === "WeakSet";
}
function isWhitespaceString(value) {
  return isString(value) && /^\s+$/.test(value);
}
function predicateOnArray(method, predicate, values) {
  if (!isFunction(predicate)) {
    throw new TypeError(`Invalid predicate: ${JSON.stringify(predicate)}`);
  }
  if (values.length === 0) {
    throw new TypeError("Invalid number of values");
  }
  return method.call(values, predicate);
}
function typeErrorMessage(description, value) {
  return `Expected value which is \`${description}\`, received value of type \`${is(value)}\`.`;
}
function unique(values) {
  return Array.from(new Set(values));
}
function typeErrorMessageMultipleValues(expectedType, values) {
  const uniqueExpectedTypes = unique((isArray(expectedType) ? expectedType : [expectedType]).map((value) => `\`${value}\``));
  const uniqueValueTypes = unique(values.map((value) => `\`${is(value)}\``));
  return `Expected values which are ${orFormatter.format(uniqueExpectedTypes)}. Received values of type${uniqueValueTypes.length > 1 ? "s" : ""} ${andFormatter.format(uniqueValueTypes)}.`;
}
function isIsMethodName(value) {
  return isMethodNames.includes(value);
}
function assertAll(predicate, ...values) {
  if (values.length === 0) {
    throw new TypeError("Invalid number of values");
  }
  if (!isAll(predicate, ...values)) {
    const predicateFunction = predicate;
    const expectedType = !Array.isArray(predicate) && isIsMethodName(predicateFunction.name) ? methodTypeMap[predicateFunction.name] : "predicate returns truthy for all values";
    throw new TypeError(typeErrorMessageMultipleValues(expectedType, values));
  }
}
function assertAny(predicate, ...values) {
  if (values.length === 0) {
    throw new TypeError("Invalid number of values");
  }
  if (!isAny(predicate, ...values)) {
    const predicates = Array.isArray(predicate) ? predicate : [predicate];
    const expectedTypes = predicates.map((singlePredicate) => isIsMethodName(singlePredicate.name) ? methodTypeMap[singlePredicate.name] : "predicate returns truthy for any value");
    throw new TypeError(typeErrorMessageMultipleValues(expectedTypes, values));
  }
}
function assertOptional(value, assertion, message) {
  if (!isUndefined(value)) {
    assertion(value, message);
  }
}
function assertArray(value, assertion, message) {
  if (!isArray(value)) {
    throw new TypeError(message ?? typeErrorMessage("Array", value));
  }
  if (assertion) {
    for (const element of value) {
      assertion(element, message);
    }
  }
}
function assertArrayBuffer(value, message) {
  if (!isArrayBuffer(value)) {
    throw new TypeError(message ?? typeErrorMessage("ArrayBuffer", value));
  }
}
function assertArrayLike(value, message) {
  if (!isArrayLike(value)) {
    throw new TypeError(message ?? typeErrorMessage("array-like", value));
  }
}
function assertAsyncFunction(value, message) {
  if (!isAsyncFunction(value)) {
    throw new TypeError(message ?? typeErrorMessage("AsyncFunction", value));
  }
}
function assertAsyncGenerator(value, message) {
  if (!isAsyncGenerator(value)) {
    throw new TypeError(message ?? typeErrorMessage("AsyncGenerator", value));
  }
}
function assertAsyncGeneratorFunction(value, message) {
  if (!isAsyncGeneratorFunction(value)) {
    throw new TypeError(message ?? typeErrorMessage("AsyncGeneratorFunction", value));
  }
}
function assertAsyncIterable(value, message) {
  if (!isAsyncIterable(value)) {
    throw new TypeError(message ?? typeErrorMessage("AsyncIterable", value));
  }
}
function assertBigint(value, message) {
  if (!isBigint(value)) {
    throw new TypeError(message ?? typeErrorMessage("bigint", value));
  }
}
function assertBigInt64Array(value, message) {
  if (!isBigInt64Array(value)) {
    throw new TypeError(message ?? typeErrorMessage("BigInt64Array", value));
  }
}
function assertBigUint64Array(value, message) {
  if (!isBigUint64Array(value)) {
    throw new TypeError(message ?? typeErrorMessage("BigUint64Array", value));
  }
}
function assertBlob(value, message) {
  if (!isBlob(value)) {
    throw new TypeError(message ?? typeErrorMessage("Blob", value));
  }
}
function assertBoolean(value, message) {
  if (!isBoolean(value)) {
    throw new TypeError(message ?? typeErrorMessage("boolean", value));
  }
}
function assertBoundFunction(value, message) {
  if (!isBoundFunction(value)) {
    throw new TypeError(message ?? typeErrorMessage("Function", value));
  }
}
function assertBuffer(value, message) {
  if (!isBuffer(value)) {
    throw new TypeError(message ?? typeErrorMessage("Buffer", value));
  }
}
function assertClass(value, message) {
  if (!isClass(value)) {
    throw new TypeError(message ?? typeErrorMessage("Class", value));
  }
}
function assertDataView(value, message) {
  if (!isDataView(value)) {
    throw new TypeError(message ?? typeErrorMessage("DataView", value));
  }
}
function assertDate(value, message) {
  if (!isDate(value)) {
    throw new TypeError(message ?? typeErrorMessage("Date", value));
  }
}
function assertDirectInstanceOf(instance, class_, message) {
  if (!isDirectInstanceOf(instance, class_)) {
    throw new TypeError(message ?? typeErrorMessage("T", instance));
  }
}
function assertEmptyArray(value, message) {
  if (!isEmptyArray(value)) {
    throw new TypeError(message ?? typeErrorMessage("empty array", value));
  }
}
function assertEmptyMap(value, message) {
  if (!isEmptyMap(value)) {
    throw new TypeError(message ?? typeErrorMessage("empty map", value));
  }
}
function assertEmptyObject(value, message) {
  if (!isEmptyObject(value)) {
    throw new TypeError(message ?? typeErrorMessage("empty object", value));
  }
}
function assertEmptySet(value, message) {
  if (!isEmptySet(value)) {
    throw new TypeError(message ?? typeErrorMessage("empty set", value));
  }
}
function assertEmptyString(value, message) {
  if (!isEmptyString(value)) {
    throw new TypeError(message ?? typeErrorMessage("empty string", value));
  }
}
function assertEmptyStringOrWhitespace(value, message) {
  if (!isEmptyStringOrWhitespace(value)) {
    throw new TypeError(message ?? typeErrorMessage("empty string or whitespace", value));
  }
}
function assertEnumCase(value, targetEnum, message) {
  if (!isEnumCase(value, targetEnum)) {
    throw new TypeError(message ?? typeErrorMessage("EnumCase", value));
  }
}
function assertError(value, message) {
  if (!isError(value)) {
    throw new TypeError(message ?? typeErrorMessage("Error", value));
  }
}
function assertEvenInteger(value, message) {
  if (!isEvenInteger(value)) {
    throw new TypeError(message ?? typeErrorMessage("even integer", value));
  }
}
function assertFalsy(value, message) {
  if (!isFalsy(value)) {
    throw new TypeError(message ?? typeErrorMessage("falsy", value));
  }
}
function assertFloat32Array(value, message) {
  if (!isFloat32Array(value)) {
    throw new TypeError(message ?? typeErrorMessage("Float32Array", value));
  }
}
function assertFloat64Array(value, message) {
  if (!isFloat64Array(value)) {
    throw new TypeError(message ?? typeErrorMessage("Float64Array", value));
  }
}
function assertFormData(value, message) {
  if (!isFormData(value)) {
    throw new TypeError(message ?? typeErrorMessage("FormData", value));
  }
}
function assertFunction(value, message) {
  if (!isFunction(value)) {
    throw new TypeError(message ?? typeErrorMessage("Function", value));
  }
}
function assertGenerator(value, message) {
  if (!isGenerator(value)) {
    throw new TypeError(message ?? typeErrorMessage("Generator", value));
  }
}
function assertGeneratorFunction(value, message) {
  if (!isGeneratorFunction(value)) {
    throw new TypeError(message ?? typeErrorMessage("GeneratorFunction", value));
  }
}
function assertHtmlElement(value, message) {
  if (!isHtmlElement(value)) {
    throw new TypeError(message ?? typeErrorMessage("HTMLElement", value));
  }
}
function assertInfinite(value, message) {
  if (!isInfinite(value)) {
    throw new TypeError(message ?? typeErrorMessage("infinite number", value));
  }
}
function assertInRange(value, range, message) {
  if (!isInRange(value, range)) {
    throw new TypeError(message ?? typeErrorMessage("in range", value));
  }
}
function assertInt16Array(value, message) {
  if (!isInt16Array(value)) {
    throw new TypeError(message ?? typeErrorMessage("Int16Array", value));
  }
}
function assertInt32Array(value, message) {
  if (!isInt32Array(value)) {
    throw new TypeError(message ?? typeErrorMessage("Int32Array", value));
  }
}
function assertInt8Array(value, message) {
  if (!isInt8Array(value)) {
    throw new TypeError(message ?? typeErrorMessage("Int8Array", value));
  }
}
function assertInteger(value, message) {
  if (!isInteger(value)) {
    throw new TypeError(message ?? typeErrorMessage("integer", value));
  }
}
function assertIterable(value, message) {
  if (!isIterable(value)) {
    throw new TypeError(message ?? typeErrorMessage("Iterable", value));
  }
}
function assertMap(value, message) {
  if (!isMap(value)) {
    throw new TypeError(message ?? typeErrorMessage("Map", value));
  }
}
function assertNan(value, message) {
  if (!isNan(value)) {
    throw new TypeError(message ?? typeErrorMessage("NaN", value));
  }
}
function assertNativePromise(value, message) {
  if (!isNativePromise(value)) {
    throw new TypeError(message ?? typeErrorMessage("native Promise", value));
  }
}
function assertNegativeNumber(value, message) {
  if (!isNegativeNumber(value)) {
    throw new TypeError(message ?? typeErrorMessage("negative number", value));
  }
}
function assertNodeStream(value, message) {
  if (!isNodeStream(value)) {
    throw new TypeError(message ?? typeErrorMessage("Node.js Stream", value));
  }
}
function assertNonEmptyArray(value, message) {
  if (!isNonEmptyArray(value)) {
    throw new TypeError(message ?? typeErrorMessage("non-empty array", value));
  }
}
function assertNonEmptyMap(value, message) {
  if (!isNonEmptyMap(value)) {
    throw new TypeError(message ?? typeErrorMessage("non-empty map", value));
  }
}
function assertNonEmptyObject(value, message) {
  if (!isNonEmptyObject(value)) {
    throw new TypeError(message ?? typeErrorMessage("non-empty object", value));
  }
}
function assertNonEmptySet(value, message) {
  if (!isNonEmptySet(value)) {
    throw new TypeError(message ?? typeErrorMessage("non-empty set", value));
  }
}
function assertNonEmptyString(value, message) {
  if (!isNonEmptyString(value)) {
    throw new TypeError(message ?? typeErrorMessage("non-empty string", value));
  }
}
function assertNonEmptyStringAndNotWhitespace(value, message) {
  if (!isNonEmptyStringAndNotWhitespace(value)) {
    throw new TypeError(message ?? typeErrorMessage("non-empty string and not whitespace", value));
  }
}
function assertNull(value, message) {
  if (!isNull(value)) {
    throw new TypeError(message ?? typeErrorMessage("null", value));
  }
}
function assertNullOrUndefined(value, message) {
  if (!isNullOrUndefined(value)) {
    throw new TypeError(message ?? typeErrorMessage("null or undefined", value));
  }
}
function assertNumber(value, message) {
  if (!isNumber(value)) {
    throw new TypeError(message ?? typeErrorMessage("number", value));
  }
}
function assertNumericString(value, message) {
  if (!isNumericString(value)) {
    throw new TypeError(message ?? typeErrorMessage("string with a number", value));
  }
}
function assertObject(value, message) {
  if (!isObject(value)) {
    throw new TypeError(message ?? typeErrorMessage("Object", value));
  }
}
function assertObservable(value, message) {
  if (!isObservable(value)) {
    throw new TypeError(message ?? typeErrorMessage("Observable", value));
  }
}
function assertOddInteger(value, message) {
  if (!isOddInteger(value)) {
    throw new TypeError(message ?? typeErrorMessage("odd integer", value));
  }
}
function assertPlainObject(value, message) {
  if (!isPlainObject(value)) {
    throw new TypeError(message ?? typeErrorMessage("plain object", value));
  }
}
function assertPositiveNumber(value, message) {
  if (!isPositiveNumber(value)) {
    throw new TypeError(message ?? typeErrorMessage("positive number", value));
  }
}
function assertPrimitive(value, message) {
  if (!isPrimitive(value)) {
    throw new TypeError(message ?? typeErrorMessage("primitive", value));
  }
}
function assertPromise(value, message) {
  if (!isPromise(value)) {
    throw new TypeError(message ?? typeErrorMessage("Promise", value));
  }
}
function assertPropertyKey(value, message) {
  if (!isPropertyKey(value)) {
    throw new TypeError(message ?? typeErrorMessage("PropertyKey", value));
  }
}
function assertRegExp(value, message) {
  if (!isRegExp(value)) {
    throw new TypeError(message ?? typeErrorMessage("RegExp", value));
  }
}
function assertSafeInteger(value, message) {
  if (!isSafeInteger(value)) {
    throw new TypeError(message ?? typeErrorMessage("integer", value));
  }
}
function assertSet(value, message) {
  if (!isSet(value)) {
    throw new TypeError(message ?? typeErrorMessage("Set", value));
  }
}
function assertSharedArrayBuffer(value, message) {
  if (!isSharedArrayBuffer(value)) {
    throw new TypeError(message ?? typeErrorMessage("SharedArrayBuffer", value));
  }
}
function assertString(value, message) {
  if (!isString(value)) {
    throw new TypeError(message ?? typeErrorMessage("string", value));
  }
}
function assertSymbol(value, message) {
  if (!isSymbol(value)) {
    throw new TypeError(message ?? typeErrorMessage("symbol", value));
  }
}
function assertTruthy(value, message) {
  if (!isTruthy(value)) {
    throw new TypeError(message ?? typeErrorMessage("truthy", value));
  }
}
function assertTupleLike(value, guards, message) {
  if (!isTupleLike(value, guards)) {
    throw new TypeError(message ?? typeErrorMessage("tuple-like", value));
  }
}
function assertTypedArray(value, message) {
  if (!isTypedArray(value)) {
    throw new TypeError(message ?? typeErrorMessage("TypedArray", value));
  }
}
function assertUint16Array(value, message) {
  if (!isUint16Array(value)) {
    throw new TypeError(message ?? typeErrorMessage("Uint16Array", value));
  }
}
function assertUint32Array(value, message) {
  if (!isUint32Array(value)) {
    throw new TypeError(message ?? typeErrorMessage("Uint32Array", value));
  }
}
function assertUint8Array(value, message) {
  if (!isUint8Array(value)) {
    throw new TypeError(message ?? typeErrorMessage("Uint8Array", value));
  }
}
function assertUint8ClampedArray(value, message) {
  if (!isUint8ClampedArray(value)) {
    throw new TypeError(message ?? typeErrorMessage("Uint8ClampedArray", value));
  }
}
function assertUndefined(value, message) {
  if (!isUndefined(value)) {
    throw new TypeError(message ?? typeErrorMessage("undefined", value));
  }
}
function assertUrlInstance(value, message) {
  if (!isUrlInstance(value)) {
    throw new TypeError(message ?? typeErrorMessage("URL", value));
  }
}
function assertUrlSearchParams(value, message) {
  if (!isUrlSearchParams(value)) {
    throw new TypeError(message ?? typeErrorMessage("URLSearchParams", value));
  }
}
function assertUrlString(value, message) {
  if (!isUrlString(value)) {
    throw new TypeError(message ?? typeErrorMessage("string with a URL", value));
  }
}
function assertValidDate(value, message) {
  if (!isValidDate(value)) {
    throw new TypeError(message ?? typeErrorMessage("valid Date", value));
  }
}
function assertValidLength(value, message) {
  if (!isValidLength(value)) {
    throw new TypeError(message ?? typeErrorMessage("valid length", value));
  }
}
function assertWeakMap(value, message) {
  if (!isWeakMap(value)) {
    throw new TypeError(message ?? typeErrorMessage("WeakMap", value));
  }
}
function assertWeakRef(value, message) {
  if (!isWeakRef(value)) {
    throw new TypeError(message ?? typeErrorMessage("WeakRef", value));
  }
}
function assertWeakSet(value, message) {
  if (!isWeakSet(value)) {
    throw new TypeError(message ?? typeErrorMessage("WeakSet", value));
  }
}
function assertWhitespaceString(value, message) {
  if (!isWhitespaceString(value)) {
    throw new TypeError(message ?? typeErrorMessage("whitespace string", value));
  }
}
var typedArrayTypeNames, objectTypeNames, primitiveTypeNames, assertionTypeDescriptions, getObjectType, is, NODE_TYPE_ELEMENT, DOM_PROPERTIES_TO_CHECK, andFormatter, orFormatter, assert, methodTypeMap, isMethodNames, distribution_default;
var init_distribution = __esm({
  "../packages/curness-core/node_modules/@sindresorhus/is/distribution/index.js"() {
    init_utilities();
    typedArrayTypeNames = [
      "Int8Array",
      "Uint8Array",
      "Uint8ClampedArray",
      "Int16Array",
      "Uint16Array",
      "Int32Array",
      "Uint32Array",
      "Float32Array",
      "Float64Array",
      "BigInt64Array",
      "BigUint64Array"
    ];
    objectTypeNames = [
      "Function",
      "Generator",
      "AsyncGenerator",
      "GeneratorFunction",
      "AsyncGeneratorFunction",
      "AsyncFunction",
      "Observable",
      "Array",
      "Buffer",
      "Blob",
      "Object",
      "RegExp",
      "Date",
      "Error",
      "Map",
      "Set",
      "WeakMap",
      "WeakSet",
      "WeakRef",
      "ArrayBuffer",
      "SharedArrayBuffer",
      "DataView",
      "Promise",
      "URL",
      "FormData",
      "URLSearchParams",
      "HTMLElement",
      "NaN",
      ...typedArrayTypeNames
    ];
    primitiveTypeNames = [
      "null",
      "undefined",
      "string",
      "number",
      "bigint",
      "boolean",
      "symbol"
    ];
    assertionTypeDescriptions = [
      "positive number",
      "negative number",
      "Class",
      "string with a number",
      "null or undefined",
      "Iterable",
      "AsyncIterable",
      "native Promise",
      "EnumCase",
      "string with a URL",
      "truthy",
      "falsy",
      "primitive",
      "integer",
      "plain object",
      "TypedArray",
      "array-like",
      "tuple-like",
      "Node.js Stream",
      "infinite number",
      "empty array",
      "non-empty array",
      "empty string",
      "empty string or whitespace",
      "non-empty string",
      "non-empty string and not whitespace",
      "empty object",
      "non-empty object",
      "empty set",
      "non-empty set",
      "empty map",
      "non-empty map",
      "PropertyKey",
      "even integer",
      "odd integer",
      "T",
      "in range",
      "predicate returns truthy for any value",
      "predicate returns truthy for all values",
      "valid Date",
      "valid length",
      "whitespace string",
      ...objectTypeNames,
      ...primitiveTypeNames
    ];
    getObjectType = (value) => {
      const objectTypeName = Object.prototype.toString.call(value).slice(8, -1);
      if (/HTML\w+Element/.test(objectTypeName) && isHtmlElement(value)) {
        return "HTMLElement";
      }
      if (isObjectTypeName(objectTypeName)) {
        return objectTypeName;
      }
      return void 0;
    };
    is = Object.assign(detect, {
      all: isAll,
      any: isAny,
      array: isArray,
      arrayBuffer: isArrayBuffer,
      arrayLike: isArrayLike,
      asyncFunction: isAsyncFunction,
      asyncGenerator: isAsyncGenerator,
      asyncGeneratorFunction: isAsyncGeneratorFunction,
      asyncIterable: isAsyncIterable,
      bigint: isBigint,
      bigInt64Array: isBigInt64Array,
      bigUint64Array: isBigUint64Array,
      blob: isBlob,
      boolean: isBoolean,
      boundFunction: isBoundFunction,
      buffer: isBuffer,
      class: isClass,
      dataView: isDataView,
      date: isDate,
      detect,
      directInstanceOf: isDirectInstanceOf,
      emptyArray: isEmptyArray,
      emptyMap: isEmptyMap,
      emptyObject: isEmptyObject,
      emptySet: isEmptySet,
      emptyString: isEmptyString,
      emptyStringOrWhitespace: isEmptyStringOrWhitespace,
      enumCase: isEnumCase,
      error: isError,
      evenInteger: isEvenInteger,
      falsy: isFalsy,
      float32Array: isFloat32Array,
      float64Array: isFloat64Array,
      formData: isFormData,
      function: isFunction,
      generator: isGenerator,
      generatorFunction: isGeneratorFunction,
      htmlElement: isHtmlElement,
      infinite: isInfinite,
      inRange: isInRange,
      int16Array: isInt16Array,
      int32Array: isInt32Array,
      int8Array: isInt8Array,
      integer: isInteger,
      iterable: isIterable,
      map: isMap,
      nan: isNan,
      nativePromise: isNativePromise,
      negativeNumber: isNegativeNumber,
      nodeStream: isNodeStream,
      nonEmptyArray: isNonEmptyArray,
      nonEmptyMap: isNonEmptyMap,
      nonEmptyObject: isNonEmptyObject,
      nonEmptySet: isNonEmptySet,
      nonEmptyString: isNonEmptyString,
      nonEmptyStringAndNotWhitespace: isNonEmptyStringAndNotWhitespace,
      null: isNull,
      nullOrUndefined: isNullOrUndefined,
      number: isNumber,
      numericString: isNumericString,
      object: isObject,
      observable: isObservable,
      oddInteger: isOddInteger,
      plainObject: isPlainObject,
      positiveNumber: isPositiveNumber,
      primitive: isPrimitive,
      promise: isPromise,
      propertyKey: isPropertyKey,
      regExp: isRegExp,
      safeInteger: isSafeInteger,
      set: isSet,
      sharedArrayBuffer: isSharedArrayBuffer,
      string: isString,
      symbol: isSymbol,
      truthy: isTruthy,
      tupleLike: isTupleLike,
      typedArray: isTypedArray,
      uint16Array: isUint16Array,
      uint32Array: isUint32Array,
      uint8Array: isUint8Array,
      uint8ClampedArray: isUint8ClampedArray,
      undefined: isUndefined,
      urlInstance: isUrlInstance,
      urlSearchParams: isUrlSearchParams,
      urlString: isUrlString,
      optional: isOptional,
      validDate: isValidDate,
      validLength: isValidLength,
      weakMap: isWeakMap,
      weakRef: isWeakRef,
      weakSet: isWeakSet,
      whitespaceString: isWhitespaceString
    });
    NODE_TYPE_ELEMENT = 1;
    DOM_PROPERTIES_TO_CHECK = [
      "innerHTML",
      "ownerDocument",
      "style",
      "attributes",
      "nodeValue"
    ];
    andFormatter = new Intl.ListFormat("en", { style: "long", type: "conjunction" });
    orFormatter = new Intl.ListFormat("en", { style: "long", type: "disjunction" });
    assert = {
      all: assertAll,
      any: assertAny,
      optional: assertOptional,
      array: assertArray,
      arrayBuffer: assertArrayBuffer,
      arrayLike: assertArrayLike,
      asyncFunction: assertAsyncFunction,
      asyncGenerator: assertAsyncGenerator,
      asyncGeneratorFunction: assertAsyncGeneratorFunction,
      asyncIterable: assertAsyncIterable,
      bigint: assertBigint,
      bigInt64Array: assertBigInt64Array,
      bigUint64Array: assertBigUint64Array,
      blob: assertBlob,
      boolean: assertBoolean,
      boundFunction: assertBoundFunction,
      buffer: assertBuffer,
      class: assertClass,
      dataView: assertDataView,
      date: assertDate,
      directInstanceOf: assertDirectInstanceOf,
      emptyArray: assertEmptyArray,
      emptyMap: assertEmptyMap,
      emptyObject: assertEmptyObject,
      emptySet: assertEmptySet,
      emptyString: assertEmptyString,
      emptyStringOrWhitespace: assertEmptyStringOrWhitespace,
      enumCase: assertEnumCase,
      error: assertError,
      evenInteger: assertEvenInteger,
      falsy: assertFalsy,
      float32Array: assertFloat32Array,
      float64Array: assertFloat64Array,
      formData: assertFormData,
      function: assertFunction,
      generator: assertGenerator,
      generatorFunction: assertGeneratorFunction,
      htmlElement: assertHtmlElement,
      infinite: assertInfinite,
      inRange: assertInRange,
      int16Array: assertInt16Array,
      int32Array: assertInt32Array,
      int8Array: assertInt8Array,
      integer: assertInteger,
      iterable: assertIterable,
      map: assertMap,
      nan: assertNan,
      nativePromise: assertNativePromise,
      negativeNumber: assertNegativeNumber,
      nodeStream: assertNodeStream,
      nonEmptyArray: assertNonEmptyArray,
      nonEmptyMap: assertNonEmptyMap,
      nonEmptyObject: assertNonEmptyObject,
      nonEmptySet: assertNonEmptySet,
      nonEmptyString: assertNonEmptyString,
      nonEmptyStringAndNotWhitespace: assertNonEmptyStringAndNotWhitespace,
      null: assertNull,
      nullOrUndefined: assertNullOrUndefined,
      number: assertNumber,
      numericString: assertNumericString,
      object: assertObject,
      observable: assertObservable,
      oddInteger: assertOddInteger,
      plainObject: assertPlainObject,
      positiveNumber: assertPositiveNumber,
      primitive: assertPrimitive,
      promise: assertPromise,
      propertyKey: assertPropertyKey,
      regExp: assertRegExp,
      safeInteger: assertSafeInteger,
      set: assertSet,
      sharedArrayBuffer: assertSharedArrayBuffer,
      string: assertString,
      symbol: assertSymbol,
      truthy: assertTruthy,
      tupleLike: assertTupleLike,
      typedArray: assertTypedArray,
      uint16Array: assertUint16Array,
      uint32Array: assertUint32Array,
      uint8Array: assertUint8Array,
      uint8ClampedArray: assertUint8ClampedArray,
      undefined: assertUndefined,
      urlInstance: assertUrlInstance,
      urlSearchParams: assertUrlSearchParams,
      urlString: assertUrlString,
      validDate: assertValidDate,
      validLength: assertValidLength,
      weakMap: assertWeakMap,
      weakRef: assertWeakRef,
      weakSet: assertWeakSet,
      whitespaceString: assertWhitespaceString
    };
    methodTypeMap = {
      isArray: "Array",
      isArrayBuffer: "ArrayBuffer",
      isArrayLike: "array-like",
      isAsyncFunction: "AsyncFunction",
      isAsyncGenerator: "AsyncGenerator",
      isAsyncGeneratorFunction: "AsyncGeneratorFunction",
      isAsyncIterable: "AsyncIterable",
      isBigint: "bigint",
      isBigInt64Array: "BigInt64Array",
      isBigUint64Array: "BigUint64Array",
      isBlob: "Blob",
      isBoolean: "boolean",
      isBoundFunction: "Function",
      isBuffer: "Buffer",
      isClass: "Class",
      isDataView: "DataView",
      isDate: "Date",
      isDirectInstanceOf: "T",
      isEmptyArray: "empty array",
      isEmptyMap: "empty map",
      isEmptyObject: "empty object",
      isEmptySet: "empty set",
      isEmptyString: "empty string",
      isEmptyStringOrWhitespace: "empty string or whitespace",
      isEnumCase: "EnumCase",
      isError: "Error",
      isEvenInteger: "even integer",
      isFalsy: "falsy",
      isFloat32Array: "Float32Array",
      isFloat64Array: "Float64Array",
      isFormData: "FormData",
      isFunction: "Function",
      isGenerator: "Generator",
      isGeneratorFunction: "GeneratorFunction",
      isHtmlElement: "HTMLElement",
      isInfinite: "infinite number",
      isInRange: "in range",
      isInt16Array: "Int16Array",
      isInt32Array: "Int32Array",
      isInt8Array: "Int8Array",
      isInteger: "integer",
      isIterable: "Iterable",
      isMap: "Map",
      isNan: "NaN",
      isNativePromise: "native Promise",
      isNegativeNumber: "negative number",
      isNodeStream: "Node.js Stream",
      isNonEmptyArray: "non-empty array",
      isNonEmptyMap: "non-empty map",
      isNonEmptyObject: "non-empty object",
      isNonEmptySet: "non-empty set",
      isNonEmptyString: "non-empty string",
      isNonEmptyStringAndNotWhitespace: "non-empty string and not whitespace",
      isNull: "null",
      isNullOrUndefined: "null or undefined",
      isNumber: "number",
      isNumericString: "string with a number",
      isObject: "Object",
      isObservable: "Observable",
      isOddInteger: "odd integer",
      isPlainObject: "plain object",
      isPositiveNumber: "positive number",
      isPrimitive: "primitive",
      isPromise: "Promise",
      isPropertyKey: "PropertyKey",
      isRegExp: "RegExp",
      isSafeInteger: "integer",
      isSet: "Set",
      isSharedArrayBuffer: "SharedArrayBuffer",
      isString: "string",
      isSymbol: "symbol",
      isTruthy: "truthy",
      isTupleLike: "tuple-like",
      isTypedArray: "TypedArray",
      isUint16Array: "Uint16Array",
      isUint32Array: "Uint32Array",
      isUint8Array: "Uint8Array",
      isUint8ClampedArray: "Uint8ClampedArray",
      isUndefined: "undefined",
      isUrlInstance: "URL",
      isUrlSearchParams: "URLSearchParams",
      isUrlString: "string with a URL",
      isValidDate: "valid Date",
      isValidLength: "valid length",
      isWeakMap: "WeakMap",
      isWeakRef: "WeakRef",
      isWeakSet: "WeakSet",
      isWhitespaceString: "whitespace string"
    };
    isMethodNames = keysOf(methodTypeMap);
    distribution_default = is;
  }
});

// ../packages/curness-core/node_modules/p-cancelable/index.js
var CancelError, promiseState, PCancelable;
var init_p_cancelable = __esm({
  "../packages/curness-core/node_modules/p-cancelable/index.js"() {
    CancelError = class extends Error {
      constructor(reason) {
        super(reason || "Promise was canceled");
        this.name = "CancelError";
      }
      get isCanceled() {
        return true;
      }
    };
    promiseState = Object.freeze({
      pending: Symbol("pending"),
      canceled: Symbol("canceled"),
      resolved: Symbol("resolved"),
      rejected: Symbol("rejected")
    });
    PCancelable = class _PCancelable {
      static fn(userFunction) {
        return (...arguments_) => new _PCancelable((resolve, reject, onCancel) => {
          arguments_.push(onCancel);
          userFunction(...arguments_).then(resolve, reject);
        });
      }
      #cancelHandlers = [];
      #rejectOnCancel = true;
      #state = promiseState.pending;
      #promise;
      #reject;
      constructor(executor) {
        this.#promise = new Promise((resolve, reject) => {
          this.#reject = reject;
          const onResolve = (value) => {
            if (this.#state !== promiseState.canceled || !onCancel.shouldReject) {
              resolve(value);
              this.#setState(promiseState.resolved);
            }
          };
          const onReject = (error) => {
            if (this.#state !== promiseState.canceled || !onCancel.shouldReject) {
              reject(error);
              this.#setState(promiseState.rejected);
            }
          };
          const onCancel = (handler) => {
            if (this.#state !== promiseState.pending) {
              throw new Error(`The \`onCancel\` handler was attached after the promise ${this.#state.description}.`);
            }
            this.#cancelHandlers.push(handler);
          };
          Object.defineProperties(onCancel, {
            shouldReject: {
              get: () => this.#rejectOnCancel,
              set: (boolean) => {
                this.#rejectOnCancel = boolean;
              }
            }
          });
          executor(onResolve, onReject, onCancel);
        });
      }
      // eslint-disable-next-line unicorn/no-thenable
      then(onFulfilled, onRejected) {
        return this.#promise.then(onFulfilled, onRejected);
      }
      catch(onRejected) {
        return this.#promise.catch(onRejected);
      }
      finally(onFinally) {
        return this.#promise.finally(onFinally);
      }
      cancel(reason) {
        if (this.#state !== promiseState.pending) {
          return;
        }
        this.#setState(promiseState.canceled);
        if (this.#cancelHandlers.length > 0) {
          try {
            for (const handler of this.#cancelHandlers) {
              handler();
            }
          } catch (error) {
            this.#reject(error);
            return;
          }
        }
        if (this.#rejectOnCancel) {
          this.#reject(new CancelError(reason));
        }
      }
      get isCanceled() {
        return this.#state === promiseState.canceled;
      }
      #setState(state) {
        if (this.#state === promiseState.pending) {
          this.#state = state;
        }
      }
    };
    Object.setPrototypeOf(PCancelable.prototype, Promise.prototype);
  }
});

// ../packages/curness-core/node_modules/got/dist/source/core/errors.js
function isRequest(x) {
  return distribution_default.object(x) && "_onResponse" in x;
}
var RequestError, MaxRedirectsError, HTTPError, CacheError, UploadError, TimeoutError, ReadError, RetryError, AbortError;
var init_errors = __esm({
  "../packages/curness-core/node_modules/got/dist/source/core/errors.js"() {
    init_distribution();
    RequestError = class extends Error {
      name = "RequestError";
      code = "ERR_GOT_REQUEST_ERROR";
      input;
      stack;
      response;
      request;
      timings;
      constructor(message, error, self) {
        var _a;
        super(message, { cause: error });
        Error.captureStackTrace(this, this.constructor);
        if (error.code) {
          this.code = error.code;
        }
        this.input = error.input;
        if (isRequest(self)) {
          Object.defineProperty(this, "request", {
            enumerable: false,
            value: self
          });
          Object.defineProperty(this, "response", {
            enumerable: false,
            value: self.response
          });
          this.options = self.options;
        } else {
          this.options = self;
        }
        this.timings = (_a = this.request) == null ? void 0 : _a.timings;
        if (distribution_default.string(error.stack) && distribution_default.string(this.stack)) {
          const indexOfMessage = this.stack.indexOf(this.message) + this.message.length;
          const thisStackTrace = this.stack.slice(indexOfMessage).split("\n").reverse();
          const errorStackTrace = error.stack.slice(error.stack.indexOf(error.message) + error.message.length).split("\n").reverse();
          while (errorStackTrace.length > 0 && errorStackTrace[0] === thisStackTrace[0]) {
            thisStackTrace.shift();
          }
          this.stack = `${this.stack.slice(0, indexOfMessage)}${thisStackTrace.reverse().join("\n")}${errorStackTrace.reverse().join("\n")}`;
        }
      }
    };
    MaxRedirectsError = class extends RequestError {
      name = "MaxRedirectsError";
      code = "ERR_TOO_MANY_REDIRECTS";
      constructor(request) {
        super(`Redirected ${request.options.maxRedirects} times. Aborting.`, {}, request);
      }
    };
    HTTPError = class extends RequestError {
      name = "HTTPError";
      code = "ERR_NON_2XX_3XX_RESPONSE";
      constructor(response) {
        super(`Request failed with status code ${response.statusCode} (${response.statusMessage}): ${response.request.options.method} ${response.request.options.url.toString()}`, {}, response.request);
      }
    };
    CacheError = class extends RequestError {
      name = "CacheError";
      constructor(error, request) {
        super(error.message, error, request);
        if (this.code === "ERR_GOT_REQUEST_ERROR") {
          this.code = "ERR_CACHE_ACCESS";
        }
      }
    };
    UploadError = class extends RequestError {
      name = "UploadError";
      constructor(error, request) {
        super(error.message, error, request);
        if (this.code === "ERR_GOT_REQUEST_ERROR") {
          this.code = "ERR_UPLOAD";
        }
      }
    };
    TimeoutError = class extends RequestError {
      name = "TimeoutError";
      timings;
      event;
      constructor(error, timings, request) {
        super(error.message, error, request);
        this.event = error.event;
        this.timings = timings;
      }
    };
    ReadError = class extends RequestError {
      name = "ReadError";
      constructor(error, request) {
        super(error.message, error, request);
        if (this.code === "ERR_GOT_REQUEST_ERROR") {
          this.code = "ERR_READING_RESPONSE_STREAM";
        }
      }
    };
    RetryError = class extends RequestError {
      name = "RetryError";
      code = "ERR_RETRYING";
      constructor(request) {
        super("Retrying", {}, request);
      }
    };
    AbortError = class extends RequestError {
      name = "AbortError";
      code = "ERR_ABORTED";
      constructor(request) {
        super("This operation was aborted.", {}, request);
      }
    };
  }
});

// ../packages/curness-core/node_modules/byte-counter/utilities.js
function byteLength(data) {
  if (typeof data === "string") {
    return textEncoder.encode(data).byteLength;
  }
  if (ArrayBuffer.isView(data) || data instanceof ArrayBuffer || data instanceof SharedArrayBuffer) {
    return data.byteLength;
  }
  return 0;
}
var textEncoder;
var init_utilities2 = __esm({
  "../packages/curness-core/node_modules/byte-counter/utilities.js"() {
    textEncoder = new TextEncoder();
  }
});

// ../packages/curness-core/node_modules/byte-counter/index.js
var init_byte_counter = __esm({
  "../packages/curness-core/node_modules/byte-counter/index.js"() {
    init_utilities2();
  }
});

// ../packages/curness-core/node_modules/is-stream/index.js
function isStream(stream2, { checkOpen = true } = {}) {
  return stream2 !== null && typeof stream2 === "object" && (stream2.writable || stream2.readable || !checkOpen || stream2.writable === void 0 && stream2.readable === void 0) && typeof stream2.pipe === "function";
}
function isReadableStream(stream2, { checkOpen = true } = {}) {
  return isStream(stream2, { checkOpen }) && (stream2.readable || !checkOpen) && typeof stream2.read === "function" && typeof stream2.readable === "boolean" && typeof stream2.readableObjectMode === "boolean" && typeof stream2.destroy === "function" && typeof stream2.destroyed === "boolean";
}
var init_is_stream = __esm({
  "../packages/curness-core/node_modules/is-stream/index.js"() {
  }
});

// ../packages/curness-core/node_modules/@sec-ant/readable-stream/dist/ponyfill/asyncIterator.js
function i() {
  return this[n].next();
}
function o(r) {
  return this[n].return(r);
}
function h({ preventCancel: r = false } = {}) {
  const e = this.getReader(), t = new c(
    e,
    r
  ), s = Object.create(u);
  return s[n] = t, s;
}
var a, c, n, u;
var init_asyncIterator = __esm({
  "../packages/curness-core/node_modules/@sec-ant/readable-stream/dist/ponyfill/asyncIterator.js"() {
    a = Object.getPrototypeOf(
      Object.getPrototypeOf(
        /* istanbul ignore next */
        async function* () {
        }
      ).prototype
    );
    c = class {
      #t;
      #n;
      #r = false;
      #e = void 0;
      constructor(e, t) {
        this.#t = e, this.#n = t;
      }
      next() {
        const e = () => this.#s();
        return this.#e = this.#e ? this.#e.then(e, e) : e(), this.#e;
      }
      return(e) {
        const t = () => this.#i(e);
        return this.#e ? this.#e.then(t, t) : t();
      }
      async #s() {
        if (this.#r)
          return {
            done: true,
            value: void 0
          };
        let e;
        try {
          e = await this.#t.read();
        } catch (t) {
          throw this.#e = void 0, this.#r = true, this.#t.releaseLock(), t;
        }
        return e.done && (this.#e = void 0, this.#r = true, this.#t.releaseLock()), e;
      }
      async #i(e) {
        if (this.#r)
          return {
            done: true,
            value: e
          };
        if (this.#r = true, !this.#n) {
          const t = this.#t.cancel(e);
          return this.#t.releaseLock(), await t, {
            done: true,
            value: e
          };
        }
        return this.#t.releaseLock(), {
          done: true,
          value: e
        };
      }
    };
    n = Symbol();
    Object.defineProperty(i, "name", { value: "next" });
    Object.defineProperty(o, "name", { value: "return" });
    u = Object.create(a, {
      next: {
        enumerable: true,
        configurable: true,
        writable: true,
        value: i
      },
      return: {
        enumerable: true,
        configurable: true,
        writable: true,
        value: o
      }
    });
  }
});

// ../packages/curness-core/node_modules/@sec-ant/readable-stream/dist/ponyfill/fromAnyIterable.js
var init_fromAnyIterable = __esm({
  "../packages/curness-core/node_modules/@sec-ant/readable-stream/dist/ponyfill/fromAnyIterable.js"() {
  }
});

// ../packages/curness-core/node_modules/@sec-ant/readable-stream/dist/ponyfill/index.js
var init_ponyfill = __esm({
  "../packages/curness-core/node_modules/@sec-ant/readable-stream/dist/ponyfill/index.js"() {
    init_asyncIterator();
    init_fromAnyIterable();
  }
});

// ../packages/curness-core/node_modules/get-stream/source/stream.js
var getAsyncIterable, toString, getStreamIterable, handleStreamEnd, nodeImports;
var init_stream = __esm({
  "../packages/curness-core/node_modules/get-stream/source/stream.js"() {
    init_is_stream();
    init_ponyfill();
    getAsyncIterable = (stream2) => {
      if (isReadableStream(stream2, { checkOpen: false }) && nodeImports.on !== void 0) {
        return getStreamIterable(stream2);
      }
      if (typeof (stream2 == null ? void 0 : stream2[Symbol.asyncIterator]) === "function") {
        return stream2;
      }
      if (toString.call(stream2) === "[object ReadableStream]") {
        return h.call(stream2);
      }
      throw new TypeError("The first argument must be a Readable, a ReadableStream, or an async iterable.");
    };
    ({ toString } = Object.prototype);
    getStreamIterable = async function* (stream2) {
      const controller = new AbortController();
      const state = {};
      handleStreamEnd(stream2, controller, state);
      try {
        for await (const [chunk2] of nodeImports.on(stream2, "data", { signal: controller.signal })) {
          yield chunk2;
        }
      } catch (error) {
        if (state.error !== void 0) {
          throw state.error;
        } else if (!controller.signal.aborted) {
          throw error;
        }
      } finally {
        stream2.destroy();
      }
    };
    handleStreamEnd = async (stream2, controller, state) => {
      try {
        await nodeImports.finished(stream2, {
          cleanup: true,
          readable: true,
          writable: false,
          error: false
        });
      } catch (error) {
        state.error = error;
      } finally {
        controller.abort();
      }
    };
    nodeImports = {};
  }
});

// ../packages/curness-core/node_modules/get-stream/source/contents.js
var getStreamContents, appendFinalChunk, appendChunk, addNewChunk, getChunkType, objectToString, MaxBufferError;
var init_contents = __esm({
  "../packages/curness-core/node_modules/get-stream/source/contents.js"() {
    init_stream();
    getStreamContents = async (stream2, { init: init2, convertChunk, getSize, truncateChunk, addChunk, getFinalChunk, finalize }, { maxBuffer = Number.POSITIVE_INFINITY } = {}) => {
      const asyncIterable = getAsyncIterable(stream2);
      const state = init2();
      state.length = 0;
      try {
        for await (const chunk2 of asyncIterable) {
          const chunkType = getChunkType(chunk2);
          const convertedChunk = convertChunk[chunkType](chunk2, state);
          appendChunk({
            convertedChunk,
            state,
            getSize,
            truncateChunk,
            addChunk,
            maxBuffer
          });
        }
        appendFinalChunk({
          state,
          convertChunk,
          getSize,
          truncateChunk,
          addChunk,
          getFinalChunk,
          maxBuffer
        });
        return finalize(state);
      } catch (error) {
        const normalizedError = typeof error === "object" && error !== null ? error : new Error(error);
        normalizedError.bufferedData = finalize(state);
        throw normalizedError;
      }
    };
    appendFinalChunk = ({ state, getSize, truncateChunk, addChunk, getFinalChunk, maxBuffer }) => {
      const convertedChunk = getFinalChunk(state);
      if (convertedChunk !== void 0) {
        appendChunk({
          convertedChunk,
          state,
          getSize,
          truncateChunk,
          addChunk,
          maxBuffer
        });
      }
    };
    appendChunk = ({ convertedChunk, state, getSize, truncateChunk, addChunk, maxBuffer }) => {
      const chunkSize = getSize(convertedChunk);
      const newLength = state.length + chunkSize;
      if (newLength <= maxBuffer) {
        addNewChunk(convertedChunk, state, addChunk, newLength);
        return;
      }
      const truncatedChunk = truncateChunk(convertedChunk, maxBuffer - state.length);
      if (truncatedChunk !== void 0) {
        addNewChunk(truncatedChunk, state, addChunk, maxBuffer);
      }
      throw new MaxBufferError();
    };
    addNewChunk = (convertedChunk, state, addChunk, newLength) => {
      state.contents = addChunk(convertedChunk, state, newLength);
      state.length = newLength;
    };
    getChunkType = (chunk2) => {
      var _a;
      const typeOfChunk = typeof chunk2;
      if (typeOfChunk === "string") {
        return "string";
      }
      if (typeOfChunk !== "object" || chunk2 === null) {
        return "others";
      }
      if ((_a = globalThis.Buffer) == null ? void 0 : _a.isBuffer(chunk2)) {
        return "buffer";
      }
      const prototypeName = objectToString.call(chunk2);
      if (prototypeName === "[object ArrayBuffer]") {
        return "arrayBuffer";
      }
      if (prototypeName === "[object DataView]") {
        return "dataView";
      }
      if (Number.isInteger(chunk2.byteLength) && Number.isInteger(chunk2.byteOffset) && objectToString.call(chunk2.buffer) === "[object ArrayBuffer]") {
        return "typedArray";
      }
      return "others";
    };
    ({ toString: objectToString } = Object.prototype);
    MaxBufferError = class extends Error {
      name = "MaxBufferError";
      constructor() {
        super("maxBuffer exceeded");
      }
    };
  }
});

// ../packages/curness-core/node_modules/get-stream/source/utils.js
var noop, throwObjectStream, getLengthProperty;
var init_utils = __esm({
  "../packages/curness-core/node_modules/get-stream/source/utils.js"() {
    noop = () => void 0;
    throwObjectStream = (chunk2) => {
      throw new Error(`Streams in object mode are not supported: ${String(chunk2)}`);
    };
    getLengthProperty = (convertedChunk) => convertedChunk.length;
  }
});

// ../packages/curness-core/node_modules/get-stream/source/array-buffer.js
async function getStreamAsArrayBuffer(stream2, options) {
  return getStreamContents(stream2, arrayBufferMethods, options);
}
var initArrayBuffer, useTextEncoder, textEncoder2, useUint8Array, useUint8ArrayWithOffset, truncateArrayBufferChunk, addArrayBufferChunk, resizeArrayBufferSlow, resizeArrayBuffer, getNewContentsLength, SCALE_FACTOR, finalizeArrayBuffer, hasArrayBufferResize, arrayBufferMethods;
var init_array_buffer = __esm({
  "../packages/curness-core/node_modules/get-stream/source/array-buffer.js"() {
    init_contents();
    init_utils();
    initArrayBuffer = () => ({ contents: new ArrayBuffer(0) });
    useTextEncoder = (chunk2) => textEncoder2.encode(chunk2);
    textEncoder2 = new TextEncoder();
    useUint8Array = (chunk2) => new Uint8Array(chunk2);
    useUint8ArrayWithOffset = (chunk2) => new Uint8Array(chunk2.buffer, chunk2.byteOffset, chunk2.byteLength);
    truncateArrayBufferChunk = (convertedChunk, chunkSize) => convertedChunk.slice(0, chunkSize);
    addArrayBufferChunk = (convertedChunk, { contents, length: previousLength }, length) => {
      const newContents = hasArrayBufferResize() ? resizeArrayBuffer(contents, length) : resizeArrayBufferSlow(contents, length);
      new Uint8Array(newContents).set(convertedChunk, previousLength);
      return newContents;
    };
    resizeArrayBufferSlow = (contents, length) => {
      if (length <= contents.byteLength) {
        return contents;
      }
      const arrayBuffer = new ArrayBuffer(getNewContentsLength(length));
      new Uint8Array(arrayBuffer).set(new Uint8Array(contents), 0);
      return arrayBuffer;
    };
    resizeArrayBuffer = (contents, length) => {
      if (length <= contents.maxByteLength) {
        contents.resize(length);
        return contents;
      }
      const arrayBuffer = new ArrayBuffer(length, { maxByteLength: getNewContentsLength(length) });
      new Uint8Array(arrayBuffer).set(new Uint8Array(contents), 0);
      return arrayBuffer;
    };
    getNewContentsLength = (length) => SCALE_FACTOR ** Math.ceil(Math.log(length) / Math.log(SCALE_FACTOR));
    SCALE_FACTOR = 2;
    finalizeArrayBuffer = ({ contents, length }) => hasArrayBufferResize() ? contents : contents.slice(0, length);
    hasArrayBufferResize = () => "resize" in ArrayBuffer.prototype;
    arrayBufferMethods = {
      init: initArrayBuffer,
      convertChunk: {
        string: useTextEncoder,
        buffer: useUint8Array,
        arrayBuffer: useUint8Array,
        dataView: useUint8ArrayWithOffset,
        typedArray: useUint8ArrayWithOffset,
        others: throwObjectStream
      },
      getSize: getLengthProperty,
      truncateChunk: truncateArrayBufferChunk,
      addChunk: addArrayBufferChunk,
      getFinalChunk: noop,
      finalize: finalizeArrayBuffer
    };
  }
});

// ../packages/curness-core/node_modules/get-stream/source/buffer.js
async function getStreamAsBuffer(stream2, options) {
  if (!("Buffer" in globalThis)) {
    throw new Error("getStreamAsBuffer() is only supported in Node.js");
  }
  try {
    return arrayBufferToNodeBuffer(await getStreamAsArrayBuffer(stream2, options));
  } catch (error) {
    if (error.bufferedData !== void 0) {
      error.bufferedData = arrayBufferToNodeBuffer(error.bufferedData);
    }
    throw error;
  }
}
var arrayBufferToNodeBuffer;
var init_buffer = __esm({
  "../packages/curness-core/node_modules/get-stream/source/buffer.js"() {
    init_array_buffer();
    arrayBufferToNodeBuffer = (arrayBuffer) => globalThis.Buffer.from(arrayBuffer);
  }
});

// ../packages/curness-core/node_modules/get-stream/source/exports.js
var init_exports = __esm({
  "../packages/curness-core/node_modules/get-stream/source/exports.js"() {
    init_buffer();
  }
});

// ../packages/curness-core/node_modules/get-stream/source/index.js
var import_node_events, import_promises;
var init_source = __esm({
  "../packages/curness-core/node_modules/get-stream/source/index.js"() {
    import_node_events = require("node:events");
    import_promises = require("node:stream/promises");
    init_stream();
    init_exports();
    Object.assign(nodeImports, { on: import_node_events.on, finished: import_promises.finished });
  }
});

// ../packages/curness-core/node_modules/http-cache-semantics/index.js
var require_http_cache_semantics = __commonJS({
  "../packages/curness-core/node_modules/http-cache-semantics/index.js"(exports2, module2) {
    "use strict";
    var statusCodeCacheableByDefault = /* @__PURE__ */ new Set([
      200,
      203,
      204,
      206,
      300,
      301,
      308,
      404,
      405,
      410,
      414,
      501
    ]);
    var understoodStatuses = /* @__PURE__ */ new Set([
      200,
      203,
      204,
      300,
      301,
      302,
      303,
      307,
      308,
      404,
      405,
      410,
      414,
      501
    ]);
    var errorStatusCodes = /* @__PURE__ */ new Set([
      500,
      502,
      503,
      504
    ]);
    var hopByHopHeaders = {
      date: true,
      // included, because we add Age update Date
      connection: true,
      "keep-alive": true,
      "proxy-authenticate": true,
      "proxy-authorization": true,
      te: true,
      trailer: true,
      "transfer-encoding": true,
      upgrade: true
    };
    var excludedFromRevalidationUpdate = {
      // Since the old body is reused, it doesn't make sense to change properties of the body
      "content-length": true,
      "content-encoding": true,
      "transfer-encoding": true,
      "content-range": true
    };
    function toNumberOrZero(s) {
      const n2 = parseInt(s, 10);
      return isFinite(n2) ? n2 : 0;
    }
    function isErrorResponse(response) {
      if (!response) {
        return true;
      }
      return errorStatusCodes.has(response.status);
    }
    function parseCacheControl(header) {
      const cc = {};
      if (!header) return cc;
      const parts = header.trim().split(/,/);
      for (const part of parts) {
        const [k, v] = part.split(/=/, 2);
        cc[k.trim()] = v === void 0 ? true : v.trim().replace(/^"|"$/g, "");
      }
      return cc;
    }
    function formatCacheControl(cc) {
      let parts = [];
      for (const k in cc) {
        const v = cc[k];
        parts.push(v === true ? k : k + "=" + v);
      }
      if (!parts.length) {
        return void 0;
      }
      return parts.join(", ");
    }
    module2.exports = class CachePolicy {
      /**
       * Creates a new CachePolicy instance.
       * @param {HttpRequest} req - Incoming client request.
       * @param {HttpResponse} res - Received server response.
       * @param {Object} [options={}] - Configuration options.
       * @param {boolean} [options.shared=true] - Is the cache shared (a public proxy)? `false` for personal browser caches.
       * @param {number} [options.cacheHeuristic=0.1] - Fallback heuristic (age fraction) for cache duration.
       * @param {number} [options.immutableMinTimeToLive=86400000] - Minimum TTL for immutable responses in milliseconds.
       * @param {boolean} [options.ignoreCargoCult=false] - Detect nonsense cache headers, and override them.
       * @param {any} [options._fromObject] - Internal parameter for deserialization. Do not use.
       */
      constructor(req, res, {
        shared,
        cacheHeuristic,
        immutableMinTimeToLive,
        ignoreCargoCult,
        _fromObject
      } = {}) {
        if (_fromObject) {
          this._fromObject(_fromObject);
          return;
        }
        if (!res || !res.headers) {
          throw Error("Response headers missing");
        }
        this._assertRequestHasHeaders(req);
        this._responseTime = this.now();
        this._isShared = shared !== false;
        this._ignoreCargoCult = !!ignoreCargoCult;
        this._cacheHeuristic = void 0 !== cacheHeuristic ? cacheHeuristic : 0.1;
        this._immutableMinTtl = void 0 !== immutableMinTimeToLive ? immutableMinTimeToLive : 24 * 3600 * 1e3;
        this._status = "status" in res ? res.status : 200;
        this._resHeaders = res.headers;
        this._rescc = parseCacheControl(res.headers["cache-control"]);
        this._method = "method" in req ? req.method : "GET";
        this._url = req.url;
        this._host = req.headers.host;
        this._noAuthorization = !req.headers.authorization;
        this._reqHeaders = res.headers.vary ? req.headers : null;
        this._reqcc = parseCacheControl(req.headers["cache-control"]);
        if (this._ignoreCargoCult && "pre-check" in this._rescc && "post-check" in this._rescc) {
          delete this._rescc["pre-check"];
          delete this._rescc["post-check"];
          delete this._rescc["no-cache"];
          delete this._rescc["no-store"];
          delete this._rescc["must-revalidate"];
          this._resHeaders = Object.assign({}, this._resHeaders, {
            "cache-control": formatCacheControl(this._rescc)
          });
          delete this._resHeaders.expires;
          delete this._resHeaders.pragma;
        }
        if (res.headers["cache-control"] == null && /no-cache/.test(res.headers.pragma)) {
          this._rescc["no-cache"] = true;
        }
      }
      /**
       * You can monkey-patch it for testing.
       * @returns {number} Current time in milliseconds.
       */
      now() {
        return Date.now();
      }
      /**
       * Determines if the response is storable in a cache.
       * @returns {boolean} `false` if can never be cached.
       */
      storable() {
        return !!(!this._reqcc["no-store"] && // A cache MUST NOT store a response to any request, unless:
        // The request method is understood by the cache and defined as being cacheable, and
        ("GET" === this._method || "HEAD" === this._method || "POST" === this._method && this._hasExplicitExpiration()) && // the response status code is understood by the cache, and
        understoodStatuses.has(this._status) && // the "no-store" cache directive does not appear in request or response header fields, and
        !this._rescc["no-store"] && // the "private" response directive does not appear in the response, if the cache is shared, and
        (!this._isShared || !this._rescc.private) && // the Authorization header field does not appear in the request, if the cache is shared,
        (!this._isShared || this._noAuthorization || this._allowsStoringAuthenticated()) && // the response either:
        // contains an Expires header field, or
        (this._resHeaders.expires || // contains a max-age response directive, or
        // contains a s-maxage response directive and the cache is shared, or
        // contains a public response directive.
        this._rescc["max-age"] || this._isShared && this._rescc["s-maxage"] || this._rescc.public || // has a status code that is defined as cacheable by default
        statusCodeCacheableByDefault.has(this._status)));
      }
      /**
       * @returns {boolean} true if expiration is explicitly defined.
       */
      _hasExplicitExpiration() {
        return !!(this._isShared && this._rescc["s-maxage"] || this._rescc["max-age"] || this._resHeaders.expires);
      }
      /**
       * @param {HttpRequest} req - a request
       * @throws {Error} if the headers are missing.
       */
      _assertRequestHasHeaders(req) {
        if (!req || !req.headers) {
          throw Error("Request headers missing");
        }
      }
      /**
       * Checks if the request matches the cache and can be satisfied from the cache immediately,
       * without having to make a request to the server.
       *
       * This doesn't support `stale-while-revalidate`. See `evaluateRequest()` for a more complete solution.
       *
       * @param {HttpRequest} req - The new incoming HTTP request.
       * @returns {boolean} `true`` if the cached response used to construct this cache policy satisfies the request without revalidation.
       */
      satisfiesWithoutRevalidation(req) {
        const result = this.evaluateRequest(req);
        return !result.revalidation;
      }
      /**
       * @param {{headers: Record<string, string>, synchronous: boolean}|undefined} revalidation - Revalidation information, if any.
       * @returns {{response: {headers: Record<string, string>}, revalidation: {headers: Record<string, string>, synchronous: boolean}|undefined}} An object with a cached response headers and revalidation info.
       */
      _evaluateRequestHitResult(revalidation) {
        return {
          response: {
            headers: this.responseHeaders()
          },
          revalidation
        };
      }
      /**
       * @param {HttpRequest} request - new incoming
       * @param {boolean} synchronous - whether revalidation must be synchronous (not s-w-r).
       * @returns {{headers: Record<string, string>, synchronous: boolean}} An object with revalidation headers and a synchronous flag.
       */
      _evaluateRequestRevalidation(request, synchronous) {
        return {
          synchronous,
          headers: this.revalidationHeaders(request)
        };
      }
      /**
       * @param {HttpRequest} request - new incoming
       * @returns {{response: undefined, revalidation: {headers: Record<string, string>, synchronous: boolean}}} An object indicating no cached response and revalidation details.
       */
      _evaluateRequestMissResult(request) {
        return {
          response: void 0,
          revalidation: this._evaluateRequestRevalidation(request, true)
        };
      }
      /**
       * Checks if the given request matches this cache entry, and how the cache can be used to satisfy it. Returns an object with:
       *
       * ```
       * {
       *     // If defined, you must send a request to the server.
       *     revalidation: {
       *         headers: {}, // HTTP headers to use when sending the revalidation response
       *         // If true, you MUST wait for a response from the server before using the cache
       *         // If false, this is stale-while-revalidate. The cache is stale, but you can use it while you update it asynchronously.
       *         synchronous: bool,
       *     },
       *     // If defined, you can use this cached response.
       *     response: {
       *         headers: {}, // Updated cached HTTP headers you must use when responding to the client
       *     },
       * }
       * ```
       * @param {HttpRequest} req - new incoming HTTP request
       * @returns {{response: {headers: Record<string, string>}|undefined, revalidation: {headers: Record<string, string>, synchronous: boolean}|undefined}} An object containing keys:
       *   - revalidation: { headers: Record<string, string>, synchronous: boolean } Set if you should send this to the origin server
       *   - response: { headers: Record<string, string> } Set if you can respond to the client with these cached headers
       */
      evaluateRequest(req) {
        this._assertRequestHasHeaders(req);
        if (this._rescc["must-revalidate"]) {
          return this._evaluateRequestMissResult(req);
        }
        if (!this._requestMatches(req, false)) {
          return this._evaluateRequestMissResult(req);
        }
        const requestCC = parseCacheControl(req.headers["cache-control"]);
        if (requestCC["no-cache"] || /no-cache/.test(req.headers.pragma)) {
          return this._evaluateRequestMissResult(req);
        }
        if (requestCC["max-age"] && this.age() > toNumberOrZero(requestCC["max-age"])) {
          return this._evaluateRequestMissResult(req);
        }
        if (requestCC["min-fresh"] && this.maxAge() - this.age() < toNumberOrZero(requestCC["min-fresh"])) {
          return this._evaluateRequestMissResult(req);
        }
        if (this.stale()) {
          const allowsStaleWithoutRevalidation = "max-stale" in requestCC && (true === requestCC["max-stale"] || requestCC["max-stale"] > this.age() - this.maxAge());
          if (allowsStaleWithoutRevalidation) {
            return this._evaluateRequestHitResult(void 0);
          }
          if (this.useStaleWhileRevalidate()) {
            return this._evaluateRequestHitResult(this._evaluateRequestRevalidation(req, false));
          }
          return this._evaluateRequestMissResult(req);
        }
        return this._evaluateRequestHitResult(void 0);
      }
      /**
       * @param {HttpRequest} req - check if this is for the same cache entry
       * @param {boolean} allowHeadMethod - allow a HEAD method to match.
       * @returns {boolean} `true` if the request matches.
       */
      _requestMatches(req, allowHeadMethod) {
        return !!((!this._url || this._url === req.url) && this._host === req.headers.host && // the request method associated with the stored response allows it to be used for the presented request, and
        (!req.method || this._method === req.method || allowHeadMethod && "HEAD" === req.method) && // selecting header fields nominated by the stored response (if any) match those presented, and
        this._varyMatches(req));
      }
      /**
       * Determines whether storing authenticated responses is allowed.
       * @returns {boolean} `true` if allowed.
       */
      _allowsStoringAuthenticated() {
        return !!(this._rescc["must-revalidate"] || this._rescc.public || this._rescc["s-maxage"]);
      }
      /**
       * Checks whether the Vary header in the response matches the new request.
       * @param {HttpRequest} req - incoming HTTP request
       * @returns {boolean} `true` if the vary headers match.
       */
      _varyMatches(req) {
        if (!this._resHeaders.vary) {
          return true;
        }
        if (this._resHeaders.vary === "*") {
          return false;
        }
        const fields = this._resHeaders.vary.trim().toLowerCase().split(/\s*,\s*/);
        for (const name of fields) {
          if (req.headers[name] !== this._reqHeaders[name]) return false;
        }
        return true;
      }
      /**
       * Creates a copy of the given headers without any hop-by-hop headers.
       * @param {Record<string, string>} inHeaders - old headers from the cached response
       * @returns {Record<string, string>} A new headers object without hop-by-hop headers.
       */
      _copyWithoutHopByHopHeaders(inHeaders) {
        const headers = {};
        for (const name in inHeaders) {
          if (hopByHopHeaders[name]) continue;
          headers[name] = inHeaders[name];
        }
        if (inHeaders.connection) {
          const tokens = inHeaders.connection.trim().split(/\s*,\s*/);
          for (const name of tokens) {
            delete headers[name];
          }
        }
        if (headers.warning) {
          const warnings = headers.warning.split(/,/).filter((warning) => {
            return !/^\s*1[0-9][0-9]/.test(warning);
          });
          if (!warnings.length) {
            delete headers.warning;
          } else {
            headers.warning = warnings.join(",").trim();
          }
        }
        return headers;
      }
      /**
       * Returns the response headers adjusted for serving the cached response.
       * Removes hop-by-hop headers and updates the Age and Date headers.
       * @returns {Record<string, string>} The adjusted response headers.
       */
      responseHeaders() {
        const headers = this._copyWithoutHopByHopHeaders(this._resHeaders);
        const age = this.age();
        if (age > 3600 * 24 && !this._hasExplicitExpiration() && this.maxAge() > 3600 * 24) {
          headers.warning = (headers.warning ? `${headers.warning}, ` : "") + '113 - "rfc7234 5.5.4"';
        }
        headers.age = `${Math.round(age)}`;
        headers.date = new Date(this.now()).toUTCString();
        return headers;
      }
      /**
       * Returns the Date header value from the response or the current time if invalid.
       * @returns {number} Timestamp (in milliseconds) representing the Date header or response time.
       */
      date() {
        const serverDate = Date.parse(this._resHeaders.date);
        if (isFinite(serverDate)) {
          return serverDate;
        }
        return this._responseTime;
      }
      /**
       * Value of the Age header, in seconds, updated for the current time.
       * May be fractional.
       * @returns {number} The age in seconds.
       */
      age() {
        let age = this._ageValue();
        const residentTime = (this.now() - this._responseTime) / 1e3;
        return age + residentTime;
      }
      /**
       * @returns {number} The Age header value as a number.
       */
      _ageValue() {
        return toNumberOrZero(this._resHeaders.age);
      }
      /**
       * Possibly outdated value of applicable max-age (or heuristic equivalent) in seconds.
       * This counts since response's `Date`.
       *
       * For an up-to-date value, see `timeToLive()`.
       *
       * Returns the maximum age (freshness lifetime) of the response in seconds.
       * @returns {number} The max-age value in seconds.
       */
      maxAge() {
        if (!this.storable() || this._rescc["no-cache"]) {
          return 0;
        }
        if (this._isShared && (this._resHeaders["set-cookie"] && !this._rescc.public && !this._rescc.immutable)) {
          return 0;
        }
        if (this._resHeaders.vary === "*") {
          return 0;
        }
        if (this._isShared) {
          if (this._rescc["proxy-revalidate"]) {
            return 0;
          }
          if (this._rescc["s-maxage"]) {
            return toNumberOrZero(this._rescc["s-maxage"]);
          }
        }
        if (this._rescc["max-age"]) {
          return toNumberOrZero(this._rescc["max-age"]);
        }
        const defaultMinTtl = this._rescc.immutable ? this._immutableMinTtl : 0;
        const serverDate = this.date();
        if (this._resHeaders.expires) {
          const expires = Date.parse(this._resHeaders.expires);
          if (Number.isNaN(expires) || expires < serverDate) {
            return 0;
          }
          return Math.max(defaultMinTtl, (expires - serverDate) / 1e3);
        }
        if (this._resHeaders["last-modified"]) {
          const lastModified = Date.parse(this._resHeaders["last-modified"]);
          if (isFinite(lastModified) && serverDate > lastModified) {
            return Math.max(
              defaultMinTtl,
              (serverDate - lastModified) / 1e3 * this._cacheHeuristic
            );
          }
        }
        return defaultMinTtl;
      }
      /**
       * Remaining time this cache entry may be useful for, in *milliseconds*.
       * You can use this as an expiration time for your cache storage.
       *
       * Prefer this method over `maxAge()`, because it includes other factors like `age` and `stale-while-revalidate`.
       * @returns {number} Time-to-live in milliseconds.
       */
      timeToLive() {
        const age = this.maxAge() - this.age();
        const staleIfErrorAge = age + toNumberOrZero(this._rescc["stale-if-error"]);
        const staleWhileRevalidateAge = age + toNumberOrZero(this._rescc["stale-while-revalidate"]);
        return Math.round(Math.max(0, age, staleIfErrorAge, staleWhileRevalidateAge) * 1e3);
      }
      /**
       * If true, this cache entry is past its expiration date.
       * Note that stale cache may be useful sometimes, see `evaluateRequest()`.
       * @returns {boolean} `false` doesn't mean it's fresh nor usable
       */
      stale() {
        return this.maxAge() <= this.age();
      }
      /**
       * @returns {boolean} `true` if `stale-if-error` condition allows use of a stale response.
       */
      _useStaleIfError() {
        return this.maxAge() + toNumberOrZero(this._rescc["stale-if-error"]) > this.age();
      }
      /** See `evaluateRequest()` for a more complete solution
       * @returns {boolean} `true` if `stale-while-revalidate` is currently allowed.
       */
      useStaleWhileRevalidate() {
        const swr = toNumberOrZero(this._rescc["stale-while-revalidate"]);
        return swr > 0 && this.maxAge() + swr > this.age();
      }
      /**
       * Creates a `CachePolicy` instance from a serialized object.
       * @param {Object} obj - The serialized object.
       * @returns {CachePolicy} A new CachePolicy instance.
       */
      static fromObject(obj) {
        return new this(void 0, void 0, { _fromObject: obj });
      }
      /**
       * @param {any} obj - The serialized object.
       * @throws {Error} If already initialized or if the object is invalid.
       */
      _fromObject(obj) {
        if (this._responseTime) throw Error("Reinitialized");
        if (!obj || obj.v !== 1) throw Error("Invalid serialization");
        this._responseTime = obj.t;
        this._isShared = obj.sh;
        this._cacheHeuristic = obj.ch;
        this._immutableMinTtl = obj.imm !== void 0 ? obj.imm : 24 * 3600 * 1e3;
        this._ignoreCargoCult = !!obj.icc;
        this._status = obj.st;
        this._resHeaders = obj.resh;
        this._rescc = obj.rescc;
        this._method = obj.m;
        this._url = obj.u;
        this._host = obj.h;
        this._noAuthorization = obj.a;
        this._reqHeaders = obj.reqh;
        this._reqcc = obj.reqcc;
      }
      /**
       * Serializes the `CachePolicy` instance into a JSON-serializable object.
       * @returns {Object} The serialized object.
       */
      toObject() {
        return {
          v: 1,
          t: this._responseTime,
          sh: this._isShared,
          ch: this._cacheHeuristic,
          imm: this._immutableMinTtl,
          icc: this._ignoreCargoCult,
          st: this._status,
          resh: this._resHeaders,
          rescc: this._rescc,
          m: this._method,
          u: this._url,
          h: this._host,
          a: this._noAuthorization,
          reqh: this._reqHeaders,
          reqcc: this._reqcc
        };
      }
      /**
       * Headers for sending to the origin server to revalidate stale response.
       * Allows server to return 304 to allow reuse of the previous response.
       *
       * Hop by hop headers are always stripped.
       * Revalidation headers may be added or removed, depending on request.
       * @param {HttpRequest} incomingReq - The incoming HTTP request.
       * @returns {Record<string, string>} The headers for the revalidation request.
       */
      revalidationHeaders(incomingReq) {
        this._assertRequestHasHeaders(incomingReq);
        const headers = this._copyWithoutHopByHopHeaders(incomingReq.headers);
        delete headers["if-range"];
        if (!this._requestMatches(incomingReq, true) || !this.storable()) {
          delete headers["if-none-match"];
          delete headers["if-modified-since"];
          return headers;
        }
        if (this._resHeaders.etag) {
          headers["if-none-match"] = headers["if-none-match"] ? `${headers["if-none-match"]}, ${this._resHeaders.etag}` : this._resHeaders.etag;
        }
        const forbidsWeakValidators = headers["accept-ranges"] || headers["if-match"] || headers["if-unmodified-since"] || this._method && this._method != "GET";
        if (forbidsWeakValidators) {
          delete headers["if-modified-since"];
          if (headers["if-none-match"]) {
            const etags = headers["if-none-match"].split(/,/).filter((etag) => {
              return !/^\s*W\//.test(etag);
            });
            if (!etags.length) {
              delete headers["if-none-match"];
            } else {
              headers["if-none-match"] = etags.join(",").trim();
            }
          }
        } else if (this._resHeaders["last-modified"] && !headers["if-modified-since"]) {
          headers["if-modified-since"] = this._resHeaders["last-modified"];
        }
        return headers;
      }
      /**
       * Creates new CachePolicy with information combined from the previews response,
       * and the new revalidation response.
       *
       * Returns {policy, modified} where modified is a boolean indicating
       * whether the response body has been modified, and old cached body can't be used.
       *
       * @param {HttpRequest} request - The latest HTTP request asking for the cached entry.
       * @param {HttpResponse} response - The latest revalidation HTTP response from the origin server.
       * @returns {{policy: CachePolicy, modified: boolean, matches: boolean}} The updated policy and modification status.
       * @throws {Error} If the response headers are missing.
       */
      revalidatedPolicy(request, response) {
        this._assertRequestHasHeaders(request);
        if (this._useStaleIfError() && isErrorResponse(response)) {
          return {
            policy: this,
            modified: false,
            matches: true
          };
        }
        if (!response || !response.headers) {
          throw Error("Response headers missing");
        }
        let matches = false;
        if (response.status !== void 0 && response.status != 304) {
          matches = false;
        } else if (response.headers.etag && !/^\s*W\//.test(response.headers.etag)) {
          matches = this._resHeaders.etag && this._resHeaders.etag.replace(/^\s*W\//, "") === response.headers.etag;
        } else if (this._resHeaders.etag && response.headers.etag) {
          matches = this._resHeaders.etag.replace(/^\s*W\//, "") === response.headers.etag.replace(/^\s*W\//, "");
        } else if (this._resHeaders["last-modified"]) {
          matches = this._resHeaders["last-modified"] === response.headers["last-modified"];
        } else {
          if (!this._resHeaders.etag && !this._resHeaders["last-modified"] && !response.headers.etag && !response.headers["last-modified"]) {
            matches = true;
          }
        }
        const optionsCopy = {
          shared: this._isShared,
          cacheHeuristic: this._cacheHeuristic,
          immutableMinTimeToLive: this._immutableMinTtl,
          ignoreCargoCult: this._ignoreCargoCult
        };
        if (!matches) {
          return {
            policy: new this.constructor(request, response, optionsCopy),
            // Client receiving 304 without body, even if it's invalid/mismatched has no option
            // but to reuse a cached body. We don't have a good way to tell clients to do
            // error recovery in such case.
            modified: response.status != 304,
            matches: false
          };
        }
        const headers = {};
        for (const k in this._resHeaders) {
          headers[k] = k in response.headers && !excludedFromRevalidationUpdate[k] ? response.headers[k] : this._resHeaders[k];
        }
        const newResponse = Object.assign({}, response, {
          status: this._status,
          method: this._method,
          headers
        });
        return {
          policy: new this.constructor(request, newResponse, optionsCopy),
          modified: false,
          matches: true
        };
      }
    };
  }
});

// ../packages/curness-core/node_modules/@keyv/serialize/dist/index.js
var import_buffer2, _serialize, defaultSerialize, defaultDeserialize;
var init_dist = __esm({
  "../packages/curness-core/node_modules/@keyv/serialize/dist/index.js"() {
    import_buffer2 = require("buffer");
    _serialize = (data, escapeColonStrings = true) => {
      if (data === void 0 || data === null) {
        return "null";
      }
      if (typeof data === "string") {
        return JSON.stringify(
          escapeColonStrings && data.startsWith(":") ? `:${data}` : data
        );
      }
      if (import_buffer2.Buffer.isBuffer(data)) {
        return JSON.stringify(`:base64:${data.toString("base64")}`);
      }
      if (data == null ? void 0 : data.toJSON) {
        data = data.toJSON();
      }
      if (typeof data === "object") {
        let s = "";
        const array = Array.isArray(data);
        s = array ? "[" : "{";
        let first = true;
        for (const k in data) {
          const ignore = typeof data[k] === "function" || !array && data[k] === void 0;
          if (!Object.hasOwn(data, k) || ignore) {
            continue;
          }
          if (!first) {
            s += ",";
          }
          first = false;
          if (array) {
            s += _serialize(data[k], escapeColonStrings);
          } else if (data[k] !== void 0) {
            s += `${_serialize(k, false)}:${_serialize(data[k], escapeColonStrings)}`;
          }
        }
        s += array ? "]" : "}";
        return s;
      }
      return JSON.stringify(data);
    };
    defaultSerialize = (data) => {
      return _serialize(data, true);
    };
    defaultDeserialize = (data) => JSON.parse(data, (_, value) => {
      if (typeof value === "string") {
        if (value.startsWith(":base64:")) {
          return import_buffer2.Buffer.from(value.slice(8), "base64");
        }
        return value.startsWith(":") ? value.slice(1) : value;
      }
      return value;
    });
  }
});

// ../packages/curness-core/node_modules/keyv/dist/index.js
var EventManager, event_manager_default, HooksManager, hooks_manager_default, StatsManager, stats_manager_default, iterableAdapters, Keyv;
var init_dist2 = __esm({
  "../packages/curness-core/node_modules/keyv/dist/index.js"() {
    init_dist();
    EventManager = class {
      _eventListeners;
      _maxListeners;
      constructor() {
        this._eventListeners = /* @__PURE__ */ new Map();
        this._maxListeners = 100;
      }
      maxListeners() {
        return this._maxListeners;
      }
      // Add an event listener
      addListener(event, listener) {
        this.on(event, listener);
      }
      on(event, listener) {
        if (!this._eventListeners.has(event)) {
          this._eventListeners.set(event, []);
        }
        const listeners = this._eventListeners.get(event);
        if (listeners) {
          if (listeners.length >= this._maxListeners) {
            console.warn(
              `MaxListenersExceededWarning: Possible event memory leak detected. ${listeners.length + 1} ${event} listeners added. Use setMaxListeners() to increase limit.`
            );
          }
          listeners.push(listener);
        }
        return this;
      }
      // Remove an event listener
      removeListener(event, listener) {
        this.off(event, listener);
      }
      off(event, listener) {
        const listeners = this._eventListeners.get(event) ?? [];
        const index = listeners.indexOf(listener);
        if (index !== -1) {
          listeners.splice(index, 1);
        }
        if (listeners.length === 0) {
          this._eventListeners.delete(event);
        }
      }
      once(event, listener) {
        const onceListener = (...arguments_) => {
          listener(...arguments_);
          this.off(event, onceListener);
        };
        this.on(event, onceListener);
      }
      // Emit an event
      // biome-ignore lint/suspicious/noExplicitAny: type format
      emit(event, ...arguments_) {
        const listeners = this._eventListeners.get(event);
        if (listeners && listeners.length > 0) {
          for (const listener of listeners) {
            listener(...arguments_);
          }
        }
      }
      // Get all listeners for a specific event
      listeners(event) {
        return this._eventListeners.get(event) ?? [];
      }
      // Remove all listeners for a specific event
      removeAllListeners(event) {
        if (event) {
          this._eventListeners.delete(event);
        } else {
          this._eventListeners.clear();
        }
      }
      // Set the maximum number of listeners for a single event
      setMaxListeners(n2) {
        this._maxListeners = n2;
      }
    };
    event_manager_default = EventManager;
    HooksManager = class extends event_manager_default {
      _hookHandlers;
      constructor() {
        super();
        this._hookHandlers = /* @__PURE__ */ new Map();
      }
      // Adds a handler function for a specific event
      addHandler(event, handler) {
        const eventHandlers = this._hookHandlers.get(event);
        if (eventHandlers) {
          eventHandlers.push(handler);
        } else {
          this._hookHandlers.set(event, [handler]);
        }
      }
      // Removes a specific handler function for a specific event
      removeHandler(event, handler) {
        const eventHandlers = this._hookHandlers.get(event);
        if (eventHandlers) {
          const index = eventHandlers.indexOf(handler);
          if (index !== -1) {
            eventHandlers.splice(index, 1);
          }
        }
      }
      // Triggers all handlers for a specific event with provided data
      // biome-ignore lint/suspicious/noExplicitAny: type format
      trigger(event, data) {
        const eventHandlers = this._hookHandlers.get(event);
        if (eventHandlers) {
          for (const handler of eventHandlers) {
            try {
              handler(data);
            } catch (error) {
              this.emit(
                "error",
                new Error(
                  `Error in hook handler for event "${event}": ${error.message}`
                )
              );
            }
          }
        }
      }
      // Provides read-only access to the current handlers
      get handlers() {
        return new Map(this._hookHandlers);
      }
    };
    hooks_manager_default = HooksManager;
    StatsManager = class extends event_manager_default {
      enabled = true;
      hits = 0;
      misses = 0;
      sets = 0;
      deletes = 0;
      errors = 0;
      constructor(enabled) {
        super();
        if (enabled !== void 0) {
          this.enabled = enabled;
        }
        this.reset();
      }
      hit() {
        if (this.enabled) {
          this.hits++;
        }
      }
      miss() {
        if (this.enabled) {
          this.misses++;
        }
      }
      set() {
        if (this.enabled) {
          this.sets++;
        }
      }
      delete() {
        if (this.enabled) {
          this.deletes++;
        }
      }
      hitsOrMisses(array) {
        for (const item of array) {
          if (item === void 0) {
            this.miss();
          } else {
            this.hit();
          }
        }
      }
      reset() {
        this.hits = 0;
        this.misses = 0;
        this.sets = 0;
        this.deletes = 0;
        this.errors = 0;
      }
    };
    stats_manager_default = StatsManager;
    iterableAdapters = [
      "sqlite",
      "postgres",
      "mysql",
      "mongo",
      "redis",
      "valkey",
      "etcd"
    ];
    Keyv = class extends event_manager_default {
      opts;
      iterator;
      hooks = new hooks_manager_default();
      stats = new stats_manager_default(false);
      /**
       * Time to live in milliseconds
       */
      _ttl;
      /**
       * Namespace
       */
      _namespace;
      /**
       * Store
       */
      // biome-ignore lint/suspicious/noExplicitAny: type format
      _store = /* @__PURE__ */ new Map();
      _serialize = defaultSerialize;
      _deserialize = defaultDeserialize;
      _compression;
      _useKeyPrefix = true;
      _throwOnErrors = false;
      /**
       * Keyv Constructor
       * @param {KeyvStoreAdapter | KeyvOptions} store
       * @param {Omit<KeyvOptions, 'store'>} [options] if you provide the store you can then provide the Keyv Options
       */
      constructor(store, options) {
        super();
        options ??= {};
        store ??= {};
        this.opts = {
          namespace: "keyv",
          serialize: defaultSerialize,
          deserialize: defaultDeserialize,
          emitErrors: true,
          // @ts-expect-error - Map is not a KeyvStoreAdapter
          store: /* @__PURE__ */ new Map(),
          ...options
        };
        if (store && store.get) {
          this.opts.store = store;
        } else {
          this.opts = {
            ...this.opts,
            ...store
          };
        }
        this._store = this.opts.store ?? /* @__PURE__ */ new Map();
        this._compression = this.opts.compression;
        this._serialize = this.opts.serialize;
        this._deserialize = this.opts.deserialize;
        if (this.opts.namespace) {
          this._namespace = this.opts.namespace;
        }
        if (this._store) {
          if (!this._isValidStorageAdapter(this._store)) {
            throw new Error("Invalid storage adapter");
          }
          if (typeof this._store.on === "function") {
            this._store.on("error", (error) => this.emit("error", error));
          }
          this._store.namespace = this._namespace;
          if (typeof this._store[Symbol.iterator] === "function" && this._store instanceof Map) {
            this.iterator = this.generateIterator(
              this._store
            );
          } else if ("iterator" in this._store && this._store.opts && this._checkIterableAdapter()) {
            this.iterator = this.generateIterator(
              // biome-ignore lint/style/noNonNullAssertion: need to fix
              this._store.iterator.bind(this._store)
            );
          }
        }
        if (this.opts.stats) {
          this.stats.enabled = this.opts.stats;
        }
        if (this.opts.ttl) {
          this._ttl = this.opts.ttl;
        }
        if (this.opts.useKeyPrefix !== void 0) {
          this._useKeyPrefix = this.opts.useKeyPrefix;
        }
        if (this.opts.throwOnErrors !== void 0) {
          this._throwOnErrors = this.opts.throwOnErrors;
        }
      }
      /**
       * Get the current store
       */
      // biome-ignore lint/suspicious/noExplicitAny: type format
      get store() {
        return this._store;
      }
      /**
       * Set the current store. This will also set the namespace, event error handler, and generate the iterator. If the store is not valid it will throw an error.
       * @param {KeyvStoreAdapter | Map<any, any> | any} store the store to set
       */
      // biome-ignore lint/suspicious/noExplicitAny: type format
      set store(store) {
        var _a;
        if (this._isValidStorageAdapter(store)) {
          this._store = store;
          this.opts.store = store;
          if (typeof store.on === "function") {
            store.on("error", (error) => this.emit("error", error));
          }
          if (this._namespace) {
            this._store.namespace = this._namespace;
          }
          if (typeof store[Symbol.iterator] === "function" && store instanceof Map) {
            this.iterator = this.generateIterator(
              store
            );
          } else if ("iterator" in store && store.opts && this._checkIterableAdapter()) {
            this.iterator = this.generateIterator((_a = store.iterator) == null ? void 0 : _a.bind(store));
          }
        } else {
          throw new Error("Invalid storage adapter");
        }
      }
      /**
       * Get the current compression function
       * @returns {CompressionAdapter} The current compression function
       */
      get compression() {
        return this._compression;
      }
      /**
       * Set the current compression function
       * @param {CompressionAdapter} compress The compression function to set
       */
      set compression(compress) {
        this._compression = compress;
      }
      /**
       * Get the current namespace.
       * @returns {string | undefined} The current namespace.
       */
      get namespace() {
        return this._namespace;
      }
      /**
       * Set the current namespace.
       * @param {string | undefined} namespace The namespace to set.
       */
      set namespace(namespace) {
        this._namespace = namespace;
        this.opts.namespace = namespace;
        this._store.namespace = namespace;
        if (this.opts.store) {
          this.opts.store.namespace = namespace;
        }
      }
      /**
       * Get the current TTL.
       * @returns {number} The current TTL in milliseconds.
       */
      get ttl() {
        return this._ttl;
      }
      /**
       * Set the current TTL.
       * @param {number} ttl The TTL to set in milliseconds.
       */
      set ttl(ttl2) {
        this.opts.ttl = ttl2;
        this._ttl = ttl2;
      }
      /**
       * Get the current serialize function.
       * @returns {Serialize} The current serialize function.
       */
      get serialize() {
        return this._serialize;
      }
      /**
       * Set the current serialize function.
       * @param {Serialize} serialize The serialize function to set.
       */
      set serialize(serialize) {
        this.opts.serialize = serialize;
        this._serialize = serialize;
      }
      /**
       * Get the current deserialize function.
       * @returns {Deserialize} The current deserialize function.
       */
      get deserialize() {
        return this._deserialize;
      }
      /**
       * Set the current deserialize function.
       * @param {Deserialize} deserialize The deserialize function to set.
       */
      set deserialize(deserialize) {
        this.opts.deserialize = deserialize;
        this._deserialize = deserialize;
      }
      /**
       * Get the current useKeyPrefix value. This will enable or disable key prefixing.
       * @returns {boolean} The current useKeyPrefix value.
       * @default true
       */
      get useKeyPrefix() {
        return this._useKeyPrefix;
      }
      /**
       * Set the current useKeyPrefix value. This will enable or disable key prefixing.
       * @param {boolean} value The useKeyPrefix value to set.
       */
      set useKeyPrefix(value) {
        this._useKeyPrefix = value;
        this.opts.useKeyPrefix = value;
      }
      /**
       * Get the current throwErrors value. This will enable or disable throwing errors on methods in addition to emitting them.
       * @return {boolean} The current throwOnErrors value.
       */
      get throwOnErrors() {
        return this._throwOnErrors;
      }
      /**
       * Set the current throwOnErrors value. This will enable or disable throwing errors on methods in addition to emitting them.
       * @param {boolean} value The throwOnErrors value to set.
       */
      set throwOnErrors(value) {
        this._throwOnErrors = value;
        this.opts.throwOnErrors = value;
      }
      generateIterator(iterator) {
        const function_ = async function* () {
          for await (const [key, raw] of typeof iterator === "function" ? iterator(this._store.namespace) : iterator) {
            const data = await this.deserializeData(raw);
            if (this._useKeyPrefix && this._store.namespace && !key.includes(this._store.namespace)) {
              continue;
            }
            if (typeof data.expires === "number" && Date.now() > data.expires) {
              await this.delete(key);
              continue;
            }
            yield [this._getKeyUnprefix(key), data.value];
          }
        };
        return function_.bind(this);
      }
      _checkIterableAdapter() {
        return iterableAdapters.includes(this._store.opts.dialect) || iterableAdapters.some(
          (element) => this._store.opts.url.includes(element)
        );
      }
      _getKeyPrefix(key) {
        if (!this._useKeyPrefix) {
          return key;
        }
        if (!this._namespace) {
          return key;
        }
        if (key.startsWith(`${this._namespace}:`)) {
          return key;
        }
        return `${this._namespace}:${key}`;
      }
      _getKeyPrefixArray(keys) {
        if (!this._useKeyPrefix) {
          return keys;
        }
        if (!this._namespace) {
          return keys;
        }
        return keys.map((key) => `${this._namespace}:${key}`);
      }
      _getKeyUnprefix(key) {
        if (!this._useKeyPrefix) {
          return key;
        }
        return key.split(":").splice(1).join(":");
      }
      // biome-ignore lint/suspicious/noExplicitAny: type format
      _isValidStorageAdapter(store) {
        return store instanceof Map || typeof store.get === "function" && typeof store.set === "function" && typeof store.delete === "function" && typeof store.clear === "function";
      }
      // eslint-disable-next-line @stylistic/max-len
      async get(key, options) {
        const { store } = this.opts;
        const isArray2 = Array.isArray(key);
        const keyPrefixed = isArray2 ? this._getKeyPrefixArray(key) : this._getKeyPrefix(key);
        const isDataExpired = (data) => typeof data.expires === "number" && Date.now() > data.expires;
        if (isArray2) {
          if ((options == null ? void 0 : options.raw) === true) {
            return this.getMany(key, { raw: true });
          }
          return this.getMany(key, { raw: false });
        }
        this.hooks.trigger("preGet", { key: keyPrefixed });
        let rawData;
        try {
          rawData = await store.get(keyPrefixed);
        } catch (error) {
          if (this.throwOnErrors) {
            throw error;
          }
        }
        const deserializedData = typeof rawData === "string" || this.opts.compression ? await this.deserializeData(rawData) : rawData;
        if (deserializedData === void 0 || deserializedData === null) {
          this.hooks.trigger("postGet", {
            key: keyPrefixed,
            value: void 0
          });
          this.stats.miss();
          return void 0;
        }
        if (isDataExpired(deserializedData)) {
          await this.delete(key);
          this.hooks.trigger("postGet", {
            key: keyPrefixed,
            value: void 0
          });
          this.stats.miss();
          return void 0;
        }
        this.hooks.trigger("postGet", {
          key: keyPrefixed,
          value: deserializedData
        });
        this.stats.hit();
        return (options == null ? void 0 : options.raw) ? deserializedData : deserializedData.value;
      }
      async getMany(keys, options) {
        const { store } = this.opts;
        const keyPrefixed = this._getKeyPrefixArray(keys);
        const isDataExpired = (data) => typeof data.expires === "number" && Date.now() > data.expires;
        this.hooks.trigger("preGetMany", { keys: keyPrefixed });
        if (store.getMany === void 0) {
          const promises = keyPrefixed.map(async (key) => {
            const rawData2 = await store.get(key);
            const deserializedRow = typeof rawData2 === "string" || this.opts.compression ? await this.deserializeData(rawData2) : rawData2;
            if (deserializedRow === void 0 || deserializedRow === null) {
              return void 0;
            }
            if (isDataExpired(deserializedRow)) {
              await this.delete(key);
              return void 0;
            }
            return (options == null ? void 0 : options.raw) ? deserializedRow : deserializedRow.value;
          });
          const deserializedRows = await Promise.allSettled(promises);
          const result2 = deserializedRows.map(
            // biome-ignore lint/suspicious/noExplicitAny: type format
            (row) => row.value
          );
          this.hooks.trigger("postGetMany", result2);
          if (result2.length > 0) {
            this.stats.hit();
          }
          return result2;
        }
        const rawData = await store.getMany(keyPrefixed);
        const result = [];
        const expiredKeys = [];
        for (const index in rawData) {
          let row = rawData[index];
          if (typeof row === "string") {
            row = await this.deserializeData(row);
          }
          if (row === void 0 || row === null) {
            result.push(void 0);
            continue;
          }
          if (isDataExpired(row)) {
            expiredKeys.push(keys[index]);
            result.push(void 0);
            continue;
          }
          const value = (options == null ? void 0 : options.raw) ? row : row.value;
          result.push(value);
        }
        if (expiredKeys.length > 0) {
          await this.deleteMany(expiredKeys);
        }
        this.hooks.trigger("postGetMany", result);
        if (result.length > 0) {
          this.stats.hit();
        }
        return result;
      }
      /**
       * Get the raw value of a key. This is the replacement for setting raw to true in the get() method.
       * @param {string} key the key to get
       * @returns {Promise<StoredDataRaw<Value> | undefined>} will return a StoredDataRaw<Value> or undefined if the key does not exist or is expired.
       */
      async getRaw(key) {
        const { store } = this.opts;
        const keyPrefixed = this._getKeyPrefix(key);
        this.hooks.trigger("preGetRaw", { key: keyPrefixed });
        const rawData = await store.get(keyPrefixed);
        if (rawData === void 0 || rawData === null) {
          this.hooks.trigger("postGetRaw", {
            key: keyPrefixed,
            value: void 0
          });
          this.stats.miss();
          return void 0;
        }
        const deserializedData = typeof rawData === "string" || this.opts.compression ? await this.deserializeData(rawData) : rawData;
        if (deserializedData !== void 0 && deserializedData.expires !== void 0 && deserializedData.expires !== null && // biome-ignore lint/style/noNonNullAssertion: need to fix
        deserializedData.expires < Date.now()) {
          this.hooks.trigger("postGetRaw", {
            key: keyPrefixed,
            value: void 0
          });
          this.stats.miss();
          await this.delete(key);
          return void 0;
        }
        this.stats.hit();
        this.hooks.trigger("postGetRaw", {
          key: keyPrefixed,
          value: deserializedData
        });
        return deserializedData;
      }
      /**
       * Get the raw values of many keys. This is the replacement for setting raw to true in the getMany() method.
       * @param {string[]} keys the keys to get
       * @returns {Promise<Array<StoredDataRaw<Value>>>} will return an array of StoredDataRaw<Value> or undefined if the key does not exist or is expired.
       */
      async getManyRaw(keys) {
        const { store } = this.opts;
        const keyPrefixed = this._getKeyPrefixArray(keys);
        if (keys.length === 0) {
          const result2 = Array.from({ length: keys.length }).fill(
            void 0
          );
          this.stats.misses += keys.length;
          this.hooks.trigger("postGetManyRaw", {
            keys: keyPrefixed,
            values: result2
          });
          return result2;
        }
        let result = [];
        if (store.getMany === void 0) {
          const promises = keyPrefixed.map(async (key) => {
            const rawData = await store.get(key);
            if (rawData !== void 0 && rawData !== null) {
              return this.deserializeData(rawData);
            }
            return void 0;
          });
          const deserializedRows = await Promise.allSettled(promises);
          result = deserializedRows.map(
            // biome-ignore lint/suspicious/noExplicitAny: type format
            (row) => row.value
          );
        } else {
          const rawData = await store.getMany(keyPrefixed);
          for (const row of rawData) {
            if (row !== void 0 && row !== null) {
              result.push(await this.deserializeData(row));
            } else {
              result.push(void 0);
            }
          }
        }
        const expiredKeys = [];
        const isDataExpired = (data) => typeof data.expires === "number" && Date.now() > data.expires;
        for (const [index, row] of result.entries()) {
          if (row !== void 0 && isDataExpired(row)) {
            expiredKeys.push(keyPrefixed[index]);
            result[index] = void 0;
          }
        }
        if (expiredKeys.length > 0) {
          await this.deleteMany(expiredKeys);
        }
        this.stats.hitsOrMisses(result);
        this.hooks.trigger("postGetManyRaw", {
          keys: keyPrefixed,
          values: result
        });
        return result;
      }
      /**
       * Set an item to the store
       * @param {string | Array<KeyvEntry>} key the key to use. If you pass in an array of KeyvEntry it will set many items
       * @param {Value} value the value of the key
       * @param {number} [ttl] time to live in milliseconds
       * @returns {boolean} if it sets then it will return a true. On failure will return false.
       */
      async set(key, value, ttl2) {
        const data = { key, value, ttl: ttl2 };
        this.hooks.trigger("preSet", data);
        const keyPrefixed = this._getKeyPrefix(data.key);
        data.ttl ??= this._ttl;
        if (data.ttl === 0) {
          data.ttl = void 0;
        }
        const { store } = this.opts;
        const expires = typeof data.ttl === "number" ? Date.now() + data.ttl : void 0;
        if (typeof data.value === "symbol") {
          this.emit("error", "symbol cannot be serialized");
          throw new Error("symbol cannot be serialized");
        }
        const formattedValue = { value: data.value, expires };
        const serializedValue = await this.serializeData(formattedValue);
        let result = true;
        try {
          const value2 = await store.set(keyPrefixed, serializedValue, data.ttl);
          if (typeof value2 === "boolean") {
            result = value2;
          }
        } catch (error) {
          result = false;
          this.emit("error", error);
          if (this._throwOnErrors) {
            throw error;
          }
        }
        this.hooks.trigger("postSet", {
          key: keyPrefixed,
          value: serializedValue,
          ttl: ttl2
        });
        this.stats.set();
        return result;
      }
      /**
       * Set many items to the store
       * @param {Array<KeyvEntry>} entries the entries to set
       * @returns {boolean[]} will return an array of booleans if it sets then it will return a true. On failure will return false.
       */
      // biome-ignore lint/correctness/noUnusedVariables: type format
      async setMany(entries2) {
        let results = [];
        try {
          if (this._store.setMany === void 0) {
            const promises = [];
            for (const entry of entries2) {
              promises.push(this.set(entry.key, entry.value, entry.ttl));
            }
            const promiseResults = await Promise.all(promises);
            results = promiseResults;
          } else {
            const serializedEntries = await Promise.all(
              entries2.map(async ({ key, value, ttl: ttl2 }) => {
                ttl2 ??= this._ttl;
                if (ttl2 === 0) {
                  ttl2 = void 0;
                }
                const expires = typeof ttl2 === "number" ? Date.now() + ttl2 : void 0;
                if (typeof value === "symbol") {
                  this.emit("error", "symbol cannot be serialized");
                  throw new Error("symbol cannot be serialized");
                }
                const formattedValue = { value, expires };
                const serializedValue = await this.serializeData(formattedValue);
                const keyPrefixed = this._getKeyPrefix(key);
                return { key: keyPrefixed, value: serializedValue, ttl: ttl2 };
              })
            );
            results = await this._store.setMany(serializedEntries);
          }
        } catch (error) {
          this.emit("error", error);
          if (this._throwOnErrors) {
            throw error;
          }
          results = entries2.map(() => false);
        }
        return results;
      }
      /**
       * Delete an Entry
       * @param {string | string[]} key the key to be deleted. if an array it will delete many items
       * @returns {boolean} will return true if item or items are deleted. false if there is an error
       */
      async delete(key) {
        const { store } = this.opts;
        if (Array.isArray(key)) {
          return this.deleteMany(key);
        }
        const keyPrefixed = this._getKeyPrefix(key);
        this.hooks.trigger("preDelete", { key: keyPrefixed });
        let result = true;
        try {
          const value = await store.delete(keyPrefixed);
          if (typeof value === "boolean") {
            result = value;
          }
        } catch (error) {
          result = false;
          this.emit("error", error);
          if (this._throwOnErrors) {
            throw error;
          }
        }
        this.hooks.trigger("postDelete", {
          key: keyPrefixed,
          value: result
        });
        this.stats.delete();
        return result;
      }
      /**
       * Delete many items from the store
       * @param {string[]} keys the keys to be deleted
       * @returns {boolean} will return true if item or items are deleted. false if there is an error
       */
      async deleteMany(keys) {
        try {
          const { store } = this.opts;
          const keyPrefixed = this._getKeyPrefixArray(keys);
          this.hooks.trigger("preDelete", { key: keyPrefixed });
          if (store.deleteMany !== void 0) {
            return await store.deleteMany(keyPrefixed);
          }
          const promises = keyPrefixed.map(async (key) => store.delete(key));
          const results = await Promise.all(promises);
          const returnResult = results.every(Boolean);
          this.hooks.trigger("postDelete", {
            key: keyPrefixed,
            value: returnResult
          });
          return returnResult;
        } catch (error) {
          this.emit("error", error);
          if (this._throwOnErrors) {
            throw error;
          }
          return false;
        }
      }
      /**
       * Clear the store
       * @returns {void}
       */
      async clear() {
        this.emit("clear");
        const { store } = this.opts;
        try {
          await store.clear();
        } catch (error) {
          this.emit("error", error);
          if (this._throwOnErrors) {
            throw error;
          }
        }
      }
      async has(key) {
        if (Array.isArray(key)) {
          return this.hasMany(key);
        }
        const keyPrefixed = this._getKeyPrefix(key);
        const { store } = this.opts;
        if (store.has !== void 0 && !(store instanceof Map)) {
          return store.has(keyPrefixed);
        }
        let rawData;
        try {
          rawData = await store.get(keyPrefixed);
        } catch (error) {
          this.emit("error", error);
          if (this._throwOnErrors) {
            throw error;
          }
          return false;
        }
        if (rawData) {
          const data = await this.deserializeData(rawData);
          if (data) {
            if (data.expires === void 0 || data.expires === null) {
              return true;
            }
            return data.expires > Date.now();
          }
        }
        return false;
      }
      /**
       * Check if many keys exist
       * @param {string[]} keys the keys to check
       * @returns {boolean[]} will return an array of booleans if the keys exist
       */
      async hasMany(keys) {
        const keyPrefixed = this._getKeyPrefixArray(keys);
        const { store } = this.opts;
        if (store.hasMany !== void 0) {
          return store.hasMany(keyPrefixed);
        }
        const results = [];
        for (const key of keys) {
          results.push(await this.has(key));
        }
        return results;
      }
      /**
       * Will disconnect the store. This is only available if the store has a disconnect method
       * @returns {Promise<void>}
       */
      async disconnect() {
        const { store } = this.opts;
        this.emit("disconnect");
        if (typeof store.disconnect === "function") {
          return store.disconnect();
        }
      }
      // biome-ignore lint/suspicious/noExplicitAny: type format
      emit(event, ...arguments_) {
        if (event === "error" && !this.opts.emitErrors) {
          return;
        }
        super.emit(event, ...arguments_);
      }
      async serializeData(data) {
        var _a;
        if (!this._serialize) {
          return data;
        }
        if ((_a = this._compression) == null ? void 0 : _a.compress) {
          return this._serialize({
            value: await this._compression.compress(data.value),
            expires: data.expires
          });
        }
        return this._serialize(data);
      }
      async deserializeData(data) {
        var _a;
        if (!this._deserialize) {
          return data;
        }
        if (((_a = this._compression) == null ? void 0 : _a.decompress) && typeof data === "string") {
          const result = await this._deserialize(data);
          return {
            value: await this._compression.decompress(result == null ? void 0 : result.value),
            expires: result == null ? void 0 : result.expires
          };
        }
        if (typeof data === "string") {
          return this._deserialize(data);
        }
        return void 0;
      }
    };
  }
});

// ../packages/curness-core/node_modules/mimic-response/index.js
function mimicResponse(fromStream, toStream) {
  if (toStream._readableState.autoDestroy) {
    throw new Error("The second stream must have the `autoDestroy` option set to `false`");
  }
  const fromProperties = /* @__PURE__ */ new Set([...Object.keys(fromStream), ...knownProperties]);
  const properties = {};
  for (const property of fromProperties) {
    if (property in toStream) {
      continue;
    }
    properties[property] = {
      get() {
        const value = fromStream[property];
        const isFunction3 = typeof value === "function";
        return isFunction3 ? value.bind(fromStream) : value;
      },
      set(value) {
        fromStream[property] = value;
      },
      enumerable: true,
      configurable: false
    };
  }
  Object.defineProperties(toStream, properties);
  fromStream.once("aborted", () => {
    toStream.destroy();
    toStream.emit("aborted");
  });
  fromStream.once("close", () => {
    if (fromStream.complete) {
      if (toStream.readable) {
        toStream.once("end", () => {
          toStream.emit("close");
        });
      } else {
        toStream.emit("close");
      }
    } else {
      toStream.emit("close");
    }
  });
  return toStream;
}
var knownProperties;
var init_mimic_response = __esm({
  "../packages/curness-core/node_modules/mimic-response/index.js"() {
    knownProperties = [
      "aborted",
      "complete",
      "headers",
      "httpVersion",
      "httpVersionMinor",
      "httpVersionMajor",
      "method",
      "rawHeaders",
      "rawTrailers",
      "setTimeout",
      "socket",
      "statusCode",
      "statusMessage",
      "trailers",
      "url"
    ];
  }
});

// ../packages/curness-core/node_modules/normalize-url/index.js
function normalizeUrl(urlString, options) {
  options = {
    defaultProtocol: "http",
    normalizeProtocol: true,
    forceHttp: false,
    forceHttps: false,
    stripAuthentication: true,
    stripHash: false,
    stripTextFragment: true,
    stripWWW: true,
    removeQueryParameters: [/^utm_\w+/i],
    removeTrailingSlash: true,
    removeSingleSlash: true,
    removeDirectoryIndex: false,
    removeExplicitPort: false,
    sortQueryParameters: true,
    removePath: false,
    transformPath: false,
    ...options
  };
  if (typeof options.defaultProtocol === "string" && !options.defaultProtocol.endsWith(":")) {
    options.defaultProtocol = `${options.defaultProtocol}:`;
  }
  urlString = urlString.trim();
  if (/^data:/i.test(urlString)) {
    return normalizeDataURL(urlString, options);
  }
  if (hasCustomProtocol(urlString)) {
    return urlString;
  }
  const hasRelativeProtocol = urlString.startsWith("//");
  const isRelativeUrl = !hasRelativeProtocol && /^\.*\//.test(urlString);
  if (!isRelativeUrl) {
    urlString = urlString.replace(/^(?!(?:\w+:)?\/\/)|^\/\//, options.defaultProtocol);
  }
  const urlObject = new URL(urlString);
  if (options.forceHttp && options.forceHttps) {
    throw new Error("The `forceHttp` and `forceHttps` options cannot be used together");
  }
  if (options.forceHttp && urlObject.protocol === "https:") {
    urlObject.protocol = "http:";
  }
  if (options.forceHttps && urlObject.protocol === "http:") {
    urlObject.protocol = "https:";
  }
  if (options.stripAuthentication) {
    urlObject.username = "";
    urlObject.password = "";
  }
  if (options.stripHash) {
    urlObject.hash = "";
  } else if (options.stripTextFragment) {
    urlObject.hash = urlObject.hash.replace(/#?:~:text.*?$/i, "");
  }
  if (urlObject.pathname) {
    const protocolRegex = /\b[a-z][a-z\d+\-.]{1,50}:\/\//g;
    let lastIndex = 0;
    let result = "";
    for (; ; ) {
      const match = protocolRegex.exec(urlObject.pathname);
      if (!match) {
        break;
      }
      const protocol = match[0];
      const protocolAtIndex = match.index;
      const intermediate = urlObject.pathname.slice(lastIndex, protocolAtIndex);
      result += intermediate.replace(/\/{2,}/g, "/");
      result += protocol;
      lastIndex = protocolAtIndex + protocol.length;
    }
    const remnant = urlObject.pathname.slice(lastIndex, urlObject.pathname.length);
    result += remnant.replace(/\/{2,}/g, "/");
    urlObject.pathname = result;
  }
  if (urlObject.pathname) {
    try {
      urlObject.pathname = decodeURI(urlObject.pathname).replace(/\\/g, "%5C");
    } catch {
    }
  }
  if (options.removeDirectoryIndex === true) {
    options.removeDirectoryIndex = [/^index\.[a-z]+$/];
  }
  if (Array.isArray(options.removeDirectoryIndex) && options.removeDirectoryIndex.length > 0) {
    const pathComponents = urlObject.pathname.split("/").filter(Boolean);
    const lastComponent = pathComponents.at(-1);
    if (lastComponent && testParameter(lastComponent, options.removeDirectoryIndex)) {
      pathComponents.pop();
      urlObject.pathname = pathComponents.length > 0 ? `/${pathComponents.join("/")}/` : "/";
    }
  }
  if (options.removePath) {
    urlObject.pathname = "/";
  }
  if (options.transformPath && typeof options.transformPath === "function") {
    const pathComponents = urlObject.pathname.split("/").filter(Boolean);
    const newComponents = options.transformPath(pathComponents);
    urlObject.pathname = (newComponents == null ? void 0 : newComponents.length) > 0 ? `/${newComponents.join("/")}` : "/";
  }
  if (urlObject.hostname) {
    urlObject.hostname = urlObject.hostname.replace(/\.$/, "");
    if (options.stripWWW && /^www\.(?!www\.)[a-z\-\d]{1,63}\.[a-z.\-\d]{2,63}$/.test(urlObject.hostname)) {
      urlObject.hostname = urlObject.hostname.replace(/^www\./, "");
    }
  }
  if (Array.isArray(options.removeQueryParameters)) {
    for (const key of [...urlObject.searchParams.keys()]) {
      if (testParameter(key, options.removeQueryParameters)) {
        urlObject.searchParams.delete(key);
      }
    }
  }
  if (!Array.isArray(options.keepQueryParameters) && options.removeQueryParameters === true) {
    urlObject.search = "";
  }
  if (Array.isArray(options.keepQueryParameters) && options.keepQueryParameters.length > 0) {
    for (const key of [...urlObject.searchParams.keys()]) {
      if (!testParameter(key, options.keepQueryParameters)) {
        urlObject.searchParams.delete(key);
      }
    }
  }
  if (options.sortQueryParameters) {
    const originalSearch = urlObject.search;
    urlObject.searchParams.sort();
    try {
      urlObject.search = decodeURIComponent(urlObject.search);
    } catch {
    }
    const partsWithoutEquals = originalSearch.slice(1).split("&").filter((p) => p && !p.includes("="));
    for (const part of partsWithoutEquals) {
      const decoded = decodeURIComponent(part);
      urlObject.search = urlObject.search.replace(`?${decoded}=`, `?${decoded}`).replace(`&${decoded}=`, `&${decoded}`);
    }
  }
  if (options.removeTrailingSlash) {
    urlObject.pathname = urlObject.pathname.replace(/\/$/, "");
  }
  if (options.removeExplicitPort && urlObject.port) {
    urlObject.port = "";
  }
  const oldUrlString = urlString;
  urlString = urlObject.toString();
  if (!options.removeSingleSlash && urlObject.pathname === "/" && !oldUrlString.endsWith("/") && urlObject.hash === "") {
    urlString = urlString.replace(/\/$/, "");
  }
  if ((options.removeTrailingSlash || urlObject.pathname === "/") && urlObject.hash === "" && options.removeSingleSlash) {
    urlString = urlString.replace(/\/$/, "");
  }
  if (hasRelativeProtocol && !options.normalizeProtocol) {
    urlString = urlString.replace(/^http:\/\//, "//");
  }
  if (options.stripProtocol) {
    urlString = urlString.replace(/^(?:https?:)?\/\//, "");
  }
  return urlString;
}
var DATA_URL_DEFAULT_MIME_TYPE, DATA_URL_DEFAULT_CHARSET, testParameter, supportedProtocols, hasCustomProtocol, normalizeDataURL;
var init_normalize_url = __esm({
  "../packages/curness-core/node_modules/normalize-url/index.js"() {
    DATA_URL_DEFAULT_MIME_TYPE = "text/plain";
    DATA_URL_DEFAULT_CHARSET = "us-ascii";
    testParameter = (name, filters) => filters.some((filter) => filter instanceof RegExp ? filter.test(name) : filter === name);
    supportedProtocols = /* @__PURE__ */ new Set([
      "https:",
      "http:",
      "file:"
    ]);
    hasCustomProtocol = (urlString) => {
      try {
        const { protocol } = new URL(urlString);
        return protocol.endsWith(":") && !protocol.includes(".") && !supportedProtocols.has(protocol);
      } catch {
        return false;
      }
    };
    normalizeDataURL = (urlString, { stripHash }) => {
      var _a;
      const match = /^data:(?<type>[^,]*?),(?<data>[^#]*?)(?:#(?<hash>.*))?$/.exec(urlString);
      if (!match) {
        throw new Error(`Invalid URL: ${urlString}`);
      }
      const { type, data, hash } = match.groups;
      const mediaType = type.split(";");
      const isBase64 = mediaType.at(-1) === "base64";
      if (isBase64) {
        mediaType.pop();
      }
      const mimeType = ((_a = mediaType.shift()) == null ? void 0 : _a.toLowerCase()) ?? "";
      const attributes = mediaType.map((attribute) => {
        let [key, value = ""] = attribute.split("=").map((string) => string.trim());
        if (key === "charset") {
          value = value.toLowerCase();
          if (value === DATA_URL_DEFAULT_CHARSET) {
            return "";
          }
        }
        return `${key}${value ? `=${value}` : ""}`;
      }).filter(Boolean);
      const normalizedMediaType = [...attributes];
      if (isBase64) {
        normalizedMediaType.push("base64");
      }
      if (normalizedMediaType.length > 0 || mimeType && mimeType !== DATA_URL_DEFAULT_MIME_TYPE) {
        normalizedMediaType.unshift(mimeType);
      }
      const hashPart = stripHash || !hash ? "" : `#${hash}`;
      return `data:${normalizedMediaType.join(";")},${isBase64 ? data.trim() : data}${hashPart}`;
    };
  }
});

// ../packages/curness-core/node_modules/lowercase-keys/index.js
function lowercaseKeys(object) {
  return Object.fromEntries(Object.entries(object).map(([key, value]) => [key.toLowerCase(), value]));
}
var init_lowercase_keys = __esm({
  "../packages/curness-core/node_modules/lowercase-keys/index.js"() {
  }
});

// ../packages/curness-core/node_modules/responselike/index.js
var import_node_stream, Response;
var init_responselike = __esm({
  "../packages/curness-core/node_modules/responselike/index.js"() {
    import_node_stream = require("node:stream");
    init_lowercase_keys();
    Response = class extends import_node_stream.Readable {
      statusCode;
      headers;
      body;
      url;
      complete;
      constructor({ statusCode, headers, body, url }) {
        if (typeof statusCode !== "number") {
          throw new TypeError("Argument `statusCode` should be a number");
        }
        if (typeof headers !== "object") {
          throw new TypeError("Argument `headers` should be an object");
        }
        if (!(body instanceof Uint8Array)) {
          throw new TypeError("Argument `body` should be a buffer");
        }
        if (typeof url !== "string") {
          throw new TypeError("Argument `url` should be a string");
        }
        let bodyPushed = false;
        super({
          read() {
            if (!bodyPushed) {
              bodyPushed = true;
              this.push(body);
              return;
            }
            this.push(null);
          }
        });
        this.statusCode = statusCode;
        this.headers = lowercaseKeys(headers);
        this.body = body;
        this.url = url;
        this.complete = true;
      }
    };
  }
});

// ../packages/curness-core/node_modules/cacheable-request/dist/types.js
var RequestError2, CacheError2;
var init_types = __esm({
  "../packages/curness-core/node_modules/cacheable-request/dist/types.js"() {
    RequestError2 = class extends Error {
      constructor(error) {
        super(error.message);
        Object.defineProperties(this, Object.getOwnPropertyDescriptors(error));
      }
    };
    CacheError2 = class extends Error {
      constructor(error) {
        super(error.message);
        Object.defineProperties(this, Object.getOwnPropertyDescriptors(error));
      }
    };
  }
});

// ../packages/curness-core/node_modules/cacheable-request/dist/index.js
var import_node_crypto, import_node_events2, import_node_stream2, import_node_url, import_http_cache_semantics, CacheableRequest, entries, cloneResponse, urlObjectToRequestOptions, normalizeUrlObject, convertHeaders, parseWithWhatwg, dist_default;
var init_dist3 = __esm({
  "../packages/curness-core/node_modules/cacheable-request/dist/index.js"() {
    import_node_crypto = __toESM(require("node:crypto"), 1);
    import_node_events2 = __toESM(require("node:events"), 1);
    import_node_stream2 = __toESM(require("node:stream"), 1);
    import_node_url = __toESM(require("node:url"), 1);
    init_source();
    import_http_cache_semantics = __toESM(require_http_cache_semantics(), 1);
    init_dist2();
    init_mimic_response();
    init_normalize_url();
    init_responselike();
    init_types();
    init_types();
    CacheableRequest = class {
      constructor(cacheRequest, cacheAdapter) {
        this.cache = new Keyv({ namespace: "cacheable-request" });
        this.hooks = /* @__PURE__ */ new Map();
        this.request = () => (options, callback) => {
          let url;
          if (typeof options === "string") {
            url = normalizeUrlObject(parseWithWhatwg(options));
            options = {};
          } else if (options instanceof import_node_url.default.URL) {
            url = normalizeUrlObject(parseWithWhatwg(options.toString()));
            options = {};
          } else {
            const [pathname, ...searchParts] = (options.path ?? "").split("?");
            const search = searchParts.length > 0 ? `?${searchParts.join("?")}` : "";
            url = normalizeUrlObject({ ...options, pathname, search });
          }
          options = {
            headers: {},
            method: "GET",
            cache: true,
            strictTtl: false,
            automaticFailover: false,
            ...options,
            ...urlObjectToRequestOptions(url)
          };
          options.headers = Object.fromEntries(entries(options.headers).map(([key2, value]) => [
            key2.toLowerCase(),
            value
          ]));
          const ee = new import_node_events2.default();
          const normalizedUrlString = normalizeUrl(import_node_url.default.format(url), {
            stripWWW: false,
            removeTrailingSlash: false,
            stripAuthentication: false
          });
          let key = `${options.method}:${normalizedUrlString}`;
          if (options.body && options.method !== void 0 && ["POST", "PATCH", "PUT"].includes(options.method)) {
            if (options.body instanceof import_node_stream2.default.Readable) {
              options.cache = false;
            } else {
              key += `:${import_node_crypto.default.createHash("md5").update(options.body).digest("hex")}`;
            }
          }
          let revalidate = false;
          let madeRequest = false;
          const makeRequest = (options_) => {
            madeRequest = true;
            let requestErrored = false;
            let requestErrorCallback = () => {
            };
            const requestErrorPromise = new Promise((resolve) => {
              requestErrorCallback = () => {
                if (!requestErrored) {
                  requestErrored = true;
                  resolve();
                }
              };
            });
            const handler = async (response) => {
              if (revalidate) {
                response.status = response.statusCode;
                const originalPolicy = import_http_cache_semantics.default.fromObject(revalidate.cachePolicy);
                const revalidatedPolicy = originalPolicy.revalidatedPolicy(options_, response);
                if (!revalidatedPolicy.modified) {
                  response.resume();
                  await new Promise((resolve) => {
                    response.once("end", resolve);
                  });
                  const headers = convertHeaders(revalidatedPolicy.policy.responseHeaders());
                  const originalHeaders = convertHeaders(originalPolicy.responseHeaders());
                  const preserveHeaders = [
                    "content-encoding",
                    "content-type",
                    "content-length",
                    "content-language",
                    "content-location",
                    "etag"
                  ];
                  for (const headerName of preserveHeaders) {
                    if (originalHeaders[headerName] !== void 0 && headers[headerName] === void 0) {
                      headers[headerName] = originalHeaders[headerName];
                    }
                  }
                  response = new Response({
                    statusCode: revalidate.statusCode,
                    headers,
                    body: revalidate.body,
                    url: revalidate.url
                  });
                  response.cachePolicy = revalidatedPolicy.policy;
                  response.fromCache = true;
                }
              }
              if (!response.fromCache) {
                response.cachePolicy = new import_http_cache_semantics.default(options_, response, options_);
                response.fromCache = false;
              }
              let clonedResponse;
              if (options_.cache && response.cachePolicy.storable()) {
                clonedResponse = cloneResponse(response);
                (async () => {
                  try {
                    const bodyPromise = getStreamAsBuffer(response);
                    await Promise.race([
                      requestErrorPromise,
                      new Promise((resolve) => response.once("end", resolve)),
                      new Promise((resolve) => response.once("close", resolve))
                    ]);
                    const body = await bodyPromise;
                    let value = {
                      url: response.url,
                      statusCode: response.fromCache ? revalidate.statusCode : response.statusCode,
                      body,
                      cachePolicy: response.cachePolicy.toObject()
                    };
                    let ttl2 = options_.strictTtl ? response.cachePolicy.timeToLive() : void 0;
                    if (options_.maxTtl) {
                      ttl2 = ttl2 ? Math.min(ttl2, options_.maxTtl) : options_.maxTtl;
                    }
                    if (this.hooks.size > 0) {
                      for (const key_ of this.hooks.keys()) {
                        value = await this.runHook(key_, value, response);
                      }
                    }
                    await this.cache.set(key, value, ttl2);
                  } catch (error) {
                    ee.emit("error", new CacheError2(error));
                  }
                })();
              } else if (options_.cache && revalidate) {
                (async () => {
                  try {
                    await this.cache.delete(key);
                  } catch (error) {
                    ee.emit("error", new CacheError2(error));
                  }
                })();
              }
              ee.emit("response", clonedResponse ?? response);
              if (typeof callback === "function") {
                callback(clonedResponse ?? response);
              }
            };
            try {
              const request_ = this.cacheRequest(options_, handler);
              request_.once("error", requestErrorCallback);
              request_.once("abort", requestErrorCallback);
              request_.once("destroy", requestErrorCallback);
              ee.emit("request", request_);
            } catch (error) {
              ee.emit("error", new RequestError2(error));
            }
          };
          (async () => {
            const get = async (options_) => {
              await Promise.resolve();
              const cacheEntry = options_.cache ? await this.cache.get(key) : void 0;
              if (cacheEntry === void 0 && !options_.forceRefresh) {
                makeRequest(options_);
                return;
              }
              const policy = import_http_cache_semantics.default.fromObject(cacheEntry.cachePolicy);
              if (policy.satisfiesWithoutRevalidation(options_) && !options_.forceRefresh) {
                const headers = convertHeaders(policy.responseHeaders());
                const bodyBuffer = cacheEntry.body;
                const body = Buffer.from(bodyBuffer);
                const response = new Response({
                  statusCode: cacheEntry.statusCode,
                  headers,
                  body,
                  url: cacheEntry.url
                });
                response.cachePolicy = policy;
                response.fromCache = true;
                ee.emit("response", response);
                if (typeof callback === "function") {
                  callback(response);
                }
              } else if (policy.satisfiesWithoutRevalidation(options_) && Date.now() >= policy.timeToLive() && options_.forceRefresh) {
                await this.cache.delete(key);
                options_.headers = policy.revalidationHeaders(options_);
                makeRequest(options_);
              } else {
                revalidate = cacheEntry;
                options_.headers = policy.revalidationHeaders(options_);
                makeRequest(options_);
              }
            };
            const errorHandler = (error) => ee.emit("error", new CacheError2(error));
            if (this.cache instanceof Keyv) {
              const cachek = this.cache;
              cachek.once("error", errorHandler);
              ee.on("error", () => {
                cachek.removeListener("error", errorHandler);
              });
              ee.on("response", () => {
                cachek.removeListener("error", errorHandler);
              });
            }
            try {
              await get(options);
            } catch (error) {
              if (options.automaticFailover && !madeRequest) {
                makeRequest(options);
              }
              ee.emit("error", new CacheError2(error));
            }
          })();
          return ee;
        };
        this.addHook = (name, function_) => {
          if (!this.hooks.has(name)) {
            this.hooks.set(name, function_);
          }
        };
        this.removeHook = (name) => this.hooks.delete(name);
        this.getHook = (name) => this.hooks.get(name);
        this.runHook = async (name, ...arguments_) => {
          var _a;
          return (_a = this.hooks.get(name)) == null ? void 0 : _a(...arguments_);
        };
        if (cacheAdapter) {
          if (cacheAdapter instanceof Keyv) {
            this.cache = cacheAdapter;
          } else {
            this.cache = new Keyv({
              store: cacheAdapter,
              namespace: "cacheable-request"
            });
          }
        }
        this.request = this.request.bind(this);
        this.cacheRequest = cacheRequest;
      }
    };
    entries = Object.entries;
    cloneResponse = (response) => {
      const clone = new import_node_stream2.PassThrough({ autoDestroy: false });
      mimicResponse(response, clone);
      return response.pipe(clone);
    };
    urlObjectToRequestOptions = (url) => {
      const options = { ...url };
      options.path = `${url.pathname || "/"}${url.search || ""}`;
      delete options.pathname;
      delete options.search;
      return options;
    };
    normalizeUrlObject = (url) => (
      // If url was parsed by url.parse or new URL:
      // - hostname will be set
      // - host will be hostname[:port]
      // - port will be set if it was explicit in the parsed string
      // Otherwise, url was from request options:
      // - hostname or host may be set
      // - host shall not have port encoded
      {
        protocol: url.protocol,
        auth: url.auth,
        hostname: url.hostname || url.host || "localhost",
        port: url.port,
        pathname: url.pathname,
        search: url.search
      }
    );
    convertHeaders = (headers) => {
      const result = [];
      for (const name of Object.keys(headers)) {
        result[name.toLowerCase()] = headers[name];
      }
      return result;
    };
    parseWithWhatwg = (raw) => {
      const u2 = new import_node_url.URL(raw);
      return {
        protocol: u2.protocol,
        // E.g. 'https:'
        slashes: true,
        // Always true for WHATWG URLs
        /* c8 ignore next 3 */
        auth: u2.username || u2.password ? `${u2.username}:${u2.password}` : void 0,
        host: u2.host,
        // E.g. 'example.com:8080'
        port: u2.port,
        // E.g. '8080'
        hostname: u2.hostname,
        // E.g. 'example.com'
        hash: u2.hash,
        // E.g. '#quux'
        search: u2.search,
        // E.g. '?bar=baz'
        query: Object.fromEntries(u2.searchParams),
        // { bar: 'baz' }
        pathname: u2.pathname,
        // E.g. '/foo'
        path: u2.pathname + u2.search,
        // '/foo?bar=baz'
        href: u2.href
        // Full serialized URL
      };
    };
    dist_default = CacheableRequest;
  }
});

// ../packages/curness-core/node_modules/decompress-response/index.js
function decompressResponse(response) {
  const contentEncoding = (response.headers["content-encoding"] || "").toLowerCase();
  const supportedEncodings = ["gzip", "deflate", "br"];
  if (supportsZstd) {
    supportedEncodings.push("zstd");
  }
  if (!supportedEncodings.includes(contentEncoding)) {
    return response;
  }
  let isEmpty = true;
  const headers = { ...response.headers };
  const finalStream = new import_node_stream3.PassThrough({
    autoDestroy: false
  });
  finalStream.once("error", () => {
    response.destroy();
  });
  function handleContentEncoding(data) {
    let decompressStream;
    if (contentEncoding === "zstd") {
      decompressStream = import_node_zlib.default.createZstdDecompress();
    } else if (contentEncoding === "br") {
      decompressStream = import_node_zlib.default.createBrotliDecompress();
    } else if (contentEncoding === "deflate" && data.length > 0 && (data[0] & 8) === 0) {
      decompressStream = import_node_zlib.default.createInflateRaw();
    } else {
      decompressStream = import_node_zlib.default.createUnzip();
    }
    decompressStream.once("error", (error) => {
      if (isEmpty && !response.readable) {
        finalStream.end();
        return;
      }
      finalStream.destroy(error);
    });
    checker.pipe(decompressStream).pipe(finalStream);
  }
  const checker = new import_node_stream3.Transform({
    transform(data, _encoding, callback) {
      if (isEmpty === false) {
        callback(null, data);
        return;
      }
      isEmpty = false;
      handleContentEncoding(data);
      callback(null, data);
    },
    flush(callback) {
      if (isEmpty) {
        finalStream.end();
      }
      callback();
    }
  });
  delete headers["content-encoding"];
  delete headers["content-length"];
  finalStream.headers = headers;
  mimicResponse(response, finalStream);
  response.pipe(checker);
  return finalStream;
}
var import_node_stream3, import_node_zlib, supportsZstd;
var init_decompress_response = __esm({
  "../packages/curness-core/node_modules/decompress-response/index.js"() {
    import_node_stream3 = require("node:stream");
    import_node_zlib = __toESM(require("node:zlib"), 1);
    init_mimic_response();
    supportsZstd = typeof import_node_zlib.default.createZstdDecompress === "function";
  }
});

// ../packages/curness-core/node_modules/form-data-encoder/lib/index.js
function* chunk(value) {
  if (value.byteLength <= MAX_CHUNK_SIZE) {
    yield value;
    return;
  }
  let offset = 0;
  while (offset < value.byteLength) {
    const size = Math.min(value.byteLength - offset, MAX_CHUNK_SIZE);
    const buffer = value.buffer.slice(offset, offset + size);
    offset += buffer.byteLength;
    yield new Uint8Array(buffer);
  }
}
function createBoundary() {
  let size = 16;
  let res = "";
  while (size--) {
    res += alphabet[Math.random() * alphabet.length << 0];
  }
  return res;
}
async function* readStream(readable) {
  const reader = readable.getReader();
  while (true) {
    const { done, value } = await reader.read();
    if (done) {
      break;
    }
    yield value;
  }
}
async function* chunkStream(stream2) {
  for await (const value of stream2) {
    yield* chunk(value);
  }
}
function isPlainObject2(value) {
  var _a, _b;
  if (getType(value) !== "object") {
    return false;
  }
  const pp = Object.getPrototypeOf(value);
  if (pp === null || pp === void 0) {
    return true;
  }
  return ((_b = (_a = pp.constructor) == null ? void 0 : _a.toString) == null ? void 0 : _b.call(_a)) === Object.toString();
}
function getProperty(target, prop) {
  if (typeof prop === "string") {
    for (const [name, value] of Object.entries(target)) {
      if (prop.toLowerCase() === name.toLowerCase()) {
        return value;
      }
    }
  }
  return void 0;
}
var __typeError, __accessCheck, __privateGet, __privateAdd, __privateSet, __privateMethod, MAX_CHUNK_SIZE, alphabet, escapeName, isFunction2, isReadableStreamFallback, isAsyncIterable2, getStreamIterator, isFile, isFormData2, getType, normalizeValue, proxyHeaders, defaultOptions, readonlyProp, _CRLF, _CRLF_BYTES, _CRLF_BYTES_LENGTH, _DASHES, _encoder, _footer, _form, _options, _FormDataEncoder_instances, getFieldHeader_fn, getContentLength_fn, FormDataEncoder;
var init_lib = __esm({
  "../packages/curness-core/node_modules/form-data-encoder/lib/index.js"() {
    __typeError = (msg) => {
      throw TypeError(msg);
    };
    __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
    __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
    __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
    __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
    __privateMethod = (obj, member, method) => (__accessCheck(obj, member, "access private method"), method);
    MAX_CHUNK_SIZE = 65536;
    alphabet = "abcdefghijklmnopqrstuvwxyz0123456789";
    escapeName = (name) => String(name).replace(/\r/g, "%0D").replace(/\n/g, "%0A").replace(/"/g, "%22");
    isFunction2 = (value) => typeof value === "function";
    isReadableStreamFallback = (value) => !!value && typeof value === "object" && !Array.isArray(value) && isFunction2(value.getReader);
    isAsyncIterable2 = (value) => isFunction2(value[Symbol.asyncIterator]);
    getStreamIterator = (source) => {
      if (isAsyncIterable2(source)) {
        return chunkStream(source);
      }
      if (isReadableStreamFallback(source)) {
        return chunkStream(readStream(source));
      }
      throw new TypeError(
        "Unsupported data source: Expected either ReadableStream or async iterable."
      );
    };
    isFile = (value) => Boolean(
      value && typeof value === "object" && isFunction2(value.constructor) && value[Symbol.toStringTag] === "File" && isFunction2(value.stream) && value.name != null
    );
    isFormData2 = (value) => Boolean(
      value && isFunction2(value.constructor) && value[Symbol.toStringTag] === "FormData" && isFunction2(value.append) && isFunction2(value.getAll) && isFunction2(value.entries) && isFunction2(value[Symbol.iterator])
    );
    getType = (value) => Object.prototype.toString.call(value).slice(8, -1).toLowerCase();
    normalizeValue = (value) => String(value).replace(/\r|\n/g, (match, i2, str) => {
      if (match === "\r" && str[i2 + 1] !== "\n" || match === "\n" && str[i2 - 1] !== "\r") {
        return "\r\n";
      }
      return match;
    });
    proxyHeaders = (object) => new Proxy(
      object,
      {
        get: (target, prop) => getProperty(target, prop),
        has: (target, prop) => getProperty(target, prop) !== void 0
      }
    );
    defaultOptions = {
      enableAdditionalHeaders: false
    };
    readonlyProp = { writable: false, configurable: false };
    FormDataEncoder = class {
      constructor(form, boundaryOrOptions, options) {
        __privateAdd(this, _FormDataEncoder_instances);
        __privateAdd(this, _CRLF, "\r\n");
        __privateAdd(this, _CRLF_BYTES);
        __privateAdd(this, _CRLF_BYTES_LENGTH);
        __privateAdd(this, _DASHES, "-".repeat(2));
        __privateAdd(this, _encoder, new TextEncoder());
        __privateAdd(this, _footer);
        __privateAdd(this, _form);
        __privateAdd(this, _options);
        if (!isFormData2(form)) {
          throw new TypeError("Expected first argument to be a FormData instance.");
        }
        let boundary;
        if (isPlainObject2(boundaryOrOptions)) {
          options = boundaryOrOptions;
        } else {
          boundary = boundaryOrOptions;
        }
        if (!boundary) {
          boundary = `form-data-encoder-${createBoundary()}`;
        }
        if (typeof boundary !== "string") {
          throw new TypeError("Expected boundary argument to be a string.");
        }
        if (options && !isPlainObject2(options)) {
          throw new TypeError("Expected options argument to be an object.");
        }
        __privateSet(this, _form, Array.from(form.entries()));
        __privateSet(this, _options, { ...defaultOptions, ...options });
        __privateSet(this, _CRLF_BYTES, __privateGet(this, _encoder).encode(__privateGet(this, _CRLF)));
        __privateSet(this, _CRLF_BYTES_LENGTH, __privateGet(this, _CRLF_BYTES).byteLength);
        this.boundary = boundary;
        this.contentType = `multipart/form-data; boundary=${this.boundary}`;
        __privateSet(this, _footer, __privateGet(this, _encoder).encode(
          `${__privateGet(this, _DASHES)}${this.boundary}${__privateGet(this, _DASHES)}${__privateGet(this, _CRLF).repeat(2)}`
        ));
        const headers = {
          "Content-Type": this.contentType
        };
        const contentLength = __privateMethod(this, _FormDataEncoder_instances, getContentLength_fn).call(this);
        if (contentLength) {
          this.contentLength = contentLength;
          headers["Content-Length"] = contentLength;
        }
        this.headers = proxyHeaders(Object.freeze(headers));
        Object.defineProperties(this, {
          boundary: readonlyProp,
          contentType: readonlyProp,
          contentLength: readonlyProp,
          headers: readonlyProp
        });
      }
      /**
       * Creates an iterator allowing to go through form-data parts (with metadata).
       * This method **will not** read the files and **will not** split values big into smaller chunks.
       *
       * Using this method, you can convert form-data content into Blob:
       *
       * @example
       *
       * ```ts
       * import {Readable} from "stream"
       *
       * import {FormDataEncoder} from "form-data-encoder"
       *
       * import {FormData} from "formdata-polyfill/esm-min.js"
       * import {fileFrom} from "fetch-blob/form.js"
       * import {File} from "fetch-blob/file.js"
       * import {Blob} from "fetch-blob"
       *
       * import fetch from "node-fetch"
       *
       * const form = new FormData()
       *
       * form.set("field", "Just a random string")
       * form.set("file", new File(["Using files is class amazing"]))
       * form.set("fileFromPath", await fileFrom("path/to/a/file.txt"))
       *
       * const encoder = new FormDataEncoder(form)
       *
       * const options = {
       *   method: "post",
       *   body: new Blob(encoder, {type: encoder.contentType})
       * }
       *
       * const response = await fetch("https://httpbin.org/post", options)
       *
       * console.log(await response.json())
       * ```
       */
      *values() {
        for (const [name, raw] of __privateGet(this, _form)) {
          const value = isFile(raw) ? raw : __privateGet(this, _encoder).encode(normalizeValue(raw));
          yield __privateMethod(this, _FormDataEncoder_instances, getFieldHeader_fn).call(this, name, value);
          yield value;
          yield __privateGet(this, _CRLF_BYTES);
        }
        yield __privateGet(this, _footer);
      }
      /**
       * Creates an async iterator allowing to perform the encoding by portions.
       * This method reads through files and splits big values into smaller pieces (65536 bytes per each).
       *
       * @example
       *
       * ```ts
       * import {Readable} from "stream"
       *
       * import {FormData, File, fileFromPath} from "formdata-node"
       * import {FormDataEncoder} from "form-data-encoder"
       *
       * import fetch from "node-fetch"
       *
       * const form = new FormData()
       *
       * form.set("field", "Just a random string")
       * form.set("file", new File(["Using files is class amazing"], "file.txt"))
       * form.set("fileFromPath", await fileFromPath("path/to/a/file.txt"))
       *
       * const encoder = new FormDataEncoder(form)
       *
       * const options = {
       *   method: "post",
       *   headers: encoder.headers,
       *   body: Readable.from(encoder.encode()) // or Readable.from(encoder)
       * }
       *
       * const response = await fetch("https://httpbin.org/post", options)
       *
       * console.log(await response.json())
       * ```
       */
      async *encode() {
        for (const part of this.values()) {
          if (isFile(part)) {
            yield* getStreamIterator(part.stream());
          } else {
            yield* chunk(part);
          }
        }
      }
      /**
       * Creates an iterator allowing to read through the encoder data using for...of loops
       */
      [Symbol.iterator]() {
        return this.values();
      }
      /**
       * Creates an **async** iterator allowing to read through the encoder data using for-await...of loops
       */
      [Symbol.asyncIterator]() {
        return this.encode();
      }
    };
    _CRLF = /* @__PURE__ */ new WeakMap();
    _CRLF_BYTES = /* @__PURE__ */ new WeakMap();
    _CRLF_BYTES_LENGTH = /* @__PURE__ */ new WeakMap();
    _DASHES = /* @__PURE__ */ new WeakMap();
    _encoder = /* @__PURE__ */ new WeakMap();
    _footer = /* @__PURE__ */ new WeakMap();
    _form = /* @__PURE__ */ new WeakMap();
    _options = /* @__PURE__ */ new WeakMap();
    _FormDataEncoder_instances = /* @__PURE__ */ new WeakSet();
    getFieldHeader_fn = function(name, value) {
      let header = "";
      header += `${__privateGet(this, _DASHES)}${this.boundary}${__privateGet(this, _CRLF)}`;
      header += `Content-Disposition: form-data; name="${escapeName(name)}"`;
      if (isFile(value)) {
        header += `; filename="${escapeName(value.name)}"${__privateGet(this, _CRLF)}`;
        header += `Content-Type: ${value.type || "application/octet-stream"}`;
      }
      if (__privateGet(this, _options).enableAdditionalHeaders === true) {
        const size = isFile(value) ? value.size : value.byteLength;
        if (size != null && !isNaN(size)) {
          header += `${__privateGet(this, _CRLF)}Content-Length: ${size}`;
        }
      }
      return __privateGet(this, _encoder).encode(`${header}${__privateGet(this, _CRLF).repeat(2)}`);
    };
    getContentLength_fn = function() {
      let length = 0;
      for (const [name, raw] of __privateGet(this, _form)) {
        const value = isFile(raw) ? raw : __privateGet(this, _encoder).encode(normalizeValue(raw));
        const size = isFile(value) ? value.size : value.byteLength;
        if (size == null || isNaN(size)) {
          return void 0;
        }
        length += __privateMethod(this, _FormDataEncoder_instances, getFieldHeader_fn).call(this, name, value).byteLength;
        length += size;
        length += __privateGet(this, _CRLF_BYTES_LENGTH);
      }
      return String(length + __privateGet(this, _footer).byteLength);
    };
  }
});

// ../packages/curness-core/node_modules/got/dist/source/core/utils/defer-to-connect.js
function isTlsSocket(socket) {
  return "encrypted" in socket;
}
var deferToConnect, defer_to_connect_default;
var init_defer_to_connect = __esm({
  "../packages/curness-core/node_modules/got/dist/source/core/utils/defer-to-connect.js"() {
    deferToConnect = (socket, fn) => {
      let listeners;
      if (typeof fn === "function") {
        const connect = fn;
        listeners = { connect };
      } else {
        listeners = fn;
      }
      const hasConnectListener = typeof listeners.connect === "function";
      const hasSecureConnectListener = typeof listeners.secureConnect === "function";
      const hasCloseListener = typeof listeners.close === "function";
      const onConnect = () => {
        if (hasConnectListener) {
          listeners.connect();
        }
        if (isTlsSocket(socket) && hasSecureConnectListener) {
          if (socket.authorized) {
            listeners.secureConnect();
          } else {
            socket.once("secureConnect", listeners.secureConnect);
          }
        }
        if (hasCloseListener) {
          socket.once("close", listeners.close);
        }
      };
      if (socket.writable && !socket.connecting) {
        onConnect();
      } else if (socket.connecting) {
        socket.once("connect", onConnect);
      } else if (socket.destroyed && hasCloseListener) {
        const hadError = "_hadError" in socket ? Boolean(socket._hadError) : false;
        listeners.close(hadError);
      }
    };
    defer_to_connect_default = deferToConnect;
  }
});

// ../packages/curness-core/node_modules/got/dist/source/core/utils/timer.js
var import_node_events3, import_node_util, timer, timer_default;
var init_timer = __esm({
  "../packages/curness-core/node_modules/got/dist/source/core/utils/timer.js"() {
    import_node_events3 = require("node:events");
    import_node_util = require("node:util");
    init_defer_to_connect();
    timer = (request) => {
      if (request.timings) {
        return request.timings;
      }
      const timings = {
        start: Date.now(),
        socket: void 0,
        lookup: void 0,
        connect: void 0,
        secureConnect: void 0,
        upload: void 0,
        response: void 0,
        end: void 0,
        error: void 0,
        abort: void 0,
        phases: {
          wait: void 0,
          dns: void 0,
          tcp: void 0,
          tls: void 0,
          request: void 0,
          firstByte: void 0,
          download: void 0,
          total: void 0
        }
      };
      request.timings = timings;
      const handleError = (origin) => {
        origin.once(import_node_events3.errorMonitor, () => {
          timings.error = Date.now();
          timings.phases.total = timings.error - timings.start;
        });
      };
      handleError(request);
      const onAbort = () => {
        timings.abort = Date.now();
        timings.phases.total = timings.abort - timings.start;
      };
      request.prependOnceListener("abort", onAbort);
      const onSocket = (socket) => {
        timings.socket = Date.now();
        timings.phases.wait = timings.socket - timings.start;
        if (import_node_util.types.isProxy(socket)) {
          return;
        }
        const socketAlreadyConnected = socket.writable && !socket.connecting;
        if (socketAlreadyConnected) {
          timings.lookup = timings.socket;
          timings.connect = timings.socket;
          if (socket.__initial_connection_timings__) {
            timings.phases.dns = socket.__initial_connection_timings__.dnsPhase;
            timings.phases.tcp = socket.__initial_connection_timings__.tcpPhase;
            timings.phases.tls = socket.__initial_connection_timings__.tlsPhase;
            if (timings.phases.tls !== void 0) {
              timings.secureConnect = timings.socket;
            }
          } else {
            timings.phases.dns = 0;
            timings.phases.tcp = 0;
          }
          return;
        }
        const lookupListener = () => {
          timings.lookup = Date.now();
          timings.phases.dns = timings.lookup - timings.socket;
        };
        socket.prependOnceListener("lookup", lookupListener);
        defer_to_connect_default(socket, {
          connect() {
            timings.connect = Date.now();
            if (timings.lookup === void 0) {
              socket.removeListener("lookup", lookupListener);
              timings.lookup = timings.socket;
              timings.phases.dns = 0;
            }
            timings.phases.tcp = timings.connect - timings.lookup;
            if (timings.phases.tcp === 0 && timings.phases.dns && timings.phases.dns > 0) {
              timings.phases.dns = 0;
            }
            if (!socket.__initial_connection_timings__) {
              socket.__initial_connection_timings__ = {
                dnsPhase: timings.phases.dns,
                // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion -- TypeScript can't prove this is defined due to callback structure
                tcpPhase: timings.phases.tcp
              };
            }
          },
          secureConnect() {
            timings.secureConnect = Date.now();
            timings.phases.tls = timings.secureConnect - timings.connect;
            if (socket.__initial_connection_timings__) {
              socket.__initial_connection_timings__.tlsPhase = timings.phases.tls;
            }
          }
        });
      };
      if (request.socket) {
        onSocket(request.socket);
      } else {
        request.prependOnceListener("socket", onSocket);
      }
      const onUpload = () => {
        timings.upload = Date.now();
        const secureOrConnect = timings.secureConnect ?? timings.connect;
        if (secureOrConnect !== void 0) {
          timings.phases.request = timings.upload - secureOrConnect;
        }
      };
      if (request.writableFinished) {
        onUpload();
      } else {
        request.prependOnceListener("finish", onUpload);
      }
      request.prependOnceListener("response", (response) => {
        timings.response = Date.now();
        timings.phases.firstByte = timings.response - timings.upload;
        response.timings = timings;
        handleError(response);
        response.prependOnceListener("end", () => {
          request.off("abort", onAbort);
          response.off("aborted", onAbort);
          if (timings.phases.total !== void 0) {
            return;
          }
          timings.end = Date.now();
          timings.phases.download = timings.end - timings.response;
          timings.phases.total = timings.end - timings.start;
        });
        response.prependOnceListener("aborted", onAbort);
      });
      return timings;
    };
    timer_default = timer;
  }
});

// ../packages/curness-core/node_modules/got/dist/source/core/utils/is-form-data.js
function isFormData3(body) {
  return distribution_default.nodeStream(body) && distribution_default.function(body.getBoundary);
}
var init_is_form_data = __esm({
  "../packages/curness-core/node_modules/got/dist/source/core/utils/is-form-data.js"() {
    init_distribution();
  }
});

// ../packages/curness-core/node_modules/got/dist/source/core/utils/get-body-size.js
async function getBodySize(body, headers) {
  if (headers && "content-length" in headers) {
    return Number(headers["content-length"]);
  }
  if (!body) {
    return 0;
  }
  if (distribution_default.string(body)) {
    return new TextEncoder().encode(body).byteLength;
  }
  if (distribution_default.buffer(body)) {
    return body.length;
  }
  if (distribution_default.typedArray(body)) {
    return body.byteLength;
  }
  if (isFormData3(body)) {
    try {
      return await (0, import_node_util2.promisify)(body.getLength.bind(body))();
    } catch (error) {
      const typedError = error;
      throw new Error(`Cannot determine content-length for form-data with stream(s) of unknown length. This is a limitation of the \`form-data\` package. To fix this, either:
1. Use the \`knownLength\` option when appending streams:
   form.append('file', stream, {knownLength: 12345});
2. Switch to spec-compliant FormData (formdata-node package)
See: https://github.com/form-data/form-data#alternative-submission-methods
Original error: ${typedError.message}`);
    }
  }
  return void 0;
}
var import_node_util2;
var init_get_body_size = __esm({
  "../packages/curness-core/node_modules/got/dist/source/core/utils/get-body-size.js"() {
    import_node_util2 = require("node:util");
    init_distribution();
    init_is_form_data();
  }
});

// ../packages/curness-core/node_modules/got/dist/source/core/utils/proxy-events.js
function proxyEvents(from, to, events) {
  const eventFunctions = {};
  for (const event of events) {
    const eventFunction = (...arguments_) => {
      to.emit(event, ...arguments_);
    };
    eventFunctions[event] = eventFunction;
    from.on(event, eventFunction);
  }
  return () => {
    for (const [event, eventFunction] of Object.entries(eventFunctions)) {
      from.off(event, eventFunction);
    }
  };
}
var init_proxy_events = __esm({
  "../packages/curness-core/node_modules/got/dist/source/core/utils/proxy-events.js"() {
  }
});

// ../packages/curness-core/node_modules/got/dist/source/core/utils/unhandle.js
function unhandle() {
  const handlers = [];
  return {
    once(origin, event, function_) {
      origin.once(event, function_);
      handlers.push({ origin, event, fn: function_ });
    },
    unhandleAll() {
      for (const handler of handlers) {
        const { origin, event, fn } = handler;
        origin.removeListener(event, fn);
      }
      handlers.length = 0;
    }
  };
}
var init_unhandle = __esm({
  "../packages/curness-core/node_modules/got/dist/source/core/utils/unhandle.js"() {
  }
});

// ../packages/curness-core/node_modules/got/dist/source/core/timed-out.js
function timedOut(request, delays, options) {
  if (reentry in request) {
    return noop2;
  }
  request[reentry] = true;
  const cancelers = [];
  const { once, unhandleAll } = unhandle();
  const handled = /* @__PURE__ */ new Map();
  const addTimeout = (delay2, callback, event) => {
    var _a;
    const timeout = setTimeout(callback, delay2, delay2, event);
    (_a = timeout.unref) == null ? void 0 : _a.call(timeout);
    const cancel = () => {
      handled.set(event, true);
      clearTimeout(timeout);
    };
    cancelers.push(cancel);
    return cancel;
  };
  const { host, hostname } = options;
  const timeoutHandler = (delay2, event) => {
    setTimeout(() => {
      if (!handled.has(event)) {
        request.destroy(new TimeoutError2(delay2, event));
      }
    }, 0);
  };
  const cancelTimeouts = () => {
    for (const cancel of cancelers) {
      cancel();
    }
    unhandleAll();
  };
  request.once("error", (error) => {
    cancelTimeouts();
    if (request.listenerCount("error") === 0) {
      throw error;
    }
  });
  if (delays.request !== void 0) {
    const cancelTimeout = addTimeout(delays.request, timeoutHandler, "request");
    once(request, "response", (response) => {
      once(response, "end", cancelTimeout);
    });
  }
  if (delays.socket !== void 0) {
    const { socket } = delays;
    const socketTimeoutHandler = () => {
      timeoutHandler(socket, "socket");
    };
    request.setTimeout(socket, socketTimeoutHandler);
    cancelers.push(() => {
      request.removeListener("timeout", socketTimeoutHandler);
    });
  }
  const hasLookup = delays.lookup !== void 0;
  const hasConnect = delays.connect !== void 0;
  const hasSecureConnect = delays.secureConnect !== void 0;
  const hasSend = delays.send !== void 0;
  if (hasLookup || hasConnect || hasSecureConnect || hasSend) {
    once(request, "socket", (socket) => {
      const { socketPath } = request;
      if (socket.connecting) {
        const hasPath = Boolean(socketPath ?? import_node_net.default.isIP(hostname ?? host ?? "") !== 0);
        if (hasLookup && !hasPath && socket.address().address === void 0) {
          const cancelTimeout = addTimeout(delays.lookup, timeoutHandler, "lookup");
          once(socket, "lookup", cancelTimeout);
        }
        if (hasConnect) {
          const timeConnect = () => addTimeout(delays.connect, timeoutHandler, "connect");
          if (hasPath) {
            once(socket, "connect", timeConnect());
          } else {
            once(socket, "lookup", (error) => {
              if (error === null) {
                once(socket, "connect", timeConnect());
              }
            });
          }
        }
        if (hasSecureConnect && options.protocol === "https:") {
          once(socket, "connect", () => {
            const cancelTimeout = addTimeout(delays.secureConnect, timeoutHandler, "secureConnect");
            once(socket, "secureConnect", cancelTimeout);
          });
        }
      }
      if (hasSend) {
        const timeRequest = () => addTimeout(delays.send, timeoutHandler, "send");
        if (socket.connecting) {
          once(socket, "connect", () => {
            once(request, "upload-complete", timeRequest());
          });
        } else {
          once(request, "upload-complete", timeRequest());
        }
      }
    });
  }
  if (delays.response !== void 0) {
    once(request, "upload-complete", () => {
      const cancelTimeout = addTimeout(delays.response, timeoutHandler, "response");
      once(request, "response", cancelTimeout);
    });
  }
  if (delays.read !== void 0) {
    once(request, "response", (response) => {
      const cancelTimeout = addTimeout(delays.read, timeoutHandler, "read");
      once(response, "end", cancelTimeout);
    });
  }
  return cancelTimeouts;
}
var import_node_net, reentry, noop2, TimeoutError2;
var init_timed_out = __esm({
  "../packages/curness-core/node_modules/got/dist/source/core/timed-out.js"() {
    import_node_net = __toESM(require("node:net"), 1);
    init_unhandle();
    reentry = Symbol("reentry");
    noop2 = () => {
    };
    TimeoutError2 = class extends Error {
      event;
      name = "TimeoutError";
      code = "ETIMEDOUT";
      constructor(threshold, event) {
        super(`Timeout awaiting '${event}' for ${threshold}ms`);
        this.event = event;
      }
    };
  }
});

// ../packages/curness-core/node_modules/got/dist/source/core/utils/url-to-options.js
function urlToOptions(url) {
  url = url;
  const options = {
    protocol: url.protocol,
    hostname: distribution_default.string(url.hostname) && url.hostname.startsWith("[") ? url.hostname.slice(1, -1) : url.hostname,
    host: url.host,
    hash: url.hash,
    search: url.search,
    pathname: url.pathname,
    href: url.href,
    path: `${url.pathname || ""}${url.search || ""}`
  };
  if (distribution_default.string(url.port) && url.port.length > 0) {
    options.port = Number(url.port);
  }
  if (url.username || url.password) {
    options.auth = `${url.username || ""}:${url.password || ""}`;
  }
  return options;
}
var init_url_to_options = __esm({
  "../packages/curness-core/node_modules/got/dist/source/core/utils/url-to-options.js"() {
    init_distribution();
  }
});

// ../packages/curness-core/node_modules/got/dist/source/core/utils/weakable-map.js
var WeakableMap;
var init_weakable_map = __esm({
  "../packages/curness-core/node_modules/got/dist/source/core/utils/weakable-map.js"() {
    WeakableMap = class {
      weakMap = /* @__PURE__ */ new WeakMap();
      map = /* @__PURE__ */ new Map();
      set(key, value) {
        if (typeof key === "object") {
          this.weakMap.set(key, value);
        } else {
          this.map.set(key, value);
        }
      }
      get(key) {
        if (typeof key === "object") {
          return this.weakMap.get(key);
        }
        return this.map.get(key);
      }
      has(key) {
        if (typeof key === "object") {
          return this.weakMap.has(key);
        }
        return this.map.has(key);
      }
    };
  }
});

// ../packages/curness-core/node_modules/got/dist/source/core/calculate-retry-delay.js
var calculateRetryDelay, calculate_retry_delay_default;
var init_calculate_retry_delay = __esm({
  "../packages/curness-core/node_modules/got/dist/source/core/calculate-retry-delay.js"() {
    calculateRetryDelay = ({ attemptCount, retryOptions, error, retryAfter, computedValue }) => {
      if (error.name === "RetryError") {
        return 1;
      }
      if (attemptCount > retryOptions.limit) {
        return 0;
      }
      const hasMethod = retryOptions.methods.includes(error.options.method);
      const hasErrorCode = retryOptions.errorCodes.includes(error.code);
      const hasStatusCode = error.response && retryOptions.statusCodes.includes(error.response.statusCode);
      if (!hasMethod || !hasErrorCode && !hasStatusCode) {
        return 0;
      }
      if (error.response) {
        if (retryAfter) {
          if (retryAfter > computedValue) {
            return 0;
          }
          return retryAfter;
        }
        if (error.response.statusCode === 413) {
          return 0;
        }
      }
      const noise = Math.random() * retryOptions.noise;
      return Math.min(2 ** (attemptCount - 1) * 1e3, retryOptions.backoffLimit) + noise;
    };
    calculate_retry_delay_default = calculateRetryDelay;
  }
});

// ../packages/curness-core/node_modules/cacheable-lookup/source/index.js
var import_node_dns, import_node_util3, import_node_os, AsyncResolver, kCacheableLookupCreateConnection, kCacheableLookupInstance, kExpires, supportsALL, verifyAgent, map4to6, getIfaceInfo, isIterable2, ignoreNoResultErrors, ttl, all, all4, all6, CacheableLookup;
var init_source2 = __esm({
  "../packages/curness-core/node_modules/cacheable-lookup/source/index.js"() {
    import_node_dns = require("node:dns");
    import_node_util3 = require("node:util");
    import_node_os = __toESM(require("node:os"), 1);
    ({ Resolver: AsyncResolver } = import_node_dns.promises);
    kCacheableLookupCreateConnection = Symbol("cacheableLookupCreateConnection");
    kCacheableLookupInstance = Symbol("cacheableLookupInstance");
    kExpires = Symbol("expires");
    supportsALL = typeof import_node_dns.ALL === "number";
    verifyAgent = (agent) => {
      if (!(agent && typeof agent.createConnection === "function")) {
        throw new Error("Expected an Agent instance as the first argument");
      }
    };
    map4to6 = (entries2) => {
      for (const entry of entries2) {
        if (entry.family === 6) {
          continue;
        }
        entry.address = `::ffff:${entry.address}`;
        entry.family = 6;
      }
    };
    getIfaceInfo = () => {
      let has4 = false;
      let has6 = false;
      for (const device of Object.values(import_node_os.default.networkInterfaces())) {
        for (const iface of device) {
          if (iface.internal) {
            continue;
          }
          if (iface.family === "IPv6") {
            has6 = true;
          } else {
            has4 = true;
          }
          if (has4 && has6) {
            return { has4, has6 };
          }
        }
      }
      return { has4, has6 };
    };
    isIterable2 = (map) => {
      return Symbol.iterator in map;
    };
    ignoreNoResultErrors = (dnsPromise) => {
      return dnsPromise.catch((error) => {
        if (error.code === "ENODATA" || error.code === "ENOTFOUND" || error.code === "ENOENT") {
          return [];
        }
        throw error;
      });
    };
    ttl = { ttl: true };
    all = { all: true };
    all4 = { all: true, family: 4 };
    all6 = { all: true, family: 6 };
    CacheableLookup = class {
      constructor({
        cache = /* @__PURE__ */ new Map(),
        maxTtl = Infinity,
        fallbackDuration = 3600,
        errorTtl = 0.15,
        resolver = new AsyncResolver(),
        lookup = import_node_dns.lookup
      } = {}) {
        this.maxTtl = maxTtl;
        this.errorTtl = errorTtl;
        this._cache = cache;
        this._resolver = resolver;
        this._dnsLookup = lookup && (0, import_node_util3.promisify)(lookup);
        this.stats = {
          cache: 0,
          query: 0
        };
        if (this._resolver instanceof AsyncResolver) {
          this._resolve4 = this._resolver.resolve4.bind(this._resolver);
          this._resolve6 = this._resolver.resolve6.bind(this._resolver);
        } else {
          this._resolve4 = (0, import_node_util3.promisify)(this._resolver.resolve4.bind(this._resolver));
          this._resolve6 = (0, import_node_util3.promisify)(this._resolver.resolve6.bind(this._resolver));
        }
        this._iface = getIfaceInfo();
        this._pending = {};
        this._nextRemovalTime = false;
        this._hostnamesToFallback = /* @__PURE__ */ new Set();
        this.fallbackDuration = fallbackDuration;
        if (fallbackDuration > 0) {
          const interval = setInterval(() => {
            this._hostnamesToFallback.clear();
          }, fallbackDuration * 1e3);
          if (interval.unref) {
            interval.unref();
          }
          this._fallbackInterval = interval;
        }
        this.lookup = this.lookup.bind(this);
        this.lookupAsync = this.lookupAsync.bind(this);
      }
      set servers(servers) {
        this.clear();
        this._resolver.setServers(servers);
      }
      get servers() {
        return this._resolver.getServers();
      }
      lookup(hostname, options, callback) {
        if (typeof options === "function") {
          callback = options;
          options = {};
        } else if (typeof options === "number") {
          options = {
            family: options
          };
        }
        if (!callback) {
          throw new Error("Callback must be a function.");
        }
        this.lookupAsync(hostname, options).then((result) => {
          if (options.all) {
            callback(null, result);
          } else {
            callback(null, result.address, result.family, result.expires, result.ttl, result.source);
          }
        }, callback);
      }
      async lookupAsync(hostname, options = {}) {
        if (typeof options === "number") {
          options = {
            family: options
          };
        }
        let cached = await this.query(hostname);
        if (options.family === 6) {
          const filtered = cached.filter((entry) => entry.family === 6);
          if (options.hints & import_node_dns.V4MAPPED) {
            if (supportsALL && options.hints & import_node_dns.ALL || filtered.length === 0) {
              map4to6(cached);
            } else {
              cached = filtered;
            }
          } else {
            cached = filtered;
          }
        } else if (options.family === 4) {
          cached = cached.filter((entry) => entry.family === 4);
        }
        if (options.hints & import_node_dns.ADDRCONFIG) {
          const { _iface } = this;
          cached = cached.filter((entry) => entry.family === 6 ? _iface.has6 : _iface.has4);
        }
        if (cached.length === 0) {
          const error = new Error(`cacheableLookup ENOTFOUND ${hostname}`);
          error.code = "ENOTFOUND";
          error.hostname = hostname;
          throw error;
        }
        if (options.all) {
          return cached;
        }
        return cached[0];
      }
      async query(hostname) {
        let source = "cache";
        let cached = await this._cache.get(hostname);
        if (cached) {
          this.stats.cache++;
        }
        if (!cached) {
          const pending = this._pending[hostname];
          if (pending) {
            this.stats.cache++;
            cached = await pending;
          } else {
            source = "query";
            const newPromise = this.queryAndCache(hostname);
            this._pending[hostname] = newPromise;
            this.stats.query++;
            try {
              cached = await newPromise;
            } finally {
              delete this._pending[hostname];
            }
          }
        }
        cached = cached.map((entry) => {
          return { ...entry, source };
        });
        return cached;
      }
      async _resolve(hostname) {
        const [A, AAAA] = await Promise.all([
          ignoreNoResultErrors(this._resolve4(hostname, ttl)),
          ignoreNoResultErrors(this._resolve6(hostname, ttl))
        ]);
        let aTtl = 0;
        let aaaaTtl = 0;
        let cacheTtl = 0;
        const now = Date.now();
        for (const entry of A) {
          entry.family = 4;
          entry.expires = now + entry.ttl * 1e3;
          aTtl = Math.max(aTtl, entry.ttl);
        }
        for (const entry of AAAA) {
          entry.family = 6;
          entry.expires = now + entry.ttl * 1e3;
          aaaaTtl = Math.max(aaaaTtl, entry.ttl);
        }
        if (A.length > 0) {
          if (AAAA.length > 0) {
            cacheTtl = Math.min(aTtl, aaaaTtl);
          } else {
            cacheTtl = aTtl;
          }
        } else {
          cacheTtl = aaaaTtl;
        }
        return {
          entries: [
            ...A,
            ...AAAA
          ],
          cacheTtl
        };
      }
      async _lookup(hostname) {
        try {
          const [A, AAAA] = await Promise.all([
            // Passing {all: true} doesn't return all IPv4 and IPv6 entries.
            // See https://github.com/szmarczak/cacheable-lookup/issues/42
            ignoreNoResultErrors(this._dnsLookup(hostname, all4)),
            ignoreNoResultErrors(this._dnsLookup(hostname, all6))
          ]);
          return {
            entries: [
              ...A,
              ...AAAA
            ],
            cacheTtl: 0
          };
        } catch {
          return {
            entries: [],
            cacheTtl: 0
          };
        }
      }
      async _set(hostname, data, cacheTtl) {
        if (this.maxTtl > 0 && cacheTtl > 0) {
          cacheTtl = Math.min(cacheTtl, this.maxTtl) * 1e3;
          data[kExpires] = Date.now() + cacheTtl;
          try {
            await this._cache.set(hostname, data, cacheTtl);
          } catch (error) {
            this.lookupAsync = async () => {
              const cacheError = new Error("Cache Error. Please recreate the CacheableLookup instance.");
              cacheError.cause = error;
              throw cacheError;
            };
          }
          if (isIterable2(this._cache)) {
            this._tick(cacheTtl);
          }
        }
      }
      async queryAndCache(hostname) {
        if (this._hostnamesToFallback.has(hostname)) {
          return this._dnsLookup(hostname, all);
        }
        let query = await this._resolve(hostname);
        if (query.entries.length === 0 && this._dnsLookup) {
          query = await this._lookup(hostname);
          if (query.entries.length !== 0 && this.fallbackDuration > 0) {
            this._hostnamesToFallback.add(hostname);
          }
        }
        const cacheTtl = query.entries.length === 0 ? this.errorTtl : query.cacheTtl;
        await this._set(hostname, query.entries, cacheTtl);
        return query.entries;
      }
      _tick(ms) {
        const nextRemovalTime = this._nextRemovalTime;
        if (!nextRemovalTime || ms < nextRemovalTime) {
          clearTimeout(this._removalTimeout);
          this._nextRemovalTime = ms;
          this._removalTimeout = setTimeout(() => {
            this._nextRemovalTime = false;
            let nextExpiry = Infinity;
            const now = Date.now();
            for (const [hostname, entries2] of this._cache) {
              const expires = entries2[kExpires];
              if (now >= expires) {
                this._cache.delete(hostname);
              } else if (expires < nextExpiry) {
                nextExpiry = expires;
              }
            }
            if (nextExpiry !== Infinity) {
              this._tick(nextExpiry - now);
            }
          }, ms);
          if (this._removalTimeout.unref) {
            this._removalTimeout.unref();
          }
        }
      }
      install(agent) {
        verifyAgent(agent);
        if (kCacheableLookupCreateConnection in agent) {
          throw new Error("CacheableLookup has been already installed");
        }
        agent[kCacheableLookupCreateConnection] = agent.createConnection;
        agent[kCacheableLookupInstance] = this;
        agent.createConnection = (options, callback) => {
          if (!("lookup" in options)) {
            options.lookup = this.lookup;
          }
          return agent[kCacheableLookupCreateConnection](options, callback);
        };
      }
      uninstall(agent) {
        verifyAgent(agent);
        if (agent[kCacheableLookupCreateConnection]) {
          if (agent[kCacheableLookupInstance] !== this) {
            throw new Error("The agent is not owned by this CacheableLookup instance");
          }
          agent.createConnection = agent[kCacheableLookupCreateConnection];
          delete agent[kCacheableLookupCreateConnection];
          delete agent[kCacheableLookupInstance];
        }
      }
      updateInterfaceInfo() {
        const { _iface } = this;
        this._iface = getIfaceInfo();
        if (_iface.has4 && !this._iface.has4 || _iface.has6 && !this._iface.has6) {
          this._cache.clear();
        }
      }
      clear(hostname) {
        if (hostname) {
          this._cache.delete(hostname);
          return;
        }
        this._cache.clear();
      }
    };
  }
});

// ../packages/curness-core/node_modules/quick-lru/index.js
var require_quick_lru = __commonJS({
  "../packages/curness-core/node_modules/quick-lru/index.js"(exports2, module2) {
    "use strict";
    var QuickLRU = class {
      constructor(options = {}) {
        if (!(options.maxSize && options.maxSize > 0)) {
          throw new TypeError("`maxSize` must be a number greater than 0");
        }
        this.maxSize = options.maxSize;
        this.onEviction = options.onEviction;
        this.cache = /* @__PURE__ */ new Map();
        this.oldCache = /* @__PURE__ */ new Map();
        this._size = 0;
      }
      _set(key, value) {
        this.cache.set(key, value);
        this._size++;
        if (this._size >= this.maxSize) {
          this._size = 0;
          if (typeof this.onEviction === "function") {
            for (const [key2, value2] of this.oldCache.entries()) {
              this.onEviction(key2, value2);
            }
          }
          this.oldCache = this.cache;
          this.cache = /* @__PURE__ */ new Map();
        }
      }
      get(key) {
        if (this.cache.has(key)) {
          return this.cache.get(key);
        }
        if (this.oldCache.has(key)) {
          const value = this.oldCache.get(key);
          this.oldCache.delete(key);
          this._set(key, value);
          return value;
        }
      }
      set(key, value) {
        if (this.cache.has(key)) {
          this.cache.set(key, value);
        } else {
          this._set(key, value);
        }
        return this;
      }
      has(key) {
        return this.cache.has(key) || this.oldCache.has(key);
      }
      peek(key) {
        if (this.cache.has(key)) {
          return this.cache.get(key);
        }
        if (this.oldCache.has(key)) {
          return this.oldCache.get(key);
        }
      }
      delete(key) {
        const deleted = this.cache.delete(key);
        if (deleted) {
          this._size--;
        }
        return this.oldCache.delete(key) || deleted;
      }
      clear() {
        this.cache.clear();
        this.oldCache.clear();
        this._size = 0;
      }
      *keys() {
        for (const [key] of this) {
          yield key;
        }
      }
      *values() {
        for (const [, value] of this) {
          yield value;
        }
      }
      *[Symbol.iterator]() {
        for (const item of this.cache) {
          yield item;
        }
        for (const item of this.oldCache) {
          const [key] = item;
          if (!this.cache.has(key)) {
            yield item;
          }
        }
      }
      get size() {
        let oldCacheSize = 0;
        for (const key of this.oldCache.keys()) {
          if (!this.cache.has(key)) {
            oldCacheSize++;
          }
        }
        return Math.min(this._size + oldCacheSize, this.maxSize);
      }
    };
    module2.exports = QuickLRU;
  }
});

// ../packages/curness-core/node_modules/http2-wrapper/source/utils/delay-async-destroy.js
var require_delay_async_destroy = __commonJS({
  "../packages/curness-core/node_modules/http2-wrapper/source/utils/delay-async-destroy.js"(exports2, module2) {
    "use strict";
    module2.exports = (stream2) => {
      if (stream2.listenerCount("error") !== 0) {
        return stream2;
      }
      stream2.__destroy = stream2._destroy;
      stream2._destroy = (...args) => {
        const callback = args.pop();
        stream2.__destroy(...args, async (error) => {
          await Promise.resolve();
          callback(error);
        });
      };
      const onError = (error) => {
        Promise.resolve().then(() => {
          stream2.emit("error", error);
        });
      };
      stream2.once("error", onError);
      Promise.resolve().then(() => {
        stream2.off("error", onError);
      });
      return stream2;
    };
  }
});

// ../packages/curness-core/node_modules/http2-wrapper/source/agent.js
var require_agent = __commonJS({
  "../packages/curness-core/node_modules/http2-wrapper/source/agent.js"(exports2, module2) {
    "use strict";
    var { URL: URL3 } = require("url");
    var EventEmitter3 = require("events");
    var tls = require("tls");
    var http22 = require("http2");
    var QuickLRU = require_quick_lru();
    var delayAsyncDestroy = require_delay_async_destroy();
    var kCurrentStreamCount = Symbol("currentStreamCount");
    var kRequest = Symbol("request");
    var kOriginSet = Symbol("cachedOriginSet");
    var kGracefullyClosing = Symbol("gracefullyClosing");
    var kLength = Symbol("length");
    var nameKeys = [
      // Not an Agent option actually
      "createConnection",
      // `http2.connect()` options
      "maxDeflateDynamicTableSize",
      "maxSettings",
      "maxSessionMemory",
      "maxHeaderListPairs",
      "maxOutstandingPings",
      "maxReservedRemoteStreams",
      "maxSendHeaderBlockLength",
      "paddingStrategy",
      "peerMaxConcurrentStreams",
      "settings",
      // `tls.connect()` source options
      "family",
      "localAddress",
      "rejectUnauthorized",
      // `tls.connect()` secure context options
      "pskCallback",
      "minDHSize",
      // `tls.connect()` destination options
      // - `servername` is automatically validated, skip it
      // - `host` and `port` just describe the destination server,
      "path",
      "socket",
      // `tls.createSecureContext()` options
      "ca",
      "cert",
      "sigalgs",
      "ciphers",
      "clientCertEngine",
      "crl",
      "dhparam",
      "ecdhCurve",
      "honorCipherOrder",
      "key",
      "privateKeyEngine",
      "privateKeyIdentifier",
      "maxVersion",
      "minVersion",
      "pfx",
      "secureOptions",
      "secureProtocol",
      "sessionIdContext",
      "ticketKeys"
    ];
    var getSortedIndex = (array, value, compare) => {
      let low = 0;
      let high = array.length;
      while (low < high) {
        const mid = low + high >>> 1;
        if (compare(array[mid], value)) {
          low = mid + 1;
        } else {
          high = mid;
        }
      }
      return low;
    };
    var compareSessions = (a2, b) => a2.remoteSettings.maxConcurrentStreams > b.remoteSettings.maxConcurrentStreams;
    var closeCoveredSessions = (where, session) => {
      for (let index = 0; index < where.length; index++) {
        const coveredSession = where[index];
        if (
          // Unfortunately `.every()` returns true for an empty array
          coveredSession[kOriginSet].length > 0 && coveredSession[kOriginSet].length < session[kOriginSet].length && coveredSession[kOriginSet].every((origin) => session[kOriginSet].includes(origin)) && coveredSession[kCurrentStreamCount] + session[kCurrentStreamCount] <= session.remoteSettings.maxConcurrentStreams
        ) {
          gracefullyClose(coveredSession);
        }
      }
    };
    var closeSessionIfCovered = (where, coveredSession) => {
      for (let index = 0; index < where.length; index++) {
        const session = where[index];
        if (coveredSession[kOriginSet].length > 0 && coveredSession[kOriginSet].length < session[kOriginSet].length && coveredSession[kOriginSet].every((origin) => session[kOriginSet].includes(origin)) && coveredSession[kCurrentStreamCount] + session[kCurrentStreamCount] <= session.remoteSettings.maxConcurrentStreams) {
          gracefullyClose(coveredSession);
          return true;
        }
      }
      return false;
    };
    var gracefullyClose = (session) => {
      session[kGracefullyClosing] = true;
      if (session[kCurrentStreamCount] === 0) {
        session.close();
      }
    };
    var Agent = class _Agent extends EventEmitter3 {
      constructor({ timeout = 0, maxSessions = Number.POSITIVE_INFINITY, maxEmptySessions = 10, maxCachedTlsSessions = 100 } = {}) {
        super();
        this.sessions = {};
        this.queue = {};
        this.timeout = timeout;
        this.maxSessions = maxSessions;
        this.maxEmptySessions = maxEmptySessions;
        this._emptySessionCount = 0;
        this._sessionCount = 0;
        this.settings = {
          enablePush: false,
          initialWindowSize: 1024 * 1024 * 32
          // 32MB, see https://github.com/nodejs/node/issues/38426
        };
        this.tlsSessionCache = new QuickLRU({ maxSize: maxCachedTlsSessions });
      }
      get protocol() {
        return "https:";
      }
      normalizeOptions(options) {
        let normalized = "";
        for (let index = 0; index < nameKeys.length; index++) {
          const key = nameKeys[index];
          normalized += ":";
          if (options && options[key] !== void 0) {
            normalized += options[key];
          }
        }
        return normalized;
      }
      _processQueue() {
        if (this._sessionCount >= this.maxSessions) {
          this.closeEmptySessions(this.maxSessions - this._sessionCount + 1);
          return;
        }
        for (const normalizedOptions in this.queue) {
          for (const normalizedOrigin in this.queue[normalizedOptions]) {
            const item = this.queue[normalizedOptions][normalizedOrigin];
            if (!item.completed) {
              item.completed = true;
              item();
            }
          }
        }
      }
      _isBetterSession(thisStreamCount, thatStreamCount) {
        return thisStreamCount > thatStreamCount;
      }
      _accept(session, listeners, normalizedOrigin, options) {
        let index = 0;
        while (index < listeners.length && session[kCurrentStreamCount] < session.remoteSettings.maxConcurrentStreams) {
          listeners[index].resolve(session);
          index++;
        }
        listeners.splice(0, index);
        if (listeners.length > 0) {
          this.getSession(normalizedOrigin, options, listeners);
          listeners.length = 0;
        }
      }
      getSession(origin, options, listeners) {
        return new Promise((resolve, reject) => {
          if (Array.isArray(listeners) && listeners.length > 0) {
            listeners = [...listeners];
            resolve();
          } else {
            listeners = [{ resolve, reject }];
          }
          try {
            if (typeof origin === "string") {
              origin = new URL3(origin);
            } else if (!(origin instanceof URL3)) {
              throw new TypeError("The `origin` argument needs to be a string or an URL object");
            }
            if (options) {
              const { servername } = options;
              const { hostname } = origin;
              if (servername && hostname !== servername) {
                throw new Error(`Origin ${hostname} differs from servername ${servername}`);
              }
            }
          } catch (error) {
            for (let index = 0; index < listeners.length; index++) {
              listeners[index].reject(error);
            }
            return;
          }
          const normalizedOptions = this.normalizeOptions(options);
          const normalizedOrigin = origin.origin;
          if (normalizedOptions in this.sessions) {
            const sessions = this.sessions[normalizedOptions];
            let maxConcurrentStreams = -1;
            let currentStreamsCount = -1;
            let optimalSession;
            for (let index = 0; index < sessions.length; index++) {
              const session = sessions[index];
              const sessionMaxConcurrentStreams = session.remoteSettings.maxConcurrentStreams;
              if (sessionMaxConcurrentStreams < maxConcurrentStreams) {
                break;
              }
              if (!session[kOriginSet].includes(normalizedOrigin)) {
                continue;
              }
              const sessionCurrentStreamsCount = session[kCurrentStreamCount];
              if (sessionCurrentStreamsCount >= sessionMaxConcurrentStreams || session[kGracefullyClosing] || session.destroyed) {
                continue;
              }
              if (!optimalSession) {
                maxConcurrentStreams = sessionMaxConcurrentStreams;
              }
              if (this._isBetterSession(sessionCurrentStreamsCount, currentStreamsCount)) {
                optimalSession = session;
                currentStreamsCount = sessionCurrentStreamsCount;
              }
            }
            if (optimalSession) {
              this._accept(optimalSession, listeners, normalizedOrigin, options);
              return;
            }
          }
          if (normalizedOptions in this.queue) {
            if (normalizedOrigin in this.queue[normalizedOptions]) {
              this.queue[normalizedOptions][normalizedOrigin].listeners.push(...listeners);
              return;
            }
          } else {
            this.queue[normalizedOptions] = {
              [kLength]: 0
            };
          }
          const removeFromQueue = () => {
            if (normalizedOptions in this.queue && this.queue[normalizedOptions][normalizedOrigin] === entry) {
              delete this.queue[normalizedOptions][normalizedOrigin];
              if (--this.queue[normalizedOptions][kLength] === 0) {
                delete this.queue[normalizedOptions];
              }
            }
          };
          const entry = async () => {
            this._sessionCount++;
            const name = `${normalizedOrigin}:${normalizedOptions}`;
            let receivedSettings = false;
            let socket;
            try {
              const computedOptions = { ...options };
              if (computedOptions.settings === void 0) {
                computedOptions.settings = this.settings;
              }
              if (computedOptions.session === void 0) {
                computedOptions.session = this.tlsSessionCache.get(name);
              }
              const createConnection = computedOptions.createConnection || this.createConnection;
              socket = await createConnection.call(this, origin, computedOptions);
              computedOptions.createConnection = () => socket;
              const session = http22.connect(origin, computedOptions);
              session[kCurrentStreamCount] = 0;
              session[kGracefullyClosing] = false;
              const getOriginSet = () => {
                const { socket: socket2 } = session;
                let originSet;
                if (socket2.servername === false) {
                  socket2.servername = socket2.remoteAddress;
                  originSet = session.originSet;
                  socket2.servername = false;
                } else {
                  originSet = session.originSet;
                }
                return originSet;
              };
              const isFree = () => session[kCurrentStreamCount] < session.remoteSettings.maxConcurrentStreams;
              session.socket.once("session", (tlsSession) => {
                this.tlsSessionCache.set(name, tlsSession);
              });
              session.once("error", (error) => {
                for (let index = 0; index < listeners.length; index++) {
                  listeners[index].reject(error);
                }
                this.tlsSessionCache.delete(name);
              });
              session.setTimeout(this.timeout, () => {
                session.destroy();
              });
              session.once("close", () => {
                this._sessionCount--;
                if (receivedSettings) {
                  this._emptySessionCount--;
                  const where = this.sessions[normalizedOptions];
                  if (where.length === 1) {
                    delete this.sessions[normalizedOptions];
                  } else {
                    where.splice(where.indexOf(session), 1);
                  }
                } else {
                  removeFromQueue();
                  const error = new Error("Session closed without receiving a SETTINGS frame");
                  error.code = "HTTP2WRAPPER_NOSETTINGS";
                  for (let index = 0; index < listeners.length; index++) {
                    listeners[index].reject(error);
                  }
                }
                this._processQueue();
              });
              const processListeners = () => {
                const queue = this.queue[normalizedOptions];
                if (!queue) {
                  return;
                }
                const originSet = session[kOriginSet];
                for (let index = 0; index < originSet.length; index++) {
                  const origin2 = originSet[index];
                  if (origin2 in queue) {
                    const { listeners: listeners2, completed } = queue[origin2];
                    let index2 = 0;
                    while (index2 < listeners2.length && isFree()) {
                      listeners2[index2].resolve(session);
                      index2++;
                    }
                    queue[origin2].listeners.splice(0, index2);
                    if (queue[origin2].listeners.length === 0 && !completed) {
                      delete queue[origin2];
                      if (--queue[kLength] === 0) {
                        delete this.queue[normalizedOptions];
                        break;
                      }
                    }
                    if (!isFree()) {
                      break;
                    }
                  }
                }
              };
              session.on("origin", () => {
                session[kOriginSet] = getOriginSet() || [];
                session[kGracefullyClosing] = false;
                closeSessionIfCovered(this.sessions[normalizedOptions], session);
                if (session[kGracefullyClosing] || !isFree()) {
                  return;
                }
                processListeners();
                if (!isFree()) {
                  return;
                }
                closeCoveredSessions(this.sessions[normalizedOptions], session);
              });
              session.once("remoteSettings", () => {
                if (entry.destroyed) {
                  const error = new Error("Agent has been destroyed");
                  for (let index = 0; index < listeners.length; index++) {
                    listeners[index].reject(error);
                  }
                  session.destroy();
                  return;
                }
                if (session.setLocalWindowSize) {
                  session.setLocalWindowSize(1024 * 1024 * 4);
                }
                session[kOriginSet] = getOriginSet() || [];
                if (session.socket.encrypted) {
                  const mainOrigin = session[kOriginSet][0];
                  if (mainOrigin !== normalizedOrigin) {
                    const error = new Error(`Requested origin ${normalizedOrigin} does not match server ${mainOrigin}`);
                    for (let index = 0; index < listeners.length; index++) {
                      listeners[index].reject(error);
                    }
                    session.destroy();
                    return;
                  }
                }
                removeFromQueue();
                {
                  const where = this.sessions;
                  if (normalizedOptions in where) {
                    const sessions = where[normalizedOptions];
                    sessions.splice(getSortedIndex(sessions, session, compareSessions), 0, session);
                  } else {
                    where[normalizedOptions] = [session];
                  }
                }
                receivedSettings = true;
                this._emptySessionCount++;
                this.emit("session", session);
                this._accept(session, listeners, normalizedOrigin, options);
                if (session[kCurrentStreamCount] === 0 && this._emptySessionCount > this.maxEmptySessions) {
                  this.closeEmptySessions(this._emptySessionCount - this.maxEmptySessions);
                }
                session.on("remoteSettings", () => {
                  if (!isFree()) {
                    return;
                  }
                  processListeners();
                  if (!isFree()) {
                    return;
                  }
                  closeCoveredSessions(this.sessions[normalizedOptions], session);
                });
              });
              session[kRequest] = session.request;
              session.request = (headers, streamOptions) => {
                if (session[kGracefullyClosing]) {
                  throw new Error("The session is gracefully closing. No new streams are allowed.");
                }
                const stream2 = session[kRequest](headers, streamOptions);
                session.ref();
                if (session[kCurrentStreamCount]++ === 0) {
                  this._emptySessionCount--;
                }
                stream2.once("close", () => {
                  if (--session[kCurrentStreamCount] === 0) {
                    this._emptySessionCount++;
                    session.unref();
                    if (this._emptySessionCount > this.maxEmptySessions || session[kGracefullyClosing]) {
                      session.close();
                      return;
                    }
                  }
                  if (session.destroyed || session.closed) {
                    return;
                  }
                  if (isFree() && !closeSessionIfCovered(this.sessions[normalizedOptions], session)) {
                    closeCoveredSessions(this.sessions[normalizedOptions], session);
                    processListeners();
                    if (session[kCurrentStreamCount] === 0) {
                      this._processQueue();
                    }
                  }
                });
                return stream2;
              };
            } catch (error) {
              removeFromQueue();
              this._sessionCount--;
              for (let index = 0; index < listeners.length; index++) {
                listeners[index].reject(error);
              }
            }
          };
          entry.listeners = listeners;
          entry.completed = false;
          entry.destroyed = false;
          this.queue[normalizedOptions][normalizedOrigin] = entry;
          this.queue[normalizedOptions][kLength]++;
          this._processQueue();
        });
      }
      request(origin, options, headers, streamOptions) {
        return new Promise((resolve, reject) => {
          this.getSession(origin, options, [{
            reject,
            resolve: (session) => {
              try {
                const stream2 = session.request(headers, streamOptions);
                delayAsyncDestroy(stream2);
                resolve(stream2);
              } catch (error) {
                reject(error);
              }
            }
          }]);
        });
      }
      async createConnection(origin, options) {
        return _Agent.connect(origin, options);
      }
      static connect(origin, options) {
        options.ALPNProtocols = ["h2"];
        const port = origin.port || 443;
        const host = origin.hostname;
        if (typeof options.servername === "undefined") {
          options.servername = host;
        }
        const socket = tls.connect(port, host, options);
        if (options.socket) {
          socket._peername = {
            family: void 0,
            address: void 0,
            port
          };
        }
        return socket;
      }
      closeEmptySessions(maxCount = Number.POSITIVE_INFINITY) {
        let closedCount = 0;
        const { sessions } = this;
        for (const key in sessions) {
          const thisSessions = sessions[key];
          for (let index = 0; index < thisSessions.length; index++) {
            const session = thisSessions[index];
            if (session[kCurrentStreamCount] === 0) {
              closedCount++;
              session.close();
              if (closedCount >= maxCount) {
                return closedCount;
              }
            }
          }
        }
        return closedCount;
      }
      destroy(reason) {
        const { sessions, queue } = this;
        for (const key in sessions) {
          const thisSessions = sessions[key];
          for (let index = 0; index < thisSessions.length; index++) {
            thisSessions[index].destroy(reason);
          }
        }
        for (const normalizedOptions in queue) {
          const entries2 = queue[normalizedOptions];
          for (const normalizedOrigin in entries2) {
            entries2[normalizedOrigin].destroyed = true;
          }
        }
        this.queue = {};
        this.tlsSessionCache.clear();
      }
      get emptySessionCount() {
        return this._emptySessionCount;
      }
      get pendingSessionCount() {
        return this._sessionCount - this._emptySessionCount;
      }
      get sessionCount() {
        return this._sessionCount;
      }
    };
    Agent.kCurrentStreamCount = kCurrentStreamCount;
    Agent.kGracefullyClosing = kGracefullyClosing;
    module2.exports = {
      Agent,
      globalAgent: new Agent()
    };
  }
});

// ../packages/curness-core/node_modules/http2-wrapper/source/incoming-message.js
var require_incoming_message = __commonJS({
  "../packages/curness-core/node_modules/http2-wrapper/source/incoming-message.js"(exports2, module2) {
    "use strict";
    var { Readable } = require("stream");
    var IncomingMessage = class extends Readable {
      constructor(socket, highWaterMark) {
        super({
          emitClose: false,
          autoDestroy: true,
          highWaterMark
        });
        this.statusCode = null;
        this.statusMessage = "";
        this.httpVersion = "2.0";
        this.httpVersionMajor = 2;
        this.httpVersionMinor = 0;
        this.headers = {};
        this.trailers = {};
        this.req = null;
        this.aborted = false;
        this.complete = false;
        this.upgrade = null;
        this.rawHeaders = [];
        this.rawTrailers = [];
        this.socket = socket;
        this._dumped = false;
      }
      get connection() {
        return this.socket;
      }
      set connection(value) {
        this.socket = value;
      }
      _destroy(error, callback) {
        if (!this.readableEnded) {
          this.aborted = true;
        }
        callback();
        this.req._request.destroy(error);
      }
      setTimeout(ms, callback) {
        this.req.setTimeout(ms, callback);
        return this;
      }
      _dump() {
        if (!this._dumped) {
          this._dumped = true;
          this.removeAllListeners("data");
          this.resume();
        }
      }
      _read() {
        if (this.req) {
          this.req._request.resume();
        }
      }
    };
    module2.exports = IncomingMessage;
  }
});

// ../packages/curness-core/node_modules/http2-wrapper/source/utils/proxy-events.js
var require_proxy_events = __commonJS({
  "../packages/curness-core/node_modules/http2-wrapper/source/utils/proxy-events.js"(exports2, module2) {
    "use strict";
    module2.exports = (from, to, events) => {
      for (const event of events) {
        from.on(event, (...args) => to.emit(event, ...args));
      }
    };
  }
});

// ../packages/curness-core/node_modules/http2-wrapper/source/utils/errors.js
var require_errors = __commonJS({
  "../packages/curness-core/node_modules/http2-wrapper/source/utils/errors.js"(exports2, module2) {
    "use strict";
    var makeError = (Base, key, getMessage) => {
      module2.exports[key] = class NodeError extends Base {
        constructor(...args) {
          super(typeof getMessage === "string" ? getMessage : getMessage(args));
          this.name = `${super.name} [${key}]`;
          this.code = key;
        }
      };
    };
    makeError(TypeError, "ERR_INVALID_ARG_TYPE", (args) => {
      const type = args[0].includes(".") ? "property" : "argument";
      let valid = args[1];
      const isManyTypes = Array.isArray(valid);
      if (isManyTypes) {
        valid = `${valid.slice(0, -1).join(", ")} or ${valid.slice(-1)}`;
      }
      return `The "${args[0]}" ${type} must be ${isManyTypes ? "one of" : "of"} type ${valid}. Received ${typeof args[2]}`;
    });
    makeError(
      TypeError,
      "ERR_INVALID_PROTOCOL",
      (args) => `Protocol "${args[0]}" not supported. Expected "${args[1]}"`
    );
    makeError(
      Error,
      "ERR_HTTP_HEADERS_SENT",
      (args) => `Cannot ${args[0]} headers after they are sent to the client`
    );
    makeError(
      TypeError,
      "ERR_INVALID_HTTP_TOKEN",
      (args) => `${args[0]} must be a valid HTTP token [${args[1]}]`
    );
    makeError(
      TypeError,
      "ERR_HTTP_INVALID_HEADER_VALUE",
      (args) => `Invalid value "${args[0]} for header "${args[1]}"`
    );
    makeError(
      TypeError,
      "ERR_INVALID_CHAR",
      (args) => `Invalid character in ${args[0]} [${args[1]}]`
    );
    makeError(
      Error,
      "ERR_HTTP2_NO_SOCKET_MANIPULATION",
      "HTTP/2 sockets should not be directly manipulated (e.g. read and written)"
    );
  }
});

// ../packages/curness-core/node_modules/http2-wrapper/source/utils/is-request-pseudo-header.js
var require_is_request_pseudo_header = __commonJS({
  "../packages/curness-core/node_modules/http2-wrapper/source/utils/is-request-pseudo-header.js"(exports2, module2) {
    "use strict";
    module2.exports = (header) => {
      switch (header) {
        case ":method":
        case ":scheme":
        case ":authority":
        case ":path":
          return true;
        default:
          return false;
      }
    };
  }
});

// ../packages/curness-core/node_modules/http2-wrapper/source/utils/validate-header-name.js
var require_validate_header_name = __commonJS({
  "../packages/curness-core/node_modules/http2-wrapper/source/utils/validate-header-name.js"(exports2, module2) {
    "use strict";
    var { ERR_INVALID_HTTP_TOKEN } = require_errors();
    var isRequestPseudoHeader = require_is_request_pseudo_header();
    var isValidHttpToken = /^[\^`\-\w!#$%&*+.|~]+$/;
    module2.exports = (name) => {
      if (typeof name !== "string" || !isValidHttpToken.test(name) && !isRequestPseudoHeader(name)) {
        throw new ERR_INVALID_HTTP_TOKEN("Header name", name);
      }
    };
  }
});

// ../packages/curness-core/node_modules/http2-wrapper/source/utils/validate-header-value.js
var require_validate_header_value = __commonJS({
  "../packages/curness-core/node_modules/http2-wrapper/source/utils/validate-header-value.js"(exports2, module2) {
    "use strict";
    var {
      ERR_HTTP_INVALID_HEADER_VALUE,
      ERR_INVALID_CHAR
    } = require_errors();
    var isInvalidHeaderValue = /[^\t\u0020-\u007E\u0080-\u00FF]/;
    module2.exports = (name, value) => {
      if (typeof value === "undefined") {
        throw new ERR_HTTP_INVALID_HEADER_VALUE(value, name);
      }
      if (isInvalidHeaderValue.test(value)) {
        throw new ERR_INVALID_CHAR("header content", name);
      }
    };
  }
});

// ../packages/curness-core/node_modules/http2-wrapper/source/utils/proxy-socket-handler.js
var require_proxy_socket_handler = __commonJS({
  "../packages/curness-core/node_modules/http2-wrapper/source/utils/proxy-socket-handler.js"(exports2, module2) {
    "use strict";
    var { ERR_HTTP2_NO_SOCKET_MANIPULATION } = require_errors();
    var proxySocketHandler = {
      has(stream2, property) {
        const reference = stream2.session === void 0 ? stream2 : stream2.session.socket;
        return property in stream2 || property in reference;
      },
      get(stream2, property) {
        switch (property) {
          case "on":
          case "once":
          case "end":
          case "emit":
          case "destroy":
            return stream2[property].bind(stream2);
          case "writable":
          case "destroyed":
            return stream2[property];
          case "readable":
            if (stream2.destroyed) {
              return false;
            }
            return stream2.readable;
          case "setTimeout": {
            const { session } = stream2;
            if (session !== void 0) {
              return session.setTimeout.bind(session);
            }
            return stream2.setTimeout.bind(stream2);
          }
          case "write":
          case "read":
          case "pause":
          case "resume":
            throw new ERR_HTTP2_NO_SOCKET_MANIPULATION();
          default: {
            const reference = stream2.session === void 0 ? stream2 : stream2.session.socket;
            const value = reference[property];
            return typeof value === "function" ? value.bind(reference) : value;
          }
        }
      },
      getPrototypeOf(stream2) {
        if (stream2.session !== void 0) {
          return Reflect.getPrototypeOf(stream2.session.socket);
        }
        return Reflect.getPrototypeOf(stream2);
      },
      set(stream2, property, value) {
        switch (property) {
          case "writable":
          case "readable":
          case "destroyed":
          case "on":
          case "once":
          case "end":
          case "emit":
          case "destroy":
            stream2[property] = value;
            return true;
          case "setTimeout": {
            const { session } = stream2;
            if (session === void 0) {
              stream2.setTimeout = value;
            } else {
              session.setTimeout = value;
            }
            return true;
          }
          case "write":
          case "read":
          case "pause":
          case "resume":
            throw new ERR_HTTP2_NO_SOCKET_MANIPULATION();
          default: {
            const reference = stream2.session === void 0 ? stream2 : stream2.session.socket;
            reference[property] = value;
            return true;
          }
        }
      }
    };
    module2.exports = proxySocketHandler;
  }
});

// ../packages/curness-core/node_modules/http2-wrapper/source/client-request.js
var require_client_request = __commonJS({
  "../packages/curness-core/node_modules/http2-wrapper/source/client-request.js"(exports2, module2) {
    "use strict";
    var { URL: URL3, urlToHttpOptions } = require("url");
    var http22 = require("http2");
    var { Writable } = require("stream");
    var { Agent, globalAgent } = require_agent();
    var IncomingMessage = require_incoming_message();
    var proxyEvents2 = require_proxy_events();
    var {
      ERR_INVALID_ARG_TYPE,
      ERR_INVALID_PROTOCOL,
      ERR_HTTP_HEADERS_SENT
    } = require_errors();
    var validateHeaderName = require_validate_header_name();
    var validateHeaderValue = require_validate_header_value();
    var proxySocketHandler = require_proxy_socket_handler();
    var {
      HTTP2_HEADER_STATUS,
      HTTP2_HEADER_METHOD,
      HTTP2_HEADER_PATH,
      HTTP2_HEADER_AUTHORITY,
      HTTP2_METHOD_CONNECT
    } = http22.constants;
    var kHeaders = Symbol("headers");
    var kOrigin = Symbol("origin");
    var kSession = Symbol("session");
    var kOptions = Symbol("options");
    var kFlushedHeaders = Symbol("flushedHeaders");
    var kJobs = Symbol("jobs");
    var kPendingAgentPromise = Symbol("pendingAgentPromise");
    var ClientRequest = class extends Writable {
      constructor(input, options, callback) {
        super({
          autoDestroy: false,
          emitClose: false
        });
        if (typeof input === "string") {
          input = urlToHttpOptions(new URL3(input));
        } else if (input instanceof URL3) {
          input = urlToHttpOptions(input);
        } else {
          input = { ...input };
        }
        if (typeof options === "function" || options === void 0) {
          callback = options;
          options = input;
        } else {
          options = Object.assign(input, options);
        }
        if (options.h2session) {
          this[kSession] = options.h2session;
          if (this[kSession].destroyed) {
            throw new Error("The session has been closed already");
          }
          this.protocol = this[kSession].socket.encrypted ? "https:" : "http:";
        } else if (options.agent === false) {
          this.agent = new Agent({ maxEmptySessions: 0 });
        } else if (typeof options.agent === "undefined" || options.agent === null) {
          this.agent = globalAgent;
        } else if (typeof options.agent.request === "function") {
          this.agent = options.agent;
        } else {
          throw new ERR_INVALID_ARG_TYPE("options.agent", ["http2wrapper.Agent-like Object", "undefined", "false"], options.agent);
        }
        if (this.agent) {
          this.protocol = this.agent.protocol;
        }
        if (options.protocol && options.protocol !== this.protocol) {
          throw new ERR_INVALID_PROTOCOL(options.protocol, this.protocol);
        }
        if (!options.port) {
          options.port = options.defaultPort || this.agent && this.agent.defaultPort || 443;
        }
        options.host = options.hostname || options.host || "localhost";
        delete options.hostname;
        const { timeout } = options;
        options.timeout = void 0;
        this[kHeaders] = /* @__PURE__ */ Object.create(null);
        this[kJobs] = [];
        this[kPendingAgentPromise] = void 0;
        this.socket = null;
        this.connection = null;
        this.method = options.method || "GET";
        if (!(this.method === "CONNECT" && (options.path === "/" || options.path === void 0))) {
          this.path = options.path;
        }
        this.res = null;
        this.aborted = false;
        this.reusedSocket = false;
        const { headers } = options;
        if (headers) {
          for (const header in headers) {
            this.setHeader(header, headers[header]);
          }
        }
        if (options.auth && !("authorization" in this[kHeaders])) {
          this[kHeaders].authorization = "Basic " + Buffer.from(options.auth).toString("base64");
        }
        options.session = options.tlsSession;
        options.path = options.socketPath;
        this[kOptions] = options;
        this[kOrigin] = new URL3(`${this.protocol}//${options.servername || options.host}:${options.port}`);
        const reuseSocket = options._reuseSocket;
        if (reuseSocket) {
          options.createConnection = (...args) => {
            if (reuseSocket.destroyed) {
              return this.agent.createConnection(...args);
            }
            return reuseSocket;
          };
          this.agent.getSession(this[kOrigin], this[kOptions]).catch(() => {
          });
        }
        if (timeout) {
          this.setTimeout(timeout);
        }
        if (callback) {
          this.once("response", callback);
        }
        this[kFlushedHeaders] = false;
      }
      get method() {
        return this[kHeaders][HTTP2_HEADER_METHOD];
      }
      set method(value) {
        if (value) {
          this[kHeaders][HTTP2_HEADER_METHOD] = value.toUpperCase();
        }
      }
      get path() {
        const header = this.method === "CONNECT" ? HTTP2_HEADER_AUTHORITY : HTTP2_HEADER_PATH;
        return this[kHeaders][header];
      }
      set path(value) {
        if (value) {
          const header = this.method === "CONNECT" ? HTTP2_HEADER_AUTHORITY : HTTP2_HEADER_PATH;
          this[kHeaders][header] = value;
        }
      }
      get host() {
        return this[kOrigin].hostname;
      }
      set host(_value) {
      }
      get _mustNotHaveABody() {
        return this.method === "GET" || this.method === "HEAD" || this.method === "DELETE";
      }
      _write(chunk2, encoding, callback) {
        if (this._mustNotHaveABody) {
          callback(new Error("The GET, HEAD and DELETE methods must NOT have a body"));
          return;
        }
        this.flushHeaders();
        const callWrite = () => this._request.write(chunk2, encoding, callback);
        if (this._request) {
          callWrite();
        } else {
          this[kJobs].push(callWrite);
        }
      }
      _final(callback) {
        this.flushHeaders();
        const callEnd = () => {
          if (this._mustNotHaveABody || this.method === "CONNECT") {
            callback();
            return;
          }
          this._request.end(callback);
        };
        if (this._request) {
          callEnd();
        } else {
          this[kJobs].push(callEnd);
        }
      }
      abort() {
        if (this.res && this.res.complete) {
          return;
        }
        if (!this.aborted) {
          process.nextTick(() => this.emit("abort"));
        }
        this.aborted = true;
        this.destroy();
      }
      async _destroy(error, callback) {
        if (this.res) {
          this.res._dump();
        }
        if (this._request) {
          this._request.destroy();
        } else {
          process.nextTick(() => {
            this.emit("close");
          });
        }
        try {
          await this[kPendingAgentPromise];
        } catch (internalError) {
          if (this.aborted) {
            error = internalError;
          }
        }
        callback(error);
      }
      async flushHeaders() {
        if (this[kFlushedHeaders] || this.destroyed) {
          return;
        }
        this[kFlushedHeaders] = true;
        const isConnectMethod = this.method === HTTP2_METHOD_CONNECT;
        const onStream = (stream2) => {
          this._request = stream2;
          if (this.destroyed) {
            stream2.destroy();
            return;
          }
          if (!isConnectMethod) {
            proxyEvents2(stream2, this, ["timeout", "continue"]);
          }
          stream2.once("error", (error) => {
            this.destroy(error);
          });
          stream2.once("aborted", () => {
            const { res } = this;
            if (res) {
              res.aborted = true;
              res.emit("aborted");
              res.destroy();
            } else {
              this.destroy(new Error("The server aborted the HTTP/2 stream"));
            }
          });
          const onResponse = (headers, flags, rawHeaders) => {
            const response = new IncomingMessage(this.socket, stream2.readableHighWaterMark);
            this.res = response;
            response.url = `${this[kOrigin].origin}${this.path}`;
            response.req = this;
            response.statusCode = headers[HTTP2_HEADER_STATUS];
            response.headers = headers;
            response.rawHeaders = rawHeaders;
            response.once("end", () => {
              response.complete = true;
              response.socket = null;
              response.connection = null;
            });
            if (isConnectMethod) {
              response.upgrade = true;
              if (this.emit("connect", response, stream2, Buffer.alloc(0))) {
                this.emit("close");
              } else {
                stream2.destroy();
              }
            } else {
              stream2.on("data", (chunk2) => {
                if (!response._dumped && !response.push(chunk2)) {
                  stream2.pause();
                }
              });
              stream2.once("end", () => {
                if (!this.aborted) {
                  response.push(null);
                }
              });
              if (!this.emit("response", response)) {
                response._dump();
              }
            }
          };
          stream2.once("response", onResponse);
          stream2.once("headers", (headers) => this.emit("information", { statusCode: headers[HTTP2_HEADER_STATUS] }));
          stream2.once("trailers", (trailers, flags, rawTrailers) => {
            const { res } = this;
            if (res === null) {
              onResponse(trailers, flags, rawTrailers);
              return;
            }
            res.trailers = trailers;
            res.rawTrailers = rawTrailers;
          });
          stream2.once("close", () => {
            const { aborted, res } = this;
            if (res) {
              if (aborted) {
                res.aborted = true;
                res.emit("aborted");
                res.destroy();
              }
              const finish = () => {
                res.emit("close");
                this.destroy();
                this.emit("close");
              };
              if (res.readable) {
                res.once("end", finish);
              } else {
                finish();
              }
              return;
            }
            if (!this.destroyed) {
              this.destroy(new Error("The HTTP/2 stream has been early terminated"));
              this.emit("close");
              return;
            }
            this.destroy();
            this.emit("close");
          });
          this.socket = new Proxy(stream2, proxySocketHandler);
          for (const job of this[kJobs]) {
            job();
          }
          this[kJobs].length = 0;
          this.emit("socket", this.socket);
        };
        if (!(HTTP2_HEADER_AUTHORITY in this[kHeaders]) && !isConnectMethod) {
          this[kHeaders][HTTP2_HEADER_AUTHORITY] = this[kOrigin].host;
        }
        if (this[kSession]) {
          try {
            onStream(this[kSession].request(this[kHeaders]));
          } catch (error) {
            this.destroy(error);
          }
        } else {
          this.reusedSocket = true;
          try {
            const promise = this.agent.request(this[kOrigin], this[kOptions], this[kHeaders]);
            this[kPendingAgentPromise] = promise;
            onStream(await promise);
            this[kPendingAgentPromise] = false;
          } catch (error) {
            this[kPendingAgentPromise] = false;
            this.destroy(error);
          }
        }
      }
      get connection() {
        return this.socket;
      }
      set connection(value) {
        this.socket = value;
      }
      getHeaderNames() {
        return Object.keys(this[kHeaders]);
      }
      hasHeader(name) {
        if (typeof name !== "string") {
          throw new ERR_INVALID_ARG_TYPE("name", "string", name);
        }
        return Boolean(this[kHeaders][name.toLowerCase()]);
      }
      getHeader(name) {
        if (typeof name !== "string") {
          throw new ERR_INVALID_ARG_TYPE("name", "string", name);
        }
        return this[kHeaders][name.toLowerCase()];
      }
      get headersSent() {
        return this[kFlushedHeaders];
      }
      removeHeader(name) {
        if (typeof name !== "string") {
          throw new ERR_INVALID_ARG_TYPE("name", "string", name);
        }
        if (this.headersSent) {
          throw new ERR_HTTP_HEADERS_SENT("remove");
        }
        delete this[kHeaders][name.toLowerCase()];
      }
      setHeader(name, value) {
        if (this.headersSent) {
          throw new ERR_HTTP_HEADERS_SENT("set");
        }
        validateHeaderName(name);
        validateHeaderValue(name, value);
        const lowercased = name.toLowerCase();
        if (lowercased === "connection") {
          if (value.toLowerCase() === "keep-alive") {
            return;
          }
          throw new Error(`Invalid 'connection' header: ${value}`);
        }
        if (lowercased === "host" && this.method === "CONNECT") {
          this[kHeaders][HTTP2_HEADER_AUTHORITY] = value;
        } else {
          this[kHeaders][lowercased] = value;
        }
      }
      setNoDelay() {
      }
      setSocketKeepAlive() {
      }
      setTimeout(ms, callback) {
        const applyTimeout = () => this._request.setTimeout(ms, callback);
        if (this._request) {
          applyTimeout();
        } else {
          this[kJobs].push(applyTimeout);
        }
        return this;
      }
      get maxHeadersCount() {
        if (!this.destroyed && this._request) {
          return this._request.session.localSettings.maxHeaderListSize;
        }
        return void 0;
      }
      set maxHeadersCount(_value) {
      }
    };
    module2.exports = ClientRequest;
  }
});

// ../packages/curness-core/node_modules/resolve-alpn/index.js
var require_resolve_alpn = __commonJS({
  "../packages/curness-core/node_modules/resolve-alpn/index.js"(exports2, module2) {
    "use strict";
    var tls = require("tls");
    module2.exports = (options = {}, connect = tls.connect) => new Promise((resolve, reject) => {
      let timeout = false;
      let socket;
      const callback = async () => {
        await socketPromise;
        socket.off("timeout", onTimeout);
        socket.off("error", reject);
        if (options.resolveSocket) {
          resolve({ alpnProtocol: socket.alpnProtocol, socket, timeout });
          if (timeout) {
            await Promise.resolve();
            socket.emit("timeout");
          }
        } else {
          socket.destroy();
          resolve({ alpnProtocol: socket.alpnProtocol, timeout });
        }
      };
      const onTimeout = async () => {
        timeout = true;
        callback();
      };
      const socketPromise = (async () => {
        try {
          socket = await connect(options, callback);
          socket.on("error", reject);
          socket.once("timeout", onTimeout);
        } catch (error) {
          reject(error);
        }
      })();
    });
  }
});

// ../packages/curness-core/node_modules/http2-wrapper/source/utils/calculate-server-name.js
var require_calculate_server_name = __commonJS({
  "../packages/curness-core/node_modules/http2-wrapper/source/utils/calculate-server-name.js"(exports2, module2) {
    "use strict";
    var { isIP } = require("net");
    var assert2 = require("assert");
    var getHost = (host) => {
      if (host[0] === "[") {
        const idx2 = host.indexOf("]");
        assert2(idx2 !== -1);
        return host.slice(1, idx2);
      }
      const idx = host.indexOf(":");
      if (idx === -1) {
        return host;
      }
      return host.slice(0, idx);
    };
    module2.exports = (host) => {
      const servername = getHost(host);
      if (isIP(servername)) {
        return "";
      }
      return servername;
    };
  }
});

// ../packages/curness-core/node_modules/http2-wrapper/source/auto.js
var require_auto = __commonJS({
  "../packages/curness-core/node_modules/http2-wrapper/source/auto.js"(exports2, module2) {
    "use strict";
    var { URL: URL3, urlToHttpOptions } = require("url");
    var http3 = require("http");
    var https2 = require("https");
    var resolveALPN = require_resolve_alpn();
    var QuickLRU = require_quick_lru();
    var { Agent, globalAgent } = require_agent();
    var Http2ClientRequest = require_client_request();
    var calculateServerName = require_calculate_server_name();
    var delayAsyncDestroy = require_delay_async_destroy();
    var cache = new QuickLRU({ maxSize: 100 });
    var queue = /* @__PURE__ */ new Map();
    var installSocket = (agent, socket, options) => {
      socket._httpMessage = { shouldKeepAlive: true };
      const onFree = () => {
        agent.emit("free", socket, options);
      };
      socket.on("free", onFree);
      const onClose = () => {
        agent.removeSocket(socket, options);
      };
      socket.on("close", onClose);
      const onTimeout = () => {
        const { freeSockets } = agent;
        for (const sockets of Object.values(freeSockets)) {
          if (sockets.includes(socket)) {
            socket.destroy();
            return;
          }
        }
      };
      socket.on("timeout", onTimeout);
      const onRemove = () => {
        agent.removeSocket(socket, options);
        socket.off("close", onClose);
        socket.off("free", onFree);
        socket.off("timeout", onTimeout);
        socket.off("agentRemove", onRemove);
      };
      socket.on("agentRemove", onRemove);
      agent.emit("free", socket, options);
    };
    var createResolveProtocol = (cache2, queue2 = /* @__PURE__ */ new Map(), connect = void 0) => {
      return async (options) => {
        const name = `${options.host}:${options.port}:${options.ALPNProtocols.sort()}`;
        if (!cache2.has(name)) {
          if (queue2.has(name)) {
            const result = await queue2.get(name);
            return { alpnProtocol: result.alpnProtocol };
          }
          const { path: path6 } = options;
          options.path = options.socketPath;
          const resultPromise = resolveALPN(options, connect);
          queue2.set(name, resultPromise);
          try {
            const result = await resultPromise;
            cache2.set(name, result.alpnProtocol);
            queue2.delete(name);
            options.path = path6;
            return result;
          } catch (error) {
            queue2.delete(name);
            options.path = path6;
            throw error;
          }
        }
        return { alpnProtocol: cache2.get(name) };
      };
    };
    var defaultResolveProtocol = createResolveProtocol(cache, queue);
    module2.exports = async (input, options, callback) => {
      if (typeof input === "string") {
        input = urlToHttpOptions(new URL3(input));
      } else if (input instanceof URL3) {
        input = urlToHttpOptions(input);
      } else {
        input = { ...input };
      }
      if (typeof options === "function" || options === void 0) {
        callback = options;
        options = input;
      } else {
        options = Object.assign(input, options);
      }
      options.ALPNProtocols = options.ALPNProtocols || ["h2", "http/1.1"];
      if (!Array.isArray(options.ALPNProtocols) || options.ALPNProtocols.length === 0) {
        throw new Error("The `ALPNProtocols` option must be an Array with at least one entry");
      }
      options.protocol = options.protocol || "https:";
      const isHttps = options.protocol === "https:";
      options.host = options.hostname || options.host || "localhost";
      options.session = options.tlsSession;
      options.servername = options.servername || calculateServerName(options.headers && options.headers.host || options.host);
      options.port = options.port || (isHttps ? 443 : 80);
      options._defaultAgent = isHttps ? https2.globalAgent : http3.globalAgent;
      const resolveProtocol = options.resolveProtocol || defaultResolveProtocol;
      let { agent } = options;
      if (agent !== void 0 && agent !== false && agent.constructor.name !== "Object") {
        throw new Error("The `options.agent` can be only an object `http`, `https` or `http2` properties");
      }
      if (isHttps) {
        options.resolveSocket = true;
        let { socket, alpnProtocol, timeout } = await resolveProtocol(options);
        if (timeout) {
          if (socket) {
            socket.destroy();
          }
          const error = new Error(`Timed out resolving ALPN: ${options.timeout} ms`);
          error.code = "ETIMEDOUT";
          error.ms = options.timeout;
          throw error;
        }
        if (socket && options.createConnection) {
          socket.destroy();
          socket = void 0;
        }
        delete options.resolveSocket;
        const isHttp2 = alpnProtocol === "h2";
        if (agent) {
          agent = isHttp2 ? agent.http2 : agent.https;
          options.agent = agent;
        }
        if (agent === void 0) {
          agent = isHttp2 ? globalAgent : https2.globalAgent;
        }
        if (socket) {
          if (agent === false) {
            socket.destroy();
          } else {
            const defaultCreateConnection = (isHttp2 ? Agent : https2.Agent).prototype.createConnection;
            if (agent.createConnection === defaultCreateConnection) {
              if (isHttp2) {
                options._reuseSocket = socket;
              } else {
                installSocket(agent, socket, options);
              }
            } else {
              socket.destroy();
            }
          }
        }
        if (isHttp2) {
          return delayAsyncDestroy(new Http2ClientRequest(options, callback));
        }
      } else if (agent) {
        options.agent = agent.http;
      }
      if (options.headers) {
        options.headers = { ...options.headers };
        if (options.headers[":authority"]) {
          if (!options.headers.host) {
            options.headers.host = options.headers[":authority"];
          }
          delete options.headers[":authority"];
        }
        delete options.headers[":method"];
        delete options.headers[":scheme"];
        delete options.headers[":path"];
      }
      return delayAsyncDestroy(http3.request(options, callback));
    };
    module2.exports.protocolCache = cache;
    module2.exports.resolveProtocol = defaultResolveProtocol;
    module2.exports.createResolveProtocol = createResolveProtocol;
  }
});

// ../packages/curness-core/node_modules/http2-wrapper/source/utils/js-stream-socket.js
var require_js_stream_socket = __commonJS({
  "../packages/curness-core/node_modules/http2-wrapper/source/utils/js-stream-socket.js"(exports2, module2) {
    "use strict";
    var stream2 = require("stream");
    var tls = require("tls");
    var JSStreamSocket = new tls.TLSSocket(new stream2.PassThrough())._handle._parentWrap.constructor;
    module2.exports = JSStreamSocket;
  }
});

// ../packages/curness-core/node_modules/http2-wrapper/source/proxies/unexpected-status-code-error.js
var require_unexpected_status_code_error = __commonJS({
  "../packages/curness-core/node_modules/http2-wrapper/source/proxies/unexpected-status-code-error.js"(exports2, module2) {
    "use strict";
    var UnexpectedStatusCodeError = class extends Error {
      constructor(statusCode, statusMessage = "") {
        super(`The proxy server rejected the request with status code ${statusCode} (${statusMessage || "empty status message"})`);
        this.statusCode = statusCode;
        this.statusMessage = statusMessage;
      }
    };
    module2.exports = UnexpectedStatusCodeError;
  }
});

// ../packages/curness-core/node_modules/http2-wrapper/source/utils/check-type.js
var require_check_type = __commonJS({
  "../packages/curness-core/node_modules/http2-wrapper/source/utils/check-type.js"(exports2, module2) {
    "use strict";
    var checkType = (name, value, types2) => {
      const valid = types2.some((type) => {
        const typeofType = typeof type;
        if (typeofType === "string") {
          return typeof value === type;
        }
        return value instanceof type;
      });
      if (!valid) {
        const names = types2.map((type) => typeof type === "string" ? type : type.name);
        throw new TypeError(`Expected '${name}' to be a type of ${names.join(" or ")}, got ${typeof value}`);
      }
    };
    module2.exports = checkType;
  }
});

// ../packages/curness-core/node_modules/http2-wrapper/source/proxies/initialize.js
var require_initialize = __commonJS({
  "../packages/curness-core/node_modules/http2-wrapper/source/proxies/initialize.js"(exports2, module2) {
    "use strict";
    var { URL: URL3 } = require("url");
    var checkType = require_check_type();
    module2.exports = (self, proxyOptions) => {
      checkType("proxyOptions", proxyOptions, ["object"]);
      checkType("proxyOptions.headers", proxyOptions.headers, ["object", "undefined"]);
      checkType("proxyOptions.raw", proxyOptions.raw, ["boolean", "undefined"]);
      checkType("proxyOptions.url", proxyOptions.url, [URL3, "string"]);
      const url = new URL3(proxyOptions.url);
      self.proxyOptions = {
        raw: true,
        ...proxyOptions,
        headers: { ...proxyOptions.headers },
        url
      };
    };
  }
});

// ../packages/curness-core/node_modules/http2-wrapper/source/proxies/get-auth-headers.js
var require_get_auth_headers = __commonJS({
  "../packages/curness-core/node_modules/http2-wrapper/source/proxies/get-auth-headers.js"(exports2, module2) {
    "use strict";
    module2.exports = (self) => {
      const { username, password } = self.proxyOptions.url;
      if (username || password) {
        const data = `${username}:${password}`;
        const authorization = `Basic ${Buffer.from(data).toString("base64")}`;
        return {
          "proxy-authorization": authorization,
          authorization
        };
      }
      return {};
    };
  }
});

// ../packages/curness-core/node_modules/http2-wrapper/source/proxies/h1-over-h2.js
var require_h1_over_h2 = __commonJS({
  "../packages/curness-core/node_modules/http2-wrapper/source/proxies/h1-over-h2.js"(exports2, module2) {
    "use strict";
    var tls = require("tls");
    var http3 = require("http");
    var https2 = require("https");
    var JSStreamSocket = require_js_stream_socket();
    var { globalAgent } = require_agent();
    var UnexpectedStatusCodeError = require_unexpected_status_code_error();
    var initialize = require_initialize();
    var getAuthorizationHeaders = require_get_auth_headers();
    var createConnection = (self, options, callback) => {
      (async () => {
        try {
          const { proxyOptions } = self;
          const { url, headers, raw } = proxyOptions;
          const stream2 = await globalAgent.request(url, proxyOptions, {
            ...getAuthorizationHeaders(self),
            ...headers,
            ":method": "CONNECT",
            ":authority": `${options.host}:${options.port}`
          });
          stream2.once("error", callback);
          stream2.once("response", (headers2) => {
            const statusCode = headers2[":status"];
            if (statusCode !== 200) {
              callback(new UnexpectedStatusCodeError(statusCode, ""));
              return;
            }
            const encrypted = self instanceof https2.Agent;
            if (raw && encrypted) {
              options.socket = stream2;
              const secureStream = tls.connect(options);
              secureStream.once("close", () => {
                stream2.destroy();
              });
              callback(null, secureStream);
              return;
            }
            const socket = new JSStreamSocket(stream2);
            socket.encrypted = false;
            socket._handle.getpeername = (out) => {
              out.family = void 0;
              out.address = void 0;
              out.port = void 0;
            };
            callback(null, socket);
          });
        } catch (error) {
          callback(error);
        }
      })();
    };
    var HttpOverHttp2 = class extends http3.Agent {
      constructor(options) {
        super(options);
        initialize(this, options.proxyOptions);
      }
      createConnection(options, callback) {
        createConnection(this, options, callback);
      }
    };
    var HttpsOverHttp2 = class extends https2.Agent {
      constructor(options) {
        super(options);
        initialize(this, options.proxyOptions);
      }
      createConnection(options, callback) {
        createConnection(this, options, callback);
      }
    };
    module2.exports = {
      HttpOverHttp2,
      HttpsOverHttp2
    };
  }
});

// ../packages/curness-core/node_modules/http2-wrapper/source/proxies/h2-over-hx.js
var require_h2_over_hx = __commonJS({
  "../packages/curness-core/node_modules/http2-wrapper/source/proxies/h2-over-hx.js"(exports2, module2) {
    "use strict";
    var { Agent } = require_agent();
    var JSStreamSocket = require_js_stream_socket();
    var UnexpectedStatusCodeError = require_unexpected_status_code_error();
    var initialize = require_initialize();
    var Http2OverHttpX = class extends Agent {
      constructor(options) {
        super(options);
        initialize(this, options.proxyOptions);
      }
      async createConnection(origin, options) {
        const authority = `${origin.hostname}:${origin.port || 443}`;
        const [stream2, statusCode, statusMessage] = await this._getProxyStream(authority);
        if (statusCode !== 200) {
          throw new UnexpectedStatusCodeError(statusCode, statusMessage);
        }
        if (this.proxyOptions.raw) {
          options.socket = stream2;
        } else {
          const socket = new JSStreamSocket(stream2);
          socket.encrypted = false;
          socket._handle.getpeername = (out) => {
            out.family = void 0;
            out.address = void 0;
            out.port = void 0;
          };
          return socket;
        }
        return super.createConnection(origin, options);
      }
    };
    module2.exports = Http2OverHttpX;
  }
});

// ../packages/curness-core/node_modules/http2-wrapper/source/proxies/h2-over-h2.js
var require_h2_over_h2 = __commonJS({
  "../packages/curness-core/node_modules/http2-wrapper/source/proxies/h2-over-h2.js"(exports2, module2) {
    "use strict";
    var { globalAgent } = require_agent();
    var Http2OverHttpX = require_h2_over_hx();
    var getAuthorizationHeaders = require_get_auth_headers();
    var getStatusCode = (stream2) => new Promise((resolve, reject) => {
      stream2.once("error", reject);
      stream2.once("response", (headers) => {
        stream2.off("error", reject);
        resolve(headers[":status"]);
      });
    });
    var Http2OverHttp2 = class extends Http2OverHttpX {
      async _getProxyStream(authority) {
        const { proxyOptions } = this;
        const headers = {
          ...getAuthorizationHeaders(this),
          ...proxyOptions.headers,
          ":method": "CONNECT",
          ":authority": authority
        };
        const stream2 = await globalAgent.request(proxyOptions.url, proxyOptions, headers);
        const statusCode = await getStatusCode(stream2);
        return [stream2, statusCode, ""];
      }
    };
    module2.exports = Http2OverHttp2;
  }
});

// ../packages/curness-core/node_modules/http2-wrapper/source/proxies/h2-over-h1.js
var require_h2_over_h1 = __commonJS({
  "../packages/curness-core/node_modules/http2-wrapper/source/proxies/h2-over-h1.js"(exports2, module2) {
    "use strict";
    var http3 = require("http");
    var https2 = require("https");
    var Http2OverHttpX = require_h2_over_hx();
    var getAuthorizationHeaders = require_get_auth_headers();
    var getStream = (request) => new Promise((resolve, reject) => {
      const onConnect = (response, socket, head) => {
        socket.unshift(head);
        request.off("error", reject);
        resolve([socket, response.statusCode, response.statusMessage]);
      };
      request.once("error", reject);
      request.once("connect", onConnect);
    });
    var Http2OverHttp = class extends Http2OverHttpX {
      async _getProxyStream(authority) {
        const { proxyOptions } = this;
        const { url, headers } = this.proxyOptions;
        const network = url.protocol === "https:" ? https2 : http3;
        const request = network.request({
          ...proxyOptions,
          hostname: url.hostname,
          port: url.port,
          path: authority,
          headers: {
            ...getAuthorizationHeaders(this),
            ...headers,
            host: authority
          },
          method: "CONNECT"
        }).end();
        return getStream(request);
      }
    };
    module2.exports = {
      Http2OverHttp,
      Http2OverHttps: Http2OverHttp
    };
  }
});

// ../packages/curness-core/node_modules/http2-wrapper/source/index.js
var require_source = __commonJS({
  "../packages/curness-core/node_modules/http2-wrapper/source/index.js"(exports2, module2) {
    "use strict";
    var http22 = require("http2");
    var {
      Agent,
      globalAgent
    } = require_agent();
    var ClientRequest = require_client_request();
    var IncomingMessage = require_incoming_message();
    var auto = require_auto();
    var {
      HttpOverHttp2,
      HttpsOverHttp2
    } = require_h1_over_h2();
    var Http2OverHttp2 = require_h2_over_h2();
    var {
      Http2OverHttp,
      Http2OverHttps
    } = require_h2_over_h1();
    var validateHeaderName = require_validate_header_name();
    var validateHeaderValue = require_validate_header_value();
    var request = (url, options, callback) => new ClientRequest(url, options, callback);
    var get = (url, options, callback) => {
      const req = new ClientRequest(url, options, callback);
      req.end();
      return req;
    };
    module2.exports = {
      ...http22,
      ClientRequest,
      IncomingMessage,
      Agent,
      globalAgent,
      request,
      get,
      auto,
      proxies: {
        HttpOverHttp2,
        HttpsOverHttp2,
        Http2OverHttp2,
        Http2OverHttp,
        Http2OverHttps
      },
      validateHeaderName,
      validateHeaderValue
    };
  }
});

// ../packages/curness-core/node_modules/got/dist/source/core/parse-link-header.js
function parseLinkHeader(link) {
  const parsed = [];
  const items = link.split(",");
  for (const item of items) {
    const [rawUriReference, ...rawLinkParameters] = item.split(";");
    const trimmedUriReference = rawUriReference.trim();
    if (trimmedUriReference[0] !== "<" || trimmedUriReference.at(-1) !== ">") {
      throw new Error(`Invalid format of the Link header reference: ${trimmedUriReference}`);
    }
    const reference = trimmedUriReference.slice(1, -1);
    const parameters = {};
    if (rawLinkParameters.length === 0) {
      throw new Error(`Unexpected end of Link header parameters: ${rawLinkParameters.join(";")}`);
    }
    for (const rawParameter of rawLinkParameters) {
      const trimmedRawParameter = rawParameter.trim();
      const center = trimmedRawParameter.indexOf("=");
      if (center === -1) {
        throw new Error(`Failed to parse Link header: ${link}`);
      }
      const name = trimmedRawParameter.slice(0, center).trim();
      const value = trimmedRawParameter.slice(center + 1).trim();
      parameters[name] = value;
    }
    parsed.push({
      reference,
      parameters
    });
  }
  return parsed;
}
var init_parse_link_header = __esm({
  "../packages/curness-core/node_modules/got/dist/source/core/parse-link-header.js"() {
  }
});

// ../packages/curness-core/node_modules/got/dist/source/core/options.js
function wrapAssertionWithContext(optionName, assertionFn) {
  try {
    assertionFn();
  } catch (error) {
    if (error instanceof Error) {
      error.message = `Option '${optionName}': ${error.message}`;
    }
    throw error;
  }
}
function assertAny2(optionName, validators, value) {
  wrapAssertionWithContext(optionName, () => {
    assert.any(validators, value);
  });
}
function assertPlainObject2(optionName, value) {
  wrapAssertionWithContext(optionName, () => {
    assert.plainObject(value);
  });
}
function validateSearchParameters(searchParameters) {
  for (const key in searchParameters) {
    const value = searchParameters[key];
    assertAny2(`searchParams.${key}`, [distribution_default.string, distribution_default.number, distribution_default.boolean, distribution_default.null, distribution_default.undefined], value);
  }
}
var import_node_process, import_node_util4, import_node_tls, import_node_https, import_node_http, import_http2_wrapper, major, minor, globalCache, globalDnsCache, getGlobalDnsCache, wrapQuickLruIfNeeded, defaultInternals, cloneInternals, cloneRaw, getHttp2TimeoutOption, init, Options;
var init_options = __esm({
  "../packages/curness-core/node_modules/got/dist/source/core/options.js"() {
    import_node_process = __toESM(require("node:process"), 1);
    import_node_util4 = require("node:util");
    import_node_tls = require("node:tls");
    import_node_https = __toESM(require("node:https"), 1);
    import_node_http = __toESM(require("node:http"), 1);
    init_distribution();
    init_lowercase_keys();
    init_source2();
    import_http2_wrapper = __toESM(require_source(), 1);
    init_lib();
    init_parse_link_header();
    [major, minor] = import_node_process.default.versions.node.split(".").map(Number);
    globalCache = /* @__PURE__ */ new Map();
    getGlobalDnsCache = () => {
      if (globalDnsCache) {
        return globalDnsCache;
      }
      globalDnsCache = new CacheableLookup();
      return globalDnsCache;
    };
    wrapQuickLruIfNeeded = (value) => {
      if ((value == null ? void 0 : value[Symbol.toStringTag]) === "QuickLRU" && typeof value.evict === "function") {
        return {
          get(key) {
            return value.get(key);
          },
          set(key, cacheValue, ttl2) {
            if (ttl2 === void 0) {
              value.set(key, cacheValue);
            } else {
              value.set(key, cacheValue, { maxAge: ttl2 });
            }
            return true;
          },
          delete(key) {
            return value.delete(key);
          },
          clear() {
            return value.clear();
          },
          has(key) {
            return value.has(key);
          }
        };
      }
      return value;
    };
    defaultInternals = {
      request: void 0,
      agent: {
        http: void 0,
        https: void 0,
        http2: void 0
      },
      h2session: void 0,
      decompress: true,
      timeout: {
        connect: void 0,
        lookup: void 0,
        read: void 0,
        request: void 0,
        response: void 0,
        secureConnect: void 0,
        send: void 0,
        socket: void 0
      },
      prefixUrl: "",
      body: void 0,
      form: void 0,
      json: void 0,
      cookieJar: void 0,
      ignoreInvalidCookies: false,
      searchParams: void 0,
      dnsLookup: void 0,
      dnsCache: void 0,
      context: {},
      hooks: {
        init: [],
        beforeRequest: [],
        beforeError: [],
        beforeRedirect: [],
        beforeRetry: [],
        beforeCache: [],
        afterResponse: []
      },
      followRedirect: true,
      maxRedirects: 10,
      cache: void 0,
      throwHttpErrors: true,
      username: "",
      password: "",
      http2: false,
      allowGetBody: false,
      copyPipedHeaders: true,
      headers: {
        "user-agent": "got (https://github.com/sindresorhus/got)"
      },
      methodRewriting: false,
      dnsLookupIpVersion: void 0,
      parseJson: JSON.parse,
      stringifyJson: JSON.stringify,
      retry: {
        limit: 2,
        methods: [
          "GET",
          "PUT",
          "HEAD",
          "DELETE",
          "OPTIONS",
          "TRACE"
        ],
        statusCodes: [
          408,
          413,
          429,
          500,
          502,
          503,
          504,
          521,
          522,
          524
        ],
        errorCodes: [
          "ETIMEDOUT",
          "ECONNRESET",
          "EADDRINUSE",
          "ECONNREFUSED",
          "EPIPE",
          "ENOTFOUND",
          "ENETUNREACH",
          "EAI_AGAIN"
        ],
        maxRetryAfter: void 0,
        calculateDelay: ({ computedValue }) => computedValue,
        backoffLimit: Number.POSITIVE_INFINITY,
        noise: 100,
        // TODO: Change default to `true` in the next major version to fix https://github.com/sindresorhus/got/issues/2243
        enforceRetryRules: false
      },
      localAddress: void 0,
      method: "GET",
      createConnection: void 0,
      cacheOptions: {
        shared: void 0,
        cacheHeuristic: void 0,
        immutableMinTimeToLive: void 0,
        ignoreCargoCult: void 0
      },
      https: {
        alpnProtocols: void 0,
        rejectUnauthorized: void 0,
        checkServerIdentity: void 0,
        serverName: void 0,
        certificateAuthority: void 0,
        key: void 0,
        certificate: void 0,
        passphrase: void 0,
        pfx: void 0,
        ciphers: void 0,
        honorCipherOrder: void 0,
        minVersion: void 0,
        maxVersion: void 0,
        signatureAlgorithms: void 0,
        tlsSessionLifetime: void 0,
        dhparam: void 0,
        ecdhCurve: void 0,
        certificateRevocationLists: void 0,
        secureOptions: void 0
      },
      encoding: void 0,
      resolveBodyOnly: false,
      isStream: false,
      responseType: "text",
      url: void 0,
      pagination: {
        transform(response) {
          if (response.request.options.responseType === "json") {
            return response.body;
          }
          return JSON.parse(response.body);
        },
        paginate({ response }) {
          const rawLinkHeader = response.headers.link;
          if (typeof rawLinkHeader !== "string" || rawLinkHeader.trim() === "") {
            return false;
          }
          const parsed = parseLinkHeader(rawLinkHeader);
          const next = parsed.find((entry) => entry.parameters.rel === "next" || entry.parameters.rel === '"next"');
          if (next) {
            return {
              url: new URL(next.reference, response.url)
            };
          }
          return false;
        },
        filter: () => true,
        shouldContinue: () => true,
        countLimit: Number.POSITIVE_INFINITY,
        backoff: 0,
        requestLimit: 1e4,
        stackAllItems: false
      },
      setHost: true,
      maxHeaderSize: void 0,
      signal: void 0,
      enableUnixSockets: false,
      strictContentLength: false
    };
    cloneInternals = (internals) => {
      const { hooks, retry } = internals;
      const result = {
        ...internals,
        context: { ...internals.context },
        cacheOptions: { ...internals.cacheOptions },
        https: { ...internals.https },
        agent: { ...internals.agent },
        headers: { ...internals.headers },
        retry: {
          ...retry,
          errorCodes: [...retry.errorCodes],
          methods: [...retry.methods],
          statusCodes: [...retry.statusCodes]
        },
        timeout: { ...internals.timeout },
        hooks: {
          init: [...hooks.init],
          beforeRequest: [...hooks.beforeRequest],
          beforeError: [...hooks.beforeError],
          beforeRedirect: [...hooks.beforeRedirect],
          beforeRetry: [...hooks.beforeRetry],
          beforeCache: [...hooks.beforeCache],
          afterResponse: [...hooks.afterResponse]
        },
        searchParams: internals.searchParams ? new URLSearchParams(internals.searchParams) : void 0,
        pagination: { ...internals.pagination }
      };
      return result;
    };
    cloneRaw = (raw) => {
      const { hooks, retry } = raw;
      const result = { ...raw };
      if (distribution_default.object(raw.context)) {
        result.context = { ...raw.context };
      }
      if (distribution_default.object(raw.cacheOptions)) {
        result.cacheOptions = { ...raw.cacheOptions };
      }
      if (distribution_default.object(raw.https)) {
        result.https = { ...raw.https };
      }
      if (distribution_default.object(raw.cacheOptions)) {
        result.cacheOptions = { ...result.cacheOptions };
      }
      if (distribution_default.object(raw.agent)) {
        result.agent = { ...raw.agent };
      }
      if (distribution_default.object(raw.headers)) {
        result.headers = { ...raw.headers };
      }
      if (distribution_default.object(retry)) {
        result.retry = { ...retry };
        if (distribution_default.array(retry.errorCodes)) {
          result.retry.errorCodes = [...retry.errorCodes];
        }
        if (distribution_default.array(retry.methods)) {
          result.retry.methods = [...retry.methods];
        }
        if (distribution_default.array(retry.statusCodes)) {
          result.retry.statusCodes = [...retry.statusCodes];
        }
      }
      if (distribution_default.object(raw.timeout)) {
        result.timeout = { ...raw.timeout };
      }
      if (distribution_default.object(hooks)) {
        result.hooks = {
          ...hooks
        };
        if (distribution_default.array(hooks.init)) {
          result.hooks.init = [...hooks.init];
        }
        if (distribution_default.array(hooks.beforeRequest)) {
          result.hooks.beforeRequest = [...hooks.beforeRequest];
        }
        if (distribution_default.array(hooks.beforeError)) {
          result.hooks.beforeError = [...hooks.beforeError];
        }
        if (distribution_default.array(hooks.beforeRedirect)) {
          result.hooks.beforeRedirect = [...hooks.beforeRedirect];
        }
        if (distribution_default.array(hooks.beforeRetry)) {
          result.hooks.beforeRetry = [...hooks.beforeRetry];
        }
        if (distribution_default.array(hooks.beforeCache)) {
          result.hooks.beforeCache = [...hooks.beforeCache];
        }
        if (distribution_default.array(hooks.afterResponse)) {
          result.hooks.afterResponse = [...hooks.afterResponse];
        }
      }
      if (raw.searchParams) {
        if (distribution_default.string(raw.searchParams)) {
          result.searchParams = raw.searchParams;
        } else if (raw.searchParams instanceof URLSearchParams) {
          result.searchParams = new URLSearchParams(raw.searchParams);
        } else if (distribution_default.object(raw.searchParams)) {
          result.searchParams = { ...raw.searchParams };
        }
      }
      if (distribution_default.object(raw.pagination)) {
        result.pagination = { ...raw.pagination };
      }
      return result;
    };
    getHttp2TimeoutOption = (internals) => {
      const delays = [internals.timeout.socket, internals.timeout.connect, internals.timeout.lookup, internals.timeout.request, internals.timeout.secureConnect].filter((delay2) => typeof delay2 === "number");
      if (delays.length > 0) {
        return Math.min(...delays);
      }
      return void 0;
    };
    init = (options, withOptions, self) => {
      var _a;
      const initHooks = (_a = options.hooks) == null ? void 0 : _a.init;
      if (initHooks) {
        for (const hook of initHooks) {
          hook(withOptions, self);
        }
      }
    };
    Options = class _Options {
      _unixOptions;
      _internals;
      _merging = false;
      _init;
      constructor(input, options, defaults2) {
        assertAny2("input", [distribution_default.string, distribution_default.urlInstance, distribution_default.object, distribution_default.undefined], input);
        assertAny2("options", [distribution_default.object, distribution_default.undefined], options);
        assertAny2("defaults", [distribution_default.object, distribution_default.undefined], defaults2);
        if (input instanceof _Options || options instanceof _Options) {
          throw new TypeError("The defaults must be passed as the third argument");
        }
        this._internals = cloneInternals((defaults2 == null ? void 0 : defaults2._internals) ?? defaults2 ?? defaultInternals);
        this._init = [...(defaults2 == null ? void 0 : defaults2._init) ?? []];
        try {
          if (distribution_default.plainObject(input)) {
            try {
              this.merge(input);
              this.merge(options);
            } finally {
              this.url = input.url;
            }
          } else {
            try {
              this.merge(options);
            } finally {
              if ((options == null ? void 0 : options.url) !== void 0) {
                if (input === void 0) {
                  this.url = options.url;
                } else {
                  throw new TypeError("The `url` option is mutually exclusive with the `input` argument");
                }
              } else if (input !== void 0) {
                this.url = input;
              }
            }
          }
        } catch (error) {
          error.options = this;
          throw error;
        }
      }
      merge(options) {
        if (!options) {
          return;
        }
        if (options instanceof _Options) {
          const initArray = [...options._init];
          for (const init2 of initArray) {
            this.merge(init2);
          }
          return;
        }
        options = cloneRaw(options);
        init(this, options, this);
        init(options, options, this);
        this._merging = true;
        if ("isStream" in options) {
          this.isStream = options.isStream;
        }
        try {
          let push = false;
          for (const key in options) {
            if (key === "mutableDefaults" || key === "handlers") {
              continue;
            }
            if (key === "url") {
              continue;
            }
            if (key === "preserveHooks") {
              continue;
            }
            if (!(key in this)) {
              throw new Error(`Unexpected option: ${key}`);
            }
            const value = options[key];
            if (value === void 0) {
              continue;
            }
            this[key] = value;
            push = true;
          }
          if (push) {
            this._init.push(options);
          }
        } finally {
          this._merging = false;
        }
      }
      /**
          Custom request function.
          The main purpose of this is to [support HTTP2 using a wrapper](https://github.com/szmarczak/http2-wrapper).
      
          @default http.request | https.request
          */
      get request() {
        return this._internals.request;
      }
      set request(value) {
        assertAny2("request", [distribution_default.function, distribution_default.undefined], value);
        this._internals.request = value;
      }
      /**
          An object representing `http`, `https` and `http2` keys for [`http.Agent`](https://nodejs.org/api/http.html#http_class_http_agent), [`https.Agent`](https://nodejs.org/api/https.html#https_class_https_agent) and [`http2wrapper.Agent`](https://github.com/szmarczak/http2-wrapper#new-http2agentoptions) instance.
          This is necessary because a request to one protocol might redirect to another.
          In such a scenario, Got will switch over to the right protocol agent for you.
      
          If a key is not present, it will default to a global agent.
      
          @example
          ```
          import got from 'got';
          import HttpAgent from 'agentkeepalive';
      
          const {HttpsAgent} = HttpAgent;
      
          await got('https://sindresorhus.com', {
              agent: {
                  http: new HttpAgent(),
                  https: new HttpsAgent()
              }
          });
          ```
          */
      get agent() {
        return this._internals.agent;
      }
      set agent(value) {
        assertPlainObject2("agent", value);
        for (const key in value) {
          if (!(key in this._internals.agent)) {
            throw new TypeError(`Unexpected agent option: ${key}`);
          }
          assertAny2(`agent.${key}`, [distribution_default.object, distribution_default.undefined, (v) => v === false], value[key]);
        }
        if (this._merging) {
          Object.assign(this._internals.agent, value);
        } else {
          this._internals.agent = { ...value };
        }
      }
      get h2session() {
        return this._internals.h2session;
      }
      set h2session(value) {
        this._internals.h2session = value;
      }
      /**
          Decompress the response automatically.
      
          This will set the `accept-encoding` header to `gzip, deflate, br` unless you set it yourself.
      
          If this is disabled, a compressed response is returned as a `Buffer`.
          This may be useful if you want to handle decompression yourself or stream the raw compressed data.
      
          @default true
          */
      get decompress() {
        return this._internals.decompress;
      }
      set decompress(value) {
        assert.boolean(value);
        this._internals.decompress = value;
      }
      /**
          Milliseconds to wait for the server to end the response before aborting the request with `got.TimeoutError` error (a.k.a. `request` property).
          By default, there's no timeout.
      
          This also accepts an `object` with the following fields to constrain the duration of each phase of the request lifecycle:
      
          - `lookup` starts when a socket is assigned and ends when the hostname has been resolved.
              Does not apply when using a Unix domain socket.
          - `connect` starts when `lookup` completes (or when the socket is assigned if lookup does not apply to the request) and ends when the socket is connected.
          - `secureConnect` starts when `connect` completes and ends when the handshaking process completes (HTTPS only).
          - `socket` starts when the socket is connected. See [request.setTimeout](https://nodejs.org/api/http.html#http_request_settimeout_timeout_callback).
          - `response` starts when the request has been written to the socket and ends when the response headers are received.
          - `send` starts when the socket is connected and ends with the request has been written to the socket.
          - `request` starts when the request is initiated and ends when the response's end event fires.
          */
      get timeout() {
        return this._internals.timeout;
      }
      set timeout(value) {
        assertPlainObject2("timeout", value);
        for (const key in value) {
          if (!(key in this._internals.timeout)) {
            throw new Error(`Unexpected timeout option: ${key}`);
          }
          assertAny2(`timeout.${key}`, [distribution_default.number, distribution_default.undefined], value[key]);
        }
        if (this._merging) {
          Object.assign(this._internals.timeout, value);
        } else {
          this._internals.timeout = { ...value };
        }
      }
      /**
          When specified, `prefixUrl` will be prepended to `url`.
          The prefix can be any valid URL, either relative or absolute.
          A trailing slash `/` is optional - one will be added automatically.
      
          __Note__: `prefixUrl` will be ignored if the `url` argument is a URL instance.
      
          __Note__: Leading slashes in `input` are disallowed when using this option to enforce consistency and avoid confusion.
          For example, when the prefix URL is `https://example.com/foo` and the input is `/bar`, there's ambiguity whether the resulting URL would become `https://example.com/foo/bar` or `https://example.com/bar`.
          The latter is used by browsers.
      
          __Tip__: Useful when used with `got.extend()` to create niche-specific Got instances.
      
          __Tip__: You can change `prefixUrl` using hooks as long as the URL still includes the `prefixUrl`.
          If the URL doesn't include it anymore, it will throw.
      
          @example
          ```
          import got from 'got';
      
          await got('unicorn', {prefixUrl: 'https://cats.com'});
          //=> 'https://cats.com/unicorn'
      
          const instance = got.extend({
              prefixUrl: 'https://google.com'
          });
      
          await instance('unicorn', {
              hooks: {
                  beforeRequest: [
                      options => {
                          options.prefixUrl = 'https://cats.com';
                      }
                  ]
              }
          });
          //=> 'https://cats.com/unicorn'
          ```
          */
      get prefixUrl() {
        return this._internals.prefixUrl;
      }
      set prefixUrl(value) {
        assertAny2("prefixUrl", [distribution_default.string, distribution_default.urlInstance], value);
        if (value === "") {
          this._internals.prefixUrl = "";
          return;
        }
        value = value.toString();
        if (!value.endsWith("/")) {
          value += "/";
        }
        if (this._internals.prefixUrl && this._internals.url) {
          const { href } = this._internals.url;
          this._internals.url.href = value + href.slice(this._internals.prefixUrl.length);
        }
        this._internals.prefixUrl = value;
      }
      /**
          __Note #1__: The `body` option cannot be used with the `json` or `form` option.
      
          __Note #2__: If you provide this option, `got.stream()` will be read-only.
      
          __Note #3__: If you provide a payload with the `GET` or `HEAD` method, it will throw a `TypeError` unless the method is `GET` and the `allowGetBody` option is set to `true`.
      
          __Note #4__: This option is not enumerable and will not be merged with the instance defaults.
      
          The `content-length` header will be automatically set if `body` is a `string` / `Buffer` / typed array ([`Uint8Array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array), etc.) / [`FormData`](https://developer.mozilla.org/en-US/docs/Web/API/FormData) / [`form-data` instance](https://github.com/form-data/form-data), and `content-length` and `transfer-encoding` are not manually set in `options.headers`.
      
          Since Got 12, the `content-length` is not automatically set when `body` is a `fs.createReadStream`.
      
          You can use `Iterable` and `AsyncIterable` objects as request body, including Web [`ReadableStream`](https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream):
      
          @example
          ```
          import got from 'got';
      
          // Using an async generator
          async function* generateData() {
              yield 'Hello, ';
              yield 'world!';
          }
      
          await got.post('https://httpbin.org/anything', {
              body: generateData()
          });
          ```
          */
      get body() {
        return this._internals.body;
      }
      set body(value) {
        assertAny2("body", [distribution_default.string, distribution_default.buffer, distribution_default.nodeStream, distribution_default.generator, distribution_default.asyncGenerator, distribution_default.iterable, distribution_default.asyncIterable, isFormData2, distribution_default.typedArray, distribution_default.undefined], value);
        if (distribution_default.nodeStream(value)) {
          assert.truthy(value.readable);
        }
        if (value !== void 0) {
          assert.undefined(this._internals.form);
          assert.undefined(this._internals.json);
        }
        this._internals.body = value;
      }
      /**
          The form body is converted to a query string using [`(new URLSearchParams(object)).toString()`](https://nodejs.org/api/url.html#url_constructor_new_urlsearchparams_obj).
      
          If the `Content-Type` header is not present, it will be set to `application/x-www-form-urlencoded`.
      
          __Note #1__: If you provide this option, `got.stream()` will be read-only.
      
          __Note #2__: This option is not enumerable and will not be merged with the instance defaults.
          */
      get form() {
        return this._internals.form;
      }
      set form(value) {
        assertAny2("form", [distribution_default.plainObject, distribution_default.undefined], value);
        if (value !== void 0) {
          assert.undefined(this._internals.body);
          assert.undefined(this._internals.json);
        }
        this._internals.form = value;
      }
      /**
          JSON request body. If the `content-type` header is not set, it will be set to `application/json`.
      
          __Important__: This option only affects the request body you send to the server. To parse the response as JSON, you must either call `.json()` on the promise or set `responseType: 'json'` in the options.
      
          __Note #1__: If you provide this option, `got.stream()` will be read-only.
      
          __Note #2__: This option is not enumerable and will not be merged with the instance defaults.
          */
      get json() {
        return this._internals.json;
      }
      set json(value) {
        if (value !== void 0) {
          assert.undefined(this._internals.body);
          assert.undefined(this._internals.form);
        }
        this._internals.json = value;
      }
      /**
          The URL to request, as a string, a [`https.request` options object](https://nodejs.org/api/https.html#https_https_request_options_callback), or a [WHATWG `URL`](https://nodejs.org/api/url.html#url_class_url).
      
          Properties from `options` will override properties in the parsed `url`.
      
          If no protocol is specified, it will throw a `TypeError`.
      
          __Note__: The query string is **not** parsed as search params.
      
          @example
          ```
          await got('https://example.com/?query=a b'); //=> https://example.com/?query=a%20b
          await got('https://example.com/', {searchParams: {query: 'a b'}}); //=> https://example.com/?query=a+b
      
          // The query string is overridden by `searchParams`
          await got('https://example.com/?query=a b', {searchParams: {query: 'a b'}}); //=> https://example.com/?query=a+b
          ```
          */
      get url() {
        return this._internals.url;
      }
      set url(value) {
        assertAny2("url", [distribution_default.string, distribution_default.urlInstance, distribution_default.undefined], value);
        if (value === void 0) {
          this._internals.url = void 0;
          return;
        }
        if (distribution_default.string(value) && value.startsWith("/")) {
          throw new Error("`url` must not start with a slash");
        }
        const valueString = value.toString();
        const isAbsolute = distribution_default.urlInstance(value) || /^[a-z][a-z\d+.-]*:\/\//i.test(valueString);
        const urlString = isAbsolute ? valueString : `${this.prefixUrl}${valueString}`;
        const url = new URL(urlString);
        this._internals.url = url;
        if (url.protocol === "unix:") {
          url.href = `http://unix${url.pathname}${url.search}`;
        }
        if (url.protocol !== "http:" && url.protocol !== "https:") {
          const error = new Error(`Unsupported protocol: ${url.protocol}`);
          error.code = "ERR_UNSUPPORTED_PROTOCOL";
          throw error;
        }
        if (this._internals.username) {
          url.username = this._internals.username;
          this._internals.username = "";
        }
        if (this._internals.password) {
          url.password = this._internals.password;
          this._internals.password = "";
        }
        if (this._internals.searchParams) {
          url.search = this._internals.searchParams.toString();
          this._internals.searchParams = void 0;
        }
        if (url.hostname === "unix") {
          if (!this._internals.enableUnixSockets) {
            throw new Error("Using UNIX domain sockets but option `enableUnixSockets` is not enabled");
          }
          const matches = /(?<socketPath>.+?):(?<path>.+)/.exec(`${url.pathname}${url.search}`);
          if (matches == null ? void 0 : matches.groups) {
            const { socketPath, path: path6 } = matches.groups;
            this._unixOptions = {
              socketPath,
              path: path6,
              host: ""
            };
          } else {
            this._unixOptions = void 0;
          }
          return;
        }
        this._unixOptions = void 0;
      }
      /**
          Cookie support. You don't have to care about parsing or how to store them.
      
          __Note__: If you provide this option, `options.headers.cookie` will be overridden.
          */
      get cookieJar() {
        return this._internals.cookieJar;
      }
      set cookieJar(value) {
        assertAny2("cookieJar", [distribution_default.object, distribution_default.undefined], value);
        if (value === void 0) {
          this._internals.cookieJar = void 0;
          return;
        }
        let { setCookie, getCookieString } = value;
        assert.function(setCookie);
        assert.function(getCookieString);
        if (setCookie.length === 4 && getCookieString.length === 0) {
          setCookie = (0, import_node_util4.promisify)(setCookie.bind(value));
          getCookieString = (0, import_node_util4.promisify)(getCookieString.bind(value));
          this._internals.cookieJar = {
            setCookie,
            getCookieString
          };
        } else {
          this._internals.cookieJar = value;
        }
      }
      /**
          You can abort the `request` using [`AbortController`](https://developer.mozilla.org/en-US/docs/Web/API/AbortController).
      
          @example
          ```
          import got from 'got';
      
          const abortController = new AbortController();
      
          const request = got('https://httpbin.org/anything', {
              signal: abortController.signal
          });
      
          setTimeout(() => {
              abortController.abort();
          }, 100);
          ```
          */
      get signal() {
        return this._internals.signal;
      }
      set signal(value) {
        assert.object(value);
        this._internals.signal = value;
      }
      /**
          Ignore invalid cookies instead of throwing an error.
          Only useful when the `cookieJar` option has been set. Not recommended.
      
          @default false
          */
      get ignoreInvalidCookies() {
        return this._internals.ignoreInvalidCookies;
      }
      set ignoreInvalidCookies(value) {
        assert.boolean(value);
        this._internals.ignoreInvalidCookies = value;
      }
      /**
          Query string that will be added to the request URL.
          This will override the query string in `url`.
      
          If you need to pass in an array, you can do it using a `URLSearchParams` instance.
      
          @example
          ```
          import got from 'got';
      
          const searchParams = new URLSearchParams([['key', 'a'], ['key', 'b']]);
      
          await got('https://example.com', {searchParams});
      
          console.log(searchParams.toString());
          //=> 'key=a&key=b'
          ```
          */
      get searchParams() {
        if (this._internals.url) {
          return this._internals.url.searchParams;
        }
        if (this._internals.searchParams === void 0) {
          this._internals.searchParams = new URLSearchParams();
        }
        return this._internals.searchParams;
      }
      set searchParams(value) {
        assertAny2("searchParams", [distribution_default.string, distribution_default.object, distribution_default.undefined], value);
        const url = this._internals.url;
        if (value === void 0) {
          this._internals.searchParams = void 0;
          if (url) {
            url.search = "";
          }
          return;
        }
        const searchParameters = this.searchParams;
        let updated;
        if (distribution_default.string(value)) {
          updated = new URLSearchParams(value);
        } else if (value instanceof URLSearchParams) {
          updated = value;
        } else {
          validateSearchParameters(value);
          updated = new URLSearchParams();
          for (const key in value) {
            const entry = value[key];
            if (entry === null) {
              updated.append(key, "");
            } else if (entry === void 0) {
              searchParameters.delete(key);
            } else {
              updated.append(key, entry);
            }
          }
        }
        if (this._merging) {
          for (const key of updated.keys()) {
            searchParameters.delete(key);
          }
          for (const [key, value2] of updated) {
            searchParameters.append(key, value2);
          }
        } else if (url) {
          url.search = searchParameters.toString();
        } else {
          this._internals.searchParams = searchParameters;
        }
      }
      get searchParameters() {
        throw new Error("The `searchParameters` option does not exist. Use `searchParams` instead.");
      }
      set searchParameters(_value) {
        throw new Error("The `searchParameters` option does not exist. Use `searchParams` instead.");
      }
      get dnsLookup() {
        return this._internals.dnsLookup;
      }
      set dnsLookup(value) {
        assertAny2("dnsLookup", [distribution_default.function, distribution_default.undefined], value);
        this._internals.dnsLookup = value;
      }
      /**
          An instance of [`CacheableLookup`](https://github.com/szmarczak/cacheable-lookup) used for making DNS lookups.
          Useful when making lots of requests to different *public* hostnames.
      
          `CacheableLookup` uses `dns.resolver4(..)` and `dns.resolver6(...)` under the hood and fall backs to `dns.lookup(...)` when the first two fail, which may lead to additional delay.
      
          __Note__: This should stay disabled when making requests to internal hostnames such as `localhost`, `database.local` etc.
      
          @default false
          */
      get dnsCache() {
        return this._internals.dnsCache;
      }
      set dnsCache(value) {
        assertAny2("dnsCache", [distribution_default.object, distribution_default.boolean, distribution_default.undefined], value);
        if (value === true) {
          this._internals.dnsCache = getGlobalDnsCache();
        } else if (value === false) {
          this._internals.dnsCache = void 0;
        } else {
          this._internals.dnsCache = value;
        }
      }
      /**
          User data. `context` is shallow merged and enumerable. If it contains non-enumerable properties they will NOT be merged.
      
          @example
          ```
          import got from 'got';
      
          const instance = got.extend({
              hooks: {
                  beforeRequest: [
                      options => {
                          if (!options.context || !options.context.token) {
                              throw new Error('Token required');
                          }
      
                          options.headers.token = options.context.token;
                      }
                  ]
              }
          });
      
          const context = {
              token: 'secret'
          };
      
          const response = await instance('https://httpbin.org/headers', {context});
      
          // Let's see the headers
          console.log(response.body);
          ```
          */
      get context() {
        return this._internals.context;
      }
      set context(value) {
        assert.object(value);
        if (this._merging) {
          Object.assign(this._internals.context, value);
        } else {
          this._internals.context = { ...value };
        }
      }
      /**
      Hooks allow modifications during the request lifecycle.
      Hook functions may be async and are run serially.
      */
      get hooks() {
        return this._internals.hooks;
      }
      set hooks(value) {
        assert.object(value);
        for (const knownHookEvent in value) {
          if (!(knownHookEvent in this._internals.hooks)) {
            throw new Error(`Unexpected hook event: ${knownHookEvent}`);
          }
          const typedKnownHookEvent = knownHookEvent;
          const hooks = value[typedKnownHookEvent];
          assertAny2(`hooks.${knownHookEvent}`, [distribution_default.array, distribution_default.undefined], hooks);
          if (hooks) {
            for (const hook of hooks) {
              assert.function(hook);
            }
          }
          if (this._merging) {
            if (hooks) {
              this._internals.hooks[typedKnownHookEvent].push(...hooks);
            }
          } else {
            if (!hooks) {
              throw new Error(`Missing hook event: ${knownHookEvent}`);
            }
            this._internals.hooks[knownHookEvent] = [...hooks];
          }
        }
      }
      /**
          Whether redirect responses should be followed automatically.
      
          Optionally, pass a function to dynamically decide based on the response object.
      
          Note that if a `303` is sent by the server in response to any request type (`POST`, `DELETE`, etc.), Got will automatically request the resource pointed to in the location header via `GET`.
          This is in accordance with [the spec](https://tools.ietf.org/html/rfc7231#section-6.4.4). You can optionally turn on this behavior also for other redirect codes - see `methodRewriting`.
      
          @default true
          */
      get followRedirect() {
        return this._internals.followRedirect;
      }
      set followRedirect(value) {
        assertAny2("followRedirect", [distribution_default.boolean, distribution_default.function], value);
        this._internals.followRedirect = value;
      }
      get followRedirects() {
        throw new TypeError("The `followRedirects` option does not exist. Use `followRedirect` instead.");
      }
      set followRedirects(_value) {
        throw new TypeError("The `followRedirects` option does not exist. Use `followRedirect` instead.");
      }
      /**
          If exceeded, the request will be aborted and a `MaxRedirectsError` will be thrown.
      
          @default 10
          */
      get maxRedirects() {
        return this._internals.maxRedirects;
      }
      set maxRedirects(value) {
        assert.number(value);
        this._internals.maxRedirects = value;
      }
      /**
          A cache adapter instance for storing cached response data.
      
          @default false
          */
      get cache() {
        return this._internals.cache;
      }
      set cache(value) {
        assertAny2("cache", [distribution_default.object, distribution_default.string, distribution_default.boolean, distribution_default.undefined], value);
        if (value === true) {
          this._internals.cache = globalCache;
        } else if (value === false) {
          this._internals.cache = void 0;
        } else {
          this._internals.cache = wrapQuickLruIfNeeded(value);
        }
      }
      /**
          Determines if a `got.HTTPError` is thrown for unsuccessful responses.
      
          If this is disabled, requests that encounter an error status code will be resolved with the `response` instead of throwing.
          This may be useful if you are checking for resource availability and are expecting error responses.
      
          @default true
          */
      get throwHttpErrors() {
        return this._internals.throwHttpErrors;
      }
      set throwHttpErrors(value) {
        assert.boolean(value);
        this._internals.throwHttpErrors = value;
      }
      get username() {
        const url = this._internals.url;
        const value = url ? url.username : this._internals.username;
        return decodeURIComponent(value);
      }
      set username(value) {
        assert.string(value);
        const url = this._internals.url;
        const fixedValue = encodeURIComponent(value);
        if (url) {
          url.username = fixedValue;
        } else {
          this._internals.username = fixedValue;
        }
      }
      get password() {
        const url = this._internals.url;
        const value = url ? url.password : this._internals.password;
        return decodeURIComponent(value);
      }
      set password(value) {
        assert.string(value);
        const url = this._internals.url;
        const fixedValue = encodeURIComponent(value);
        if (url) {
          url.password = fixedValue;
        } else {
          this._internals.password = fixedValue;
        }
      }
      /**
          If set to `true`, Got will additionally accept HTTP2 requests.
      
          It will choose either HTTP/1.1 or HTTP/2 depending on the ALPN protocol.
      
          __Note__: This option requires Node.js 15.10.0 or newer as HTTP/2 support on older Node.js versions is very buggy.
      
          __Note__: Overriding `options.request` will disable HTTP2 support.
      
          @default false
      
          @example
          ```
          import got from 'got';
      
          const {headers} = await got('https://nghttp2.org/httpbin/anything', {http2: true});
      
          console.log(headers.via);
          //=> '2 nghttpx'
          ```
          */
      get http2() {
        return this._internals.http2;
      }
      set http2(value) {
        assert.boolean(value);
        this._internals.http2 = value;
      }
      /**
          Set this to `true` to allow sending body for the `GET` method.
          However, the [HTTP/2 specification](https://tools.ietf.org/html/rfc7540#section-8.1.3) says that `An HTTP GET request includes request header fields and no payload body`, therefore when using the HTTP/2 protocol this option will have no effect.
          This option is only meant to interact with non-compliant servers when you have no other choice.
      
          __Note__: The [RFC 7231](https://tools.ietf.org/html/rfc7231#section-4.3.1) doesn't specify any particular behavior for the GET method having a payload, therefore __it's considered an [anti-pattern](https://en.wikipedia.org/wiki/Anti-pattern)__.
      
          @default false
          */
      get allowGetBody() {
        return this._internals.allowGetBody;
      }
      set allowGetBody(value) {
        assert.boolean(value);
        this._internals.allowGetBody = value;
      }
      /**
          Automatically copy headers from piped streams.
      
          When piping a request into a Got stream (e.g., `request.pipe(got.stream(url))`), this controls whether headers from the source stream are automatically merged into the Got request headers.
      
          Note: Piped headers overwrite any explicitly set headers with the same name. To override this, either set `copyPipedHeaders` to `false` and manually copy safe headers, or use a `beforeRequest` hook to force specific header values after piping.
      
          Useful for proxy scenarios, but you may want to disable this to filter out headers like `Host`, `Connection`, `Authorization`, etc.
      
          @default true
      
          @example
          ```
          import got from 'got';
          import {pipeline} from 'node:stream/promises';
      
          // Disable automatic header copying and manually copy only safe headers
          server.get('/proxy', async (request, response) => {
              const gotStream = got.stream('https://example.com', {
                  copyPipedHeaders: false,
                  headers: {
                      'user-agent': request.headers['user-agent'],
                      'accept': request.headers['accept'],
                      // Explicitly NOT copying host, connection, authorization, etc.
                  }
              });
      
              await pipeline(request, gotStream, response);
          });
          ```
      
          @example
          ```
          import got from 'got';
      
          // Override piped headers using beforeRequest hook
          const gotStream = got.stream('https://example.com', {
              hooks: {
                  beforeRequest: [
                      options => {
                          // Force specific header values after piping
                          options.headers.host = 'example.com';
                          delete options.headers.authorization;
                      }
                  ]
              }
          });
          ```
          */
      get copyPipedHeaders() {
        return this._internals.copyPipedHeaders;
      }
      set copyPipedHeaders(value) {
        assert.boolean(value);
        this._internals.copyPipedHeaders = value;
      }
      /**
          Request headers.
      
          Existing headers will be overwritten. Headers set to `undefined` will be omitted.
      
          @default {}
          */
      get headers() {
        return this._internals.headers;
      }
      set headers(value) {
        assertPlainObject2("headers", value);
        if (this._merging) {
          Object.assign(this._internals.headers, lowercaseKeys(value));
        } else {
          this._internals.headers = lowercaseKeys(value);
        }
      }
      /**
          Specifies if the HTTP request method should be [rewritten as `GET`](https://tools.ietf.org/html/rfc7231#section-6.4) on redirects.
      
          As the [specification](https://tools.ietf.org/html/rfc7231#section-6.4) prefers to rewrite the HTTP method only on `303` responses, this is Got's default behavior.
          Setting `methodRewriting` to `true` will also rewrite `301` and `302` responses, as allowed by the spec. This is the behavior followed by `curl` and browsers.
      
          __Note__: Got never performs method rewriting on `307` and `308` responses, as this is [explicitly prohibited by the specification](https://www.rfc-editor.org/rfc/rfc7231#section-6.4.7).
      
          @default false
          */
      get methodRewriting() {
        return this._internals.methodRewriting;
      }
      set methodRewriting(value) {
        assert.boolean(value);
        this._internals.methodRewriting = value;
      }
      /**
          Indicates which DNS record family to use.
      
          Values:
          - `undefined`: IPv4 (if present) or IPv6
          - `4`: Only IPv4
          - `6`: Only IPv6
      
          @default undefined
          */
      get dnsLookupIpVersion() {
        return this._internals.dnsLookupIpVersion;
      }
      set dnsLookupIpVersion(value) {
        if (value !== void 0 && value !== 4 && value !== 6) {
          throw new TypeError(`Invalid DNS lookup IP version: ${value}`);
        }
        this._internals.dnsLookupIpVersion = value;
      }
      /**
          A function used to parse JSON responses.
      
          @example
          ```
          import got from 'got';
          import Bourne from '@hapi/bourne';
      
          const parsed = await got('https://example.com', {
              parseJson: text => Bourne.parse(text)
          }).json();
      
          console.log(parsed);
          ```
          */
      get parseJson() {
        return this._internals.parseJson;
      }
      set parseJson(value) {
        assert.function(value);
        this._internals.parseJson = value;
      }
      /**
          A function used to stringify the body of JSON requests.
      
          @example
          ```
          import got from 'got';
      
          await got.post('https://example.com', {
              stringifyJson: object => JSON.stringify(object, (key, value) => {
                  if (key.startsWith('_')) {
                      return;
                  }
      
                  return value;
              }),
              json: {
                  some: 'payload',
                  _ignoreMe: 1234
              }
          });
          ```
      
          @example
          ```
          import got from 'got';
      
          await got.post('https://example.com', {
              stringifyJson: object => JSON.stringify(object, (key, value) => {
                  if (typeof value === 'number') {
                      return value.toString();
                  }
      
                  return value;
              }),
              json: {
                  some: 'payload',
                  number: 1
              }
          });
          ```
          */
      get stringifyJson() {
        return this._internals.stringifyJson;
      }
      set stringifyJson(value) {
        assert.function(value);
        this._internals.stringifyJson = value;
      }
      /**
          An object representing `limit`, `calculateDelay`, `methods`, `statusCodes`, `maxRetryAfter` and `errorCodes` fields for maximum retry count, retry handler, allowed methods, allowed status codes, maximum [`Retry-After`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Retry-After) time and allowed error codes.
      
          Delays between retries counts with function `1000 * Math.pow(2, retry) + Math.random() * 100`, where `retry` is attempt number (starts from 1).
      
          The `calculateDelay` property is a `function` that receives an object with `attemptCount`, `retryOptions`, `error` and `computedValue` properties for current retry count, the retry options, error and default computed value.
          The function must return a delay in milliseconds (or a Promise resolving with it) (`0` return value cancels retry).
      
          The `enforceRetryRules` property is a `boolean` that, when set to `true`, enforces the `limit`, `methods`, `statusCodes`, and `errorCodes` options before calling `calculateDelay`. Your `calculateDelay` function is only invoked when a retry is allowed based on these criteria. When `false` (default), `calculateDelay` receives the computed value but can override all retry logic.
      
          __Note:__ When `enforceRetryRules` is `false`, you must check `computedValue` in your `calculateDelay` function to respect the default retry logic. When `true`, the retry rules are enforced automatically.
      
          By default, it retries *only* on the specified methods, status codes, and on these network errors:
      
          - `ETIMEDOUT`: One of the [timeout](#timeout) limits were reached.
          - `ECONNRESET`: Connection was forcibly closed by a peer.
          - `EADDRINUSE`: Could not bind to any free port.
          - `ECONNREFUSED`: Connection was refused by the server.
          - `EPIPE`: The remote side of the stream being written has been closed.
          - `ENOTFOUND`: Couldn't resolve the hostname to an IP address.
          - `ENETUNREACH`: No internet connection.
          - `EAI_AGAIN`: DNS lookup timed out.
      
          __Note__: If `maxRetryAfter` is set to `undefined`, it will use `options.timeout`.
          __Note__: If [`Retry-After`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Retry-After) header is greater than `maxRetryAfter`, it will cancel the request.
          */
      get retry() {
        return this._internals.retry;
      }
      set retry(value) {
        assertPlainObject2("retry", value);
        assertAny2("retry.calculateDelay", [distribution_default.function, distribution_default.undefined], value.calculateDelay);
        assertAny2("retry.maxRetryAfter", [distribution_default.number, distribution_default.undefined], value.maxRetryAfter);
        assertAny2("retry.limit", [distribution_default.number, distribution_default.undefined], value.limit);
        assertAny2("retry.methods", [distribution_default.array, distribution_default.undefined], value.methods);
        assertAny2("retry.statusCodes", [distribution_default.array, distribution_default.undefined], value.statusCodes);
        assertAny2("retry.errorCodes", [distribution_default.array, distribution_default.undefined], value.errorCodes);
        assertAny2("retry.noise", [distribution_default.number, distribution_default.undefined], value.noise);
        assertAny2("retry.enforceRetryRules", [distribution_default.boolean, distribution_default.undefined], value.enforceRetryRules);
        if (value.noise && Math.abs(value.noise) > 100) {
          throw new Error(`The maximum acceptable retry noise is +/- 100ms, got ${value.noise}`);
        }
        for (const key in value) {
          if (!(key in this._internals.retry)) {
            throw new Error(`Unexpected retry option: ${key}`);
          }
        }
        if (this._merging) {
          Object.assign(this._internals.retry, value);
        } else {
          this._internals.retry = { ...value };
        }
        const { retry } = this._internals;
        retry.methods = [...new Set(retry.methods.map((method) => method.toUpperCase()))];
        retry.statusCodes = [...new Set(retry.statusCodes)];
        retry.errorCodes = [...new Set(retry.errorCodes)];
      }
      /**
          From `http.RequestOptions`.
      
          The IP address used to send the request from.
          */
      get localAddress() {
        return this._internals.localAddress;
      }
      set localAddress(value) {
        assertAny2("localAddress", [distribution_default.string, distribution_default.undefined], value);
        this._internals.localAddress = value;
      }
      /**
          The HTTP method used to make the request.
      
          @default 'GET'
          */
      get method() {
        return this._internals.method;
      }
      set method(value) {
        assert.string(value);
        this._internals.method = value.toUpperCase();
      }
      get createConnection() {
        return this._internals.createConnection;
      }
      set createConnection(value) {
        assertAny2("createConnection", [distribution_default.function, distribution_default.undefined], value);
        this._internals.createConnection = value;
      }
      /**
          From `http-cache-semantics`
      
          @default {}
          */
      get cacheOptions() {
        return this._internals.cacheOptions;
      }
      set cacheOptions(value) {
        assertPlainObject2("cacheOptions", value);
        assertAny2("cacheOptions.shared", [distribution_default.boolean, distribution_default.undefined], value.shared);
        assertAny2("cacheOptions.cacheHeuristic", [distribution_default.number, distribution_default.undefined], value.cacheHeuristic);
        assertAny2("cacheOptions.immutableMinTimeToLive", [distribution_default.number, distribution_default.undefined], value.immutableMinTimeToLive);
        assertAny2("cacheOptions.ignoreCargoCult", [distribution_default.boolean, distribution_default.undefined], value.ignoreCargoCult);
        for (const key in value) {
          if (!(key in this._internals.cacheOptions)) {
            throw new Error(`Cache option \`${key}\` does not exist`);
          }
        }
        if (this._merging) {
          Object.assign(this._internals.cacheOptions, value);
        } else {
          this._internals.cacheOptions = { ...value };
        }
      }
      /**
      Options for the advanced HTTPS API.
      */
      get https() {
        return this._internals.https;
      }
      set https(value) {
        assertPlainObject2("https", value);
        assertAny2("https.rejectUnauthorized", [distribution_default.boolean, distribution_default.undefined], value.rejectUnauthorized);
        assertAny2("https.checkServerIdentity", [distribution_default.function, distribution_default.undefined], value.checkServerIdentity);
        assertAny2("https.serverName", [distribution_default.string, distribution_default.undefined], value.serverName);
        assertAny2("https.certificateAuthority", [distribution_default.string, distribution_default.object, distribution_default.array, distribution_default.undefined], value.certificateAuthority);
        assertAny2("https.key", [distribution_default.string, distribution_default.object, distribution_default.array, distribution_default.undefined], value.key);
        assertAny2("https.certificate", [distribution_default.string, distribution_default.object, distribution_default.array, distribution_default.undefined], value.certificate);
        assertAny2("https.passphrase", [distribution_default.string, distribution_default.undefined], value.passphrase);
        assertAny2("https.pfx", [distribution_default.string, distribution_default.buffer, distribution_default.array, distribution_default.undefined], value.pfx);
        assertAny2("https.alpnProtocols", [distribution_default.array, distribution_default.undefined], value.alpnProtocols);
        assertAny2("https.ciphers", [distribution_default.string, distribution_default.undefined], value.ciphers);
        assertAny2("https.dhparam", [distribution_default.string, distribution_default.buffer, distribution_default.undefined], value.dhparam);
        assertAny2("https.signatureAlgorithms", [distribution_default.string, distribution_default.undefined], value.signatureAlgorithms);
        assertAny2("https.minVersion", [distribution_default.string, distribution_default.undefined], value.minVersion);
        assertAny2("https.maxVersion", [distribution_default.string, distribution_default.undefined], value.maxVersion);
        assertAny2("https.honorCipherOrder", [distribution_default.boolean, distribution_default.undefined], value.honorCipherOrder);
        assertAny2("https.tlsSessionLifetime", [distribution_default.number, distribution_default.undefined], value.tlsSessionLifetime);
        assertAny2("https.ecdhCurve", [distribution_default.string, distribution_default.undefined], value.ecdhCurve);
        assertAny2("https.certificateRevocationLists", [distribution_default.string, distribution_default.buffer, distribution_default.array, distribution_default.undefined], value.certificateRevocationLists);
        assertAny2("https.secureOptions", [distribution_default.number, distribution_default.undefined], value.secureOptions);
        for (const key in value) {
          if (!(key in this._internals.https)) {
            throw new Error(`HTTPS option \`${key}\` does not exist`);
          }
        }
        if (this._merging) {
          Object.assign(this._internals.https, value);
        } else {
          this._internals.https = { ...value };
        }
      }
      /**
          [Encoding](https://nodejs.org/api/buffer.html#buffer_buffers_and_character_encodings) to be used on `setEncoding` of the response data.
      
          To get a [`Buffer`](https://nodejs.org/api/buffer.html), you need to set `responseType` to `buffer` instead.
          Don't set this option to `null`.
      
          __Note__: This doesn't affect streams! Instead, you need to do `got.stream(...).setEncoding(encoding)`.
      
          @default 'utf-8'
          */
      get encoding() {
        return this._internals.encoding;
      }
      set encoding(value) {
        if (value === null) {
          throw new TypeError("To get a Buffer, set `options.responseType` to `buffer` instead");
        }
        assertAny2("encoding", [distribution_default.string, distribution_default.undefined], value);
        this._internals.encoding = value;
      }
      /**
          When set to `true` the promise will return the Response body instead of the Response object.
      
          @default false
          */
      get resolveBodyOnly() {
        return this._internals.resolveBodyOnly;
      }
      set resolveBodyOnly(value) {
        assert.boolean(value);
        this._internals.resolveBodyOnly = value;
      }
      /**
          Returns a `Stream` instead of a `Promise`.
          This is equivalent to calling `got.stream(url, options?)`.
      
          @default false
          */
      get isStream() {
        return this._internals.isStream;
      }
      set isStream(value) {
        assert.boolean(value);
        this._internals.isStream = value;
      }
      /**
          The parsing method.
      
          The promise also has `.text()`, `.json()` and `.buffer()` methods which return another Got promise for the parsed body.
      
          It's like setting the options to `{responseType: 'json', resolveBodyOnly: true}` but without affecting the main Got promise.
      
          __Note__: When using streams, this option is ignored.
      
          @example
          ```
          const responsePromise = got(url);
          const bufferPromise = responsePromise.buffer();
          const jsonPromise = responsePromise.json();
      
          const [response, buffer, json] = Promise.all([responsePromise, bufferPromise, jsonPromise]);
          // `response` is an instance of Got Response
          // `buffer` is an instance of Buffer
          // `json` is an object
          ```
      
          @example
          ```
          // This
          const body = await got(url).json();
      
          // is semantically the same as this
          const body = await got(url, {responseType: 'json', resolveBodyOnly: true});
          ```
          */
      get responseType() {
        return this._internals.responseType;
      }
      set responseType(value) {
        if (value === void 0) {
          this._internals.responseType = "text";
          return;
        }
        if (value !== "text" && value !== "buffer" && value !== "json") {
          throw new Error(`Invalid \`responseType\` option: ${value}`);
        }
        this._internals.responseType = value;
      }
      get pagination() {
        return this._internals.pagination;
      }
      set pagination(value) {
        assert.object(value);
        if (this._merging) {
          Object.assign(this._internals.pagination, value);
        } else {
          this._internals.pagination = value;
        }
      }
      get auth() {
        throw new Error("Parameter `auth` is deprecated. Use `username` / `password` instead.");
      }
      set auth(_value) {
        throw new Error("Parameter `auth` is deprecated. Use `username` / `password` instead.");
      }
      get setHost() {
        return this._internals.setHost;
      }
      set setHost(value) {
        assert.boolean(value);
        this._internals.setHost = value;
      }
      get maxHeaderSize() {
        return this._internals.maxHeaderSize;
      }
      set maxHeaderSize(value) {
        assertAny2("maxHeaderSize", [distribution_default.number, distribution_default.undefined], value);
        this._internals.maxHeaderSize = value;
      }
      get enableUnixSockets() {
        return this._internals.enableUnixSockets;
      }
      set enableUnixSockets(value) {
        assert.boolean(value);
        this._internals.enableUnixSockets = value;
      }
      /**
          Throw an error if the server response's `content-length` header value doesn't match the number of bytes received.
      
          This is useful for detecting truncated responses and follows RFC 9112 requirements for message completeness.
      
          __Note__: Responses without a `content-length` header are not validated.
          __Note__: When enabled and validation fails, a `ReadError` with code `ERR_HTTP_CONTENT_LENGTH_MISMATCH` will be thrown.
      
          @default false
          */
      get strictContentLength() {
        return this._internals.strictContentLength;
      }
      set strictContentLength(value) {
        assert.boolean(value);
        this._internals.strictContentLength = value;
      }
      // eslint-disable-next-line @typescript-eslint/naming-convention
      toJSON() {
        return { ...this._internals };
      }
      [Symbol.for("nodejs.util.inspect.custom")](_depth, options) {
        return (0, import_node_util4.inspect)(this._internals, options);
      }
      createNativeRequestOptions() {
        var _a;
        const internals = this._internals;
        const url = internals.url;
        let agent;
        if (url.protocol === "https:") {
          if (internals.http2) {
            agent = {
              ...internals.agent,
              http2: internals.agent.http2 ?? import_http2_wrapper.default.globalAgent
            };
          } else {
            agent = internals.agent.https;
          }
        } else {
          agent = internals.agent.http;
        }
        const { https: https2 } = internals;
        let { pfx } = https2;
        if (distribution_default.array(pfx) && distribution_default.plainObject(pfx[0])) {
          pfx = pfx.map((object) => ({
            buf: object.buffer,
            passphrase: object.passphrase
          }));
        }
        return {
          ...internals.cacheOptions,
          ...this._unixOptions,
          // HTTPS options
          // eslint-disable-next-line @typescript-eslint/naming-convention
          ALPNProtocols: https2.alpnProtocols,
          ca: https2.certificateAuthority,
          cert: https2.certificate,
          key: https2.key,
          passphrase: https2.passphrase,
          pfx: https2.pfx,
          rejectUnauthorized: https2.rejectUnauthorized,
          checkServerIdentity: https2.checkServerIdentity ?? import_node_tls.checkServerIdentity,
          servername: https2.serverName,
          ciphers: https2.ciphers,
          honorCipherOrder: https2.honorCipherOrder,
          minVersion: https2.minVersion,
          maxVersion: https2.maxVersion,
          sigalgs: https2.signatureAlgorithms,
          sessionTimeout: https2.tlsSessionLifetime,
          dhparam: https2.dhparam,
          ecdhCurve: https2.ecdhCurve,
          crl: https2.certificateRevocationLists,
          secureOptions: https2.secureOptions,
          // HTTP options
          lookup: internals.dnsLookup ?? ((_a = internals.dnsCache) == null ? void 0 : _a.lookup),
          family: internals.dnsLookupIpVersion,
          agent,
          setHost: internals.setHost,
          method: internals.method,
          maxHeaderSize: internals.maxHeaderSize,
          localAddress: internals.localAddress,
          headers: internals.headers,
          createConnection: internals.createConnection,
          timeout: internals.http2 ? getHttp2TimeoutOption(internals) : void 0,
          // HTTP/2 options
          h2session: internals.h2session
        };
      }
      getRequestFunction() {
        const url = this._internals.url;
        const { request } = this._internals;
        if (!request && url) {
          return this.getFallbackRequestFunction();
        }
        return request;
      }
      getFallbackRequestFunction() {
        const url = this._internals.url;
        if (!url) {
          return;
        }
        if (url.protocol === "https:") {
          if (this._internals.http2) {
            if (major < 15 || major === 15 && minor < 10) {
              const error = new Error("To use the `http2` option, install Node.js 15.10.0 or above");
              error.code = "EUNSUPPORTED";
              throw error;
            }
            return import_http2_wrapper.default.auto;
          }
          return import_node_https.default.request;
        }
        return import_node_http.default.request;
      }
      freeze() {
        const options = this._internals;
        Object.freeze(options);
        Object.freeze(options.hooks);
        Object.freeze(options.hooks.afterResponse);
        Object.freeze(options.hooks.beforeError);
        Object.freeze(options.hooks.beforeRedirect);
        Object.freeze(options.hooks.beforeRequest);
        Object.freeze(options.hooks.beforeRetry);
        Object.freeze(options.hooks.init);
        Object.freeze(options.https);
        Object.freeze(options.cacheOptions);
        Object.freeze(options.agent);
        Object.freeze(options.headers);
        Object.freeze(options.timeout);
        Object.freeze(options.retry);
        Object.freeze(options.retry.errorCodes);
        Object.freeze(options.retry.methods);
        Object.freeze(options.retry.statusCodes);
      }
    };
  }
});

// ../packages/curness-core/node_modules/got/dist/source/core/response.js
var isResponseOk, ParseError, parseBody;
var init_response = __esm({
  "../packages/curness-core/node_modules/got/dist/source/core/response.js"() {
    init_errors();
    isResponseOk = (response) => {
      const { statusCode } = response;
      const { followRedirect } = response.request.options;
      const shouldFollow = typeof followRedirect === "function" ? followRedirect(response) : followRedirect;
      const limitStatusCode = shouldFollow ? 299 : 399;
      return statusCode >= 200 && statusCode <= limitStatusCode || statusCode === 304;
    };
    ParseError = class extends RequestError {
      name = "ParseError";
      code = "ERR_BODY_PARSE_FAILURE";
      constructor(error, response) {
        const { options } = response.request;
        super(`${error.message} in "${options.url.toString()}"`, error, response.request);
      }
    };
    parseBody = (response, responseType, parseJson, encoding) => {
      const { rawBody } = response;
      try {
        if (responseType === "text") {
          return rawBody.toString(encoding);
        }
        if (responseType === "json") {
          return rawBody.length === 0 ? "" : parseJson(rawBody.toString(encoding));
        }
        if (responseType === "buffer") {
          return rawBody;
        }
      } catch (error) {
        throw new ParseError(error, response);
      }
      throw new ParseError({
        message: `Unknown body type '${responseType}'`,
        name: "Error"
      }, response);
    };
  }
});

// ../packages/curness-core/node_modules/got/dist/source/core/utils/is-client-request.js
function isClientRequest(clientRequest) {
  return clientRequest.writable && !clientRequest.writableEnded;
}
var is_client_request_default;
var init_is_client_request = __esm({
  "../packages/curness-core/node_modules/got/dist/source/core/utils/is-client-request.js"() {
    is_client_request_default = isClientRequest;
  }
});

// ../packages/curness-core/node_modules/got/dist/source/core/utils/is-unix-socket-url.js
function isUnixSocketURL(url) {
  return url.protocol === "unix:" || url.hostname === "unix";
}
function getUnixSocketPath(url) {
  var _a, _b;
  if (!isUnixSocketURL(url)) {
    return void 0;
  }
  return (_b = (_a = /(?<socketPath>.+?):(?<path>.+)/.exec(`${url.pathname}${url.search}`)) == null ? void 0 : _a.groups) == null ? void 0 : _b.socketPath;
}
var init_is_unix_socket_url = __esm({
  "../packages/curness-core/node_modules/got/dist/source/core/utils/is-unix-socket-url.js"() {
  }
});

// ../packages/curness-core/node_modules/got/dist/source/core/diagnostics-channel.js
function generateRequestId() {
  return (0, import_node_crypto2.randomUUID)();
}
function publishRequestCreate(message) {
  if (channels.requestCreate.hasSubscribers) {
    channels.requestCreate.publish(message);
  }
}
function publishRequestStart(message) {
  if (channels.requestStart.hasSubscribers) {
    channels.requestStart.publish(message);
  }
}
function publishResponseStart(message) {
  if (channels.responseStart.hasSubscribers) {
    channels.responseStart.publish(message);
  }
}
function publishResponseEnd(message) {
  if (channels.responseEnd.hasSubscribers) {
    channels.responseEnd.publish(message);
  }
}
function publishRetry(message) {
  if (channels.retry.hasSubscribers) {
    channels.retry.publish(message);
  }
}
function publishError(message) {
  if (channels.error.hasSubscribers) {
    channels.error.publish(message);
  }
}
function publishRedirect(message) {
  if (channels.redirect.hasSubscribers) {
    channels.redirect.publish(message);
  }
}
var import_node_crypto2, import_node_diagnostics_channel, channels;
var init_diagnostics_channel = __esm({
  "../packages/curness-core/node_modules/got/dist/source/core/diagnostics-channel.js"() {
    import_node_crypto2 = require("node:crypto");
    import_node_diagnostics_channel = __toESM(require("node:diagnostics_channel"), 1);
    channels = {
      requestCreate: import_node_diagnostics_channel.default.channel("got:request:create"),
      requestStart: import_node_diagnostics_channel.default.channel("got:request:start"),
      responseStart: import_node_diagnostics_channel.default.channel("got:response:start"),
      responseEnd: import_node_diagnostics_channel.default.channel("got:response:end"),
      retry: import_node_diagnostics_channel.default.channel("got:request:retry"),
      error: import_node_diagnostics_channel.default.channel("got:request:error"),
      redirect: import_node_diagnostics_channel.default.channel("got:response:redirect")
    };
  }
});

// ../packages/curness-core/node_modules/got/dist/source/core/index.js
var import_node_process2, import_node_buffer, import_node_stream4, import_node_http2, supportsBrotli, supportsZstd2, methodsWithoutBody, cacheableStore, redirectCodes, errorsProcessedByHooks, proxiedRequestEvents, noop3, Request;
var init_core = __esm({
  "../packages/curness-core/node_modules/got/dist/source/core/index.js"() {
    import_node_process2 = __toESM(require("node:process"), 1);
    import_node_buffer = require("node:buffer");
    import_node_stream4 = require("node:stream");
    import_node_http2 = __toESM(require("node:http"), 1);
    init_byte_counter();
    init_dist3();
    init_decompress_response();
    init_distribution();
    init_lib();
    init_timer();
    init_get_body_size();
    init_is_form_data();
    init_proxy_events();
    init_timed_out();
    init_url_to_options();
    init_weakable_map();
    init_calculate_retry_delay();
    init_options();
    init_response();
    init_is_client_request();
    init_is_unix_socket_url();
    init_errors();
    init_diagnostics_channel();
    supportsBrotli = distribution_default.string(import_node_process2.default.versions.brotli);
    supportsZstd2 = distribution_default.string(import_node_process2.default.versions.zstd);
    methodsWithoutBody = /* @__PURE__ */ new Set(["GET", "HEAD"]);
    cacheableStore = new WeakableMap();
    redirectCodes = /* @__PURE__ */ new Set([300, 301, 302, 303, 304, 307, 308]);
    errorsProcessedByHooks = /* @__PURE__ */ new WeakSet();
    proxiedRequestEvents = [
      "socket",
      "connect",
      "continue",
      "information",
      "upgrade"
    ];
    noop3 = () => {
    };
    Request = class _Request extends import_node_stream4.Duplex {
      // @ts-expect-error - Ignoring for now.
      ["constructor"];
      _noPipe;
      // @ts-expect-error https://github.com/microsoft/TypeScript/issues/9568
      options;
      response;
      requestUrl;
      redirectUrls = [];
      retryCount = 0;
      _stopReading = false;
      _stopRetry = noop3;
      _downloadedSize = 0;
      _uploadedSize = 0;
      _pipedServerResponses = /* @__PURE__ */ new Set();
      _request;
      _responseSize;
      _bodySize;
      _unproxyEvents = noop3;
      _isFromCache;
      _triggerRead = false;
      _jobs = [];
      _cancelTimeouts = noop3;
      _removeListeners = noop3;
      _nativeResponse;
      _flushed = false;
      _aborted = false;
      _expectedContentLength;
      _compressedBytesCount;
      _requestId = generateRequestId();
      // We need this because `this._request` if `undefined` when using cache
      _requestInitialized = false;
      constructor(url, options, defaults2) {
        var _a;
        super({
          // Don't destroy immediately, as the error may be emitted on unsuccessful retry
          autoDestroy: false,
          // It needs to be zero because we're just proxying the data to another stream
          highWaterMark: 0
        });
        this.on("pipe", (source) => {
          if (this.options.copyPipedHeaders && (source == null ? void 0 : source.headers)) {
            Object.assign(this.options.headers, source.headers);
          }
        });
        this.on("newListener", (event) => {
          if (event === "retry" && this.listenerCount("retry") > 0) {
            throw new Error("A retry listener has been attached already.");
          }
        });
        try {
          this.options = new Options(url, options, defaults2);
          if (!this.options.url) {
            if (this.options.prefixUrl === "") {
              throw new TypeError("Missing `url` property");
            }
            this.options.url = "";
          }
          this.requestUrl = this.options.url;
          publishRequestCreate({
            requestId: this._requestId,
            url: ((_a = this.options.url) == null ? void 0 : _a.toString()) ?? "",
            method: this.options.method
          });
        } catch (error) {
          const { options: options2 } = error;
          if (options2) {
            this.options = options2;
          }
          this.flush = async () => {
            this.flush = async () => {
            };
            import_node_process2.default.nextTick(() => {
              if (this.options) {
                this._beforeError(error);
              } else {
                const requestError = error instanceof RequestError ? error : new RequestError(error.message, error, this);
                this.destroy(requestError);
              }
            });
          };
          return;
        }
        const { body } = this.options;
        if (distribution_default.nodeStream(body)) {
          body.once("error", (error) => {
            if (this._flushed) {
              this._beforeError(new UploadError(error, this));
            } else {
              this.flush = async () => {
                this.flush = async () => {
                };
                this._beforeError(new UploadError(error, this));
              };
            }
          });
        }
        if (this.options.signal) {
          const abort = () => {
            var _a2, _b;
            if (((_b = (_a2 = this.options.signal) == null ? void 0 : _a2.reason) == null ? void 0 : _b.name) === "TimeoutError") {
              this.destroy(new TimeoutError(this.options.signal.reason, this.timings, this));
            } else {
              this.destroy(new AbortError(this));
            }
          };
          if (this.options.signal.aborted) {
            abort();
          } else {
            this.options.signal.addEventListener("abort", abort);
            this._removeListeners = () => {
              var _a2;
              (_a2 = this.options.signal) == null ? void 0 : _a2.removeEventListener("abort", abort);
            };
          }
        }
      }
      async flush() {
        var _a;
        if (this._flushed) {
          return;
        }
        this._flushed = true;
        try {
          await this._finalizeBody();
          if (this.destroyed) {
            return;
          }
          await this._makeRequest();
          if (this.destroyed) {
            (_a = this._request) == null ? void 0 : _a.destroy();
            return;
          }
          for (const job of this._jobs) {
            job();
          }
          this._jobs.length = 0;
          this._requestInitialized = true;
        } catch (error) {
          this._beforeError(error);
        }
      }
      _beforeError(error) {
        if (this._stopReading) {
          return;
        }
        const { response, options } = this;
        const attemptCount = this.retryCount + (error.name === "RetryError" ? 0 : 1);
        this._stopReading = true;
        if (!(error instanceof RequestError)) {
          error = new RequestError(error.message, error, this);
        }
        const typedError = error;
        void (async () => {
          var _a, _b;
          if ((response == null ? void 0 : response.readable) && !response.rawBody && !((_b = (_a = this._request) == null ? void 0 : _a.socket) == null ? void 0 : _b.destroyed)) {
            response.setEncoding(this.readableEncoding);
            const success = await this._setRawBody(response);
            if (success) {
              response.body = response.rawBody.toString();
            }
          }
          if (this.listenerCount("retry") !== 0) {
            let backoff;
            try {
              let retryAfter;
              if (response && "retry-after" in response.headers) {
                retryAfter = Number(response.headers["retry-after"]);
                if (Number.isNaN(retryAfter)) {
                  retryAfter = Date.parse(response.headers["retry-after"]) - Date.now();
                  if (retryAfter <= 0) {
                    retryAfter = 1;
                  }
                } else {
                  retryAfter *= 1e3;
                }
              }
              const retryOptions = options.retry;
              const computedValue = calculate_retry_delay_default({
                attemptCount,
                retryOptions,
                error: typedError,
                retryAfter,
                computedValue: retryOptions.maxRetryAfter ?? options.timeout.request ?? Number.POSITIVE_INFINITY
              });
              if (retryOptions.enforceRetryRules && computedValue === 0) {
                backoff = 0;
              } else {
                backoff = await retryOptions.calculateDelay({
                  attemptCount,
                  retryOptions,
                  error: typedError,
                  retryAfter,
                  computedValue
                });
              }
            } catch (error_) {
              void this._error(new RequestError(error_.message, error_, this));
              return;
            }
            if (backoff) {
              await new Promise((resolve) => {
                const timeout = setTimeout(resolve, backoff);
                this._stopRetry = () => {
                  clearTimeout(timeout);
                  resolve();
                };
              });
              if (this.destroyed) {
                return;
              }
              const bodyBeforeHooks = this.options.body;
              try {
                for (const hook of this.options.hooks.beforeRetry) {
                  await hook(typedError, this.retryCount + 1);
                }
              } catch (error_) {
                void this._error(new RequestError(error_.message, error_, this));
                return;
              }
              if (this.destroyed) {
                return;
              }
              const bodyAfterHooks = this.options.body;
              const bodyWasReassigned = bodyBeforeHooks !== bodyAfterHooks;
              if (bodyWasReassigned) {
                const oldBody = bodyBeforeHooks;
                this.options.body = void 0;
                this.destroy();
                if (distribution_default.nodeStream(oldBody) && oldBody !== bodyAfterHooks) {
                  oldBody.destroy();
                }
                if (distribution_default.nodeStream(bodyAfterHooks) && (bodyAfterHooks.readableEnded || bodyAfterHooks.destroyed)) {
                  throw new TypeError("The reassigned stream body must be readable. Ensure you provide a fresh, readable stream in the beforeRetry hook.");
                }
                this.options._internals.body = bodyAfterHooks;
              } else {
                this.destroy();
              }
              publishRetry({
                requestId: this._requestId,
                retryCount: this.retryCount + 1,
                error: typedError,
                delay: backoff
              });
              this.emit("retry", this.retryCount + 1, error, (updatedOptions) => {
                const request = new _Request(options.url, updatedOptions, options);
                request.retryCount = this.retryCount + 1;
                import_node_process2.default.nextTick(() => {
                  void request.flush();
                });
                return request;
              });
              return;
            }
          }
          void this._error(typedError);
        })();
      }
      _read() {
        this._triggerRead = true;
        const { response } = this;
        if (response && !this._stopReading) {
          if (response.readableLength) {
            this._triggerRead = false;
          }
          let data;
          while ((data = response.read()) !== null) {
            this._downloadedSize += data.length;
            const progress = this.downloadProgress;
            if (progress.percent < 1) {
              this.emit("downloadProgress", progress);
            }
            this.push(data);
          }
        }
      }
      _write(chunk2, encoding, callback) {
        const write = () => {
          this._writeRequest(chunk2, encoding, callback);
        };
        if (this._requestInitialized) {
          write();
        } else {
          this._jobs.push(write);
        }
      }
      _final(callback) {
        const endRequest = () => {
          if (!this._request || this._request.destroyed) {
            callback();
            return;
          }
          this._request.end((error) => {
            var _a, _b, _c;
            if ((_b = (_a = this._request) == null ? void 0 : _a._writableState) == null ? void 0 : _b.errored) {
              return;
            }
            if (!error) {
              this._bodySize = this._uploadedSize;
              this.emit("uploadProgress", this.uploadProgress);
              (_c = this._request) == null ? void 0 : _c.emit("upload-complete");
            }
            callback(error);
          });
        };
        if (this._requestInitialized) {
          endRequest();
        } else {
          this._jobs.push(endRequest);
        }
      }
      _destroy(error, callback) {
        var _a;
        this._stopReading = true;
        this.flush = async () => {
        };
        this._stopRetry();
        this._cancelTimeouts();
        this._removeListeners();
        if (this.options) {
          const { body } = this.options;
          if (distribution_default.nodeStream(body)) {
            body.destroy();
          }
        }
        if (this._request) {
          this._request.destroy();
        }
        const timings = (_a = this._request) == null ? void 0 : _a.timings;
        if (timings && distribution_default.undefined(timings.end) && !distribution_default.undefined(timings.response) && distribution_default.undefined(timings.error) && distribution_default.undefined(timings.abort)) {
          timings.end = Date.now();
          if (distribution_default.undefined(timings.phases.total)) {
            timings.phases.download = timings.end - timings.response;
            timings.phases.total = timings.end - timings.start;
          }
        }
        if (error !== null && !distribution_default.undefined(error)) {
          const processedByHooks = error instanceof Error && errorsProcessedByHooks.has(error);
          if (!processedByHooks && !(error instanceof RequestError)) {
            error = error instanceof Error ? new RequestError(error.message, error, this) : new RequestError(String(error), {}, this);
          }
        }
        callback(error);
      }
      pipe(destination, options) {
        if (destination instanceof import_node_http2.ServerResponse) {
          this._pipedServerResponses.add(destination);
        }
        return super.pipe(destination, options);
      }
      unpipe(destination) {
        if (destination instanceof import_node_http2.ServerResponse) {
          this._pipedServerResponses.delete(destination);
        }
        super.unpipe(destination);
        return this;
      }
      _checkContentLengthMismatch() {
        if (this.options.strictContentLength && this._expectedContentLength !== void 0) {
          const actualSize = this._compressedBytesCount ?? this._downloadedSize;
          if (actualSize !== this._expectedContentLength) {
            this._beforeError(new ReadError({
              message: `Content-Length mismatch: expected ${this._expectedContentLength} bytes, received ${actualSize} bytes`,
              name: "Error",
              code: "ERR_HTTP_CONTENT_LENGTH_MISMATCH"
            }, this));
            return true;
          }
        }
        return false;
      }
      async _finalizeBody() {
        const { options } = this;
        const { headers } = options;
        const isForm = !distribution_default.undefined(options.form);
        const isJSON = !distribution_default.undefined(options.json);
        const isBody = !distribution_default.undefined(options.body);
        const cannotHaveBody = methodsWithoutBody.has(options.method) && !(options.method === "GET" && options.allowGetBody);
        if (isForm || isJSON || isBody) {
          if (cannotHaveBody) {
            throw new TypeError(`The \`${options.method}\` method cannot be used with a body`);
          }
          const noContentType = !distribution_default.string(headers["content-type"]);
          if (isBody) {
            if (isFormData2(options.body)) {
              const encoder = new FormDataEncoder(options.body);
              if (noContentType) {
                headers["content-type"] = encoder.headers["Content-Type"];
              }
              if ("Content-Length" in encoder.headers) {
                headers["content-length"] = encoder.headers["Content-Length"];
              }
              options.body = encoder.encode();
            }
            if (isFormData3(options.body) && noContentType) {
              headers["content-type"] = `multipart/form-data; boundary=${options.body.getBoundary()}`;
            }
          } else if (isForm) {
            if (noContentType) {
              headers["content-type"] = "application/x-www-form-urlencoded";
            }
            const { form } = options;
            options.form = void 0;
            options.body = new URLSearchParams(form).toString();
          } else {
            if (noContentType) {
              headers["content-type"] = "application/json";
            }
            const { json } = options;
            options.json = void 0;
            options.body = options.stringifyJson(json);
          }
          const uploadBodySize = await getBodySize(options.body, options.headers);
          if (distribution_default.undefined(headers["content-length"]) && distribution_default.undefined(headers["transfer-encoding"]) && !cannotHaveBody && !distribution_default.undefined(uploadBodySize)) {
            headers["content-length"] = String(uploadBodySize);
          }
        }
        if (options.responseType === "json" && !("accept" in options.headers)) {
          options.headers.accept = "application/json";
        }
        this._bodySize = Number(headers["content-length"]) || void 0;
      }
      async _onResponseBase(response) {
        if (this.isAborted) {
          return;
        }
        const { options } = this;
        const { url } = options;
        this._nativeResponse = response;
        const statusCode = response.statusCode;
        const { method } = options;
        const hasNoBody = method === "HEAD" || statusCode >= 100 && statusCode < 200 || statusCode === 204 || statusCode === 205 || statusCode === 304;
        if (options.decompress && !hasNoBody) {
          if (options.strictContentLength) {
            this._compressedBytesCount = 0;
            this._nativeResponse.on("data", (chunk2) => {
              this._compressedBytesCount += byteLength(chunk2);
            });
          }
          response = decompressResponse(response);
        }
        const typedResponse = response;
        typedResponse.statusMessage = typedResponse.statusMessage || import_node_http2.default.STATUS_CODES[statusCode];
        typedResponse.url = options.url.toString();
        typedResponse.requestUrl = this.requestUrl;
        typedResponse.redirectUrls = this.redirectUrls;
        typedResponse.request = this;
        typedResponse.isFromCache = this._nativeResponse.fromCache ?? false;
        typedResponse.ip = this.ip;
        typedResponse.retryCount = this.retryCount;
        typedResponse.ok = isResponseOk(typedResponse);
        this._isFromCache = typedResponse.isFromCache;
        this._responseSize = Number(response.headers["content-length"]) || void 0;
        this.response = typedResponse;
        publishResponseStart({
          requestId: this._requestId,
          url: typedResponse.url,
          statusCode,
          headers: response.headers,
          isFromCache: typedResponse.isFromCache
        });
        response.once("error", (error) => {
          this._aborted = true;
          response.destroy();
          this._beforeError(new ReadError(error, this));
        });
        response.once("aborted", () => {
          this._aborted = true;
          if (!this._checkContentLengthMismatch()) {
            this._beforeError(new ReadError({
              name: "Error",
              message: "The server aborted pending request",
              code: "ECONNRESET"
            }, this));
          }
        });
        const rawCookies = response.headers["set-cookie"];
        if (distribution_default.object(options.cookieJar) && rawCookies) {
          let promises = rawCookies.map(async (rawCookie) => options.cookieJar.setCookie(rawCookie, url.toString()));
          if (options.ignoreInvalidCookies) {
            promises = promises.map(async (promise) => {
              try {
                await promise;
              } catch {
              }
            });
          }
          try {
            await Promise.all(promises);
          } catch (error) {
            this._beforeError(error);
            return;
          }
        }
        if (this.isAborted) {
          return;
        }
        if (response.headers.location && redirectCodes.has(statusCode)) {
          const shouldFollow = typeof options.followRedirect === "function" ? options.followRedirect(typedResponse) : options.followRedirect;
          if (shouldFollow) {
            response.resume();
            this._cancelTimeouts();
            this._unproxyEvents();
            if (this.redirectUrls.length >= options.maxRedirects) {
              this._beforeError(new MaxRedirectsError(this));
              return;
            }
            this._request = void 0;
            this._downloadedSize = 0;
            const updatedOptions = new Options(void 0, void 0, this.options);
            const serverRequestedGet = statusCode === 303 && updatedOptions.method !== "GET" && updatedOptions.method !== "HEAD";
            const canRewrite = statusCode !== 307 && statusCode !== 308;
            const userRequestedGet = updatedOptions.methodRewriting && canRewrite;
            if (serverRequestedGet || userRequestedGet) {
              updatedOptions.method = "GET";
              updatedOptions.body = void 0;
              updatedOptions.json = void 0;
              updatedOptions.form = void 0;
              delete updatedOptions.headers["content-length"];
            }
            try {
              const redirectBuffer = import_node_buffer.Buffer.from(response.headers.location, "binary").toString();
              const redirectUrl = new URL(redirectBuffer, url);
              if (!isUnixSocketURL(url) && isUnixSocketURL(redirectUrl)) {
                this._beforeError(new RequestError("Cannot redirect to UNIX socket", {}, this));
                return;
              }
              const isDifferentOrigin = redirectUrl.hostname !== url.hostname || redirectUrl.port !== url.port || getUnixSocketPath(url) !== getUnixSocketPath(redirectUrl);
              if (isDifferentOrigin) {
                if ("host" in updatedOptions.headers) {
                  delete updatedOptions.headers.host;
                }
                if ("cookie" in updatedOptions.headers) {
                  delete updatedOptions.headers.cookie;
                }
                if ("authorization" in updatedOptions.headers) {
                  delete updatedOptions.headers.authorization;
                }
                if (updatedOptions.username || updatedOptions.password) {
                  updatedOptions.username = "";
                  updatedOptions.password = "";
                }
              } else {
                redirectUrl.username = updatedOptions.username;
                redirectUrl.password = updatedOptions.password;
              }
              this.redirectUrls.push(redirectUrl);
              updatedOptions.url = redirectUrl;
              for (const hook of updatedOptions.hooks.beforeRedirect) {
                await hook(updatedOptions, typedResponse);
              }
              publishRedirect({
                requestId: this._requestId,
                fromUrl: url.toString(),
                toUrl: redirectUrl.toString(),
                statusCode
              });
              this.emit("redirect", updatedOptions, typedResponse);
              this.options = updatedOptions;
              await this._makeRequest();
            } catch (error) {
              this._beforeError(error);
              return;
            }
            return;
          }
        }
        if (options.isStream && options.throwHttpErrors && !isResponseOk(typedResponse)) {
          this._beforeError(new HTTPError(typedResponse));
          return;
        }
        const wasDecompressed = response !== this._nativeResponse;
        if (!hasNoBody && (!wasDecompressed || options.strictContentLength)) {
          const contentLengthHeader = this._nativeResponse.headers["content-length"];
          if (contentLengthHeader !== void 0) {
            const expectedLength = Number(contentLengthHeader);
            if (!Number.isNaN(expectedLength) && expectedLength >= 0) {
              this._expectedContentLength = expectedLength;
            }
          }
        }
        response.once("end", () => {
          if (this._checkContentLengthMismatch()) {
            return;
          }
          this._responseSize = this._downloadedSize;
          this.emit("downloadProgress", this.downloadProgress);
          publishResponseEnd({
            requestId: this._requestId,
            url: typedResponse.url,
            statusCode,
            bodySize: this._downloadedSize,
            timings: this.timings
          });
          this.push(null);
        });
        this.emit("downloadProgress", this.downloadProgress);
        response.on("readable", () => {
          if (this._triggerRead) {
            this._read();
          }
        });
        this.on("resume", () => {
          response.resume();
        });
        this.on("pause", () => {
          response.pause();
        });
        if (this._noPipe) {
          const success = await this._setRawBody();
          if (success) {
            this.emit("response", response);
          }
          return;
        }
        this.emit("response", response);
        for (const destination of this._pipedServerResponses) {
          if (destination.headersSent) {
            continue;
          }
          const wasDecompressed2 = response !== this._nativeResponse;
          for (const key in response.headers) {
            if (Object.hasOwn(response.headers, key)) {
              const value = response.headers[key];
              if (wasDecompressed2 && (key === "content-encoding" || key === "content-length")) {
                continue;
              }
              if (value !== void 0) {
                destination.setHeader(key, value);
              }
            }
          }
          destination.statusCode = statusCode;
        }
      }
      async _setRawBody(from = this) {
        if (from.readableEnded) {
          return false;
        }
        try {
          const fromArray = await from.toArray();
          const rawBody = isBuffer(fromArray.at(0)) ? import_node_buffer.Buffer.concat(fromArray) : import_node_buffer.Buffer.from(fromArray.join(""));
          if (!this.isAborted) {
            this.response.rawBody = rawBody;
            return true;
          }
        } catch {
        }
        return false;
      }
      async _onResponse(response) {
        try {
          await this._onResponseBase(response);
        } catch (error) {
          this._beforeError(error);
        }
      }
      _onRequest(request) {
        const { options } = this;
        const { timeout, url } = options;
        publishRequestStart({
          requestId: this._requestId,
          url: (url == null ? void 0 : url.toString()) ?? "",
          method: options.method,
          headers: options.headers
        });
        timer_default(request);
        this._cancelTimeouts = timedOut(request, timeout, url);
        if (this.options.http2) {
          request.removeAllListeners("timeout");
          request.once("socket", (socket) => {
            socket.removeAllListeners("timeout");
          });
        }
        const responseEventName = options.cache ? "cacheableResponse" : "response";
        request.once(responseEventName, (response) => {
          void this._onResponse(response);
        });
        request.once("error", (error) => {
          this._aborted = true;
          request.destroy();
          error = error instanceof TimeoutError2 ? new TimeoutError(error, this.timings, this) : new RequestError(error.message, error, this);
          this._beforeError(error);
        });
        this._unproxyEvents = proxyEvents(request, this, proxiedRequestEvents);
        this._request = request;
        this.emit("uploadProgress", this.uploadProgress);
        this._sendBody();
        this.emit("request", request);
      }
      async _asyncWrite(chunk2) {
        return new Promise((resolve, reject) => {
          super.write(chunk2, (error) => {
            if (error) {
              reject(error);
              return;
            }
            resolve();
          });
        });
      }
      _sendBody() {
        const { body } = this.options;
        const currentRequest = this.redirectUrls.length === 0 ? this : this._request ?? this;
        if (distribution_default.nodeStream(body)) {
          body.pipe(currentRequest);
        } else if (distribution_default.buffer(body)) {
          this._writeRequest(body, void 0, () => {
          });
          currentRequest.end();
        } else if (distribution_default.typedArray(body)) {
          const typedArray = body;
          const uint8View = new Uint8Array(typedArray.buffer, typedArray.byteOffset, typedArray.byteLength);
          this._writeRequest(uint8View, void 0, () => {
          });
          currentRequest.end();
        } else if (distribution_default.asyncIterable(body) || distribution_default.iterable(body) && !distribution_default.string(body) && !isBuffer(body)) {
          (async () => {
            try {
              for await (const chunk2 of body) {
                await this._asyncWrite(chunk2);
              }
              super.end();
            } catch (error) {
              this._beforeError(error);
            }
          })();
        } else if (distribution_default.undefined(body)) {
          const cannotHaveBody = methodsWithoutBody.has(this.options.method) && !(this.options.method === "GET" && this.options.allowGetBody);
          if ((this._noPipe ?? false) || cannotHaveBody || currentRequest !== this) {
            currentRequest.end();
          }
        } else {
          this._writeRequest(body, void 0, () => {
          });
          currentRequest.end();
        }
      }
      _prepareCache(cache) {
        if (cacheableStore.has(cache)) {
          return;
        }
        const cacheableRequest = new dist_default((requestOptions, handler) => {
          const wrappedHandler = handler ? (response) => {
            const { beforeCacheHooks, gotRequest } = requestOptions;
            if (!beforeCacheHooks || beforeCacheHooks.length === 0) {
              handler(response);
              return;
            }
            try {
              for (const hook of beforeCacheHooks) {
                const result2 = hook(response);
                if (result2 === false) {
                  response.headers["cache-control"] = "no-cache, no-store, must-revalidate";
                  response.headers.pragma = "no-cache";
                  response.headers.expires = "0";
                  handler(response);
                  return;
                }
                if (distribution_default.promise(result2)) {
                  throw new TypeError("beforeCache hooks must be synchronous. The hook returned a Promise, but this hook must return synchronously. If you need async logic, use beforeRequest hook instead.");
                }
                if (result2 !== void 0) {
                  throw new TypeError("beforeCache hook must return false or undefined. To modify the response, mutate it directly.");
                }
              }
            } catch (error) {
              if (gotRequest) {
                gotRequest._beforeError(error instanceof RequestError ? error : new RequestError(error.message, error, gotRequest));
                return;
              }
              console.error("Got: beforeCache hook error (request context unavailable):", error);
              handler(response);
              return;
            }
            handler(response);
          } : handler;
          const result = requestOptions._request(requestOptions, wrappedHandler);
          if (distribution_default.promise(result)) {
            result.once = (event, handler2) => {
              if (event === "error") {
                (async () => {
                  try {
                    await result;
                  } catch (error) {
                    handler2(error);
                  }
                })();
              } else if (event === "abort" || event === "destroy") {
                (async () => {
                  try {
                    const request = await result;
                    request.once(event, handler2);
                  } catch {
                  }
                })();
              } else {
                throw new Error(`Unknown HTTP2 promise event: ${event}`);
              }
              return result;
            };
          }
          return result;
        }, cache);
        cacheableStore.set(cache, cacheableRequest.request());
      }
      async _createCacheableRequest(url, options) {
        return new Promise((resolve, reject) => {
          Object.assign(options, urlToOptions(url));
          let request;
          const cacheRequest = cacheableStore.get(options.cache)(options, async (response) => {
            response._readableState.autoDestroy = false;
            if (request) {
              const fix = () => {
                if (response.req) {
                  response.complete = response.req.res.complete;
                } else if (response.complete === void 0) {
                  response.complete = true;
                }
              };
              response.prependOnceListener("end", fix);
              fix();
              (await request).emit("cacheableResponse", response);
            }
            resolve(response);
          });
          cacheRequest.once("error", reject);
          cacheRequest.once("request", async (requestOrPromise) => {
            request = requestOrPromise;
            resolve(request);
          });
        });
      }
      async _makeRequest() {
        const { options } = this;
        const { headers, username, password } = options;
        const cookieJar = options.cookieJar;
        for (const key in headers) {
          if (distribution_default.undefined(headers[key])) {
            delete headers[key];
          } else if (distribution_default.null(headers[key])) {
            throw new TypeError(`Use \`undefined\` instead of \`null\` to delete the \`${key}\` header`);
          }
        }
        if (options.decompress && distribution_default.undefined(headers["accept-encoding"])) {
          const encodings = ["gzip", "deflate"];
          if (supportsBrotli) {
            encodings.push("br");
          }
          if (supportsZstd2) {
            encodings.push("zstd");
          }
          headers["accept-encoding"] = encodings.join(", ");
        }
        if (username || password) {
          const credentials = import_node_buffer.Buffer.from(`${username}:${password}`).toString("base64");
          headers.authorization = `Basic ${credentials}`;
        }
        if (cookieJar) {
          const cookieString = await cookieJar.getCookieString(options.url.toString());
          if (distribution_default.nonEmptyString(cookieString)) {
            headers.cookie = cookieString;
          }
        }
        let request;
        for (const hook of options.hooks.beforeRequest) {
          const result = await hook(options, { retryCount: this.retryCount });
          if (!distribution_default.undefined(result)) {
            request = () => result;
            break;
          }
        }
        request ||= options.getRequestFunction();
        const url = options.url;
        this._requestOptions = options.createNativeRequestOptions();
        if (options.cache) {
          this._requestOptions._request = request;
          this._requestOptions.cache = options.cache;
          this._requestOptions.body = options.body;
          this._requestOptions.beforeCacheHooks = options.hooks.beforeCache;
          this._requestOptions.gotRequest = this;
          try {
            this._prepareCache(options.cache);
          } catch (error) {
            throw new CacheError(error, this);
          }
        }
        const function_ = options.cache ? this._createCacheableRequest : request;
        try {
          let requestOrResponse = function_(url, this._requestOptions);
          if (distribution_default.promise(requestOrResponse)) {
            requestOrResponse = await requestOrResponse;
          }
          if (distribution_default.undefined(requestOrResponse)) {
            requestOrResponse = options.getFallbackRequestFunction()(url, this._requestOptions);
            if (distribution_default.promise(requestOrResponse)) {
              requestOrResponse = await requestOrResponse;
            }
          }
          if (is_client_request_default(requestOrResponse)) {
            this._onRequest(requestOrResponse);
          } else if (this.writableEnded) {
            void this._onResponse(requestOrResponse);
          } else {
            this.once("finish", () => {
              void this._onResponse(requestOrResponse);
            });
            this._sendBody();
          }
        } catch (error) {
          if (error instanceof CacheError2) {
            throw new CacheError(error, this);
          }
          throw error;
        }
      }
      async _error(error) {
        var _a, _b;
        try {
          if (this.options && error instanceof HTTPError && !this.options.throwHttpErrors) {
          } else if (this.options) {
            const hooks = this.options.hooks.beforeError;
            if (hooks.length > 0) {
              for (const hook of hooks) {
                error = await hook(error);
                if (!(error instanceof Error)) {
                  throw new TypeError(`The \`beforeError\` hook must return an Error instance. Received ${distribution_default.string(error) ? "string" : String(typeof error)}.`);
                }
              }
              if (!(error instanceof RequestError)) {
                errorsProcessedByHooks.add(error);
              }
            }
          }
        } catch (error_) {
          error = new RequestError(error_.message, error_, this);
        }
        publishError({
          requestId: this._requestId,
          url: ((_b = (_a = this.options) == null ? void 0 : _a.url) == null ? void 0 : _b.toString()) ?? "",
          error,
          timings: this.timings
        });
        this.destroy(error);
        if (this._noPipe) {
          import_node_process2.default.nextTick(() => {
            this.emit("error", error);
          });
        }
      }
      _writeRequest(chunk2, encoding, callback) {
        if (!this._request || this._request.destroyed) {
          callback();
          return;
        }
        this._request.write(chunk2, encoding, (error) => {
          if (!error && !this._request.destroyed) {
            const bytes = typeof chunk2 === "string" ? import_node_buffer.Buffer.from(chunk2, encoding) : chunk2;
            this._uploadedSize += byteLength(bytes);
            const progress = this.uploadProgress;
            if (progress.percent < 1) {
              this.emit("uploadProgress", progress);
            }
          }
          callback(error);
        });
      }
      /**
      The remote IP address.
      */
      get ip() {
        var _a;
        return (_a = this.socket) == null ? void 0 : _a.remoteAddress;
      }
      /**
      Indicates whether the request has been aborted or not.
      */
      get isAborted() {
        return this._aborted;
      }
      get socket() {
        var _a;
        return ((_a = this._request) == null ? void 0 : _a.socket) ?? void 0;
      }
      /**
      Progress event for downloading (receiving a response).
      */
      get downloadProgress() {
        let percent;
        if (this._responseSize) {
          percent = this._downloadedSize / this._responseSize;
        } else if (this._responseSize === this._downloadedSize) {
          percent = 1;
        } else {
          percent = 0;
        }
        return {
          percent,
          transferred: this._downloadedSize,
          total: this._responseSize
        };
      }
      /**
      Progress event for uploading (sending a request).
      */
      get uploadProgress() {
        let percent;
        if (this._bodySize) {
          percent = this._uploadedSize / this._bodySize;
        } else if (this._bodySize === this._uploadedSize) {
          percent = 1;
        } else {
          percent = 0;
        }
        return {
          percent,
          transferred: this._uploadedSize,
          total: this._bodySize
        };
      }
      /**
          The object contains the following properties:
      
          - `start` - Time when the request started.
          - `socket` - Time when a socket was assigned to the request.
          - `lookup` - Time when the DNS lookup finished.
          - `connect` - Time when the socket successfully connected.
          - `secureConnect` - Time when the socket securely connected.
          - `upload` - Time when the request finished uploading.
          - `response` - Time when the request fired `response` event.
          - `end` - Time when the response fired `end` event.
          - `error` - Time when the request fired `error` event.
          - `abort` - Time when the request fired `abort` event.
          - `phases`
              - `wait` - `timings.socket - timings.start`
              - `dns` - `timings.lookup - timings.socket`
              - `tcp` - `timings.connect - timings.lookup`
              - `tls` - `timings.secureConnect - timings.connect`
              - `request` - `timings.upload - (timings.secureConnect || timings.connect)`
              - `firstByte` - `timings.response - timings.upload`
              - `download` - `timings.end - timings.response`
              - `total` - `(timings.end || timings.error || timings.abort) - timings.start`
      
          If something has not been measured yet, it will be `undefined`.
      
          __Note__: The time is a `number` representing the milliseconds elapsed since the UNIX epoch.
          */
      get timings() {
        var _a;
        return (_a = this._request) == null ? void 0 : _a.timings;
      }
      /**
      Whether the response was retrieved from the cache.
      */
      get isFromCache() {
        return this._isFromCache;
      }
      get reusedSocket() {
        var _a;
        return (_a = this._request) == null ? void 0 : _a.reusedSocket;
      }
      /**
      Whether the stream is read-only. Returns `true` when `body`, `json`, or `form` options are provided.
      */
      get isReadonly() {
        var _a, _b, _c;
        return !distribution_default.undefined((_a = this.options) == null ? void 0 : _a.body) || !distribution_default.undefined((_b = this.options) == null ? void 0 : _b.json) || !distribution_default.undefined((_c = this.options) == null ? void 0 : _c.form);
      }
    };
  }
});

// ../packages/curness-core/node_modules/got/dist/source/as-promise/types.js
var CancelError2;
var init_types2 = __esm({
  "../packages/curness-core/node_modules/got/dist/source/as-promise/types.js"() {
    init_errors();
    CancelError2 = class extends RequestError {
      constructor(request) {
        super("Promise was canceled", {}, request);
        this.name = "CancelError";
        this.code = "ERR_CANCELED";
      }
      /**
      Whether the promise is canceled.
      */
      get isCanceled() {
        return true;
      }
    };
  }
});

// ../packages/curness-core/node_modules/got/dist/source/as-promise/index.js
function asPromise(firstRequest) {
  let globalRequest;
  let globalResponse;
  let normalizedOptions;
  const emitter = new import_node_events4.EventEmitter();
  let promiseSettled = false;
  const promise = new PCancelable((resolve, reject, onCancel) => {
    onCancel(() => {
      globalRequest.destroy();
    });
    onCancel.shouldReject = false;
    onCancel(() => {
      promiseSettled = true;
      reject(new CancelError2(globalRequest));
    });
    const makeRequest = (retryCount) => {
      var _a;
      onCancel(() => {
      });
      const request = firstRequest ?? new Request(void 0, void 0, normalizedOptions);
      request.retryCount = retryCount;
      request._noPipe = true;
      globalRequest = request;
      request.once("response", async (response) => {
        const contentEncoding = (response.headers["content-encoding"] ?? "").toLowerCase();
        const isCompressed = contentEncoding === "gzip" || contentEncoding === "deflate" || contentEncoding === "br" || contentEncoding === "zstd";
        const { options } = request;
        if (isCompressed && !options.decompress) {
          response.body = response.rawBody;
        } else {
          try {
            response.body = parseBody(response, options.responseType, options.parseJson, options.encoding);
          } catch (error) {
            try {
              response.body = response.rawBody.toString();
            } catch (error2) {
              request._beforeError(new ParseError(error2, response));
              return;
            }
            if (isResponseOk(response)) {
              request._beforeError(error);
              return;
            }
          }
        }
        try {
          const hooks = options.hooks.afterResponse;
          for (const [index, hook] of hooks.entries()) {
            response = await hook(response, async (updatedOptions) => {
              const preserveHooks = updatedOptions.preserveHooks ?? false;
              options.merge(updatedOptions);
              options.prefixUrl = "";
              if (updatedOptions.url) {
                options.url = updatedOptions.url;
              }
              if (!preserveHooks) {
                options.hooks.afterResponse = options.hooks.afterResponse.slice(0, index);
              }
              throw new RetryError(request);
            });
            if (!(distribution_default.object(response) && distribution_default.number(response.statusCode) && "body" in response)) {
              throw new TypeError("The `afterResponse` hook returned an invalid value");
            }
          }
        } catch (error) {
          request._beforeError(error);
          return;
        }
        globalResponse = response;
        if (!isResponseOk(response)) {
          request._beforeError(new HTTPError(response));
          return;
        }
        request.destroy();
        promiseSettled = true;
        resolve(request.options.resolveBodyOnly ? response.body : response);
      });
      let handledFinalError = false;
      const onError = (error) => {
        if (promise.isCanceled) {
          return;
        }
        if (!request._stopReading) {
          request._beforeError(error);
          return;
        }
        if (handledFinalError) {
          return;
        }
        handledFinalError = true;
        promiseSettled = true;
        const { options } = request;
        if (error instanceof HTTPError && !options.throwHttpErrors) {
          const { response } = error;
          request.destroy();
          resolve(request.options.resolveBodyOnly ? response.body : response);
          return;
        }
        reject(error);
      };
      request.on("error", onError);
      const previousBody = (_a = request.options) == null ? void 0 : _a.body;
      request.once("retry", (newRetryCount, error) => {
        firstRequest = void 0;
        if (promiseSettled) {
          return;
        }
        const newBody = request.options.body;
        if (previousBody === newBody && distribution_default.nodeStream(newBody)) {
          error.message = "Cannot retry with consumed body stream";
          onError(error);
          return;
        }
        normalizedOptions = request.options;
        makeRequest(newRetryCount);
      });
      proxyEvents(request, emitter, proxiedRequestEvents2);
      if (distribution_default.undefined(firstRequest)) {
        void request.flush();
      }
    };
    makeRequest(0);
  });
  promise.on = (event, function_) => {
    emitter.on(event, function_);
    return promise;
  };
  promise.off = (event, function_) => {
    emitter.off(event, function_);
    return promise;
  };
  const shortcut = (promiseToAwait, responseType) => {
    const newPromise = (async () => {
      await promiseToAwait;
      const { options } = globalResponse.request;
      return parseBody(globalResponse, responseType, options.parseJson, options.encoding);
    })();
    Object.defineProperties(newPromise, Object.getOwnPropertyDescriptors(promiseToAwait));
    return newPromise;
  };
  promise.json = function() {
    if (globalRequest.options) {
      const { headers } = globalRequest.options;
      if (!globalRequest.writableFinished && !("accept" in headers)) {
        headers.accept = "application/json";
      }
    }
    return shortcut(this, "json");
  };
  promise.buffer = function() {
    return shortcut(this, "buffer");
  };
  promise.text = function() {
    return shortcut(this, "text");
  };
  return promise;
}
var import_node_events4, proxiedRequestEvents2;
var init_as_promise = __esm({
  "../packages/curness-core/node_modules/got/dist/source/as-promise/index.js"() {
    import_node_events4 = require("node:events");
    init_distribution();
    init_p_cancelable();
    init_errors();
    init_core();
    init_response();
    init_proxy_events();
    init_types2();
    proxiedRequestEvents2 = [
      "request",
      "response",
      "redirect",
      "uploadProgress",
      "downloadProgress"
    ];
  }
});

// ../packages/curness-core/node_modules/got/dist/source/create.js
var import_promises2, isGotInstance, aliases, create, create_default;
var init_create = __esm({
  "../packages/curness-core/node_modules/got/dist/source/create.js"() {
    import_promises2 = require("node:timers/promises");
    init_distribution();
    init_as_promise();
    init_core();
    init_options();
    isGotInstance = (value) => distribution_default.function(value);
    aliases = [
      "get",
      "post",
      "put",
      "patch",
      "head",
      "delete"
    ];
    create = (defaults2) => {
      defaults2 = {
        options: new Options(void 0, void 0, defaults2.options),
        handlers: [...defaults2.handlers],
        mutableDefaults: defaults2.mutableDefaults
      };
      Object.defineProperty(defaults2, "mutableDefaults", {
        enumerable: true,
        configurable: false,
        writable: false
      });
      const got2 = (url, options, defaultOptions2 = defaults2.options) => {
        const request = new Request(url, options, defaultOptions2);
        let promise;
        const lastHandler = (normalized) => {
          request.options = normalized;
          request._noPipe = !(normalized == null ? void 0 : normalized.isStream);
          void request.flush();
          if (normalized == null ? void 0 : normalized.isStream) {
            return request;
          }
          promise ||= asPromise(request);
          return promise;
        };
        let iteration = 0;
        const iterateHandlers = (newOptions) => {
          var _a;
          const handler = defaults2.handlers[iteration++] ?? lastHandler;
          const result = handler(newOptions, iterateHandlers);
          if (distribution_default.promise(result) && !((_a = request.options) == null ? void 0 : _a.isStream)) {
            promise ||= asPromise(request);
            if (result !== promise) {
              const descriptors = Object.getOwnPropertyDescriptors(promise);
              for (const key in descriptors) {
                if (key in result) {
                  delete descriptors[key];
                }
              }
              Object.defineProperties(result, descriptors);
              result.cancel = promise.cancel;
            }
          }
          return result;
        };
        return iterateHandlers(request.options);
      };
      got2.extend = (...instancesOrOptions) => {
        const options = new Options(void 0, void 0, defaults2.options);
        const handlers = [...defaults2.handlers];
        let mutableDefaults;
        for (const value of instancesOrOptions) {
          if (isGotInstance(value)) {
            options.merge(value.defaults.options);
            handlers.push(...value.defaults.handlers);
            mutableDefaults = value.defaults.mutableDefaults;
          } else {
            options.merge(value);
            if (value.handlers) {
              handlers.push(...value.handlers);
            }
            mutableDefaults = value.mutableDefaults;
          }
        }
        return create({
          options,
          handlers,
          mutableDefaults: Boolean(mutableDefaults)
        });
      };
      const paginateEach = async function* (url, options) {
        let normalizedOptions = new Options(url, options, defaults2.options);
        normalizedOptions.resolveBodyOnly = false;
        const { pagination } = normalizedOptions;
        assert.function(pagination.transform);
        assert.function(pagination.shouldContinue);
        assert.function(pagination.filter);
        assert.function(pagination.paginate);
        assert.number(pagination.countLimit);
        assert.number(pagination.requestLimit);
        assert.number(pagination.backoff);
        const allItems = [];
        let { countLimit } = pagination;
        let numberOfRequests = 0;
        while (numberOfRequests < pagination.requestLimit) {
          if (numberOfRequests !== 0) {
            await (0, import_promises2.setTimeout)(pagination.backoff);
          }
          const response = await got2(void 0, void 0, normalizedOptions);
          const parsed = await pagination.transform(response);
          const currentItems = [];
          assert.array(parsed);
          for (const item of parsed) {
            if (pagination.filter({ item, currentItems, allItems })) {
              if (!pagination.shouldContinue({ item, currentItems, allItems })) {
                return;
              }
              yield item;
              if (pagination.stackAllItems) {
                allItems.push(item);
              }
              currentItems.push(item);
              if (--countLimit <= 0) {
                return;
              }
            }
          }
          const optionsToMerge = pagination.paginate({
            response,
            currentItems,
            allItems
          });
          if (optionsToMerge === false) {
            return;
          }
          if (optionsToMerge === response.request.options) {
            normalizedOptions = response.request.options;
          } else {
            normalizedOptions.merge(optionsToMerge);
            try {
              assert.any([distribution_default.urlInstance, distribution_default.undefined], optionsToMerge.url);
            } catch (error) {
              if (error instanceof Error) {
                error.message = `Option 'pagination.paginate.url': ${error.message}`;
              }
              throw error;
            }
            if (optionsToMerge.url !== void 0) {
              normalizedOptions.prefixUrl = "";
              normalizedOptions.url = optionsToMerge.url;
            }
          }
          numberOfRequests++;
        }
      };
      got2.paginate = paginateEach;
      got2.paginate.all = async (url, options) => {
        const results = [];
        for await (const item of paginateEach(url, options)) {
          results.push(item);
        }
        return results;
      };
      got2.paginate.each = paginateEach;
      got2.stream = (url, options) => got2(url, { ...options, isStream: true });
      for (const method of aliases) {
        got2[method] = (url, options) => got2(url, { ...options, method });
        got2.stream[method] = (url, options) => got2(url, { ...options, method, isStream: true });
      }
      if (!defaults2.mutableDefaults) {
        Object.freeze(defaults2.handlers);
        defaults2.options.freeze();
      }
      Object.defineProperty(got2, "defaults", {
        value: defaults2,
        writable: false,
        configurable: false,
        enumerable: true
      });
      return got2;
    };
    create_default = create;
  }
});

// ../packages/curness-core/node_modules/got/dist/source/types.js
var init_types3 = __esm({
  "../packages/curness-core/node_modules/got/dist/source/types.js"() {
  }
});

// ../packages/curness-core/node_modules/got/dist/source/index.js
var defaults, got, source_default;
var init_source3 = __esm({
  "../packages/curness-core/node_modules/got/dist/source/index.js"() {
    init_create();
    init_options();
    init_options();
    init_response();
    init_core();
    init_errors();
    init_diagnostics_channel();
    init_types2();
    init_types3();
    defaults = {
      options: new Options(),
      handlers: [],
      mutableDefaults: false
    };
    got = create_default(defaults);
    source_default = got;
  }
});

// ../packages/curness-core/node_modules/semver/internal/constants.js
var require_constants = __commonJS({
  "../packages/curness-core/node_modules/semver/internal/constants.js"(exports2, module2) {
    "use strict";
    var SEMVER_SPEC_VERSION = "2.0.0";
    var MAX_LENGTH = 256;
    var MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || /* istanbul ignore next */
    9007199254740991;
    var MAX_SAFE_COMPONENT_LENGTH = 16;
    var MAX_SAFE_BUILD_LENGTH = MAX_LENGTH - 6;
    var RELEASE_TYPES = [
      "major",
      "premajor",
      "minor",
      "preminor",
      "patch",
      "prepatch",
      "prerelease"
    ];
    module2.exports = {
      MAX_LENGTH,
      MAX_SAFE_COMPONENT_LENGTH,
      MAX_SAFE_BUILD_LENGTH,
      MAX_SAFE_INTEGER,
      RELEASE_TYPES,
      SEMVER_SPEC_VERSION,
      FLAG_INCLUDE_PRERELEASE: 1,
      FLAG_LOOSE: 2
    };
  }
});

// ../packages/curness-core/node_modules/semver/internal/debug.js
var require_debug = __commonJS({
  "../packages/curness-core/node_modules/semver/internal/debug.js"(exports2, module2) {
    "use strict";
    var debug = typeof process === "object" && process.env && process.env.NODE_DEBUG && /\bsemver\b/i.test(process.env.NODE_DEBUG) ? (...args) => console.error("SEMVER", ...args) : () => {
    };
    module2.exports = debug;
  }
});

// ../packages/curness-core/node_modules/semver/internal/re.js
var require_re = __commonJS({
  "../packages/curness-core/node_modules/semver/internal/re.js"(exports2, module2) {
    "use strict";
    var {
      MAX_SAFE_COMPONENT_LENGTH,
      MAX_SAFE_BUILD_LENGTH,
      MAX_LENGTH
    } = require_constants();
    var debug = require_debug();
    exports2 = module2.exports = {};
    var re = exports2.re = [];
    var safeRe = exports2.safeRe = [];
    var src = exports2.src = [];
    var safeSrc = exports2.safeSrc = [];
    var t = exports2.t = {};
    var R = 0;
    var LETTERDASHNUMBER = "[a-zA-Z0-9-]";
    var safeRegexReplacements = [
      ["\\s", 1],
      ["\\d", MAX_LENGTH],
      [LETTERDASHNUMBER, MAX_SAFE_BUILD_LENGTH]
    ];
    var makeSafeRegex = (value) => {
      for (const [token, max] of safeRegexReplacements) {
        value = value.split(`${token}*`).join(`${token}{0,${max}}`).split(`${token}+`).join(`${token}{1,${max}}`);
      }
      return value;
    };
    var createToken = (name, value, isGlobal) => {
      const safe = makeSafeRegex(value);
      const index = R++;
      debug(name, index, value);
      t[name] = index;
      src[index] = value;
      safeSrc[index] = safe;
      re[index] = new RegExp(value, isGlobal ? "g" : void 0);
      safeRe[index] = new RegExp(safe, isGlobal ? "g" : void 0);
    };
    createToken("NUMERICIDENTIFIER", "0|[1-9]\\d*");
    createToken("NUMERICIDENTIFIERLOOSE", "\\d+");
    createToken("NONNUMERICIDENTIFIER", `\\d*[a-zA-Z-]${LETTERDASHNUMBER}*`);
    createToken("MAINVERSION", `(${src[t.NUMERICIDENTIFIER]})\\.(${src[t.NUMERICIDENTIFIER]})\\.(${src[t.NUMERICIDENTIFIER]})`);
    createToken("MAINVERSIONLOOSE", `(${src[t.NUMERICIDENTIFIERLOOSE]})\\.(${src[t.NUMERICIDENTIFIERLOOSE]})\\.(${src[t.NUMERICIDENTIFIERLOOSE]})`);
    createToken("PRERELEASEIDENTIFIER", `(?:${src[t.NONNUMERICIDENTIFIER]}|${src[t.NUMERICIDENTIFIER]})`);
    createToken("PRERELEASEIDENTIFIERLOOSE", `(?:${src[t.NONNUMERICIDENTIFIER]}|${src[t.NUMERICIDENTIFIERLOOSE]})`);
    createToken("PRERELEASE", `(?:-(${src[t.PRERELEASEIDENTIFIER]}(?:\\.${src[t.PRERELEASEIDENTIFIER]})*))`);
    createToken("PRERELEASELOOSE", `(?:-?(${src[t.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${src[t.PRERELEASEIDENTIFIERLOOSE]})*))`);
    createToken("BUILDIDENTIFIER", `${LETTERDASHNUMBER}+`);
    createToken("BUILD", `(?:\\+(${src[t.BUILDIDENTIFIER]}(?:\\.${src[t.BUILDIDENTIFIER]})*))`);
    createToken("FULLPLAIN", `v?${src[t.MAINVERSION]}${src[t.PRERELEASE]}?${src[t.BUILD]}?`);
    createToken("FULL", `^${src[t.FULLPLAIN]}$`);
    createToken("LOOSEPLAIN", `[v=\\s]*${src[t.MAINVERSIONLOOSE]}${src[t.PRERELEASELOOSE]}?${src[t.BUILD]}?`);
    createToken("LOOSE", `^${src[t.LOOSEPLAIN]}$`);
    createToken("GTLT", "((?:<|>)?=?)");
    createToken("XRANGEIDENTIFIERLOOSE", `${src[t.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`);
    createToken("XRANGEIDENTIFIER", `${src[t.NUMERICIDENTIFIER]}|x|X|\\*`);
    createToken("XRANGEPLAIN", `[v=\\s]*(${src[t.XRANGEIDENTIFIER]})(?:\\.(${src[t.XRANGEIDENTIFIER]})(?:\\.(${src[t.XRANGEIDENTIFIER]})(?:${src[t.PRERELEASE]})?${src[t.BUILD]}?)?)?`);
    createToken("XRANGEPLAINLOOSE", `[v=\\s]*(${src[t.XRANGEIDENTIFIERLOOSE]})(?:\\.(${src[t.XRANGEIDENTIFIERLOOSE]})(?:\\.(${src[t.XRANGEIDENTIFIERLOOSE]})(?:${src[t.PRERELEASELOOSE]})?${src[t.BUILD]}?)?)?`);
    createToken("XRANGE", `^${src[t.GTLT]}\\s*${src[t.XRANGEPLAIN]}$`);
    createToken("XRANGELOOSE", `^${src[t.GTLT]}\\s*${src[t.XRANGEPLAINLOOSE]}$`);
    createToken("COERCEPLAIN", `${"(^|[^\\d])(\\d{1,"}${MAX_SAFE_COMPONENT_LENGTH}})(?:\\.(\\d{1,${MAX_SAFE_COMPONENT_LENGTH}}))?(?:\\.(\\d{1,${MAX_SAFE_COMPONENT_LENGTH}}))?`);
    createToken("COERCE", `${src[t.COERCEPLAIN]}(?:$|[^\\d])`);
    createToken("COERCEFULL", src[t.COERCEPLAIN] + `(?:${src[t.PRERELEASE]})?(?:${src[t.BUILD]})?(?:$|[^\\d])`);
    createToken("COERCERTL", src[t.COERCE], true);
    createToken("COERCERTLFULL", src[t.COERCEFULL], true);
    createToken("LONETILDE", "(?:~>?)");
    createToken("TILDETRIM", `(\\s*)${src[t.LONETILDE]}\\s+`, true);
    exports2.tildeTrimReplace = "$1~";
    createToken("TILDE", `^${src[t.LONETILDE]}${src[t.XRANGEPLAIN]}$`);
    createToken("TILDELOOSE", `^${src[t.LONETILDE]}${src[t.XRANGEPLAINLOOSE]}$`);
    createToken("LONECARET", "(?:\\^)");
    createToken("CARETTRIM", `(\\s*)${src[t.LONECARET]}\\s+`, true);
    exports2.caretTrimReplace = "$1^";
    createToken("CARET", `^${src[t.LONECARET]}${src[t.XRANGEPLAIN]}$`);
    createToken("CARETLOOSE", `^${src[t.LONECARET]}${src[t.XRANGEPLAINLOOSE]}$`);
    createToken("COMPARATORLOOSE", `^${src[t.GTLT]}\\s*(${src[t.LOOSEPLAIN]})$|^$`);
    createToken("COMPARATOR", `^${src[t.GTLT]}\\s*(${src[t.FULLPLAIN]})$|^$`);
    createToken("COMPARATORTRIM", `(\\s*)${src[t.GTLT]}\\s*(${src[t.LOOSEPLAIN]}|${src[t.XRANGEPLAIN]})`, true);
    exports2.comparatorTrimReplace = "$1$2$3";
    createToken("HYPHENRANGE", `^\\s*(${src[t.XRANGEPLAIN]})\\s+-\\s+(${src[t.XRANGEPLAIN]})\\s*$`);
    createToken("HYPHENRANGELOOSE", `^\\s*(${src[t.XRANGEPLAINLOOSE]})\\s+-\\s+(${src[t.XRANGEPLAINLOOSE]})\\s*$`);
    createToken("STAR", "(<|>)?=?\\s*\\*");
    createToken("GTE0", "^\\s*>=\\s*0\\.0\\.0\\s*$");
    createToken("GTE0PRE", "^\\s*>=\\s*0\\.0\\.0-0\\s*$");
  }
});

// ../packages/curness-core/node_modules/semver/internal/parse-options.js
var require_parse_options = __commonJS({
  "../packages/curness-core/node_modules/semver/internal/parse-options.js"(exports2, module2) {
    "use strict";
    var looseOption = Object.freeze({ loose: true });
    var emptyOpts = Object.freeze({});
    var parseOptions = (options) => {
      if (!options) {
        return emptyOpts;
      }
      if (typeof options !== "object") {
        return looseOption;
      }
      return options;
    };
    module2.exports = parseOptions;
  }
});

// ../packages/curness-core/node_modules/semver/internal/identifiers.js
var require_identifiers = __commonJS({
  "../packages/curness-core/node_modules/semver/internal/identifiers.js"(exports2, module2) {
    "use strict";
    var numeric = /^[0-9]+$/;
    var compareIdentifiers = (a2, b) => {
      if (typeof a2 === "number" && typeof b === "number") {
        return a2 === b ? 0 : a2 < b ? -1 : 1;
      }
      const anum = numeric.test(a2);
      const bnum = numeric.test(b);
      if (anum && bnum) {
        a2 = +a2;
        b = +b;
      }
      return a2 === b ? 0 : anum && !bnum ? -1 : bnum && !anum ? 1 : a2 < b ? -1 : 1;
    };
    var rcompareIdentifiers = (a2, b) => compareIdentifiers(b, a2);
    module2.exports = {
      compareIdentifiers,
      rcompareIdentifiers
    };
  }
});

// ../packages/curness-core/node_modules/semver/classes/semver.js
var require_semver = __commonJS({
  "../packages/curness-core/node_modules/semver/classes/semver.js"(exports2, module2) {
    "use strict";
    var debug = require_debug();
    var { MAX_LENGTH, MAX_SAFE_INTEGER } = require_constants();
    var { safeRe: re, t } = require_re();
    var parseOptions = require_parse_options();
    var { compareIdentifiers } = require_identifiers();
    var SemVer = class _SemVer {
      constructor(version, options) {
        options = parseOptions(options);
        if (version instanceof _SemVer) {
          if (version.loose === !!options.loose && version.includePrerelease === !!options.includePrerelease) {
            return version;
          } else {
            version = version.version;
          }
        } else if (typeof version !== "string") {
          throw new TypeError(`Invalid version. Must be a string. Got type "${typeof version}".`);
        }
        if (version.length > MAX_LENGTH) {
          throw new TypeError(
            `version is longer than ${MAX_LENGTH} characters`
          );
        }
        debug("SemVer", version, options);
        this.options = options;
        this.loose = !!options.loose;
        this.includePrerelease = !!options.includePrerelease;
        const m = version.trim().match(options.loose ? re[t.LOOSE] : re[t.FULL]);
        if (!m) {
          throw new TypeError(`Invalid Version: ${version}`);
        }
        this.raw = version;
        this.major = +m[1];
        this.minor = +m[2];
        this.patch = +m[3];
        if (this.major > MAX_SAFE_INTEGER || this.major < 0) {
          throw new TypeError("Invalid major version");
        }
        if (this.minor > MAX_SAFE_INTEGER || this.minor < 0) {
          throw new TypeError("Invalid minor version");
        }
        if (this.patch > MAX_SAFE_INTEGER || this.patch < 0) {
          throw new TypeError("Invalid patch version");
        }
        if (!m[4]) {
          this.prerelease = [];
        } else {
          this.prerelease = m[4].split(".").map((id) => {
            if (/^[0-9]+$/.test(id)) {
              const num = +id;
              if (num >= 0 && num < MAX_SAFE_INTEGER) {
                return num;
              }
            }
            return id;
          });
        }
        this.build = m[5] ? m[5].split(".") : [];
        this.format();
      }
      format() {
        this.version = `${this.major}.${this.minor}.${this.patch}`;
        if (this.prerelease.length) {
          this.version += `-${this.prerelease.join(".")}`;
        }
        return this.version;
      }
      toString() {
        return this.version;
      }
      compare(other) {
        debug("SemVer.compare", this.version, this.options, other);
        if (!(other instanceof _SemVer)) {
          if (typeof other === "string" && other === this.version) {
            return 0;
          }
          other = new _SemVer(other, this.options);
        }
        if (other.version === this.version) {
          return 0;
        }
        return this.compareMain(other) || this.comparePre(other);
      }
      compareMain(other) {
        if (!(other instanceof _SemVer)) {
          other = new _SemVer(other, this.options);
        }
        if (this.major < other.major) {
          return -1;
        }
        if (this.major > other.major) {
          return 1;
        }
        if (this.minor < other.minor) {
          return -1;
        }
        if (this.minor > other.minor) {
          return 1;
        }
        if (this.patch < other.patch) {
          return -1;
        }
        if (this.patch > other.patch) {
          return 1;
        }
        return 0;
      }
      comparePre(other) {
        if (!(other instanceof _SemVer)) {
          other = new _SemVer(other, this.options);
        }
        if (this.prerelease.length && !other.prerelease.length) {
          return -1;
        } else if (!this.prerelease.length && other.prerelease.length) {
          return 1;
        } else if (!this.prerelease.length && !other.prerelease.length) {
          return 0;
        }
        let i2 = 0;
        do {
          const a2 = this.prerelease[i2];
          const b = other.prerelease[i2];
          debug("prerelease compare", i2, a2, b);
          if (a2 === void 0 && b === void 0) {
            return 0;
          } else if (b === void 0) {
            return 1;
          } else if (a2 === void 0) {
            return -1;
          } else if (a2 === b) {
            continue;
          } else {
            return compareIdentifiers(a2, b);
          }
        } while (++i2);
      }
      compareBuild(other) {
        if (!(other instanceof _SemVer)) {
          other = new _SemVer(other, this.options);
        }
        let i2 = 0;
        do {
          const a2 = this.build[i2];
          const b = other.build[i2];
          debug("build compare", i2, a2, b);
          if (a2 === void 0 && b === void 0) {
            return 0;
          } else if (b === void 0) {
            return 1;
          } else if (a2 === void 0) {
            return -1;
          } else if (a2 === b) {
            continue;
          } else {
            return compareIdentifiers(a2, b);
          }
        } while (++i2);
      }
      // preminor will bump the version up to the next minor release, and immediately
      // down to pre-release. premajor and prepatch work the same way.
      inc(release, identifier, identifierBase) {
        if (release.startsWith("pre")) {
          if (!identifier && identifierBase === false) {
            throw new Error("invalid increment argument: identifier is empty");
          }
          if (identifier) {
            const match = `-${identifier}`.match(this.options.loose ? re[t.PRERELEASELOOSE] : re[t.PRERELEASE]);
            if (!match || match[1] !== identifier) {
              throw new Error(`invalid identifier: ${identifier}`);
            }
          }
        }
        switch (release) {
          case "premajor":
            this.prerelease.length = 0;
            this.patch = 0;
            this.minor = 0;
            this.major++;
            this.inc("pre", identifier, identifierBase);
            break;
          case "preminor":
            this.prerelease.length = 0;
            this.patch = 0;
            this.minor++;
            this.inc("pre", identifier, identifierBase);
            break;
          case "prepatch":
            this.prerelease.length = 0;
            this.inc("patch", identifier, identifierBase);
            this.inc("pre", identifier, identifierBase);
            break;
          // If the input is a non-prerelease version, this acts the same as
          // prepatch.
          case "prerelease":
            if (this.prerelease.length === 0) {
              this.inc("patch", identifier, identifierBase);
            }
            this.inc("pre", identifier, identifierBase);
            break;
          case "release":
            if (this.prerelease.length === 0) {
              throw new Error(`version ${this.raw} is not a prerelease`);
            }
            this.prerelease.length = 0;
            break;
          case "major":
            if (this.minor !== 0 || this.patch !== 0 || this.prerelease.length === 0) {
              this.major++;
            }
            this.minor = 0;
            this.patch = 0;
            this.prerelease = [];
            break;
          case "minor":
            if (this.patch !== 0 || this.prerelease.length === 0) {
              this.minor++;
            }
            this.patch = 0;
            this.prerelease = [];
            break;
          case "patch":
            if (this.prerelease.length === 0) {
              this.patch++;
            }
            this.prerelease = [];
            break;
          // This probably shouldn't be used publicly.
          // 1.0.0 'pre' would become 1.0.0-0 which is the wrong direction.
          case "pre": {
            const base = Number(identifierBase) ? 1 : 0;
            if (this.prerelease.length === 0) {
              this.prerelease = [base];
            } else {
              let i2 = this.prerelease.length;
              while (--i2 >= 0) {
                if (typeof this.prerelease[i2] === "number") {
                  this.prerelease[i2]++;
                  i2 = -2;
                }
              }
              if (i2 === -1) {
                if (identifier === this.prerelease.join(".") && identifierBase === false) {
                  throw new Error("invalid increment argument: identifier already exists");
                }
                this.prerelease.push(base);
              }
            }
            if (identifier) {
              let prerelease = [identifier, base];
              if (identifierBase === false) {
                prerelease = [identifier];
              }
              if (compareIdentifiers(this.prerelease[0], identifier) === 0) {
                if (isNaN(this.prerelease[1])) {
                  this.prerelease = prerelease;
                }
              } else {
                this.prerelease = prerelease;
              }
            }
            break;
          }
          default:
            throw new Error(`invalid increment argument: ${release}`);
        }
        this.raw = this.format();
        if (this.build.length) {
          this.raw += `+${this.build.join(".")}`;
        }
        return this;
      }
    };
    module2.exports = SemVer;
  }
});

// ../packages/curness-core/node_modules/semver/functions/parse.js
var require_parse = __commonJS({
  "../packages/curness-core/node_modules/semver/functions/parse.js"(exports2, module2) {
    "use strict";
    var SemVer = require_semver();
    var parse = (version, options, throwErrors = false) => {
      if (version instanceof SemVer) {
        return version;
      }
      try {
        return new SemVer(version, options);
      } catch (er) {
        if (!throwErrors) {
          return null;
        }
        throw er;
      }
    };
    module2.exports = parse;
  }
});

// ../packages/curness-core/node_modules/semver/functions/valid.js
var require_valid = __commonJS({
  "../packages/curness-core/node_modules/semver/functions/valid.js"(exports2, module2) {
    "use strict";
    var parse = require_parse();
    var valid = (version, options) => {
      const v = parse(version, options);
      return v ? v.version : null;
    };
    module2.exports = valid;
  }
});

// ../packages/curness-core/node_modules/semver/functions/clean.js
var require_clean = __commonJS({
  "../packages/curness-core/node_modules/semver/functions/clean.js"(exports2, module2) {
    "use strict";
    var parse = require_parse();
    var clean = (version, options) => {
      const s = parse(version.trim().replace(/^[=v]+/, ""), options);
      return s ? s.version : null;
    };
    module2.exports = clean;
  }
});

// ../packages/curness-core/node_modules/semver/functions/inc.js
var require_inc = __commonJS({
  "../packages/curness-core/node_modules/semver/functions/inc.js"(exports2, module2) {
    "use strict";
    var SemVer = require_semver();
    var inc = (version, release, options, identifier, identifierBase) => {
      if (typeof options === "string") {
        identifierBase = identifier;
        identifier = options;
        options = void 0;
      }
      try {
        return new SemVer(
          version instanceof SemVer ? version.version : version,
          options
        ).inc(release, identifier, identifierBase).version;
      } catch (er) {
        return null;
      }
    };
    module2.exports = inc;
  }
});

// ../packages/curness-core/node_modules/semver/functions/diff.js
var require_diff = __commonJS({
  "../packages/curness-core/node_modules/semver/functions/diff.js"(exports2, module2) {
    "use strict";
    var parse = require_parse();
    var diff = (version1, version2) => {
      const v1 = parse(version1, null, true);
      const v2 = parse(version2, null, true);
      const comparison = v1.compare(v2);
      if (comparison === 0) {
        return null;
      }
      const v1Higher = comparison > 0;
      const highVersion = v1Higher ? v1 : v2;
      const lowVersion = v1Higher ? v2 : v1;
      const highHasPre = !!highVersion.prerelease.length;
      const lowHasPre = !!lowVersion.prerelease.length;
      if (lowHasPre && !highHasPre) {
        if (!lowVersion.patch && !lowVersion.minor) {
          return "major";
        }
        if (lowVersion.compareMain(highVersion) === 0) {
          if (lowVersion.minor && !lowVersion.patch) {
            return "minor";
          }
          return "patch";
        }
      }
      const prefix = highHasPre ? "pre" : "";
      if (v1.major !== v2.major) {
        return prefix + "major";
      }
      if (v1.minor !== v2.minor) {
        return prefix + "minor";
      }
      if (v1.patch !== v2.patch) {
        return prefix + "patch";
      }
      return "prerelease";
    };
    module2.exports = diff;
  }
});

// ../packages/curness-core/node_modules/semver/functions/major.js
var require_major = __commonJS({
  "../packages/curness-core/node_modules/semver/functions/major.js"(exports2, module2) {
    "use strict";
    var SemVer = require_semver();
    var major2 = (a2, loose) => new SemVer(a2, loose).major;
    module2.exports = major2;
  }
});

// ../packages/curness-core/node_modules/semver/functions/minor.js
var require_minor = __commonJS({
  "../packages/curness-core/node_modules/semver/functions/minor.js"(exports2, module2) {
    "use strict";
    var SemVer = require_semver();
    var minor2 = (a2, loose) => new SemVer(a2, loose).minor;
    module2.exports = minor2;
  }
});

// ../packages/curness-core/node_modules/semver/functions/patch.js
var require_patch = __commonJS({
  "../packages/curness-core/node_modules/semver/functions/patch.js"(exports2, module2) {
    "use strict";
    var SemVer = require_semver();
    var patch = (a2, loose) => new SemVer(a2, loose).patch;
    module2.exports = patch;
  }
});

// ../packages/curness-core/node_modules/semver/functions/prerelease.js
var require_prerelease = __commonJS({
  "../packages/curness-core/node_modules/semver/functions/prerelease.js"(exports2, module2) {
    "use strict";
    var parse = require_parse();
    var prerelease = (version, options) => {
      const parsed = parse(version, options);
      return parsed && parsed.prerelease.length ? parsed.prerelease : null;
    };
    module2.exports = prerelease;
  }
});

// ../packages/curness-core/node_modules/semver/functions/compare.js
var require_compare = __commonJS({
  "../packages/curness-core/node_modules/semver/functions/compare.js"(exports2, module2) {
    "use strict";
    var SemVer = require_semver();
    var compare = (a2, b, loose) => new SemVer(a2, loose).compare(new SemVer(b, loose));
    module2.exports = compare;
  }
});

// ../packages/curness-core/node_modules/semver/functions/rcompare.js
var require_rcompare = __commonJS({
  "../packages/curness-core/node_modules/semver/functions/rcompare.js"(exports2, module2) {
    "use strict";
    var compare = require_compare();
    var rcompare = (a2, b, loose) => compare(b, a2, loose);
    module2.exports = rcompare;
  }
});

// ../packages/curness-core/node_modules/semver/functions/compare-loose.js
var require_compare_loose = __commonJS({
  "../packages/curness-core/node_modules/semver/functions/compare-loose.js"(exports2, module2) {
    "use strict";
    var compare = require_compare();
    var compareLoose = (a2, b) => compare(a2, b, true);
    module2.exports = compareLoose;
  }
});

// ../packages/curness-core/node_modules/semver/functions/compare-build.js
var require_compare_build = __commonJS({
  "../packages/curness-core/node_modules/semver/functions/compare-build.js"(exports2, module2) {
    "use strict";
    var SemVer = require_semver();
    var compareBuild = (a2, b, loose) => {
      const versionA = new SemVer(a2, loose);
      const versionB = new SemVer(b, loose);
      return versionA.compare(versionB) || versionA.compareBuild(versionB);
    };
    module2.exports = compareBuild;
  }
});

// ../packages/curness-core/node_modules/semver/functions/sort.js
var require_sort = __commonJS({
  "../packages/curness-core/node_modules/semver/functions/sort.js"(exports2, module2) {
    "use strict";
    var compareBuild = require_compare_build();
    var sort = (list, loose) => list.sort((a2, b) => compareBuild(a2, b, loose));
    module2.exports = sort;
  }
});

// ../packages/curness-core/node_modules/semver/functions/rsort.js
var require_rsort = __commonJS({
  "../packages/curness-core/node_modules/semver/functions/rsort.js"(exports2, module2) {
    "use strict";
    var compareBuild = require_compare_build();
    var rsort = (list, loose) => list.sort((a2, b) => compareBuild(b, a2, loose));
    module2.exports = rsort;
  }
});

// ../packages/curness-core/node_modules/semver/functions/gt.js
var require_gt = __commonJS({
  "../packages/curness-core/node_modules/semver/functions/gt.js"(exports2, module2) {
    "use strict";
    var compare = require_compare();
    var gt = (a2, b, loose) => compare(a2, b, loose) > 0;
    module2.exports = gt;
  }
});

// ../packages/curness-core/node_modules/semver/functions/lt.js
var require_lt = __commonJS({
  "../packages/curness-core/node_modules/semver/functions/lt.js"(exports2, module2) {
    "use strict";
    var compare = require_compare();
    var lt = (a2, b, loose) => compare(a2, b, loose) < 0;
    module2.exports = lt;
  }
});

// ../packages/curness-core/node_modules/semver/functions/eq.js
var require_eq = __commonJS({
  "../packages/curness-core/node_modules/semver/functions/eq.js"(exports2, module2) {
    "use strict";
    var compare = require_compare();
    var eq = (a2, b, loose) => compare(a2, b, loose) === 0;
    module2.exports = eq;
  }
});

// ../packages/curness-core/node_modules/semver/functions/neq.js
var require_neq = __commonJS({
  "../packages/curness-core/node_modules/semver/functions/neq.js"(exports2, module2) {
    "use strict";
    var compare = require_compare();
    var neq = (a2, b, loose) => compare(a2, b, loose) !== 0;
    module2.exports = neq;
  }
});

// ../packages/curness-core/node_modules/semver/functions/gte.js
var require_gte = __commonJS({
  "../packages/curness-core/node_modules/semver/functions/gte.js"(exports2, module2) {
    "use strict";
    var compare = require_compare();
    var gte = (a2, b, loose) => compare(a2, b, loose) >= 0;
    module2.exports = gte;
  }
});

// ../packages/curness-core/node_modules/semver/functions/lte.js
var require_lte = __commonJS({
  "../packages/curness-core/node_modules/semver/functions/lte.js"(exports2, module2) {
    "use strict";
    var compare = require_compare();
    var lte = (a2, b, loose) => compare(a2, b, loose) <= 0;
    module2.exports = lte;
  }
});

// ../packages/curness-core/node_modules/semver/functions/cmp.js
var require_cmp = __commonJS({
  "../packages/curness-core/node_modules/semver/functions/cmp.js"(exports2, module2) {
    "use strict";
    var eq = require_eq();
    var neq = require_neq();
    var gt = require_gt();
    var gte = require_gte();
    var lt = require_lt();
    var lte = require_lte();
    var cmp = (a2, op, b, loose) => {
      switch (op) {
        case "===":
          if (typeof a2 === "object") {
            a2 = a2.version;
          }
          if (typeof b === "object") {
            b = b.version;
          }
          return a2 === b;
        case "!==":
          if (typeof a2 === "object") {
            a2 = a2.version;
          }
          if (typeof b === "object") {
            b = b.version;
          }
          return a2 !== b;
        case "":
        case "=":
        case "==":
          return eq(a2, b, loose);
        case "!=":
          return neq(a2, b, loose);
        case ">":
          return gt(a2, b, loose);
        case ">=":
          return gte(a2, b, loose);
        case "<":
          return lt(a2, b, loose);
        case "<=":
          return lte(a2, b, loose);
        default:
          throw new TypeError(`Invalid operator: ${op}`);
      }
    };
    module2.exports = cmp;
  }
});

// ../packages/curness-core/node_modules/semver/functions/coerce.js
var require_coerce = __commonJS({
  "../packages/curness-core/node_modules/semver/functions/coerce.js"(exports2, module2) {
    "use strict";
    var SemVer = require_semver();
    var parse = require_parse();
    var { safeRe: re, t } = require_re();
    var coerce = (version, options) => {
      if (version instanceof SemVer) {
        return version;
      }
      if (typeof version === "number") {
        version = String(version);
      }
      if (typeof version !== "string") {
        return null;
      }
      options = options || {};
      let match = null;
      if (!options.rtl) {
        match = version.match(options.includePrerelease ? re[t.COERCEFULL] : re[t.COERCE]);
      } else {
        const coerceRtlRegex = options.includePrerelease ? re[t.COERCERTLFULL] : re[t.COERCERTL];
        let next;
        while ((next = coerceRtlRegex.exec(version)) && (!match || match.index + match[0].length !== version.length)) {
          if (!match || next.index + next[0].length !== match.index + match[0].length) {
            match = next;
          }
          coerceRtlRegex.lastIndex = next.index + next[1].length + next[2].length;
        }
        coerceRtlRegex.lastIndex = -1;
      }
      if (match === null) {
        return null;
      }
      const major2 = match[2];
      const minor2 = match[3] || "0";
      const patch = match[4] || "0";
      const prerelease = options.includePrerelease && match[5] ? `-${match[5]}` : "";
      const build = options.includePrerelease && match[6] ? `+${match[6]}` : "";
      return parse(`${major2}.${minor2}.${patch}${prerelease}${build}`, options);
    };
    module2.exports = coerce;
  }
});

// ../packages/curness-core/node_modules/semver/internal/lrucache.js
var require_lrucache = __commonJS({
  "../packages/curness-core/node_modules/semver/internal/lrucache.js"(exports2, module2) {
    "use strict";
    var LRUCache = class {
      constructor() {
        this.max = 1e3;
        this.map = /* @__PURE__ */ new Map();
      }
      get(key) {
        const value = this.map.get(key);
        if (value === void 0) {
          return void 0;
        } else {
          this.map.delete(key);
          this.map.set(key, value);
          return value;
        }
      }
      delete(key) {
        return this.map.delete(key);
      }
      set(key, value) {
        const deleted = this.delete(key);
        if (!deleted && value !== void 0) {
          if (this.map.size >= this.max) {
            const firstKey = this.map.keys().next().value;
            this.delete(firstKey);
          }
          this.map.set(key, value);
        }
        return this;
      }
    };
    module2.exports = LRUCache;
  }
});

// ../packages/curness-core/node_modules/semver/classes/range.js
var require_range = __commonJS({
  "../packages/curness-core/node_modules/semver/classes/range.js"(exports2, module2) {
    "use strict";
    var SPACE_CHARACTERS = /\s+/g;
    var Range = class _Range {
      constructor(range, options) {
        options = parseOptions(options);
        if (range instanceof _Range) {
          if (range.loose === !!options.loose && range.includePrerelease === !!options.includePrerelease) {
            return range;
          } else {
            return new _Range(range.raw, options);
          }
        }
        if (range instanceof Comparator) {
          this.raw = range.value;
          this.set = [[range]];
          this.formatted = void 0;
          return this;
        }
        this.options = options;
        this.loose = !!options.loose;
        this.includePrerelease = !!options.includePrerelease;
        this.raw = range.trim().replace(SPACE_CHARACTERS, " ");
        this.set = this.raw.split("||").map((r) => this.parseRange(r.trim())).filter((c3) => c3.length);
        if (!this.set.length) {
          throw new TypeError(`Invalid SemVer Range: ${this.raw}`);
        }
        if (this.set.length > 1) {
          const first = this.set[0];
          this.set = this.set.filter((c3) => !isNullSet(c3[0]));
          if (this.set.length === 0) {
            this.set = [first];
          } else if (this.set.length > 1) {
            for (const c3 of this.set) {
              if (c3.length === 1 && isAny2(c3[0])) {
                this.set = [c3];
                break;
              }
            }
          }
        }
        this.formatted = void 0;
      }
      get range() {
        if (this.formatted === void 0) {
          this.formatted = "";
          for (let i2 = 0; i2 < this.set.length; i2++) {
            if (i2 > 0) {
              this.formatted += "||";
            }
            const comps = this.set[i2];
            for (let k = 0; k < comps.length; k++) {
              if (k > 0) {
                this.formatted += " ";
              }
              this.formatted += comps[k].toString().trim();
            }
          }
        }
        return this.formatted;
      }
      format() {
        return this.range;
      }
      toString() {
        return this.range;
      }
      parseRange(range) {
        const memoOpts = (this.options.includePrerelease && FLAG_INCLUDE_PRERELEASE) | (this.options.loose && FLAG_LOOSE);
        const memoKey = memoOpts + ":" + range;
        const cached = cache.get(memoKey);
        if (cached) {
          return cached;
        }
        const loose = this.options.loose;
        const hr = loose ? re[t.HYPHENRANGELOOSE] : re[t.HYPHENRANGE];
        range = range.replace(hr, hyphenReplace(this.options.includePrerelease));
        debug("hyphen replace", range);
        range = range.replace(re[t.COMPARATORTRIM], comparatorTrimReplace);
        debug("comparator trim", range);
        range = range.replace(re[t.TILDETRIM], tildeTrimReplace);
        debug("tilde trim", range);
        range = range.replace(re[t.CARETTRIM], caretTrimReplace);
        debug("caret trim", range);
        let rangeList = range.split(" ").map((comp) => parseComparator(comp, this.options)).join(" ").split(/\s+/).map((comp) => replaceGTE0(comp, this.options));
        if (loose) {
          rangeList = rangeList.filter((comp) => {
            debug("loose invalid filter", comp, this.options);
            return !!comp.match(re[t.COMPARATORLOOSE]);
          });
        }
        debug("range list", rangeList);
        const rangeMap = /* @__PURE__ */ new Map();
        const comparators = rangeList.map((comp) => new Comparator(comp, this.options));
        for (const comp of comparators) {
          if (isNullSet(comp)) {
            return [comp];
          }
          rangeMap.set(comp.value, comp);
        }
        if (rangeMap.size > 1 && rangeMap.has("")) {
          rangeMap.delete("");
        }
        const result = [...rangeMap.values()];
        cache.set(memoKey, result);
        return result;
      }
      intersects(range, options) {
        if (!(range instanceof _Range)) {
          throw new TypeError("a Range is required");
        }
        return this.set.some((thisComparators) => {
          return isSatisfiable(thisComparators, options) && range.set.some((rangeComparators) => {
            return isSatisfiable(rangeComparators, options) && thisComparators.every((thisComparator) => {
              return rangeComparators.every((rangeComparator) => {
                return thisComparator.intersects(rangeComparator, options);
              });
            });
          });
        });
      }
      // if ANY of the sets match ALL of its comparators, then pass
      test(version) {
        if (!version) {
          return false;
        }
        if (typeof version === "string") {
          try {
            version = new SemVer(version, this.options);
          } catch (er) {
            return false;
          }
        }
        for (let i2 = 0; i2 < this.set.length; i2++) {
          if (testSet(this.set[i2], version, this.options)) {
            return true;
          }
        }
        return false;
      }
    };
    module2.exports = Range;
    var LRU = require_lrucache();
    var cache = new LRU();
    var parseOptions = require_parse_options();
    var Comparator = require_comparator();
    var debug = require_debug();
    var SemVer = require_semver();
    var {
      safeRe: re,
      t,
      comparatorTrimReplace,
      tildeTrimReplace,
      caretTrimReplace
    } = require_re();
    var { FLAG_INCLUDE_PRERELEASE, FLAG_LOOSE } = require_constants();
    var isNullSet = (c3) => c3.value === "<0.0.0-0";
    var isAny2 = (c3) => c3.value === "";
    var isSatisfiable = (comparators, options) => {
      let result = true;
      const remainingComparators = comparators.slice();
      let testComparator = remainingComparators.pop();
      while (result && remainingComparators.length) {
        result = remainingComparators.every((otherComparator) => {
          return testComparator.intersects(otherComparator, options);
        });
        testComparator = remainingComparators.pop();
      }
      return result;
    };
    var parseComparator = (comp, options) => {
      comp = comp.replace(re[t.BUILD], "");
      debug("comp", comp, options);
      comp = replaceCarets(comp, options);
      debug("caret", comp);
      comp = replaceTildes(comp, options);
      debug("tildes", comp);
      comp = replaceXRanges(comp, options);
      debug("xrange", comp);
      comp = replaceStars(comp, options);
      debug("stars", comp);
      return comp;
    };
    var isX = (id) => !id || id.toLowerCase() === "x" || id === "*";
    var replaceTildes = (comp, options) => {
      return comp.trim().split(/\s+/).map((c3) => replaceTilde(c3, options)).join(" ");
    };
    var replaceTilde = (comp, options) => {
      const r = options.loose ? re[t.TILDELOOSE] : re[t.TILDE];
      return comp.replace(r, (_, M, m, p, pr) => {
        debug("tilde", comp, _, M, m, p, pr);
        let ret;
        if (isX(M)) {
          ret = "";
        } else if (isX(m)) {
          ret = `>=${M}.0.0 <${+M + 1}.0.0-0`;
        } else if (isX(p)) {
          ret = `>=${M}.${m}.0 <${M}.${+m + 1}.0-0`;
        } else if (pr) {
          debug("replaceTilde pr", pr);
          ret = `>=${M}.${m}.${p}-${pr} <${M}.${+m + 1}.0-0`;
        } else {
          ret = `>=${M}.${m}.${p} <${M}.${+m + 1}.0-0`;
        }
        debug("tilde return", ret);
        return ret;
      });
    };
    var replaceCarets = (comp, options) => {
      return comp.trim().split(/\s+/).map((c3) => replaceCaret(c3, options)).join(" ");
    };
    var replaceCaret = (comp, options) => {
      debug("caret", comp, options);
      const r = options.loose ? re[t.CARETLOOSE] : re[t.CARET];
      const z = options.includePrerelease ? "-0" : "";
      return comp.replace(r, (_, M, m, p, pr) => {
        debug("caret", comp, _, M, m, p, pr);
        let ret;
        if (isX(M)) {
          ret = "";
        } else if (isX(m)) {
          ret = `>=${M}.0.0${z} <${+M + 1}.0.0-0`;
        } else if (isX(p)) {
          if (M === "0") {
            ret = `>=${M}.${m}.0${z} <${M}.${+m + 1}.0-0`;
          } else {
            ret = `>=${M}.${m}.0${z} <${+M + 1}.0.0-0`;
          }
        } else if (pr) {
          debug("replaceCaret pr", pr);
          if (M === "0") {
            if (m === "0") {
              ret = `>=${M}.${m}.${p}-${pr} <${M}.${m}.${+p + 1}-0`;
            } else {
              ret = `>=${M}.${m}.${p}-${pr} <${M}.${+m + 1}.0-0`;
            }
          } else {
            ret = `>=${M}.${m}.${p}-${pr} <${+M + 1}.0.0-0`;
          }
        } else {
          debug("no pr");
          if (M === "0") {
            if (m === "0") {
              ret = `>=${M}.${m}.${p}${z} <${M}.${m}.${+p + 1}-0`;
            } else {
              ret = `>=${M}.${m}.${p}${z} <${M}.${+m + 1}.0-0`;
            }
          } else {
            ret = `>=${M}.${m}.${p} <${+M + 1}.0.0-0`;
          }
        }
        debug("caret return", ret);
        return ret;
      });
    };
    var replaceXRanges = (comp, options) => {
      debug("replaceXRanges", comp, options);
      return comp.split(/\s+/).map((c3) => replaceXRange(c3, options)).join(" ");
    };
    var replaceXRange = (comp, options) => {
      comp = comp.trim();
      const r = options.loose ? re[t.XRANGELOOSE] : re[t.XRANGE];
      return comp.replace(r, (ret, gtlt, M, m, p, pr) => {
        debug("xRange", comp, ret, gtlt, M, m, p, pr);
        const xM = isX(M);
        const xm = xM || isX(m);
        const xp = xm || isX(p);
        const anyX = xp;
        if (gtlt === "=" && anyX) {
          gtlt = "";
        }
        pr = options.includePrerelease ? "-0" : "";
        if (xM) {
          if (gtlt === ">" || gtlt === "<") {
            ret = "<0.0.0-0";
          } else {
            ret = "*";
          }
        } else if (gtlt && anyX) {
          if (xm) {
            m = 0;
          }
          p = 0;
          if (gtlt === ">") {
            gtlt = ">=";
            if (xm) {
              M = +M + 1;
              m = 0;
              p = 0;
            } else {
              m = +m + 1;
              p = 0;
            }
          } else if (gtlt === "<=") {
            gtlt = "<";
            if (xm) {
              M = +M + 1;
            } else {
              m = +m + 1;
            }
          }
          if (gtlt === "<") {
            pr = "-0";
          }
          ret = `${gtlt + M}.${m}.${p}${pr}`;
        } else if (xm) {
          ret = `>=${M}.0.0${pr} <${+M + 1}.0.0-0`;
        } else if (xp) {
          ret = `>=${M}.${m}.0${pr} <${M}.${+m + 1}.0-0`;
        }
        debug("xRange return", ret);
        return ret;
      });
    };
    var replaceStars = (comp, options) => {
      debug("replaceStars", comp, options);
      return comp.trim().replace(re[t.STAR], "");
    };
    var replaceGTE0 = (comp, options) => {
      debug("replaceGTE0", comp, options);
      return comp.trim().replace(re[options.includePrerelease ? t.GTE0PRE : t.GTE0], "");
    };
    var hyphenReplace = (incPr) => ($0, from, fM, fm, fp, fpr, fb, to, tM, tm, tp, tpr) => {
      if (isX(fM)) {
        from = "";
      } else if (isX(fm)) {
        from = `>=${fM}.0.0${incPr ? "-0" : ""}`;
      } else if (isX(fp)) {
        from = `>=${fM}.${fm}.0${incPr ? "-0" : ""}`;
      } else if (fpr) {
        from = `>=${from}`;
      } else {
        from = `>=${from}${incPr ? "-0" : ""}`;
      }
      if (isX(tM)) {
        to = "";
      } else if (isX(tm)) {
        to = `<${+tM + 1}.0.0-0`;
      } else if (isX(tp)) {
        to = `<${tM}.${+tm + 1}.0-0`;
      } else if (tpr) {
        to = `<=${tM}.${tm}.${tp}-${tpr}`;
      } else if (incPr) {
        to = `<${tM}.${tm}.${+tp + 1}-0`;
      } else {
        to = `<=${to}`;
      }
      return `${from} ${to}`.trim();
    };
    var testSet = (set, version, options) => {
      for (let i2 = 0; i2 < set.length; i2++) {
        if (!set[i2].test(version)) {
          return false;
        }
      }
      if (version.prerelease.length && !options.includePrerelease) {
        for (let i2 = 0; i2 < set.length; i2++) {
          debug(set[i2].semver);
          if (set[i2].semver === Comparator.ANY) {
            continue;
          }
          if (set[i2].semver.prerelease.length > 0) {
            const allowed = set[i2].semver;
            if (allowed.major === version.major && allowed.minor === version.minor && allowed.patch === version.patch) {
              return true;
            }
          }
        }
        return false;
      }
      return true;
    };
  }
});

// ../packages/curness-core/node_modules/semver/classes/comparator.js
var require_comparator = __commonJS({
  "../packages/curness-core/node_modules/semver/classes/comparator.js"(exports2, module2) {
    "use strict";
    var ANY = Symbol("SemVer ANY");
    var Comparator = class _Comparator {
      static get ANY() {
        return ANY;
      }
      constructor(comp, options) {
        options = parseOptions(options);
        if (comp instanceof _Comparator) {
          if (comp.loose === !!options.loose) {
            return comp;
          } else {
            comp = comp.value;
          }
        }
        comp = comp.trim().split(/\s+/).join(" ");
        debug("comparator", comp, options);
        this.options = options;
        this.loose = !!options.loose;
        this.parse(comp);
        if (this.semver === ANY) {
          this.value = "";
        } else {
          this.value = this.operator + this.semver.version;
        }
        debug("comp", this);
      }
      parse(comp) {
        const r = this.options.loose ? re[t.COMPARATORLOOSE] : re[t.COMPARATOR];
        const m = comp.match(r);
        if (!m) {
          throw new TypeError(`Invalid comparator: ${comp}`);
        }
        this.operator = m[1] !== void 0 ? m[1] : "";
        if (this.operator === "=") {
          this.operator = "";
        }
        if (!m[2]) {
          this.semver = ANY;
        } else {
          this.semver = new SemVer(m[2], this.options.loose);
        }
      }
      toString() {
        return this.value;
      }
      test(version) {
        debug("Comparator.test", version, this.options.loose);
        if (this.semver === ANY || version === ANY) {
          return true;
        }
        if (typeof version === "string") {
          try {
            version = new SemVer(version, this.options);
          } catch (er) {
            return false;
          }
        }
        return cmp(version, this.operator, this.semver, this.options);
      }
      intersects(comp, options) {
        if (!(comp instanceof _Comparator)) {
          throw new TypeError("a Comparator is required");
        }
        if (this.operator === "") {
          if (this.value === "") {
            return true;
          }
          return new Range(comp.value, options).test(this.value);
        } else if (comp.operator === "") {
          if (comp.value === "") {
            return true;
          }
          return new Range(this.value, options).test(comp.semver);
        }
        options = parseOptions(options);
        if (options.includePrerelease && (this.value === "<0.0.0-0" || comp.value === "<0.0.0-0")) {
          return false;
        }
        if (!options.includePrerelease && (this.value.startsWith("<0.0.0") || comp.value.startsWith("<0.0.0"))) {
          return false;
        }
        if (this.operator.startsWith(">") && comp.operator.startsWith(">")) {
          return true;
        }
        if (this.operator.startsWith("<") && comp.operator.startsWith("<")) {
          return true;
        }
        if (this.semver.version === comp.semver.version && this.operator.includes("=") && comp.operator.includes("=")) {
          return true;
        }
        if (cmp(this.semver, "<", comp.semver, options) && this.operator.startsWith(">") && comp.operator.startsWith("<")) {
          return true;
        }
        if (cmp(this.semver, ">", comp.semver, options) && this.operator.startsWith("<") && comp.operator.startsWith(">")) {
          return true;
        }
        return false;
      }
    };
    module2.exports = Comparator;
    var parseOptions = require_parse_options();
    var { safeRe: re, t } = require_re();
    var cmp = require_cmp();
    var debug = require_debug();
    var SemVer = require_semver();
    var Range = require_range();
  }
});

// ../packages/curness-core/node_modules/semver/functions/satisfies.js
var require_satisfies = __commonJS({
  "../packages/curness-core/node_modules/semver/functions/satisfies.js"(exports2, module2) {
    "use strict";
    var Range = require_range();
    var satisfies = (version, range, options) => {
      try {
        range = new Range(range, options);
      } catch (er) {
        return false;
      }
      return range.test(version);
    };
    module2.exports = satisfies;
  }
});

// ../packages/curness-core/node_modules/semver/ranges/to-comparators.js
var require_to_comparators = __commonJS({
  "../packages/curness-core/node_modules/semver/ranges/to-comparators.js"(exports2, module2) {
    "use strict";
    var Range = require_range();
    var toComparators = (range, options) => new Range(range, options).set.map((comp) => comp.map((c3) => c3.value).join(" ").trim().split(" "));
    module2.exports = toComparators;
  }
});

// ../packages/curness-core/node_modules/semver/ranges/max-satisfying.js
var require_max_satisfying = __commonJS({
  "../packages/curness-core/node_modules/semver/ranges/max-satisfying.js"(exports2, module2) {
    "use strict";
    var SemVer = require_semver();
    var Range = require_range();
    var maxSatisfying = (versions, range, options) => {
      let max = null;
      let maxSV = null;
      let rangeObj = null;
      try {
        rangeObj = new Range(range, options);
      } catch (er) {
        return null;
      }
      versions.forEach((v) => {
        if (rangeObj.test(v)) {
          if (!max || maxSV.compare(v) === -1) {
            max = v;
            maxSV = new SemVer(max, options);
          }
        }
      });
      return max;
    };
    module2.exports = maxSatisfying;
  }
});

// ../packages/curness-core/node_modules/semver/ranges/min-satisfying.js
var require_min_satisfying = __commonJS({
  "../packages/curness-core/node_modules/semver/ranges/min-satisfying.js"(exports2, module2) {
    "use strict";
    var SemVer = require_semver();
    var Range = require_range();
    var minSatisfying = (versions, range, options) => {
      let min = null;
      let minSV = null;
      let rangeObj = null;
      try {
        rangeObj = new Range(range, options);
      } catch (er) {
        return null;
      }
      versions.forEach((v) => {
        if (rangeObj.test(v)) {
          if (!min || minSV.compare(v) === 1) {
            min = v;
            minSV = new SemVer(min, options);
          }
        }
      });
      return min;
    };
    module2.exports = minSatisfying;
  }
});

// ../packages/curness-core/node_modules/semver/ranges/min-version.js
var require_min_version = __commonJS({
  "../packages/curness-core/node_modules/semver/ranges/min-version.js"(exports2, module2) {
    "use strict";
    var SemVer = require_semver();
    var Range = require_range();
    var gt = require_gt();
    var minVersion = (range, loose) => {
      range = new Range(range, loose);
      let minver = new SemVer("0.0.0");
      if (range.test(minver)) {
        return minver;
      }
      minver = new SemVer("0.0.0-0");
      if (range.test(minver)) {
        return minver;
      }
      minver = null;
      for (let i2 = 0; i2 < range.set.length; ++i2) {
        const comparators = range.set[i2];
        let setMin = null;
        comparators.forEach((comparator) => {
          const compver = new SemVer(comparator.semver.version);
          switch (comparator.operator) {
            case ">":
              if (compver.prerelease.length === 0) {
                compver.patch++;
              } else {
                compver.prerelease.push(0);
              }
              compver.raw = compver.format();
            /* fallthrough */
            case "":
            case ">=":
              if (!setMin || gt(compver, setMin)) {
                setMin = compver;
              }
              break;
            case "<":
            case "<=":
              break;
            /* istanbul ignore next */
            default:
              throw new Error(`Unexpected operation: ${comparator.operator}`);
          }
        });
        if (setMin && (!minver || gt(minver, setMin))) {
          minver = setMin;
        }
      }
      if (minver && range.test(minver)) {
        return minver;
      }
      return null;
    };
    module2.exports = minVersion;
  }
});

// ../packages/curness-core/node_modules/semver/ranges/valid.js
var require_valid2 = __commonJS({
  "../packages/curness-core/node_modules/semver/ranges/valid.js"(exports2, module2) {
    "use strict";
    var Range = require_range();
    var validRange = (range, options) => {
      try {
        return new Range(range, options).range || "*";
      } catch (er) {
        return null;
      }
    };
    module2.exports = validRange;
  }
});

// ../packages/curness-core/node_modules/semver/ranges/outside.js
var require_outside = __commonJS({
  "../packages/curness-core/node_modules/semver/ranges/outside.js"(exports2, module2) {
    "use strict";
    var SemVer = require_semver();
    var Comparator = require_comparator();
    var { ANY } = Comparator;
    var Range = require_range();
    var satisfies = require_satisfies();
    var gt = require_gt();
    var lt = require_lt();
    var lte = require_lte();
    var gte = require_gte();
    var outside = (version, range, hilo, options) => {
      version = new SemVer(version, options);
      range = new Range(range, options);
      let gtfn, ltefn, ltfn, comp, ecomp;
      switch (hilo) {
        case ">":
          gtfn = gt;
          ltefn = lte;
          ltfn = lt;
          comp = ">";
          ecomp = ">=";
          break;
        case "<":
          gtfn = lt;
          ltefn = gte;
          ltfn = gt;
          comp = "<";
          ecomp = "<=";
          break;
        default:
          throw new TypeError('Must provide a hilo val of "<" or ">"');
      }
      if (satisfies(version, range, options)) {
        return false;
      }
      for (let i2 = 0; i2 < range.set.length; ++i2) {
        const comparators = range.set[i2];
        let high = null;
        let low = null;
        comparators.forEach((comparator) => {
          if (comparator.semver === ANY) {
            comparator = new Comparator(">=0.0.0");
          }
          high = high || comparator;
          low = low || comparator;
          if (gtfn(comparator.semver, high.semver, options)) {
            high = comparator;
          } else if (ltfn(comparator.semver, low.semver, options)) {
            low = comparator;
          }
        });
        if (high.operator === comp || high.operator === ecomp) {
          return false;
        }
        if ((!low.operator || low.operator === comp) && ltefn(version, low.semver)) {
          return false;
        } else if (low.operator === ecomp && ltfn(version, low.semver)) {
          return false;
        }
      }
      return true;
    };
    module2.exports = outside;
  }
});

// ../packages/curness-core/node_modules/semver/ranges/gtr.js
var require_gtr = __commonJS({
  "../packages/curness-core/node_modules/semver/ranges/gtr.js"(exports2, module2) {
    "use strict";
    var outside = require_outside();
    var gtr = (version, range, options) => outside(version, range, ">", options);
    module2.exports = gtr;
  }
});

// ../packages/curness-core/node_modules/semver/ranges/ltr.js
var require_ltr = __commonJS({
  "../packages/curness-core/node_modules/semver/ranges/ltr.js"(exports2, module2) {
    "use strict";
    var outside = require_outside();
    var ltr = (version, range, options) => outside(version, range, "<", options);
    module2.exports = ltr;
  }
});

// ../packages/curness-core/node_modules/semver/ranges/intersects.js
var require_intersects = __commonJS({
  "../packages/curness-core/node_modules/semver/ranges/intersects.js"(exports2, module2) {
    "use strict";
    var Range = require_range();
    var intersects = (r1, r2, options) => {
      r1 = new Range(r1, options);
      r2 = new Range(r2, options);
      return r1.intersects(r2, options);
    };
    module2.exports = intersects;
  }
});

// ../packages/curness-core/node_modules/semver/ranges/simplify.js
var require_simplify = __commonJS({
  "../packages/curness-core/node_modules/semver/ranges/simplify.js"(exports2, module2) {
    "use strict";
    var satisfies = require_satisfies();
    var compare = require_compare();
    module2.exports = (versions, range, options) => {
      const set = [];
      let first = null;
      let prev = null;
      const v = versions.sort((a2, b) => compare(a2, b, options));
      for (const version of v) {
        const included = satisfies(version, range, options);
        if (included) {
          prev = version;
          if (!first) {
            first = version;
          }
        } else {
          if (prev) {
            set.push([first, prev]);
          }
          prev = null;
          first = null;
        }
      }
      if (first) {
        set.push([first, null]);
      }
      const ranges = [];
      for (const [min, max] of set) {
        if (min === max) {
          ranges.push(min);
        } else if (!max && min === v[0]) {
          ranges.push("*");
        } else if (!max) {
          ranges.push(`>=${min}`);
        } else if (min === v[0]) {
          ranges.push(`<=${max}`);
        } else {
          ranges.push(`${min} - ${max}`);
        }
      }
      const simplified = ranges.join(" || ");
      const original = typeof range.raw === "string" ? range.raw : String(range);
      return simplified.length < original.length ? simplified : range;
    };
  }
});

// ../packages/curness-core/node_modules/semver/ranges/subset.js
var require_subset = __commonJS({
  "../packages/curness-core/node_modules/semver/ranges/subset.js"(exports2, module2) {
    "use strict";
    var Range = require_range();
    var Comparator = require_comparator();
    var { ANY } = Comparator;
    var satisfies = require_satisfies();
    var compare = require_compare();
    var subset = (sub, dom, options = {}) => {
      if (sub === dom) {
        return true;
      }
      sub = new Range(sub, options);
      dom = new Range(dom, options);
      let sawNonNull = false;
      OUTER: for (const simpleSub of sub.set) {
        for (const simpleDom of dom.set) {
          const isSub = simpleSubset(simpleSub, simpleDom, options);
          sawNonNull = sawNonNull || isSub !== null;
          if (isSub) {
            continue OUTER;
          }
        }
        if (sawNonNull) {
          return false;
        }
      }
      return true;
    };
    var minimumVersionWithPreRelease = [new Comparator(">=0.0.0-0")];
    var minimumVersion = [new Comparator(">=0.0.0")];
    var simpleSubset = (sub, dom, options) => {
      if (sub === dom) {
        return true;
      }
      if (sub.length === 1 && sub[0].semver === ANY) {
        if (dom.length === 1 && dom[0].semver === ANY) {
          return true;
        } else if (options.includePrerelease) {
          sub = minimumVersionWithPreRelease;
        } else {
          sub = minimumVersion;
        }
      }
      if (dom.length === 1 && dom[0].semver === ANY) {
        if (options.includePrerelease) {
          return true;
        } else {
          dom = minimumVersion;
        }
      }
      const eqSet = /* @__PURE__ */ new Set();
      let gt, lt;
      for (const c3 of sub) {
        if (c3.operator === ">" || c3.operator === ">=") {
          gt = higherGT(gt, c3, options);
        } else if (c3.operator === "<" || c3.operator === "<=") {
          lt = lowerLT(lt, c3, options);
        } else {
          eqSet.add(c3.semver);
        }
      }
      if (eqSet.size > 1) {
        return null;
      }
      let gtltComp;
      if (gt && lt) {
        gtltComp = compare(gt.semver, lt.semver, options);
        if (gtltComp > 0) {
          return null;
        } else if (gtltComp === 0 && (gt.operator !== ">=" || lt.operator !== "<=")) {
          return null;
        }
      }
      for (const eq of eqSet) {
        if (gt && !satisfies(eq, String(gt), options)) {
          return null;
        }
        if (lt && !satisfies(eq, String(lt), options)) {
          return null;
        }
        for (const c3 of dom) {
          if (!satisfies(eq, String(c3), options)) {
            return false;
          }
        }
        return true;
      }
      let higher, lower;
      let hasDomLT, hasDomGT;
      let needDomLTPre = lt && !options.includePrerelease && lt.semver.prerelease.length ? lt.semver : false;
      let needDomGTPre = gt && !options.includePrerelease && gt.semver.prerelease.length ? gt.semver : false;
      if (needDomLTPre && needDomLTPre.prerelease.length === 1 && lt.operator === "<" && needDomLTPre.prerelease[0] === 0) {
        needDomLTPre = false;
      }
      for (const c3 of dom) {
        hasDomGT = hasDomGT || c3.operator === ">" || c3.operator === ">=";
        hasDomLT = hasDomLT || c3.operator === "<" || c3.operator === "<=";
        if (gt) {
          if (needDomGTPre) {
            if (c3.semver.prerelease && c3.semver.prerelease.length && c3.semver.major === needDomGTPre.major && c3.semver.minor === needDomGTPre.minor && c3.semver.patch === needDomGTPre.patch) {
              needDomGTPre = false;
            }
          }
          if (c3.operator === ">" || c3.operator === ">=") {
            higher = higherGT(gt, c3, options);
            if (higher === c3 && higher !== gt) {
              return false;
            }
          } else if (gt.operator === ">=" && !satisfies(gt.semver, String(c3), options)) {
            return false;
          }
        }
        if (lt) {
          if (needDomLTPre) {
            if (c3.semver.prerelease && c3.semver.prerelease.length && c3.semver.major === needDomLTPre.major && c3.semver.minor === needDomLTPre.minor && c3.semver.patch === needDomLTPre.patch) {
              needDomLTPre = false;
            }
          }
          if (c3.operator === "<" || c3.operator === "<=") {
            lower = lowerLT(lt, c3, options);
            if (lower === c3 && lower !== lt) {
              return false;
            }
          } else if (lt.operator === "<=" && !satisfies(lt.semver, String(c3), options)) {
            return false;
          }
        }
        if (!c3.operator && (lt || gt) && gtltComp !== 0) {
          return false;
        }
      }
      if (gt && hasDomLT && !lt && gtltComp !== 0) {
        return false;
      }
      if (lt && hasDomGT && !gt && gtltComp !== 0) {
        return false;
      }
      if (needDomGTPre || needDomLTPre) {
        return false;
      }
      return true;
    };
    var higherGT = (a2, b, options) => {
      if (!a2) {
        return b;
      }
      const comp = compare(a2.semver, b.semver, options);
      return comp > 0 ? a2 : comp < 0 ? b : b.operator === ">" && a2.operator === ">=" ? b : a2;
    };
    var lowerLT = (a2, b, options) => {
      if (!a2) {
        return b;
      }
      const comp = compare(a2.semver, b.semver, options);
      return comp < 0 ? a2 : comp > 0 ? b : b.operator === "<" && a2.operator === "<=" ? b : a2;
    };
    module2.exports = subset;
  }
});

// ../packages/curness-core/node_modules/semver/index.js
var require_semver2 = __commonJS({
  "../packages/curness-core/node_modules/semver/index.js"(exports2, module2) {
    "use strict";
    var internalRe = require_re();
    var constants = require_constants();
    var SemVer = require_semver();
    var identifiers = require_identifiers();
    var parse = require_parse();
    var valid = require_valid();
    var clean = require_clean();
    var inc = require_inc();
    var diff = require_diff();
    var major2 = require_major();
    var minor2 = require_minor();
    var patch = require_patch();
    var prerelease = require_prerelease();
    var compare = require_compare();
    var rcompare = require_rcompare();
    var compareLoose = require_compare_loose();
    var compareBuild = require_compare_build();
    var sort = require_sort();
    var rsort = require_rsort();
    var gt = require_gt();
    var lt = require_lt();
    var eq = require_eq();
    var neq = require_neq();
    var gte = require_gte();
    var lte = require_lte();
    var cmp = require_cmp();
    var coerce = require_coerce();
    var Comparator = require_comparator();
    var Range = require_range();
    var satisfies = require_satisfies();
    var toComparators = require_to_comparators();
    var maxSatisfying = require_max_satisfying();
    var minSatisfying = require_min_satisfying();
    var minVersion = require_min_version();
    var validRange = require_valid2();
    var outside = require_outside();
    var gtr = require_gtr();
    var ltr = require_ltr();
    var intersects = require_intersects();
    var simplifyRange = require_simplify();
    var subset = require_subset();
    module2.exports = {
      parse,
      valid,
      clean,
      inc,
      diff,
      major: major2,
      minor: minor2,
      patch,
      prerelease,
      compare,
      rcompare,
      compareLoose,
      compareBuild,
      sort,
      rsort,
      gt,
      lt,
      eq,
      neq,
      gte,
      lte,
      cmp,
      coerce,
      Comparator,
      Range,
      satisfies,
      toComparators,
      maxSatisfying,
      minSatisfying,
      minVersion,
      validRange,
      outside,
      gtr,
      ltr,
      intersects,
      simplifyRange,
      subset,
      SemVer,
      re: internalRe.re,
      src: internalRe.src,
      tokens: internalRe.t,
      SEMVER_SPEC_VERSION: constants.SEMVER_SPEC_VERSION,
      RELEASE_TYPES: constants.RELEASE_TYPES,
      compareIdentifiers: identifiers.compareIdentifiers,
      rcompareIdentifiers: identifiers.rcompareIdentifiers
    };
  }
});

// ../packages/curness-core/lib/ocular.js
async function getOcularManifest() {
  try {
    const data = await source_default(MANIFEST_URL, { timeout: { request: 1e4 } }).json();
    if (data && data.version && data.downloadURL && data.sha256) {
      return {
        version: data.version,
        downloadURL: data.downloadURL,
        sha256: data.sha256,
        fileName: data.fileName || `ocular-distribution-mini-${data.version}.tar`
      };
    }
  } catch (_) {
  }
  return null;
}
function getOcularDir(dataDir) {
  return import_path.default.join(dataDir, "ocular-mini");
}
function getVersionFilePath(dataDir) {
  return import_path.default.join(getOcularDir(dataDir), ".curness-version");
}
function getOcularScriptPath(dataDir) {
  return import_path.default.join(getOcularDir(dataDir), "ocular.sh");
}
function getAnalyzeScriptPath(dataDir) {
  return import_path.default.join(dataDir, "analyze.sc");
}
function isOcularInstalled(dataDir) {
  const script = getOcularScriptPath(dataDir);
  try {
    const fd = import_fs.default.openSync(script, "r");
    import_fs.default.closeSync(fd);
    return true;
  } catch (e) {
    if ((e == null ? void 0 : e.code) === "ENOENT") return false;
    throw e;
  }
}
function getInstalledOcularVersion(dataDir) {
  const vpath = getVersionFilePath(dataDir);
  try {
    const v = import_fs.default.readFileSync(vpath, "utf8").trim();
    return v || null;
  } catch (err) {
    if ((err == null ? void 0 : err.code) === "ENOENT") return null;
    throw err;
  }
}
async function checkOcularUpdate(dataDir) {
  const installed = getInstalledOcularVersion(dataDir);
  const manifest = await getOcularManifest();
  const latest = manifest && manifest.version ? manifest.version : null;
  let updateAvailable = false;
  if (installed !== null && latest !== null) {
    try {
      updateAvailable = import_semver.default.compare(latest.trim(), installed.trim()) > 0;
    } catch {
      updateAvailable = false;
    }
  }
  return { installed, latest, updateAvailable };
}
function ensureAnalyzeScript(dataDir, sourceAnalyzePath, onProgress) {
  const dest = getAnalyzeScriptPath(dataDir);
  try {
    import_fs.default.readFileSync(dest);
    return true;
  } catch (e) {
    if ((e == null ? void 0 : e.code) !== "ENOENT") throw e;
  }
  if (!sourceAnalyzePath) {
    if (onProgress) onProgress("analyze.sc not found; cannot run scans");
    return false;
  }
  try {
    import_fs.default.mkdirSync(dataDir, { recursive: true, mode: 493 });
    import_fs.default.copyFileSync(sourceAnalyzePath, dest);
  } catch (e) {
    if ((e == null ? void 0 : e.code) === "ENOENT") {
      if (onProgress) onProgress("analyze.sc not found; cannot run scans");
      return false;
    }
    throw e;
  }
  if (onProgress) onProgress("Copied analyze.sc to data directory");
  return true;
}
function sha256File(filePath) {
  const hash = import_crypto.default.createHash("sha256");
  const buf = import_fs.default.readFileSync(filePath);
  hash.update(buf);
  return hash.digest("hex");
}
async function downloadToFile(downloadURL, tempFile, options = {}) {
  const { onProgress = () => {
  }, signal, expectedSha256 } = options;
  const stream2 = source_default.stream(downloadURL, {
    timeout: { request: DOWNLOAD_REQUEST_TIMEOUT_MS },
    signal,
    retry: { limit: 0 }
  });
  stream2.on("downloadProgress", ({ transferred, total }) => {
    if (total && total > 0) {
      const msg = `Downloading ${Math.floor(transferred / 1024 / 1024)}MB / ${Math.floor(total / 1024 / 1024)}MB`;
      onProgress(msg);
    }
  });
  const dest = (0, import_fs2.createWriteStream)(tempFile);
  await (0, import_promises3.pipeline)(stream2, dest);
  if (expectedSha256) {
    const actual = sha256File(tempFile);
    if (actual !== expectedSha256) {
      try {
        import_fs.default.unlinkSync(tempFile);
      } catch (_) {
      }
      throw new Error(`Checksum mismatch: expected ${expectedSha256}, got ${actual}`);
    }
  }
}
function getFallbackDownloadUrl(version) {
  return `https://www.shiftleft.io/download/ocular/ocular-distribution-mini-${version || OCULAR_VERSION}.tar.gz`;
}
async function downloadAndExtractOcular(dataDir, options = {}) {
  const { onProgress = () => {
  }, signal } = options;
  const ocularDir = getOcularDir(dataDir);
  const manifest = await getOcularManifest();
  const version = manifest && manifest.version || OCULAR_VERSION;
  const useManifest = manifest && manifest.downloadURL && manifest.sha256;
  let downloadURL = useManifest ? manifest.downloadURL : getFallbackDownloadUrl(version);
  let expectedSha256 = useManifest ? manifest.sha256 : null;
  let isGzip = useManifest ? (manifest.fileName || "").endsWith(".tar.gz") || (manifest.downloadURL || "").endsWith(".tar.gz") : true;
  let ext = isGzip ? ".tar.gz" : ".tar";
  const tempFile = import_path.default.join(import_os.default.tmpdir(), `ocular-${import_crypto.default.randomBytes(16).toString("hex")}${ext}`);
  try {
    if (onProgress)
      onProgress(useManifest ? `Downloading dependencies ${version} (~400MB)...` : "Downloading (~400MB)...");
    try {
      await downloadToFile(downloadURL, tempFile, { onProgress, signal, expectedSha256 });
    } catch (firstErr) {
      const is403 = firstErr.response && firstErr.response.statusCode === 403;
      if (is403 && useManifest && downloadURL.includes("cloudfront")) {
        if (onProgress) onProgress("CDN returned 403, trying shiftleft.io...");
        const fallbackUrl = getFallbackDownloadUrl(version);
        const fallbackTemp = import_path.default.join(import_os.default.tmpdir(), `ocular-${import_crypto.default.randomBytes(16).toString("hex")}.tar.gz`);
        try {
          await downloadToFile(fallbackUrl, fallbackTemp, {
            onProgress,
            signal,
            expectedSha256: manifest.sha256
          });
          try {
            import_fs.default.unlinkSync(tempFile);
          } catch (_) {
          }
          import_fs.default.mkdirSync(ocularDir, { recursive: true });
          await execFilePromise("tar", ["-xzf", fallbackTemp, "--strip-components=1", "-C", ocularDir], {
            maxBuffer: 0
          });
          try {
            import_fs.default.unlinkSync(fallbackTemp);
          } catch (_) {
          }
        } finally {
          try {
            import_fs.default.unlinkSync(tempFile);
          } catch (_) {
          }
          try {
            import_fs.default.unlinkSync(fallbackTemp);
          } catch (_) {
          }
        }
        const ocularScript2 = getOcularScriptPath(dataDir);
        try {
          import_fs.default.chmodSync(ocularScript2, 493);
        } catch (e) {
          if ((e == null ? void 0 : e.code) === "ENOENT") throw firstErr;
          throw e;
        }
        if (onProgress) onProgress("Extracting files...");
        try {
          import_fs.default.writeFileSync(getVersionFilePath(dataDir), version + "\n", { mode: 420 });
        } catch (_) {
        }
        if (onProgress) onProgress("Complete!");
        return true;
      }
      throw firstErr;
    }
    if (onProgress) onProgress("Extracting files...");
    import_fs.default.mkdirSync(ocularDir, { recursive: true });
    const tarArgs = isGzip ? ["-xzf", tempFile, "--strip-components=1", "-C", ocularDir] : ["-xf", tempFile, "--strip-components=1", "-C", ocularDir];
    await execFilePromise("tar", tarArgs, { maxBuffer: 0 });
    import_fs.default.unlinkSync(tempFile);
    const ocularScript = getOcularScriptPath(dataDir);
    try {
      import_fs.default.chmodSync(ocularScript, 493);
    } catch (_) {
    }
    const installedVersion = useManifest ? manifest.version : OCULAR_VERSION;
    try {
      import_fs.default.writeFileSync(getVersionFilePath(dataDir), installedVersion + "\n", { mode: 420 });
    } catch (_) {
    }
    if (onProgress) onProgress("Complete!");
    return true;
  } catch (err) {
    try {
      import_fs.default.unlinkSync(tempFile);
    } catch (_) {
    }
    throw err;
  }
}
async function ensureOcularInstalled(dataDir, options = {}) {
  const { onProgress = () => {
  }, signal, analyzeScriptSource: analyzeScriptSource2, forceUpdate = false } = options;
  if (!ensureAnalyzeScript(dataDir, analyzeScriptSource2, onProgress)) {
    return false;
  }
  let doUpdate = forceUpdate;
  if (isOcularInstalled(dataDir) && !forceUpdate) {
    if (getInstalledOcularVersion(dataDir) !== null) {
      return true;
    }
    doUpdate = true;
  }
  if (doUpdate) {
    const ocularDir = getOcularDir(dataDir);
    if (onProgress) onProgress("Removing existing dependencies for update...");
    try {
      import_fs.default.rmSync(ocularDir, { recursive: true, force: true });
    } catch (e) {
      if ((e == null ? void 0 : e.code) !== "ENOENT") throw e;
    }
  }
  try {
    await downloadAndExtractOcular(dataDir, { onProgress, signal });
    return true;
  } catch (err) {
    if (onProgress) onProgress(`Failed: ${err.message}`);
    return false;
  }
}
var import_fs, import_path, import_os, import_crypto, import_child_process, import_promises3, import_fs2, import_semver, import_util, execFilePromise, OCULAR_VERSION, OCULAR_URL, MANIFEST_URL, DOWNLOAD_REQUEST_TIMEOUT_MS;
var init_ocular = __esm({
  "../packages/curness-core/lib/ocular.js"() {
    import_fs = __toESM(require("fs"), 1);
    import_path = __toESM(require("path"), 1);
    import_os = __toESM(require("os"), 1);
    import_crypto = __toESM(require("crypto"), 1);
    import_child_process = require("child_process");
    import_promises3 = require("stream/promises");
    import_fs2 = require("fs");
    init_source3();
    import_semver = __toESM(require_semver2(), 1);
    import_util = require("util");
    execFilePromise = (0, import_util.promisify)(import_child_process.execFile);
    OCULAR_VERSION = "0.8.8";
    OCULAR_URL = `https://www.shiftleft.io/download/ocular/ocular-distribution-mini-${OCULAR_VERSION}.tar.gz`;
    MANIFEST_URL = "https://www.shiftleft.io/download/ocular-distribution-mini.json";
    DOWNLOAD_REQUEST_TIMEOUT_MS = 3e5;
  }
});

// src/update-handler.js
var import_path5 = __toESM(require("path"), 1);

// ../packages/curness-core/index.js
var import_path4 = __toESM(require("path"), 1);
var import_os3 = __toESM(require("os"), 1);
var import_url2 = require("url");
var import_module = require("module");
init_ocular();

// ../packages/curness-core/lib/scan.js
var import_child_process2 = require("child_process");
var import_util2 = require("util");
init_ocular();
var execFilePromise2 = (0, import_util2.promisify)(import_child_process2.execFile);
var DEFAULT_MAX_BUFFER = 10 * 1024 * 1024;

// ../packages/curness-core/lib/cursorHook.js
var import_path2 = __toESM(require("path"), 1);
var import_url = require("url");
var __dirname = import_path2.default.dirname((0, import_url.fileURLToPath)(__import_meta_url__));

// ../packages/curness-core/lib/shiftleftConfig.js
var import_fs3 = __toESM(require("fs"), 1);
var import_path3 = __toESM(require("path"), 1);
var import_os2 = __toESM(require("os"), 1);
var UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
function getShiftleftConfigPath(dataDir) {
  const dir = dataDir || import_path3.default.join(import_os2.default.homedir(), ".shiftleft");
  return import_path3.default.join(dir, "config.json");
}
function hasValidShiftleftConfig(dataDir) {
  const configPath = getShiftleftConfigPath(dataDir);
  if (!import_fs3.default.existsSync(configPath)) return false;
  let config;
  try {
    config = JSON.parse(import_fs3.default.readFileSync(configPath, "utf8"));
  } catch {
    return false;
  }
  if (!config || typeof config !== "object") return false;
  const orgId = config.orgId;
  const accessToken = config.accessToken;
  if (typeof orgId !== "string" || !orgId.trim()) return false;
  if (typeof accessToken !== "string" || !accessToken.trim()) return false;
  if (!UUID_REGEX.test(orgId.trim())) return false;
  const tokenParts = accessToken.trim().split(".");
  if (tokenParts.length < 3) return false;
  return true;
}

// ../packages/curness-core/index.js
var __dirname2 = import_path4.default.dirname((0, import_url2.fileURLToPath)(__import_meta_url__));
var _require = (0, import_module.createRequire)(__import_meta_url__);
function getOcularDataDir() {
  return import_path4.default.join(import_os3.default.homedir(), ".shiftleft");
}
async function ensureOcularInstalled2(options = {}) {
  const dataDir = options.dataDir || getOcularDataDir();
  const analyzeScriptSource2 = options.analyzeScriptSource ?? import_path4.default.join(__dirname2, "analyze.sc");
  return ensureOcularInstalled(dataDir, {
    onProgress: options.onProgress,
    signal: options.signal,
    analyzeScriptSource: analyzeScriptSource2,
    forceUpdate: options.forceUpdate
  });
}
function isOcularInstalled2(dataDir) {
  return isOcularInstalled(dataDir || getOcularDataDir());
}
var getInstalledOcularVersion2 = getInstalledOcularVersion;
var checkOcularUpdate2 = checkOcularUpdate;
var hasValidShiftleftConfig2 = hasValidShiftleftConfig;

// src/update-handler.js
function log(msg) {
  process.stdout.write(msg + "\n");
}
var handlerDir = import_path5.default.dirname(process.argv[1] || process.cwd());
var analyzeScriptSource = import_path5.default.join(handlerDir, "analyze.sc");
async function main() {
  const dataDir = getOcularDataDir();
  if (!hasValidShiftleftConfig2(dataDir)) {
    log("Missing or invalid ~/.shiftleft/config.json. Need orgId (UUID) and accessToken (JWT).");
    process.exitCode = 1;
    return;
  }
  if (!isOcularInstalled2(dataDir)) {
    log("Dependencies not installed. Downloading (~400MB)...");
    try {
      const ok = await ensureOcularInstalled2({
        dataDir,
        analyzeScriptSource,
        onProgress: (msg) => log(msg)
      });
      if (ok) {
        const v = getInstalledOcularVersion2(dataDir);
        log("Dependencies installed successfully." + (v ? ` (version ${v})` : ""));
      } else {
        log("Dependencies installation failed.");
        process.exitCode = 1;
      }
    } catch (err) {
      log("Error: " + err.message);
      process.exitCode = 1;
    }
    return;
  }
  const { installed, latest, updateAvailable } = await checkOcularUpdate2(dataDir);
  if (updateAvailable && latest) {
    log(`Update available: ${latest} (you have ${installed}). Updating...`);
    try {
      const ok = await ensureOcularInstalled2({
        dataDir,
        forceUpdate: true,
        analyzeScriptSource,
        onProgress: (msg) => log(msg)
      });
      if (ok) {
        log(`Updated to ${latest}.`);
      } else {
        log("Update failed.");
        process.exitCode = 1;
      }
    } catch (err) {
      log("Error: " + err.message);
      process.exitCode = 1;
    }
  } else {
    log("Dependencies are up to date." + (installed ? ` (version ${installed})` : ""));
  }
}
main().catch((err) => {
  log("Error: " + err.message);
  process.exitCode = 1;
});
/*! Bundled license information:

keyv/dist/index.js:
  (* v8 ignore next -- @preserve *)

cacheable-request/dist/index.js:
  (* c8 ignore next -- @preserve *)
  (* v8 ignore next -- @preserve *)
*/
