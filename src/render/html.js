import renderStyle from './style';

const attrsToLowerCase = ['cellPadding', 'cellSpacing'];

function renderAttributes(obj) {
    if (!obj) {
        return '';
    }

    return Object.entries(obj)
        .filter(([attr, value]) => !['', null, undefined].includes(value))
        .map(([attr, value]) => {
            if (attr === 'className') {
                attr = 'class';
            } else if (attrsToLowerCase.includes(attr)) {
                attr = attr.toLowerCase();
            } else if (attr === 'style' && typeof value === 'object') {
                value = renderStyle(value);
            }

            return `${attr}="${value}"`;
        })
        .join(' ')
}

const doctype = '<!DOCTYPE html>';
const emptyElements = ['meta', 'link', 'hr', 'img', 'br', 'wbr', 'input'];

function renderTag(config, depth = 0) {
    const tab = '\t'.repeat(depth);

    if (typeof config !== 'object') {
        return tab + config + '\n';
    }

    const { tagName, attrs, children } = config;
    const attrsText = renderAttributes(attrs);
    const tagNameWithAttrs = [tagName, attrsText].filter(Boolean).join(' ');

    if (emptyElements.includes(tagName)) {
        const tag = `<${tagNameWithAttrs} />`;
        return tab + tag + '\n';
    } else {
        const openingTag = `<${tagNameWithAttrs}>`;
        const closingTag = `</${tagName}>`;
        const contentHtml = children.map(config => renderTag(config, depth + 1)).join('');

        return tab + openingTag + '\n' + contentHtml + tab + closingTag + '\n';
    }
}

export default parentConfig => (
    doctype +
    '\n' +
    renderTag(parentConfig)
);