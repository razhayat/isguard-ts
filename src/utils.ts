import { isFunction } from "./isUtils";
import { TypeGuard, TypeGuardTemplate, TypeGuardTemplateParameter } from "./types";

export const extractTypeGuardTemplate = <T>(guard: TypeGuard<T>, parameter: TypeGuardTemplateParameter<T>): TypeGuardTemplate<T> => {
	return isFunction(parameter) ? extractTypeGuardTemplate(guard, parameter(guard)) : parameter;
};
