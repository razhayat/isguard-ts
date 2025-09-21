import { TypeGuard, TypeGuardTemplate, TypeGuardTemplateFunction, TypeGuardTemplateParameter } from "./types";
import { extractTemplate } from "./utils";

type IsTuple = {
	<T extends readonly unknown[]>(template: TypeGuardTemplate<T>): TypeGuard<T>;
	/**
	 * @deprecated use `isLazy` instead of passing a function. See README.md for more help
	 */
	<T extends readonly unknown[]>(template: TypeGuardTemplateFunction<T>): TypeGuard<T>;
};

export const isTuple: IsTuple = <T extends readonly unknown[]>(template: TypeGuardTemplateParameter<T>): TypeGuard<T> => {
	const guard = (value: unknown): value is T => {
		return Array.isArray(value) && resolvedTemplate.length >= value.length && resolvedTemplate.every((guard, i) => guard(value[i]));
	};

	const resolvedTemplate = extractTemplate(template, guard);
	return guard;
};
