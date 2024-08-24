import { TypeGuard, TypeGuardTemplate, TypeGuardTemplateParameter } from "./types";
import { extractTemplate } from "./utils";

export const isTuple = <T extends readonly unknown[]>(template: TypeGuardTemplateParameter<T>): TypeGuard<T> => {
	let resolvedTemplate: TypeGuardTemplate<T> | null = null;

	const guard = (value: unknown): value is T => {
		resolvedTemplate = resolvedTemplate ?? extractTemplate(template, guard);
		return Array.isArray(value) && resolvedTemplate.length >= value.length && resolvedTemplate.every((guard, i) => guard(value[i]));
	};

	return guard;
};
