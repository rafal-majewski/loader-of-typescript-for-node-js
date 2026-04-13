import {useReadFileSyncSafely} from "./using-readFileSync-safely/index.js";
import {dirname, resolve} from "node:path";
import {fileURLToPath} from "node:url";
/** @returns {"commonjs" | "module"} */
export function determineTypeOfModule(
	/** @type {string} */
	url,
) {
	let pathOfCurrentDirectory = dirname(fileURLToPath(url));
	for (;;) {
		const pathOfPackageJson = resolve(pathOfCurrentDirectory, `package.json`);
		const contentOfPackageJson = useReadFileSyncSafely(pathOfPackageJson);
		if (contentOfPackageJson === null) {
			const pathOfParentDirectory = dirname(pathOfCurrentDirectory);
			if (pathOfParentDirectory === pathOfCurrentDirectory) {
				return `commonjs`;
			} else {
				pathOfCurrentDirectory = pathOfParentDirectory;
				continue;
			}
		} else {
			const stringOfContentOfPackageJson = new TextDecoder(`utf-8`).decode(
				contentOfPackageJson,
			);
			const packageJson = JSON.parse(stringOfContentOfPackageJson);
			if (typeof packageJson === `object` && packageJson !== null) {
				if (
					`type` in packageJson
					&& typeof packageJson[`type`] === `string`
					&& packageJson[`type`] === `module`
				) {
					return `module`;
				} else {
					return `commonjs`;
				}
			} else {
				const error = new Error(
					`Expected package.json to contain an object, but got ${typeof packageJson}`,
				);
				throw error;
			}
		}
	}
}
