import { isInstanceof, isLiteral, isRefine, isTypeof, isUnion, TypeGuard } from "..";
import { NeverTypeGuardClass, UnknownTypeGuardClass } from "./internal";

/**
 * Type guard for the `null` value.
 */
export const isNull: TypeGuard<null> = isLiteral(null);

/**
 * Type guard for the `undefined` value.
 */
export const isUndefined: TypeGuard<undefined> = isLiteral(void 0);

/**
 * Type guard for `null | undefined` values.
 */
export const isNil: TypeGuard<null | undefined> = isLiteral(null, void 0);

/**
 * Type guard for the `true` literal value.
 */
export const isTrue: TypeGuard<true> = isLiteral(true);

/**
 * Type guard for the `false` literal value.
 */
export const isFalse: TypeGuard<false> = isLiteral(false);

/**
 * Type guard for `number` values.
 */
export const isNumber: TypeGuard<number> = isTypeof("number");

/**
 * Type guard for `bigint` values.
 */
export const isBigint: TypeGuard<bigint> = isTypeof("bigint");

/**
 * Type guard for `string` values.
 */
export const isString: TypeGuard<string> = isTypeof("string");

/**
 * Type guard for `boolean` values.
 */
export const isBoolean: TypeGuard<boolean> = isTypeof("boolean");

/**
 * Type guard for `symbol` values.
 */
export const isSymbol: TypeGuard<symbol> = isTypeof("symbol");

/**
 * Type guard for `function` values.
 */
export const isFunction: TypeGuard<Function> = isTypeof("function");

/**
 * Type guard for non-null `object` values.
 */
export const isObject: TypeGuard<object> = isRefine(isTypeof("object"), object => !!object);

/**
 * Type guard for `PropertyKey` values (`string | number | symbol`).
 */
export const isPropertyKey: TypeGuard<PropertyKey> = isUnion(isString, isNumber, isSymbol);

/**
 * Type guard for `Date` instances.
 */
export const isDate: TypeGuard<Date> = isInstanceof(Date);

/**
 * Type guard for `RegExp` instances.
 */
export const isRegExp: TypeGuard<RegExp> = isInstanceof(RegExp);

/**
 * Type guard for `Error` instances.
 */
export const isError: TypeGuard<Error> = isInstanceof(Error);

/**
 * Type guard for `EvalError` instances.
 */
export const isEvalError: TypeGuard<EvalError> = isInstanceof(EvalError);

/**
 * Type guard for `RangeError` instances.
 */
export const isRangeError: TypeGuard<RangeError> = isInstanceof(RangeError);

/**
 * Type guard for `ReferenceError` instances.
 */
export const isReferenceError: TypeGuard<ReferenceError> = isInstanceof(ReferenceError);

/**
 * Type guard for `SyntaxError` instances.
 */
export const isSyntaxError: TypeGuard<SyntaxError> = isInstanceof(SyntaxError);

/**
 * Type guard for `TypeError` instances.
 */
export const isTypeError: TypeGuard<TypeError> = isInstanceof(TypeError);

/**
 * Type guard for `URIError` instances.
 */
export const isURIError: TypeGuard<URIError> = isInstanceof(URIError);

/**
 * Type guard that accepts any value (always returns true).
 */
export const isUnknown: TypeGuard<unknown> = new UnknownTypeGuardClass();

/**
 * Type guard that accepts no values (always returns false).
 */
export const isNever: TypeGuard<never> = new NeverTypeGuardClass();

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
export const isOptionalNumber: TypeGuard<number | undefined> = isUnion(isUndefined, isNumber);
/**
 * @deprecated use `isString.optional()` instead
 */
export const isOptionalString: TypeGuard<string | undefined> = isUnion(isUndefined, isString);
/**
 * @deprecated use `isBoolean.optional()` instead
 */
export const isOptionalBoolean: TypeGuard<boolean | undefined> = isUnion(isUndefined, isBoolean);
/**
 * @deprecated use `isDate.optional()` instead
 */
export const isOptionalDate: TypeGuard<Date | undefined> = isUnion(isUndefined, isDate);

/**
 * @deprecated use `isNumber.maybe()` instead
 */
export const isMaybeNumber: TypeGuard<number | null> = isUnion(isNull, isNumber);
/**
 * @deprecated use `isString.maybe()` instead
 */
export const isMaybeString: TypeGuard<string | null> = isUnion(isNull, isString);
/**
 * @deprecated use `isBoolean.maybe()` instead
 */
export const isMaybeBoolean: TypeGuard<boolean | null> = isUnion(isNull, isBoolean);
/**
 * @deprecated use `isDate.maybe()` instead
 */
export const isMaybeDate: TypeGuard<Date | null> = isUnion(isNull, isDate);
