import { TypeGuardTemplateParameter, TypeGuard } from "./types";
import { isNil } from "./isUtils";
import { extractTemplate } from "./utils";

export const isType = <T extends object>(template: T extends readonly unknown[] ? never : TypeGuardTemplateParameter<T>): TypeGuard<T> => {
	const guard = (value: any): value is T => {
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

	const resolvedTemplate = extractTemplate<T>(template, guard);
	return guard;
};
