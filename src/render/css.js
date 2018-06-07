import renderStyle from './style';

export default (cssObjList = []) => (
    cssObjList.map(cssObj => {
        if (typeof cssObj === 'string') {
            return cssObj;
        }

        return Object.entries(cssObj).map(([selector, declBlock]) => (
            selector + ' { ' + renderStyle(declBlock) + ' }\n'
        )).join('');

    }).join('')
);