// const { createElement } = require('../eml-core/build.js');
import { createElement } from 'eml-core';
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
                            { children.map(child => {
                                // const Child = child.type;
                                // const a = <Child {...child.props} width="100%"/>;
                                //
                                // console.log('child', a);

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