<script>
	/**
	 * File name : FooterTestPage.svelte
	 * Description : Contain test page footer
	 * Author : Pankaj Kumar
	 * Version : 1
	 * Package : svelte_items
	 * Created : 15 March 2022
	 * Updated by : Pankaj Kumar
	 * Updated Date : 14 April 2022
	 */

	// importing components
	import Navigationbar from './Navigationbar.svelte';
	import Timer from './Timer.svelte';
	// by default hidden sidebar
	let sidebar_Show = false;
	// import event dispatcher
	import { createEventDispatcher } from 'svelte';
	// assign dispatcher to constant
	const dispatch = createEventDispatcher();
	// for next question
	const increaseQuestionValue = () => {
		dispatch('increment');
	};
	// for previous question
	const decreaseQuestionValue = () => {
		dispatch('decrement');
	};
	export let count;
	// transfer data from navigation bar to test page
	const clickedQuestionNo = (event) => {
		dispatch('changeQuestion', event.detail);
	};
	export let current_data;
	//import model file (on click on end test dialogue box will appear)
	import Modal from './Modal.svelte';
	let modal_Show = false;
	export let disabled = false;
</script>

<!-- <footer class="w-50 d-flex rounded justify-content-between align-items-center text-light bg-dark p-1 m-2 position-fixed fixed-bottom"> -->
<div class="row position-fixed fixed-bottom m-2">
	<div class="col-6">
		<!-- empty div for space  -->
	</div>
	<div class="col-5 bg-dark rounded text-light">
		<footer>
			<div class="d-flex justify-content-between align-items-center ">
				<!-- timer  -->
				<div class="pt-3">
					{#if disabled == false}
						<Timer />
					{:else}{/if}
				</div>

				<!-- list & preivous button  -->
				<div   class="d-flex">
					<!-- svelte-ignore a11y-accesskey -->
					<button
						class="btn btn-primary m-2"
						on:click={() => (sidebar_Show = !sidebar_Show)}
						accesskey="l"
						{disabled}>List</button
					>
					<Navigationbar on:clickedQuestionNo={clickedQuestionNo} bind:show={sidebar_Show} />
					<!-- svelte-ignore a11y-accesskey -->
					<button
						class="btn btn-primary m-2"
						on:click={decreaseQuestionValue}
						disabled={current_data + 1 <= 1}
						accesskey="p">Previous</button
					>
				</div>

				<!-- pagination  -->
				<div>
					<span>{count} of 11</span>
				</div>

				<!-- next & end button  -->
				<div>
					<!-- svelte-ignore a11y-accesskey -->
					<button
						class="btn btn-primary"
						on:click={increaseQuestionValue}
						disabled={current_data + 1 >= 11}
						accesskey="n">Next</button
					>

					<!-- svelte-ignore a11y-accesskey -->
					<button
						class="btn btn-primary"
						on:click={() => {
							modal_Show = true;
						}}
						accesskey="e"
						{disabled}>End Test</button
					>
					<Modal bind:show={modal_Show} />
				</div>
			</div>
		</footer>
	</div>
</div>
