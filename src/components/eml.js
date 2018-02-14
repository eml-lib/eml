const { createElement } = require('../eml-core/build.js');

const outlook = {
    css: () => ({
        table: {
            borderCollapse: 'collapse',
            msoTableLspace: '0pt',
            msoTableRspace: '0pt'
        }
    })
};

const outlookLive = {
    css: () => ({
        '.ReadMsgBody, .ExternalClass' : {
            width: '100%'
        },
        '.ExternalClass, .ExternalClass p, .ExternalClass span, .ExternalClass td, .ExternalClass div': {
            lineHeight: '100%'
        }
    })
};

function IEWrapper({ children }) {
    return (
        <div>
            { '<!--[if mso | IE]>' }
            <table
                role="presentation"
                border="0"
                cellPadding="0"
                cellSpacing="0"
                width="600"
                align="center"
                style="width: 600px">
                <tr>
                    <td style="line-height: 0px; font-size: 0px; mso-line-height-rule: exactly">
                        { children }
                    </td>
                </tr>
            </table>
            { '<![endif]-->' }
        </div>
    );
}

export default function eml({ children }) {
    return (
        <div>
            <IEWrapper>
                <div>
                    { children }
                </div>
            </IEWrapper>
        </div>
    );
}

eml.css = () => (
    `.a {
        border: 1px solid red;
    }`
);