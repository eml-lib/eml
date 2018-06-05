export default (object, properties) => {
	const newObject = {...object};

	properties.forEach(prop => {
		delete newObject[prop];
	});

	return newObject;
};