import { isInstanceof, isLiteral, isRefine, isTypeof, isUnion, TypeGuard } from "..";
import { TypeGuardClass } from "../types/internal";

export const isNull: TypeGuard<null> = isLiteral(null);
export const isUndefined: TypeGuard<undefined> = isLiteral(void 0);
export const isNil: TypeGuard<null | undefined> = isLiteral(null, void 0);

export const isTrue: TypeGuard<true> = isLiteral(true);
export const isFalse: TypeGuard<false> = isLiteral(false);

export const isNumber: TypeGuard<number> = isTypeof("number");
export const isBigint: TypeGuard<bigint> = isTypeof("bigint");
export const isString: TypeGuard<string> = isTypeof("string");
export const isBoolean: TypeGuard<boolean> = isTypeof("boolean");
export const isSymbol: TypeGuard<symbol> = isTypeof("symbol");
export const isFunction: TypeGuard<Function> = isTypeof("function");
export const isObject: TypeGuard<object> = isRefine(isTypeof("object"), object => !!object);
export const isPropertyKey: TypeGuard<PropertyKey> = isUnion(isString, isNumber, isSymbol);

export const isDate: TypeGuard<Date> = isInstanceof(Date);
export const isRegExp: TypeGuard<RegExp> = isInstanceof(RegExp);
export const isError: TypeGuard<Error> = isInstanceof(Error);
export const isEvalError: TypeGuard<EvalError> = isInstanceof(EvalError);
export const isRangeError: TypeGuard<RangeError> = isInstanceof(RangeError);
export const isReferenceError: TypeGuard<ReferenceError> = isInstanceof(ReferenceError);
export const isSyntaxError: TypeGuard<SyntaxError> = isInstanceof(SyntaxError);
export const isTypeError: TypeGuard<TypeError> = isInstanceof(TypeError);
export const isURIError: TypeGuard<URIError> = isInstanceof(URIError);

export const isUnknown: TypeGuard<unknown> = new TypeGuardClass<unknown>(() => true);
export const isNever: TypeGuard<never> = new TypeGuardClass<never>(() => false);

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
