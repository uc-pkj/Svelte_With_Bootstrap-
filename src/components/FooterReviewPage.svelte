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
	export let disabled = false;

</script>

<div class="row position-fixed fixed-bottom m-2">
	<div class="col-6">
		<!-- empty div for space  -->
	</div>
	<div class="col-5 bg-dark rounded text-light">
		<footer>
			<div class="d-flex justify-content-between align-items-center ">
				<!-- list & preivous button  -->
				<div class="d-flex">
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

				<!-- next & home button  -->
				<div>
					<!-- svelte-ignore a11y-accesskey -->
					<button
						class="btn btn-primary"
						on:click={increaseQuestionValue}
						disabled={current_data + 1 >= 11}
						accesskey="n">Next</button
					>

					<a href="/"><button class=" btn btn-primary m-2">Home</button></a>
				</div>
			</div>
		</footer>
	</div>
</div>
