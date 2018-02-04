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

export default ({ clients }) => {
    return {
        component({ children }) {
            return (
                <div>
                    <IEWrapper>
                        <div>
                            { children }
                            { clients }
                        </div>
                    </IEWrapper>
                </div>
            )
        },
        css: 'dsd'
    };
}