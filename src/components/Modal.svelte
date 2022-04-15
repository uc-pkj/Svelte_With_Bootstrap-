<script>
	/**
	 * File name : Model.svelte
	 * Description : Contain popup when you click end test button
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
	import ResultPage from '../routes/ResultPage.svelte';
</script>

{#if show}
	<div>
		<div
			class=" d-flex position-fixed top-0 bottom-0 start-0 end-0 alert-dark" 
			on:click={overlayClick}
			transition:fade={{ duration: 150 }}
		>
			<div class=" shadow position-relative bg-light rounded mx-auto my-auto ">
				<main class="p-3 d-flex justify-content-center align-items-center flex-column">
					<h2 class=" text-dark text-capitalize m-0">Are you want to end your test ?</h2>
					<div class="d-flex align-items-center">
						<a href="/ResultPage">
							<!-- svelte-ignore a11y-accesskey -->
							<button class="rounded p-2 m-3 w-100" accesskey="y"> YES </button>
						</a>
						<!-- svelte-ignore a11y-accesskey -->
						<button class="rounded px-4 py-2 m-4 " on:click={() => (show = false)} accesskey="n">
							NO
						</button>
					</div>
				</main>
			</div>
		</div>
	</div>
{/if}
