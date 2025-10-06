import { MapTypeGuard } from ".";
import { TypeGuardClass } from "../internal";
import { TypeGuard } from "../types";

export class MapTypeGuardClass<K, V> extends TypeGuardClass<Map<K, V>> implements MapTypeGuard<K, V> {
	public constructor(
		public readonly isKey: TypeGuard<K>,
		public readonly isValue: TypeGuard<V>,
	) {
		super(value => {
			return value instanceof Map && [...value.entries()].every(([key, value]) => isKey(key) && isValue(value));
		});
	}
}
