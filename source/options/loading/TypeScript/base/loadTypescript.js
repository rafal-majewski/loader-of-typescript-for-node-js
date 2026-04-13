import {stripTypeScriptTypes} from "node:module";
/** @typedef {import("node:module").LoadFnOutput} LoadFnOutput */
/** @typedef {import("node:module").LoadHookContext} LoadHookContext */
/**
 * @typedef {(
 * 	urlInNextLoad: string,
 * 	contextInNextLoad?: Partial<LoadHookContext>,
 * ) => LoadFnOutput} NextLoad
 */
/**
 * @typedef {{
 * 	readonly output: "commonjs",
 * 	readonly reformattedContext: "commonjs-typescript",
 * } | {
 * 	readonly output: "module",
 * 	readonly reformattedContext: "module-typescript",
 * }} FormatsOfTypescriptLoading
 */
/** @returns {LoadFnOutput} */
export function loadTypescript(
	/** @type {FormatsOfTypescriptLoading} */
	formats,
	/** @type {string} */
	url,
	/** @type {LoadHookContext} */
	context,
	/** @type {NextLoad} */
	nextLoad,
) {
	/** @type {LoadHookContext} */
	const reformattedContext = {...context, format: formats.reformattedContext};
	const output = nextLoad(url, reformattedContext);
	if (output.source === undefined) {
		return output;
	} else {
		const sourceOfOutputWithoutTypes = stripTypeScriptTypes(
			/* eslint-disable-next-line @typescript-eslint/no-base-to-string */
			output.source.toString(),
		);
		return {
			...output,
			format: formats.output,
			source: sourceOfOutputWithoutTypes,
		};
	}
}
