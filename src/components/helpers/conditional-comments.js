export const msoOpen = '<!--[if mso]>';
export const msoVersion = version => `<!--[if mso ${version}]>`;
export const msoLteVersion = version => `<!--[if lte mso ${version}]>`;
export const msoLtVersion = version => `<!--[if lt mso ${version}]>`;
export const msoGteVersion = version => `<!--[if gte mso ${version}]>`;
export const msoGtVersion = version => `<!--[if gt mso ${version}]>`;
export const msoClose = '<![endif]-->';
export const notMsoOpen = '<!--[if !mso]><!-- -->';
export const notMsoClose = '<!--<![endif]-->';

// export const msoOpen = '';
// export const msoVersion = version => `<!--[if mso ${version}]>`;
// export const msoLteVersion = version => `<!--[if lte mso ${version}]>`;
// export const msoLtVersion = version => `<!--[if lt mso ${version}]>`;
// export const msoGteVersion = version => `<!--[if gte mso ${version}]>`;
// export const msoGtVersion = version => `<!--[if gt mso ${version}]>`;
// export const msoClose = '<![endif]-->';
// export const notMsoOpen = '<!--';
// export const notMsoClose = '-->';