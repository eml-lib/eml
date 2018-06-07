import flatten from './helpers/array-flatten';

export default (type, props, ...children) => ({
    _isElement: true,
    type,
    props: {
        ...props,
        children: children ? flatten(children) : []
    }
});