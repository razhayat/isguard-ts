import { isInstanceof } from "./isInstanceof";
import { isLiteral } from "./isLiteral";
import { isRefine } from "./isRefine";
import { isTypeof } from "./isTypeof";
import { isUnion } from "./isUnion";
import { TypeGuard } from "./types";
import { createTypeGuard } from "./utils";

export const isNull = isLiteral(null);
export const isUndefined = isLiteral(undefined);
export const isNil = isLiteral(null, undefined);

export const isTrue = isLiteral(true);
export const isFalse = isLiteral(false);

export const isNumber = isTypeof("number");
export const isBigint = isTypeof("bigint");
export const isString = isTypeof("string");
export const isBoolean = isTypeof("boolean");
export const isSymbol = isTypeof("symbol");
export const isFunction = isTypeof("function");
export const isObject = isRefine(isTypeof("object"), object => !!object);
export const isPropertyKey: TypeGuard<PropertyKey> = isUnion(isString, isNumber, isSymbol);

export const isDate = isInstanceof(Date);
export const isRegExp = isInstanceof(RegExp);
export const isError = 	isInstanceof(Error);
export const isEvalError = isInstanceof(EvalError);
export const isRangeError = isInstanceof(RangeError);
export const isReferenceError = isInstanceof(ReferenceError);
export const isSyntaxError = isInstanceof(SyntaxError);
export const isTypeError = isInstanceof(TypeError);
export const isURIError = isInstanceof(URIError);

/**
 * @deprecated use `isNumber.array()` instead
 */
export const isNumberArray = isNumber.array();
/**
 * @deprecated use `isString.array()` instead
 */
export const isStringArray = isString.array();
/**
 * @deprecated use `isBoolean.array()` instead
 */
export const isBooleanArray = isBoolean.array();
/**
 * @deprecated use `isDate.array()` instead
 */
export const isDateArray = isDate.array();

/**
 * @deprecated use `isNumber.optional()` instead
 */
export const isOptionalNumber = isNumber.optional();
/**
 * @deprecated use `isString.optional()` instead
 */
export const isOptionalString = isString.optional();
/**
 * @deprecated use `isBoolean.optional()` instead
 */
export const isOptionalBoolean = isBoolean.optional();
/**
 * @deprecated use `isDate.optional()` instead
 */
export const isOptionalDate = isDate.optional();

export const isMaybe = <T>(guard: TypeGuard<T>) => isUnion(isNull, guard);
export const isMaybeNumber = isMaybe(isNumber);
export const isMaybeString = isMaybe(isString);
export const isMaybeBoolean = isMaybe(isBoolean);
export const isMaybeDate = isMaybe(isDate);

export const isUnknown: TypeGuard<unknown> = createTypeGuard((value): value is unknown => true);
export const isNever: TypeGuard<never> = createTypeGuard((value): value is never => false);
