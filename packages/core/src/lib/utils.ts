import type { ClassValue } from 'svelte/elements';
import type { ComponentMap, FlexilteLayout } from './types';
import { v4 } from 'uuid';

export const deDup = (arr: string[]): string[] => {
	return Array.from(new Set(arr));
};

export const normalizeClassValue = (value?: ClassValue): string[] => {
	if (!value) return [];
	if (Array.isArray(value)) {
		return deDup((value as ClassValue[]).flatMap((e) => normalizeClassValue(e)));
	}
	if (typeof value === 'string') {
		return deDup(value.trim().split(/\s+/).filter(Boolean));
	}
	if (typeof value === 'object') {
		return deDup(
			Object.entries(value)
				.filter(([_, v]) => !!v)
				.map(([k]) => k)
		);
	}
	return [];
};

export function extractBaseClass(className: string): string {
	return className.split(':').pop() ?? '';
}

export const addIdField = <M extends ComponentMap>(config: FlexilteLayout<M>) => {
	// Create shallow copy of the layout
	const updatedLayout = { ...config };

	// Set UUID if no ID exists
	if (!updatedLayout.id) {
		updatedLayout.id = v4();
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
