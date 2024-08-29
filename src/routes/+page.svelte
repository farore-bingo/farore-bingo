<script lang="ts">
	import { createBoard } from "$lib/bingo"
	import Board from "$lib/Board.svelte"
	import { tryCatch } from "$lib/utils"

	let result = $state(tryCatch(createBoard))
</script>

<main class="flex flex-col gap-12 bg-slate-900 p-8 text-blue-100">
	<h1 class="m-auto text-center text-5xl">Farore bingo !</h1>
	{#if result.kind == "success"}
		<Board bind:board={result.value} />
	{:else}
		<p>{result.error.message}</p>
	{/if}
</main>
