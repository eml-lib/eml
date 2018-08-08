export function parse(value, unitTypes = []) {
	const isParsedObject = (
		typeof value === 'object'
		&& 'value' in value
		&& 'unit' in value
	);
	if (isParsedObject) {
		return value;
	}
	if (!Array.isArray(unitTypes)) {
		unitTypes = [unitTypes];
	}

	if (typeof value === 'number' && unitTypes.length > 0) {
		return { value, unit: unitTypes[0] };
	}

	const re = new RegExp(`^(\\d+)(${unitTypes.join('|')})*$`);

	const matchedRE = value.match(re);

	if (!matchedRE) {
		return new Error(`Invalid value "${value}"`);
	}

	const number = Number(matchedRE[1]);
	const unit = matchedRE[2] || unitTypes[0];

	if (!unit) {
		return new Error(`No unit are passed`);
	}

	return { value: number, unit };
}

export const stringifyStyle = dimension => dimension ? dimension.value + dimension.unit : null;

export const stringifyHtmlAttr = dimension => (
	dimension
		? dimension.unit === 'px'
			? dimension.value
			: dimension.value + dimension.unit
		: null
);

export const validate = (value, unitTypes = []) => {
	
};