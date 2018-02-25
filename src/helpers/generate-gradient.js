export default (angle, colors, fallbackColor) => {
    const oldSyntaxAngle = 360 - angle;

    const colorsString = colors.map((color, i) => color + ' ' + (i / colors.length * 100).toFixed(0) + '%').join(', ');

    const colorFrom = colors[0];
    const colorTo = colors[colors.length - 1];
    let ieColors;
    if (angle >= 315 || angle < 45) {
        ieColors = { start: colorTo, end: colorFrom, type: 0 };
    } else if (angle < 135) {
        ieColors = { start: colorFrom, end: colorTo, type: 1 };
    } else if (angle < 225) {
        ieColors = { start: colorFrom, end: colorTo, type: 0 };
    } else if (angle < 315) {
        ieColors = { start: colorTo, end: colorFrom, type: 1 };
    }

    return (
`
/* Old browsers */
background: ${fallbackColor};

/* FF 3.6-15 */
background: -moz-linear-gradient(${oldSyntaxAngle}deg, ${colorsString});

/* Safari 5.1+, Chrome 10+ */
background: -webkit-linear-gradient(${oldSyntaxAngle}deg, ${colorsString});

/* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
background: linear-gradient(${angle}deg, ${colorsString});

/* IE 6-9 */
filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='${ieColors.start}', endColorstr='${ieColors.end}', GradientType=${ieColors.type});
`
    )
};