import { ZodType } from "zod";
import { TypeTypeGuard, isType, TypeGuardTemplate } from "..";
import { zod } from "../plugins/internal";
import { TypeGuardClass } from "../types/internal";
import { objectKeys, partial, pick, omit } from "../utils/internal";

export class TypeTypeGuardClass<T extends object> extends TypeGuardClass<T> implements TypeTypeGuard<T> {
	private readonly _keys: PropertyKey[];

	public constructor(
		public readonly template: TypeGuardTemplate<T>
	) {
		super();

		this._keys = objectKeys(template);
	}

	protected is(value: unknown) {
		return value !== null && value !== undefined && this._keys.every(key => {
			return Reflect.get(this.template, key)((value as Record<PropertyKey, unknown>)[key]);
		});
	}

	protected toZod() {
		const entries = this._keys.map(key => [
			key,
			Reflect.get(this.template, key).zod(),
		]);

		return zod().object(Object.fromEntries(entries)) as ZodType<T>;
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
