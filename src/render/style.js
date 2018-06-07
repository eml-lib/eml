import camelToDashed from '../helpers/string-camel-to-dashed';

export default style => (
    Object.entries(style)
        .filter(([prop, value]) => (value !== null && value !== undefined))
        .map(([prop, value]) => (
            camelToDashed(prop) + ': ' + value
        ))
        .join('; ')
)