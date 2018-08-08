export const msoOpen = '<!--[if mso]>';
export const msoVersion = version => `<!--[if mso ${version}]>`;
export const msoLteVersion = version => conditionVersion('lte', version);
export const msoLtVersion = version => conditionVersion('lt', version);
export const msoGteVersion = version => conditionVersion('gte', version);
export const msoGtVersion = version => conditionVersion('gt', version);
export const msoClose = '<![endif]-->';
export const notMsoOpen = '<!--[if !mso]><!-- -->';
export const notMsoClose = '<!--<![endif]-->';

const conditionVersion = (condition, version) => `<!--[if ${condition} mso ${version}]>`;