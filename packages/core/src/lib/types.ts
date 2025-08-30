import type { Component, ComponentProps } from 'svelte';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ComponentMap = Record<string, Component<any>>;

type BaseLayout<M extends ComponentMap> = {
	id?: string;
	width?: string;
	nodeClass?: string;
	layoutClass?: string;
	cols?: FlexilteLayout<M>[];
	rows?: FlexilteLayout<M>[];
	posX?: 'left' | 'right' | 'middle';
	posY?: 'top' | 'bottom' | 'middle';
	wrap?: 'wrap' | 'nowrap';
	gap?: string;
};

type ComponentLayout<M extends ComponentMap> = {
	[K in keyof M]: BaseLayout<M> & {
		component: K;
		props?: ComponentProps<M[K]>;
	};
}[keyof M];

export type FlexilteLayout<M extends ComponentMap> =
	| ComponentLayout<M>
	| (BaseLayout<M> & {
			component?: never;
			props?: never;
	  });
