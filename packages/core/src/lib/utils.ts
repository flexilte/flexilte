import type { ClassValue } from 'svelte/elements';

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
