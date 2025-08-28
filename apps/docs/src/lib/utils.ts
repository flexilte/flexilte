import type { DNDLayoutConfig } from '@flexilte/dnd';
import type { Component } from 'svelte';
import { v4 as uuidv4 } from 'uuid';

export const addIdField = <C extends Record<string, Component<C>>>(
	config: DNDLayoutConfig<C>
): DNDLayoutConfig<C> => {
	// Create shallow copy of the layout
	const updatedLayout = { ...config };

	// Set UUID if no ID exists
	if (!updatedLayout.id) {
		updatedLayout.id = uuidv4();
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
