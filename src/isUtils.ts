import { isArray } from "./isArray";
import { isInstanceof } from "./isInstanceof";
import { isTypeof } from "./isTypeof";
import { isUnion } from "./isUnion";
import { isValue } from "./isValue";
import { TypeGuard } from "./types";

export const isNull = isValue(null);
export const isUndefined = isValue(undefined);
export const isNil = isUnion(isNull, isUndefined);

export const isNumber = isTypeof<number>("number");
export const isBigint = isTypeof<bigint>("bigint");
export const isString = isTypeof<string>("string");
export const isBoolean = isTypeof<boolean>("boolean");
export const isSymbol = isTypeof<symbol>("symbol");
export const isFunction = isTypeof<(...args: any[]) => unknown>("function");
export const isPropertyKey: TypeGuard<PropertyKey> = isUnion(isString, isNumber, isSymbol);

export const isDate = isInstanceof(Date);
export const isObject = isInstanceof(Object);

export const isNumberArray = isArray(isNumber);
export const isStringArray = isArray(isString);
export const isBooleanArray = isArray(isBoolean);
export const isDateArray = isArray(isDate);

export const isOptional = <T>(guard: TypeGuard<T>) => isUnion(isUndefined, guard);
export const isOptionalNumber = isOptional(isNumber);
export const isOptionalString = isOptional(isString);
export const isOptionalBoolean = isOptional(isBoolean);
export const isOptioanlDate = isOptional(isDate);

export const isMaybe = <T>(guard: TypeGuard<T>) => isUnion(isNull, guard);
export const isMaybeNumber = isMaybe(isNumber);
export const isMaybeString = isMaybe(isString);
export const isMaybeBoolean = isMaybe(isBoolean);
export const isMaybeDate = isMaybe(isDate);
