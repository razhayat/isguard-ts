import { TypeGuardTemplateParameter, TypeGuard } from "./types";
import { isNil } from "./isUtils";
import { extractTemplate } from "./utils";

type Pretty<T> = {
	[K in keyof T]: T[K];
} & {};

export type IsTypeGuarded<T> = [T] extends [readonly unknown[]] ? Pretty<Omit<T, keyof unknown[]>> : T;

export const isType = <T extends object>(template: TypeGuardTemplateParameter<T, IsTypeGuarded<T>>): TypeGuard<IsTypeGuarded<T>> => {
	const guard = (value: unknown): value is IsTypeGuarded<T> => {
		if (isNil(value)) {
			return false;
		}

		for (const key in resolvedTemplate) {
			if (!resolvedTemplate[key]((value as Record<string, unknown>)[key])) {
				return false;
			}
		}

		return true;
	};

	const resolvedTemplate = extractTemplate(template, guard);
	return guard;
};
