import { TypeGuard, TypeGuardTemplate, TypeGuardTemplateParameter } from "./types";
import { extractTemplate } from "./utils";

export const isTuple = <T extends readonly unknown[]>(template: TypeGuardTemplateParameter<T>): TypeGuard<T> => {
	const guard = (value: unknown): value is T => {
		return Array.isArray(value) && resolvedTemplate.length >= value.length && resolvedTemplate.every((guard, i) => guard(value[i]));
	};

	const resolvedTemplate = extractTemplate(template, guard);
	return guard;
};
