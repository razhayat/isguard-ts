import { isFunction } from "./isUtils";
import { TypeGuard, TypeGuardTemplate, TypeGuardTemplateParameter } from "./types";

export const extractTemplate = <T>(parameter: TypeGuardTemplateParameter<T>, guard: TypeGuard<T>): TypeGuardTemplate<T> => {
	return isFunction(parameter) ? extractTemplate(parameter(guard), guard) : parameter;
};
