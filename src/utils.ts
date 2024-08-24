import { isFunction } from "./isUtils";
import { TypeGuard, TypeGuardTemplate, TypeGuardTemplateParameter } from "./types";

export const extractTemplate = <T>(guard: TypeGuard<T>, parameter: TypeGuardTemplateParameter<T>): TypeGuardTemplate<T> => {
	return isFunction(parameter) ? extractTemplate(guard, parameter(guard)) : parameter;
};
