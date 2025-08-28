import type { components } from '$lib/common';
import type { LayoutConfig } from '@flexilte/core';
import type { DNDLayoutConfig } from '@flexilte/dnd';
import type { Component } from 'svelte';
import { writable } from 'svelte/store';

export function trimLayoutTree<C extends Record<string, Component<any>>>(
	layout: DNDLayoutConfig<C>
): DNDLayoutConfig<C> | null {
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

export const updateTree = <C extends Record<string, Component<any>>>(
	node: DNDLayoutConfig<C>,
	id: string,
	newNode: DNDLayoutConfig<C>
): DNDLayoutConfig<C> => {
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

export const removeTree = <C extends Record<string, Component<any>>>(
	node: DNDLayoutConfig<C>,
	id: string
): DNDLayoutConfig<C> | null => {
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

export const editorStore = writable<DNDLayoutConfig<typeof components>>();
export const selectedComponentStore = writable<DNDLayoutConfig<typeof components>>();
export const onChangeStore = writable();
export const drawerStore = writable<boolean>(false);
