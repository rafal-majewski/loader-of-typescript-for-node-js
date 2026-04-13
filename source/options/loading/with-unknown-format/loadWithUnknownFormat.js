import {extractExtensionFromUrl} from "./extracting-extension-from-url/index.js";
import {loadWithExtension} from "./with-extension/index.js";
/** @typedef {import("node:module").LoadFnOutput} LoadFnOutput */
/** @typedef {import("node:module").LoadHookContext} LoadHookContext */
/**
 * @typedef {(
 * 	urlInNextLoad: string,
 * 	contextInNextLoad?: Partial<LoadHookContext>,
 * ) => LoadFnOutput} NextLoad
 */
/** @returns {LoadFnOutput} */
export function loadWithUnknownFormat(
	/** @type {string} */
	url,
	/** @type {LoadHookContext} */
	context,
	/** @type {NextLoad} */
	nextLoad,
) {
	const extensionOfUrl = extractExtensionFromUrl(url);
	if (extensionOfUrl === null) {
		const output = nextLoad(url, context);
		return output;
	} else {
		const output = loadWithExtension(url, context, nextLoad, extensionOfUrl);
		return output;
	}
}
