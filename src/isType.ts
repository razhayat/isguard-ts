import { TypeGuardTemplateParameter, TypeGuard, TypeGuardTemplate } from "./types";
import { isFunction, isNil } from "./isUtils";

export const extractTypeGuardTemplate = <T>(guard: TypeGuard<T>, parameter: TypeGuardTemplateParameter<T>): TypeGuardTemplate<T> => {
	return isFunction(parameter) ? extractTypeGuardTemplate(guard, parameter(guard)) : parameter;
};

export const isType = <T extends object>(template: T extends readonly unknown[] ? never : TypeGuardTemplateParameter<T>): TypeGuard<T> => {
	let resolvedTemplate: TypeGuardTemplate<T> | null = null;

	const guard = (value: any): value is T => {
		resolvedTemplate = resolvedTemplate ?? extractTypeGuardTemplate<T>(guard, template);

		if (isNil(value)) {
			return false;
		}

		for (const key in resolvedTemplate) {
			if (!resolvedTemplate[key](value[key])) {
				return false;
			}
		}

		return true;
	};

	return guard;
};
