/** @returns {null | string} */
export function extractExtensionFromUrl(
	/** @type {string} */
	url,
) {
	const indexOfLastDot = url.lastIndexOf(`.`);
	if (indexOfLastDot === -1) {
		return null;
	} else {
		const extension = url.substring(indexOfLastDot + 1);
		return extension;
	}
}
