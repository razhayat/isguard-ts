import { createTemplate, objectKeys, TypeGuardClass } from "../internal";
import { IndexRecordTypeGuard, isRecord, PartialRecordTypeGuard, RecordTypeGuard } from "../isRecord";
import { TypeTypeGuardClass } from "../isType/internal";
import { TypeGuard, TypeGuardTemplate } from "../types";

export class RecordTypeGuardClass<K extends readonly PropertyKey[], V> extends TypeTypeGuardClass<Record<K[number], V>> implements RecordTypeGuard<K, V> {
	public constructor(
		public readonly keys: K,
		public readonly isValue: TypeGuard<V>,
	) {
		const template = createTemplate(keys, () => isValue);
		super(template as TypeGuardTemplate<Record<K[number], V>>);
	}
}

export class PartialRecordTypeGuardClass<K extends readonly PropertyKey[], V> extends TypeTypeGuardClass<Partial<Record<K[number], V>>> implements PartialRecordTypeGuard<K, V> {
	public constructor(
		public readonly keys: K,
		public readonly isValue: TypeGuard<V>,
	) {
		super(isRecord(keys, isValue).partial().template);
	}
}

export class IndexRecordTypeGuardClass<T> extends TypeGuardClass<Record<PropertyKey, T>> implements IndexRecordTypeGuard<T> {
	public constructor(
		public readonly isValue: TypeGuard<T>,
	) {
		super(value => {
			return value instanceof Object && value.constructor === Object && objectKeys(value).every(key => {
				return isValue(Reflect.get(value, key));
			});
		});
	}
}
