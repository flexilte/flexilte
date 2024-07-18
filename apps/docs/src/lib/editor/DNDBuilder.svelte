<script lang="ts">
	import {
		componentStore,
		componentValueStore,
		components,
		gridStore,
		selectedComponentStore,
		triggerRefresh
	} from './editorStore';
	import { onMount } from 'svelte';
	import { type LayoutConfig } from '@flexilte/core';
	import 'gridstack/dist/gridstack.min.css';
	import 'gridstack/dist/gridstack-extra.min.css';
	import {
		GridStack,
		type GridItemHTMLElement,
		type GridStackNode,
		type GridStackOptions
	} from 'gridstack/dist/es5/gridstack';
	import defaultMap from './defaultMap';
	let builderEl: HTMLElement;
	let grid: GridStack;
	const subConfig: GridStackOptions = {
		acceptWidgets: true,
		removable: '#trash',
		// column: 'auto',
		cellHeight: '2rem',
		cellHeightThrottle: 500,
		animate: false,
		subGridDynamic: true,
		// disableResize:true,
		sizeToContent: true
	};
	let customlayout: LayoutConfig<typeof components> = {};
	const gridConfig: GridStackOptions = {
		acceptWidgets: true,
		// margin:1,
		removable: '#trash',
		minRow: 9,
		float: true,
		// column:6,
		cellHeight: '2rem',
		cellHeightThrottle: 500,
		animate: false,
		subGridOpts: subConfig,
		subGridDynamic: true,
		// disableResize:true,
		sizeToContent: true
	};
	const calculateLimits = (newWidget: GridStackNode) => {
		const rowNodes = newWidget.grid?.engine.nodes.filter((e) => e.y === newWidget.y);
		if (!rowNodes) return;

		const totalColumns = newWidget.grid?.getColumn();
		const occupied = Array(totalColumns).fill(false);

		// Mark the occupied columns
		rowNodes.forEach((node) => {
			for (let i = node.x; i < node.x + node.w; i++) {
				occupied[i] = true;
			}
		});

		// Find the left and right expansion limits
		let leftLimit = newWidget.x;
		while (leftLimit > 0 && !occupied[leftLimit - 1]) {
			leftLimit--;
		}

		let rightLimit = newWidget.x + newWidget.w!;
		while (rightLimit < totalColumns && !occupied[rightLimit]) {
			rightLimit++;
		}

		const newWidth = rightLimit - leftLimit;

		return {
			newWidth,
			leftLimit,
			totalColumns,
			occupied
		};
	};

	const rowFill = (newWidget: GridStackNode) => {
		const limits = calculateLimits(newWidget);
		if (!limits) return;
		newWidget.grid?.update(newWidget.el!, {
			w: limits.newWidth,
			x: limits.leftLimit,
			y: newWidget.y
		});
	};

	const toggleFill = (newWidget: GridStackNode) => {
		const limits = calculateLimits(newWidget);
		if (!limits) return;
		// Check if the newWidget is already fully expanded
		if (limits.newWidth === newWidget.w) {
			// Shrink the widget if it's fully expanded
			const smallW = 2;
			const left = newWidget.x;
			const right = newWidget.x + newWidget.w;
			const thing = Math.round((left + right) / 2) - smallW;
			console.log(thing);

			newWidget.grid?.update(newWidget.el!, { w: smallW, x: thing, y: newWidget.y });
		} else {
			// Expand the widget to the calculated width
			newWidget.grid?.update(newWidget.el!, {
				w: limits.newWidth,
				x: limits.leftLimit,
				y: newWidget.y
			});
		}
	};

	function convert(grid: GridStackOptions): LayoutConfig<typeof components> {
		const layout = {} as LayoutConfig<typeof components>;
		const rows: Record<string, LayoutConfig<typeof components>[]> = {}; // as [row#]:[values]
		const children = grid.subGridOpts?.children || grid.children || [];
		if (children) {
			children.forEach((child) => {
				const rowNum = child.y || 0;
				if (!rows[rowNum]) rows[rowNum] = [];

				if (child.subGridOpts?.children) {
					const tmp = convert(child.subGridOpts);
					rows[rowNum].push({ ...tmp, width: `w-${child.w || 1}/${12}` });
				} else {
					if (child.content) {
						const comp = $componentValueStore[child.id!];
						comp.width = `w-${child.w || 1}/${12}`;
						rows[rowNum].push(comp);
					} else {
						console.warn('no content?', child);
					}
				}
			});
		}

		if (Object.keys(rows).length !== 0) {
			layout.rows = Object.keys(rows).map((k) => ({
				cols: rows[k]
			}));
		}

		return layout;
	}

	const initComp = (node: GridStackNode) => {
		if (!node.id) node.id = Date.now().toString();
		const comp = {
			id: node.id,
			component: node!.el?.innerText,
			props: JSON.parse(JSON.stringify(defaultMap[node!.el?.innerText!])),
			posX: 'middle',
			posY: 'middle'
		};
		const tryComp = $componentValueStore[node.id];
		if (!tryComp) {
			componentValueStore.update((store) => {
				store[node.id] = comp;
				return { ...store };
			});
			return comp;
		} else {
			return tryComp;
		}
	};

	const cropTopGrid = (grid: GridStack) => {
		const items = grid.getGridItems();
		let sortedItems = items.sort((a, b) => a.gridstackNode.y - b.gridstackNode.y);
		let shift = sortedItems[0]?.gridstackNode?.y || 0;

		for (let i = 0; i < sortedItems.length; i++) {
			let item = sortedItems[i];
			let currentY = item.gridstackNode.y;

			if (i > 0) {
				let prevItem = sortedItems[i - 1];
				let prevBottom = prevItem.gridstackNode.y + prevItem.gridstackNode.h;
				if (currentY > prevBottom) {
					shift += currentY - prevBottom;
				}
			}

			grid.update(item, { y: currentY - shift });

			if (item.gridstackNode?.subGrid) {
				cropTopGrid(item.gridstackNode.subGrid);
			}
		}
	};

	const formatGrid = (grid: GridStack | undefined) => {
		if (!grid) return;
		cropTopGrid(grid);
		grid.getGridItems().forEach((x) => {
			rowFill(x.gridstackNode!);
			formatGrid(x.gridstackNode?.subGrid);
		});
	};
	const saveLayout = (grid: GridStack) => {
		if (!grid) return;
		formatGrid(grid);
		const save = grid.save(true, true) as GridStackOptions;
		console.log('save', save);
		customlayout = convert(save);
		componentStore.set(customlayout);
		gridStore.set(save);
		console.log('customlayout', customlayout);
	};

	const initEvents = (newWidget: GridStackNode) => {
		newWidget.el?.addEventListener('dblclick', () => {
			toggleFill(newWidget);
		});
		newWidget.el?.addEventListener('click', () => {
			selectedComponentStore.set(newWidget.id);
		});
	};

	const initEventOnOldGrid = (grid: GridStack) => {
		if (!grid) return;
		const items = grid.getGridItems();
		items.forEach((e) => {
			initEvents(e.gridstackNode!);
			initEventOnOldGrid(e.gridstackNode?.subGrid!);
		});
	};

	onMount(() => {
		const gridStoreStr = sessionStorage.getItem('gridStore');
		const valueStoreStr = sessionStorage.getItem('valueStore');
		if (gridStoreStr) {
			gridStore.set(JSON.parse(gridStoreStr));
		}
		gridStore.subscribe((x) => {
			if (x) {
				sessionStorage.setItem('gridStore', JSON.stringify(x));
			}
		});
		if (valueStoreStr) {
			componentValueStore.set(JSON.parse(valueStoreStr));
		}
		componentValueStore.subscribe((x) => {
			if (x) {
				sessionStorage.setItem('valueStore', JSON.stringify(x));
			}
		});

		GridStack.setupDragIn('.sidebar .grid-stack-item', {
			helper: 'clone'
		});

		if ($gridStore) {
			grid = GridStack.init($gridStore, builderEl);
			initEventOnOldGrid(grid);
		} else {
			grid = GridStack.init(gridConfig, builderEl);
		}

		grid.on(
			'dropped',
			function (event: Event, previousWidget: GridStackNode, newWidget: GridStackNode) {
				// console.log('dr', newWidget);
				initComp(newWidget);
				initEvents(newWidget);
				selectedComponentStore.set(newWidget.id);
			}
		);
		grid.on('removed', function () {
			selectedComponentStore.set('');
			// saveLayout(grid)
		});
	});

	triggerRefresh.subscribe(() => saveLayout(grid));
</script>

<div class="overflow-auto h-full">
	<div bind:this={builderEl} id="builder" class=" grid-stack-item-content"></div>
</div>
