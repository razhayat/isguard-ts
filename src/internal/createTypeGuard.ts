import { isArray } from "../isArray";
import { isIntersection } from "../isIntersection";
import { isMaybe } from "../isMaybe";
import { isOptional } from "../isOptional";
import { isIndexRecord } from "../isRecord";
import { isRefine } from "../isRefine";
import { isSet } from "../isSet";
import { isUnion } from "../isUnion";
import { Guarded, TypeGuard, TypeGuardTemplate } from "../types";
import { AnyTypeGuard } from "./types";

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
		and: <I extends readonly unknown[]>(...guards: TypeGuardTemplate<I, any>) => isIntersection<[Guarded<T>, ...I]>(guard, ...guards),
		or: <I extends readonly unknown[]>(...guards: TypeGuardTemplate<I, any>) => isUnion<[Guarded<T>, ...I]>(guard, ...guards),
		array: () => isArray(guard),
		set: () => isSet(guard),
		indexRecord: () => isIndexRecord(guard),
		refine: refinement => isRefine(guard, refinement),
	} satisfies Omit<BaseGuard, keyof typeof func>);

	return Object.assign(guard, fields);
};
