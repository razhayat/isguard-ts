import { IsTypeGuarded, TypeTypeGuard, isType } from ".";
import { TypeGuardTemplate } from "../types";
import { TypeGuardClass } from "../types/internal";
import { objectKeys, partial, pick, omit } from "../utils/internal";

export class TypeTypeGuardClass<T extends object> extends TypeGuardClass<IsTypeGuarded<T>> implements TypeTypeGuard<T> {
	public constructor(
		public readonly template: TypeGuardTemplate<T>
	) {
		const keys = objectKeys(template);
		super(value => {
			return value !== null && value !== undefined && keys.every(key => {
				return Reflect.get(template, key)((value as Record<PropertyKey, unknown>)[key]);
			});
		});
	}

	public partial(): TypeTypeGuard<Partial<T>> {
		return isType<Partial<T>>(partial(this.template));
	}

	public pick<K extends readonly (keyof T)[]>(...keys: K): TypeTypeGuard<Pick<T, K[number]>> {
		return isType<Pick<T, K[number]>>(pick(this.template, keys));
	}

	public omit<K extends readonly (keyof T)[]>(...keys: K): TypeTypeGuard<Omit<T, K[number]>> {
		return isType<Omit<T, K[number]>>(omit(this.template, keys));
	}
}
