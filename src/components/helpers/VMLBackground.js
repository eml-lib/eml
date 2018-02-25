const { createElement } = require('../eml-core/build.js');

export default ({ src, children }) => {
    const wrapperBefore = [
        `<!--[if mso | IE]>`,
        `<v:rect xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false" style="width: 600px">`,
        `<v:fill origin="0.5, 0" position="0.5, 0" type="tile" src="${src}" />`,
        `<v:textbox style="mso-fit-shape-to-text: true" inset="0,0,0,0">`,
        `<![endif]-->`
    ].join('');

    const wrapperAfter = [
        `<!--[if mso | IE]>`,
        `</v:textbox>`,
        `</v:fill>`,
        `</v:rect>`,
        '<![endif]-->'
    ].join('');

    return (
        <div>
            { wrapperBefore }
            { children }
            { wrapperAfter }
        </div>
    )
}