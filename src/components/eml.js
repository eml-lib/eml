import createElement from '../create-element';
import { outlookLineHeight, gMailMobileAppFullWidthBody } from '../helpers/client-patches';
import { tableAsBlock as ieTableProps } from './helpers/ie-props';
import { msoOpen, msoClose } from './helpers/conditional-comments';

const Eml = props => {
	const {
		maxWidth = 600,
		backgroundColor,
		foregroundColor,
		children
	} = props;

    return (
		<body bgcolor={backgroundColor}>
			{ msoOpen }
			<table {...ieTableProps} width={maxWidth} bgcolor={foregroundColor} className="wrapper">
				<tr>
					<td align="center">
						{ msoClose }
						<div align="left" style={{ maxWidth: `${maxWidth}px`, backgroundColor: foregroundColor }}>
							{ children.map(child => {
								if (typeof child === 'object') {
									return {
										...child,
										props: {
											...child.props,
											width: '100%'
										}
									};
								} else {
									return child;
								}
							}) }
						</div>
						{ msoOpen }
					</td>
				</tr>
			</table>
			{ msoClose }
		</body>
    );
};

Eml.css = () => ({
	'body': {
		margin: 0,
		padding: 0
	},
	...outlookLineHeight.style,
	...gMailMobileAppFullWidthBody.style
});

export default Eml;