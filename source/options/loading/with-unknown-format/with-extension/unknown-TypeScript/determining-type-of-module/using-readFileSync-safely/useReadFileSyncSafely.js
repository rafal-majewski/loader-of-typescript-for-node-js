import {readFileSync} from "node:fs";
/** @returns {null | Uint8Array<ArrayBuffer>} */
export function useReadFileSyncSafely(
	/** @type {string} */
	path,
) {
	try {
		const content = readFileSync(path);
		return content;
	} catch (error) {
		if (error instanceof Error) {
			if (`code` in error && error.code === `ENOENT`) {
				return null;
			} else {
				throw error;
			}
		} else {
			const actualError = new Error(`Unknown error.`, {cause: error});
			throw actualError;
		}
	}
}
