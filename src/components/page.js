// import { createElement } from 'eml-core';
import Link from './link';

const versions = {
    '2000': '9',
    '2002': '10',
    '2003': '11',
    '2007': '12',
    '2010': '14',
    '2013': '15',
    '2016': '16'
};

const linkPadding = {
    styles: (
`#outlook a {
    padding: 0;
}`
    )
};

const tableSpacing = {
    css: (
`table {
    border-collapse: collapse;
    mso-table-lspace: 0pt;
    mso-table-rspace: 0pt;
}`
    )
};

const imageScaling = {
    head: (
`<!—- Предотвратить изменение размеров картирнок в Outlook -—>
<!—- https://blog.jmwhite.co.uk/2014/03/28/solving-dpi-scaling-issues-with-html-email-in-outlook/ -—>
<!--[if gte mso 9]>
<xml>
    <o:OfficeDocumentSettings>
        <o:AllowPNG/>
        <o:PixelsPerInch>96</o:PixelsPerInch>
    </o:OfficeDocumentSettings>
</xml>
<![endif]-->`
    )
};

const externalClass = (
    `.ReadMsgBody,
.ExternalClass {
    width: 100%;
}

.ExternalClass,
.ExternalClass p,
.ExternalClass span,
.ExternalClass td,
.ExternalClass div {
    line-height: 100%;
}`
);

export default props => {
    // console.log(props)
    return (
        <div>
            <Link href={true}/>
        </div>
    );
}