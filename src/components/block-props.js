import parsers from '../parsers';

const packValues = ['start', 'center', 'end', 'justify', 'space-between'];
const alignValues = ['start', 'center', 'end', 'stretch'];

export default props => {
	props = parsers.elementProps(props);

	const {
		width,
		height,

		gap,
		flowDirection,
		pack,
		align,

		flex,
		packSelf,
		alignSelf,

		...otherProps
	} = props;

	return {
		...otherProps,

		// self props
		width: width ? parsers.dimension.parse(width) : null,
		height: height ? parsers.dimension.parse(height) : null,

		// children props
		gap: gap ? parsers.dimension.parse(gap) : null,
		flowDirection: flowDirection ? parsers.oneOf.parse(flowDirection, ['row', 'column']) : 'row',
		pack: pack ? parsers.oneOf.parse(pack, packValues) : packValues[0],
		align: align ? parsers.oneOf.parse(align, alignValues) : alignValues[0],

		// context props
		flex: flex ? parsers.number.parse(flex) : null,
		packSelf: packSelf ? parsers.oneOf.parse(packSelf, packValues) : packValues[0],
		alignSelf: alignSelf ? parsers.oneOf.parse(alignSelf, alignValues) : alignValues[0],
	};
};