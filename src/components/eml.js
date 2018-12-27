import { createElement, Fragment, Context, renderHtml } from 'eml-core';
import propTypes from 'prop-types';
import color from '../props/types/color';
import repeat from '../helpers/string-repeat';
import { convert as convertColor } from '../props/parsers/color';
import { msoOpen, msoLteVersion, msoGteVersion, msoClose, notMsoOpen, notMsoClose } from './helpers/conditional-comments';

const { number, string, arrayOf } = propTypes;

const commonStyles = [
	'body { margin: 0 }',

	// Force Outlook Desktop to render line heights as they're originally set
	'p, a, li, td, blockquote { mso-line-height-rule: exactly }',

	// Force Gmail mobile app set full width to body
	// https://litmus.com/community/discussions/6950-full-width-on-gmail-app-for-ios
	'@media screen and (max-width: 599px) { u ~ div .wrapper { min-width: 100vw } }',

	// Force Outlook.com to display emails at full width
	'.ReadMsgBody, .ExternalClass { width: 100% }',

	// Force Outlook.com to display line heights normally
	'.ExternalClass, .ExternalClass p, .ExternalClass span, .ExternalClass td, .ExternalClass div { line-height: 100% }'
].join('\n');

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
		previewText,
		fontFamily,
		children
	} = props;

	const backgroundColor = props.backgroundColor ? convertColor(props.backgroundColor) : null;

	const xmlns = {
		'xmlns':	'http://www.w3.org/1999/xhtml',
		'xmlns:v':	'urn:schemas-microsoft-com:vml',
		'xmlns:o':	'urn:schemas-microsoft-com:office:office'
	};

	return (
		<Fragment>
			{ '<!DOCTYPE html>' }
			<html {...xmlns}>
				<head>
					<meta charSet="utf-8" />
					<meta httpEquiv="Content-Type" content="text/html, charset=utf-8" />
					<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />

					<style type="text/css">
						{ commonStyles }
					</style>

					{ fontFamily ? (
						<Fragment>
							{ notMsoOpen }
							<link href={`https://fonts.googleapis.com/css?family=${fontFamily}:400,700`} rel="stylesheet" type="text/css" />
							<style type="text/css">
								{ `body { font-family: "${fontFamily}", sans-serif }` }
							</style>
							{ notMsoClose }
						</Fragment>
					) : null }

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
				<body bgcolor={backgroundColor}>
					{ previewText ? preview(previewText) : null }

					{ notMsoOpen }
					<div className="wrapper">
						{ notMsoClose }

						<Context>
						{ children }
						</Context>

						{ notMsoOpen }
					</div>
					{ notMsoClose }
				</body>
			</html>
		</Fragment>
	);
};

Eml.propTypes = {
	previewText: string,
	fontFamily: string,
	breakpoints: arrayOf(number),
	backgroundColor: color
};

export default Eml;
