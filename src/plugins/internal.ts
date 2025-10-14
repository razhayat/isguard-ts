const createPlugin = <T>(module: string): () => T => {
	try {
		const plugin: T = require(module);
		return () => plugin;
	}
	catch (error) {
		return () => {
			throw error;
		};
	}
};
