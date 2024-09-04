<script module lang="ts">
	export interface BoardColors {
		border: string
		baseText: string
		baseBackground: string
		checkedText: string
		checkedBackground: string
	}
</script>

<script lang="ts">
	import type { BingoBoard } from "$lib/bingo.svelte"

	interface Props {
		board: BingoBoard
		class?: string
		colors?: Partial<BoardColors>
	}

	let { board, class: classes = "", colors = {} }: Props = $props()

	function attribs(i: number) {
		if (i >= 10)
			return {
				"data-direction": "diagonal",
				"data-complete": board.bingos[i],
				style: "grid-area: 1 / 1 / -1 / -1",
			}
		else if (i >= 5)
			return {
				"data-direction": "vertical",
				"data-complete": board.bingos[i],
				style: `grid-area: 1 / ${i - 4} / -1 / ${i - 3}`,
			}
		else
			return {
				"data-direction": "horizontal",
				"data-complete": board.bingos[i],
				style: `grid-area: ${i + 1} / 1 / ${i + 1} / -1`,
			}
	}

	function rect(i: number) {
		if (i == 11)
			return {
				el: "rect",
				x: 5,
				y: 95,
				width: 127,
				height: 0.4,
				rx: 1,
				ry: 1,
				transform: "rotate(-45, 5, 95)",
			}
		else if (i == 10)
			return {
				el: "rect",
				x: 5,
				y: 5,
				width: 127,
				height: 0.4,
				rx: 1,
				ry: 1,
				transform: "rotate(45, 5, 5)",
			}
		else if (i >= 5) return { el: "rect", x: 49, y: 5, width: 2, height: 90, rx: 1, ry: 1 }
		else return { el: "rect", x: 5, y: 49, width: 90, height: 2, rx: 1, ry: 1 }
	}
</script>

<section
	id="board"
	class={classes}
	style:--board-border={colors.border}
	style:--board-base-text={colors.baseText}
	style:--board-base-background={colors.baseBackground}
	style:--board-checked-text={colors.checkedText}
	style:--board-checked-background={colors.checkedBackground}
>
	{#each board.spaces as space, i}
		<button
			class="space"
			data-checked={board.checked[i]}
			style:grid-area="s{i}"
			onclick={() => board.check(i)}
		>
			{@html space}
		</button>
	{/each}
	{#each board.bingos as _, i}
		<svg
			class="bingo"
			viewBox="0 0 100 100"
			preserveAspectRatio="none"
			xmlns="http://www.w3.org/2000/svg"
			fill="gold"
			{...attribs(i)}
		>
			<rect {...rect(i)} />
		</svg>
	{/each}
</section>

<style lang="postcss">
	#board {
		display: grid;
		grid-template-columns: repeat(5, 1fr);
		grid-template-rows: repeat(5, 1fr);
		grid-template-areas:
			" s0  s1  s2  s3  s4"
			" s5  s6  s7  s8  s9"
			"s10 s11 s12 s13 s14"
			"s15 s16 s17 s18 s19"
			"s20 s21 s22 s23 s24";
		border-color: var(--board-border, black);
		color: var(--board-base-text, black);
		box-shadow: 0 0 2rem 0.5rem var(--board-base-background, white);
		@apply aspect-square border-l border-t;
	}

	.space {
		border-color: var(--board-border, black);
		background-color: var(--board-base-background, white);
		@apply grid aspect-square h-full cursor-pointer place-items-center overflow-y-auto border-b border-r p-2 text-center;
	}
	.space[data-checked="true"] {
		background-color: var(--board-checked-background, gold);
		color: var(--board-checked-text, black);
	}

	.bingo {
		@apply pointer-events-none h-full w-full opacity-0 transition-opacity;
	}
	.bingo[data-complete="true"] {
		@apply opacity-100;
	}

	@screen lg {
		#board {
			@apply text-lg;
		}
	}
</style>
