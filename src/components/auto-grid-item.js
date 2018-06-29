import core from 'eml-core';
const { createElement, Fragment } = core;
import { msoOpen, msoClose, notMsoOpen, notMsoClose } from './helpers/conditional-comments';
import BlockWrapper from './helpers/block-wrapper';

const AutoGridIem = props => {
	const {
		span = 1,
		backgroundColor,
		_gapLeft,
		_gapRight,
		_width,
		children
	} = props;

    return (
		<Fragment>
			<td colSpan={span > 1 ? span : null} width={_width}>
                <BlockWrapper
					paddingLeft={_gapLeft}
					paddingRight={_gapRight}
                    fullWidth={true}
				>
					<BlockWrapper
                        background={backgroundColor ? { color: backgroundColor } : null}
					>
						{ children }
					</BlockWrapper>
				</BlockWrapper>
			</td>
		</Fragment>
	);
};

AutoGridIem.css = {
	'.auto-grid-item': {
		flexGrow: 1
	}
};

export default AutoGridIem;