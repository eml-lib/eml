export const table = {
	cellPadding: 0,
	cellSpacing: 0,
	border: 0
};

export const tableAsBlock = {
	...table,
	// Force accessibility reader to avoid pronounce table structure information
	// (http://blog.gorebel.com/accessibility-in-email-part-ii/)
	role: 'presentation'
};