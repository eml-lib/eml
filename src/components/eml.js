import { createElement, Fragment, renderHtml } from 'eml-core';
import propTypes from 'prop-types';
import repeat from '../helpers/string-repeat';
import { parse as parseLength, stringifyStyle as stringifyStyleLength, stringifyHtmlAttr as stringifyHtmlAttrLength } from '../converters/length';
import { parse as parseColor, stringify as stringifyColor } from '../converters/color';
import { tableAsBlock as ieTableProps } from './helpers/ie-props';
import { msoOpen, msoLteVersion, msoGteVersion, msoClose, notMsoOpen, notMsoClose } from './helpers/conditional-comments';

const { string, oneOf } = propTypes;

// Insert &zwnj;&nbsp; hack after hidden preview text
const preview = text => (
	<div style={{ display: 'none', maxHeight: 0, overflow: 'hidden' }}>
		{ text }
		{ repeat('&nbsp;&zwnj;&nbsp;', 15) }
	</div>
);

// Prevent Outlook to resize images
// https://blog.jmwhite.co.uk/2014/03/28/solving-dpi-scaling-issues-with-html-email-in-outlook
const outlookImageResize = renderHtml(
	{ tagName: 'xml', children: [
		{ tagName: 'o:OfficeDocumentSettings', children: [
			{ tagName: 'o:AllowPNG', emptyElement: true },
			{ tagName: 'o:PixelsPerInch', children: [96] }
		] }
	] }
);

/* Force Outlook 2007 and up to provide a "view in browser" message */
const viewInBrowser = '#outlook a { padding: 0 }';

/* Remove spacing between tables in Outlook Desktop */
const tableSpacing = 'table { mso-table-lspace: 0pt; mso-table-rspace: 0pt }';

const Eml = props => {
	const {
		maxWidth,
		align,
		fontFamily,
		previewText,
		backgroundColor,
		foregroundColor,
		children
	} = props;

	const converted = {
		maxWidth: maxWidth ? parseLength(maxWidth, ['px', '%']) : null,
		backgroundColor: backgroundColor ? parseColor(backgroundColor) : null,
		foregroundColor: foregroundColor ? parseColor(foregroundColor) : null
	};

	return (
		<Fragment>
			{ '<!DOCTYPE html>' }
			{ '<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">' }
				<head>
					<meta charSet="utf-8" />
					<meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
					<meta name="viewport" content="width=device-width; initial-scale=1.0; maximum-scale=1.0;" />

					{ notMsoOpen }
					{ fontFamily && <link href={`https://fonts.googleapis.com/css?family=${fontFamily}:400,700`} rel="stylesheet" type="text/css" /> }
					<style type="text/css">
						{ `body { font-family: "${fontFamily}", sans-serif }` }
					</style>
					{ notMsoClose }

					{ msoOpen }
					<style type="text/css">
						{ '* { font-family: sans-serif !important; }' }
					</style>
					{ msoClose }

					{ msoGteVersion(9) }
					{ outlookImageResize }
					<style type="text/css">
						{ 'v\\:* { behavior: url(#default#VML); display: inline-block }' }
						{ 'o\\:* { behavior: url(#default#VML); display: inline-block }' }
						{ 'w\\:* { behavior: url(#default#VML); display: inline-block }' }
					</style>
					{ msoClose }

					{ msoGteVersion(12) }
					<style type="text/css">
						{ viewInBrowser }
					</style>
					{ msoClose }

					{ msoLteVersion(16) }
					<style type="text/css">
						{ tableSpacing }
					</style>
					{ msoClose }
				</head>
				<body bgcolor={backgroundColor ? stringifyColor(converted.backgroundColor) : null}>
					{ previewText && preview(previewText) }

					{ notMsoOpen }
					<div style={{
						maxWidth: converted.maxWidth ? stringifyStyleLength(converted.maxWidth) : null,
						margin: align === 'center' ? '0 auto' : align === 'end' ? '0 0 0 auto' : null,
						backgroundColor: converted.foregroundColor ? stringifyColor(converted.foregroundColor) : null
					}} className="wrapper">
						{ notMsoClose }
						{ msoOpen }
						<table {...ieTableProps} width="100%">
							<tr>
								<td align={align === 'center' ? 'center' : align === 'end' ? 'right' : null}>
									<table
										{...ieTableProps}
										width={converted.maxWidth ? stringifyHtmlAttrLength(converted.maxWidth) : '100%'}
										bgcolor={converted.foregroundColor ? stringifyColor(converted.foregroundColor) : null}
									>
										<tr>
											<td align="left">
												{ msoClose }
												{ children }
												{ msoOpen }
											</td>
										</tr>
									</table>

								</td>
							</tr>
						</table>
						{ msoClose }
						{ notMsoOpen }
					</div>
					{ notMsoClose }

				</body>
			{ '</html>' }
		</Fragment>
	);
};

Eml.css = {
	'body': {
		margin: 0
	},
	// Force Outlook Desktop to render line heights as they're originally set
	'p, a, li, td, blockquote': {
		msoLineHeightRule: 'exactly'
	},
	// Force Gmail mobile app set full width to body
	// https://litmus.com/community/discussions/6950-full-width-on-gmail-app-for-ios
	'@media screen and (max-width: 599px)': {
		'u ~ div .wrapper': {
			minWidth: '100vw'
		}
	},
	// Force Outlook.com to display emails at full width
	'.ReadMsgBody, .ExternalClass': {
		width: '100%'
	},
	// Force Outlook.com to display line heights normally
	'.ExternalClass, .ExternalClass p, .ExternalClass span, .ExternalClass td, .ExternalClass div': {
		lineHeight: '100%'
	}

};

Eml.defaultProps = {
	// maxWidth: 600,
	align: 'start'
};

Eml.propTypes = {
	align: oneOf(['start', 'center', 'end']),
	fontFamily: string,
	previewText: string
};

export default Eml;