import { isArray } from "./isArray";
import { isInstanceof } from "./isInstanceof";
import { isLiteral } from "./isLiteral";
import { isTypeof } from "./isTypeof";
import { isUnion } from "./isUnion";
import { TypeGuard } from "./types";

export const isNull = isLiteral(null);
export const isUndefined = isLiteral(undefined);
export const isNil = isUnion(isNull, isUndefined);

export const isTrue = isLiteral(true);
export const isFalse = isLiteral(false);

export const isNumber = isTypeof("number");
export const isBigint = isTypeof("bigint");
export const isString = isTypeof("string");
export const isBoolean = isTypeof("boolean");
export const isSymbol = isTypeof("symbol");
export const isFunction = isTypeof("function");
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

export const isObject: TypeGuard<object> = (value) => typeof value === "object" && value !== null;

export const isNumberArray = isArray(isNumber);
export const isStringArray = isArray(isString);
export const isBooleanArray = isArray(isBoolean);
export const isDateArray = isArray(isDate);

export const isOptional = <T>(guard: TypeGuard<T>) => isUnion(isUndefined, guard);
export const isOptionalNumber = isOptional(isNumber);
export const isOptionalString = isOptional(isString);
export const isOptionalBoolean = isOptional(isBoolean);
export const isOptionalDate = isOptional(isDate);

export const isMaybe = <T>(guard: TypeGuard<T>) => isUnion(isNull, guard);
export const isMaybeNumber = isMaybe(isNumber);
export const isMaybeString = isMaybe(isString);
export const isMaybeBoolean = isMaybe(isBoolean);
export const isMaybeDate = isMaybe(isDate);

export const isUnknown: TypeGuard<unknown> = (value): value is unknown => true;
export const isNever: TypeGuard<never> = (value): value is never => false;
