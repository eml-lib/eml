const outlookImageScaling = {
    head: (
`<!—- Prevent Outlook to resize images -—>
<!—- https://blog.jmwhite.co.uk/2014/03/28/solving-dpi-scaling-issues-with-html-email-in-outlook/ -—>
<!--[if gte mso 9]>
<xml>
    <o:OfficeDocumentSettings>
        <o:AllowPNG/>
        <o:PixelsPerInch>96</o:PixelsPerInch>
    </o:OfficeDocumentSettings>
</xml>
<![endif]-->`
    ),
    clients: {
        outlook: '>=9'
    }
};

export const outlookLineHeight = {
    style: (
`/* Force Outlook Desktop to render line heights as they're originally set. */
p, a, li, td, blockquote {
    mso-line-height-rule: exactly;
}`
    )
};

const outlookViewInBrowserLink = {
    style: (
`/* Force Outlook 2007 and up to provide a "view in browser" message. */
#outlook a{
    padding:0;
}`
    ),
    clients: {
        outlook: '12'
    }
};

const outlookTableSpace = {
    style: (
`/* Remove spacing between tables in Outlook Desktop. */
table {
    mso-table-lspace: 0pt;
    mso-table-rspace: 0pt;
}`
    ),
    clients: {
        outlook: '<=16'
    }
};

const outlookCom = {
    style: (
`/* Force Outlook.com to display emails at full width.
.ReadMsgBody,
.ExternalClass {
    width: 100%;
}

/* Force Outlook.com to display line heights normally. */
.ExternalClass,
.ExternalClass p,
.ExternalClass span,
.ExternalClass td,
.ExternalClass div {
    line-height: 100%;
}`
    ),
    clients: {
        outlookCom: null
    }
};

export const gmailMobileAppFullWidthBody = {
    style: (
`/* Force Gmail mobile app set full width to body */
/* https://litmus.com/community/discussions/6950-full-width-on-gmail-app-for-ios */
/* */
@media screen and (max-width: 599px) {
    u ~ div .wrapper {
        min-width: 100vw;
    }
}`
    ),
    clients: {
        gmailMobileApp: null
    }
};