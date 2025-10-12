import { MapTypeGuard } from ".";
import { TypeGuard } from "../types";
import { TypeGuardClass } from "../types/internal";

export class MapTypeGuardClass<K, V> extends TypeGuardClass<Map<K, V>> implements MapTypeGuard<K, V> {
	public constructor(
		public readonly isKey: TypeGuard<K>,
		public readonly isValue: TypeGuard<V>,
	) {
		super();
	}

	protected is(value: unknown) {
		return value instanceof Map && [...value.entries()].every(([key, value]) => {
			return this.isKey(key) && this.isValue(value)
		});
	}
}
