import { createElement, Component, Fragment } from 'eml-core';

export const Table = props => {
	const {
		children
	} = props;

	return (
		<table>
			{ children }
		</table>
	);
};

export const Thead = props => {
	const {
		children
	} = props;

	return (
		<thead>
			{ children }
		</thead>
	);
};

export const Tbody = props => {
	const {
		children
	} = props;

	return (
		<tbody>
			{ children }
		</tbody>
	);
};

export const Tr = props => {
	const {
		children
	} = props;

	return (
		<tr>
			{ children }
		</tr>
	);
};

export const Th = props => {
	const {
		children
	} = props;

	return (
		<th>
			{ children }
		</th>
	);
};

export const Td = props => {
	const {
		children
	} = props;

	return (
		<td>
			{ children }
		</td>
	);
};