import type { ComponentMap, FlexilteLayout } from '@flexilte/core';

export const addIdField = <M extends ComponentMap>(config: FlexilteLayout<M>) => {
	// Create shallow copy of the layout
	const updatedLayout = { ...config };

	// Set UUID if no ID exists
	if (!updatedLayout.id) {
		updatedLayout.id = '1';
	}

	// Recursively handle cols if they exist
	if (updatedLayout.cols) {
		updatedLayout.cols = updatedLayout.cols.map((col) => addIdField(col));
	}

	// Recursively handle rows if they exist
	if (updatedLayout.rows) {
		updatedLayout.rows = updatedLayout.rows.map((row) => addIdField(row));
	}

	return updatedLayout;
};
