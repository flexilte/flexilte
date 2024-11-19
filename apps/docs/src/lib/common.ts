import type { LayoutConfig } from '$lib/dnd/types';
import EditorDrawer from '$lib/editor/EditorDrawer.svelte';
import { CardBox, ImageBox, TextBox } from '@flexilte/skeleton';
import { CodeBlock, Avatar, ProgressRadial, ProgressBar, InputChip } from '@skeletonlabs/skeleton';
import type { ComponentType } from 'svelte';
import { SHADOW_ITEM_MARKER_PROPERTY_NAME } from 'svelte-dnd-action';
import { writable } from 'svelte/store';
import { v4 as uuidv4 } from 'uuid';
import defaultMap from './editor/defaultMap';
export const components = {
	CodeBlock,
	Avatar,
	ProgressRadial,
	ProgressBar,
	TextBox,
	InputChip,
	ImageBox,
	EditorDrawer,
	CardBox
};

export const frontPageStore = writable<LayoutConfig<typeof components>>();
export const docStore = writable<LayoutConfig<typeof components>>();
export const editorStore = writable<LayoutConfig<typeof components>>();
export const exampleStore = writable<LayoutConfig<typeof components>>();
export const onChangeStore = writable();

export const addIdField = <C extends Record<string, ComponentType>>(
	config: LayoutConfig<C>
): LayoutConfig<C> => {
	// Create a new object to avoid mutating the original
	const newConfig: LayoutConfig<C> = {
		...config,
		id: uuidv4()
	};

	// If there are columns or rows, recursively add id fields to them
	if (newConfig.cols) {
		newConfig.cols = newConfig.cols.map((col) => addIdField(col));
	}

	if (newConfig.rows) {
		newConfig.rows = newConfig.rows.map((row) => addIdField(row));
	}

	return newConfig;
};

export function trimLayoutTree<C extends Record<string, ComponentType>>(
	layout: LayoutConfig<C>
): LayoutConfig<C> | null {
	// Create a copy of the layout to avoid mutating the input
	const trimmedLayout = { ...layout };

	// Handle cols
	if (trimmedLayout.cols) {
		// Recursively trim each col
		const trimmedCols = trimmedLayout.cols
			.map((col) => trimLayoutTree(col))
			.filter((col): col is LayoutConfig<C> => col !== null);

		// If cols array becomes empty, remove it
		if (trimmedCols.length === 0) {
			delete trimmedLayout.cols;
		} else {
			trimmedLayout.cols = trimmedCols;
		}
	}

	// Handle rows
	if (trimmedLayout.rows) {
		// Recursively trim each row
		const trimmedRows = trimmedLayout.rows
			.map((row) => trimLayoutTree(row))
			.filter((row): row is LayoutConfig<C> => row !== null);

		// If rows array becomes empty, remove it
		if (trimmedRows.length === 0) {
			delete trimmedLayout.rows;
		} else {
			trimmedLayout.rows = trimmedRows;
		}
	}

	// If node has neither cols nor rows and no component, remove it
	if (!trimmedLayout.cols && !trimmedLayout.rows && !trimmedLayout.component) {
		return null;
	}

	return trimmedLayout;
}

export function setLayoutIds<C extends Record<string, ComponentType>>(
	layout: LayoutConfig<C>
): LayoutConfig<C> {
	// Create shallow copy of the layout
	const updatedLayout = { ...layout };

	// Set UUID if no ID exists
	if (!updatedLayout.id) {
		updatedLayout.id = uuidv4();
	}

	// Recursively handle cols if they exist
	if (updatedLayout.cols) {
		updatedLayout.cols = updatedLayout.cols.map((col) => setLayoutIds(col));
	}

	// Recursively handle rows if they exist
	if (updatedLayout.rows) {
		updatedLayout.rows = updatedLayout.rows.map((row) => setLayoutIds(row));
	}

	return updatedLayout;
}

export const updateTree = (
	node: LayoutConfig<typeof components>,
	id: string,
	newNode: LayoutConfig<typeof components>
): LayoutConfig<typeof components> => {
	// Check if the current node's id matches the target id
	if (node.id === id) {
		// Return the new node configuration if the id matches
		return { ...node, ...newNode };
	}

	// Recursively check and update the cols and rows if they exist
	if (node.cols) {
		node.cols = node.cols.map((childNode) => updateTree(childNode, id, newNode));
	}
	if (node.rows) {
		node.rows = node.rows.map((childNode) => updateTree(childNode, id, newNode));
	}

	// Return the updated node
	return node;
};

export const removeTree = <C extends Record<string, ComponentType>>(
	node: LayoutConfig<C>,
	id: string
): LayoutConfig<C> | null => {
	// Helper function to recursively search and remove the node
	const removeNode = (currentNode: LayoutConfig<C>): LayoutConfig<C> | null => {
		// Check if the current node is the one to remove
		if (currentNode.id === id) {
			return null; // Return null to indicate this node should be removed
		}

		// Check and remove from cols if they exist
		if (currentNode.cols) {
			currentNode.cols = currentNode.cols
				.map(removeNode) // Recursively call removeNode on each child
				.filter((child): child is LayoutConfig<C> => child !== null); // Filter out nulls
		}

		// Check and remove from rows if they exist
		if (currentNode.rows) {
			currentNode.rows = currentNode.rows
				.map(removeNode) // Recursively call removeNode on each child
				.filter((child): child is LayoutConfig<C> => child !== null); // Filter out nulls
		}

		return currentNode; // Return the current node (possibly modified)
	};

	// Start the removal process from the root node
	return removeNode(node);
};
