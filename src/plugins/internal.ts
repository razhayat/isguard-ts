const createPlugin = <T>(module: string): () => T => {
	try {
		const plugin: T = require(module);
		return () => plugin;
	}
	catch (error) {
		return () => {
			console.error(`${module} must be installed in order to use this feature`);
			throw error;
		};
	}
};

export const zod = createPlugin<typeof import("zod")>("zod");
