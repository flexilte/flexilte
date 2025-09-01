import type { Component, ComponentProps } from 'svelte';
import type { ClassValue } from 'svelte/elements';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ComponentMap = Record<string, Component<any>>;

type BaseLayout = {
	id?: string;
	posX?: 'left' | 'right' | 'middle';
	posY?: 'top' | 'bottom' | 'middle';
	width?: ClassValue;
	gap?: ClassValue;
	nodeClass?: ClassValue;
	layoutClass?: ClassValue;
	wrap?: 'wrap' | 'nowrap';
};

type ComponentLayout<M extends ComponentMap> = {
	[K in keyof M]: BaseLayout & {
		component: K;
		props?: ComponentProps<M[K]>;
		cols?: never;
		rows?: never;
	};
}[keyof M];

export type FlexilteLayout<M extends ComponentMap> =
	| ComponentLayout<M>
	| (BaseLayout & {
			component?: never;
			props?: never;
			cols?: FlexilteLayout<M>[];
			rows?: FlexilteLayout<M>[];
	  });
