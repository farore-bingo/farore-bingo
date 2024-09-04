<script lang="ts">
	import { BingoBoard, BagTooSmallError } from "$lib/bingo.svelte"
	import * as rawData from "$data/bingo.json"
	import Board from "$lib/Board.svelte"
	import { tryCatch } from "$lib/utils"

	let result = $state(tryCatch<BingoBoard, BagTooSmallError>(() => new BingoBoard(rawData)))
</script>

<div id="background">
	<enhanced:img src="$assets/erdtree.png" alt="" class="absolute right-0 top-0 h-full w-auto" />
	<enhanced:img
		src="$assets/mount_gelmir.png"
		alt=""
		class="absolute bottom-0 left-0 max-h-[70%] w-auto"
	/>
	<enhanced:img
		src="$assets/forest.png"
		alt=""
		class="absolute inset-x-0 bottom-0 translate-y-1/4"
	/>
</div>
<main class="grid h-screen place-items-center p-8">
	{#if result.kind == "success"}
		<Board board={result.value} class="max-h-full min-h-0 max-w-screen-md" />
	{:else}
		<p>{result.error.message}</p>
	{/if}
</main>

<style lang="postcss">
	#background {
		position: fixed;
		inset: 0;
		z-index: -1;
		background: radial-gradient(
			circle at top right,
			theme("colors.sky.200"),
			theme("colors.sky.800") 75%
		);
	}

	main {
		--board-border: theme("colors.blue.950");
		--board-base-text: theme("colors.blue.950");
		--board-base-background: color-mix(in srgb, theme("colors.sky.300"), transparent 40%);
		--board-checked-text: theme("colors.amber.950");
		--board-checked-background: color-mix(in srgb, theme("colors.amber.400"), transparent 20%);
	}
</style>
