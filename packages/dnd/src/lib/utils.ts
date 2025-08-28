export function camelToDisplay(str: string): string {
	return (
		str
			// Insert space before capital letters
			.replace(/([A-Z])/g, ' $1')
			// Capitalize first letter
			.replace(/^./, (str) => str.toUpperCase())
			// Remove leading space if exists
			.trim()
	);
}
export function findAll<T>(
	arr: T[],
	predicate: (value: T, index: number, array: T[]) => boolean
): number[] {
	return arr.reduce((indexes, value, index, array) => {
		if (predicate(value, index, array)) {
			indexes.push(index);
		}
		return indexes;
	}, [] as number[]);
}

export const removeAtIndex = <T>(arr: T[], i: number): T[] => {
	return [...arr.slice(0, i), ...arr.slice(i + 1)];
};

export const arrToOption = (arr: string[]) => {
	return arr.map((x) => ({
		label: camelToDisplay(x),
		value: x
	}));
};

export const enumToOption = (en: Record<string, string>) => {
	return Object.keys(en).map((k) => ({
		label: camelToDisplay(k),
		value: en[k]
	}));
};
