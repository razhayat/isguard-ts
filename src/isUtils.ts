import { isInstanceof } from "./isInstanceof";
import { isLiteral } from "./isLiteral";
import { isRefine } from "./isRefine";
import { isTypeof } from "./isTypeof";
import { isUnion } from "./isUnion";
import { TypeGuard } from "./types";
import { createTypeGuard } from "./internal";

export const isNull = isLiteral(null);
export const isUndefined = isLiteral(void 0);
export const isNil = isLiteral(null, void 0);

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

export const isUnknown: TypeGuard<unknown> = createTypeGuard<TypeGuard<unknown>>({
	func: () => true,
});

export const isNever: TypeGuard<never> = createTypeGuard<TypeGuard<never>>({
	func: () => false,
});

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

/**
 * @deprecated use `isNumber.maybe()` instead
 */
export const isMaybeNumber = isNumber.maybe();
/**
 * @deprecated use `isString.maybe()` instead
 */
export const isMaybeString = isString.maybe();
/**
 * @deprecated use `isBoolean.maybe()` instead
 */
export const isMaybeBoolean = isBoolean.maybe();
/**
 * @deprecated use `isDate.maybe()` instead
 */
export const isMaybeDate = isDate.maybe();

