const { createElement } = require('../eml-core/build.js');
import parseProps, { parsers } from '../parsers/index';
import {
    outlookLineHeight,
    gmailMobileAppFullWidthBody
} from '../helpers/client-patches';

const Eml = ({ maxWidth = 600, backgroundColor, foregroundColor, children }) => {
    return (
        <body bgcolor={backgroundColor}>
            { '<!--[if mso]>' }
            <table
                role="presentation" // Force accessibility reader to avoid pronounce table structure information (http://blog.gorebel.com/accessibility-in-email-part-ii/)
                border="0"
                cellPadding="0"
                cellSpacing="0"
                width={maxWidth}
                bgcolor={foregroundColor}
                className="wrapper"
            >
                <tr>
                    <td align="center">
                        { '<![endif]-->' }
                        <div align="left" style={{ maxWidth: `${maxWidth}px`, backgroundColor: foregroundColor }}>
                            { children }
                        </div>
                        { '<!--[if mso]>' }
                    </td>
                </tr>
            </table>
            { '<![endif]-->' }
        </body>
    );
};

Eml.css = () => (
`body {
    margin: 0;
    padding: 0;
}
${outlookLineHeight.style}
${gmailMobileAppFullWidthBody.style}
`
);

export default Eml;