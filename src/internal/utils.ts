export const objectKeys = (object: {}): PropertyKey[] => {
	return [...Object.keys(object), ...Object.getOwnPropertySymbols(object)];
};
