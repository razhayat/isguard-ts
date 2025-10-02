import { AnyTypeGuard } from ".";
import { isArray } from "../isArray";
import { isMaybe } from "../isMaybe";
import { isOptional } from "../isOptional";
import { isIndexRecord } from "../isRecord";
import { isRefine } from "../isRefine";
import { isSet } from "../isSet";
import { Guarded, TypeGuard } from "../types";

type CreateTypeGuardProps<T extends AnyTypeGuard> = Omit<T, keyof TypeGuard<Guarded<T>>> & {
	func: (value: unknown) => boolean;
};

export const createTypeGuard = <T extends AnyTypeGuard>({
	func,
	...fields
}: CreateTypeGuardProps<T>) => {
	type BaseGuard = TypeGuard<Guarded<T>>;

	const guard: BaseGuard = Object.assign(func as (value: unknown) => value is Guarded<BaseGuard>, {
		optional: () => isOptional(guard),
		maybe: () => isMaybe(guard),
		array: () => isArray(guard),
		set: () => isSet(guard),
		indexRecord: () => isIndexRecord(guard),
		refine: refinement => isRefine(guard, refinement),
	} satisfies Omit<BaseGuard, keyof typeof func>);

	return Object.assign(guard, fields);
};
