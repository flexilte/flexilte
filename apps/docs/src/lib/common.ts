import type { LayoutConfig } from '@flexilte/core';
import { ImageBox, TextBox } from '@flexilte/skeleton';
import { CodeBlock, Avatar, ProgressRadial, ProgressBar, InputChip } from '@skeletonlabs/skeleton';
import type { ComponentType } from 'svelte';
import { writable } from 'svelte/store';
import { v4 as uuidv4 } from 'uuid';
export const components = {
	CodeBlock,
	Avatar,
	ProgressRadial,
	ProgressBar,
	TextBox,
	InputChip,
	ImageBox
};

export const frontPageStore = writable<LayoutConfig<typeof components>>();
export const docStore = writable<LayoutConfig<typeof components>>();
export const editorStore = writable<LayoutConfig<typeof components>>();
export const exampleStore = writable<LayoutConfig<typeof components>>();
export const onChangeStore = writable();

export function trimLayoutTree<C extends Record<string, ComponentType>>(
    layout: LayoutConfig<C>
): LayoutConfig<C> | null {
    // Create a copy of the layout to avoid mutating the input
    const trimmedLayout = { ...layout };
    
    // Handle cols
    if (trimmedLayout.cols) {
        // Recursively trim each col
        const trimmedCols = trimmedLayout.cols
            .map(col => trimLayoutTree(col))
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
            .map(row => trimLayoutTree(row))
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
	  updatedLayout.cols = updatedLayout.cols.map(col => setLayoutIds(col));
	}
  
	// Recursively handle rows if they exist
	if (updatedLayout.rows) {
	  updatedLayout.rows = updatedLayout.rows.map(row => setLayoutIds(row));
	}
  
	return updatedLayout;
  }