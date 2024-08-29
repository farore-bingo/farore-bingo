<script lang="ts">
	import type { Board } from "$lib/bingo"

	interface Props {
		board: Board
	}

	let { board = $bindable() }: Props = $props()

	function toggle(i: number) {
		return function () {
			board.checked[i] = !board.checked[i]
		}
	}
</script>

<section id="board" class="m-auto max-w-screen-md border-l border-t border-current text-lg">
	{#each board.spaces as space, i}
		<button
			class="grid aspect-square cursor-pointer place-items-center overflow-y-auto border-b border-r border-current p-2 text-center"
			class:bg-cyan-900={board.checked[i]}
			onclick={toggle(i)}
		>
			{@html space}
		</button>
	{/each}
</section>

<style lang="postcss">
	#board {
		display: grid;
		grid-template-columns: repeat(5, 1fr);
		grid-template-rows: repeat(5, 1fr);
	}
</style>
