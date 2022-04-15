<script>
	/**
	 * File name : Timer.svelteTimesuppage.svelte
	 * Description : Call when times up
	 * Author : Pankaj Kumar
	 * Version : 1
	 * Package : svelte_items
	 * Created : 15 March 2022
	 * Updated by : Pankaj Kumar
	 * Updated Date : 14 April 2022
	 */
	import { fade } from 'svelte/transition';
	function overlayClick(e) {
		if ('close' in e.target.dataset) show = false;
	}
	export let show = false;
</script>

{#if show}
	<div class="text-dark ">
		<div
			class="d-flex justify-content-center align-items-center bg-primary position-fixed start-0 top-0 end-0 bottom-0 "
			on:click={overlayClick}
			transition:fade={{ duration: 150 }}
		>
			<div class="modal-container position-relative bg-white rounded shadow">
				<main class="my-4 mx-4">
					<h2>TIME'S UP, Now click here to go to Result Page.</h2>
					<div class="d-flex justify-content-center align-items-center">
						<a href="/ResultPage">
							<!-- svelte-ignore a11y-accesskey -->
							<button class="rounded p-2 mt-4 fs-4" accesskey="r"> Result </button>
						</a>
					</div>
				</main>
			</div>
		</div>
	</div>
{/if}

