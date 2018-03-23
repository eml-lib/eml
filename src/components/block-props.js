import parsers from '../parsers';

const packValues = ['start', 'center', 'end', 'justify', 'space-between'];
const alignValues = ['start', 'center', 'end', 'stretch'];

export default props => {
	props = parsers.elementProps(props);

	const {
		flex,
		gap,
		flowDirection,
		pack,
		align,
		packSelf,
		alignSelf,

		...otherProps
	} = props;

	return {
		...otherProps,
		flex: flex ? parsers.number.parse(flex) : null,
		gap: gap ? parsers.dimension.parse(gap) : null,
		flowDirection: flowDirection ? parsers.oneOf.parse(flowDirection, ['row', 'column']) : 'row',
		pack: pack ? parsers.oneOf.parse(pack, packValues) : packValues[0],
		align: align ? parsers.oneOf.parse(align, alignValues) : alignValues[0],
		packSelf: packSelf ? parsers.oneOf.parse(packSelf, packValues) : packValues[0],
		alignSelf: alignSelf ? parsers.oneOf.parse(alignSelf, alignValues) : alignValues[0],
	};
};