<script>
	/**
	 * File name : Footer_ReviewPage.svelte
	 * Description : Contain result page footer (different from test page footer)
	 * Author : Pankaj Kumar
	 * Version : 1
	 * Package : svelte_items
	 * Created : 15 March 2022
	 * Updated by : Pankaj Kumar
	 * Updated Date : 30 March 2022
	 */

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
	export let currentData;
</script>

<footer>
	<div class="d-flex justify-content-around align-items-center bg-dark rounded text-light">
		<div>
			<!-- svelte-ignore a11y-accesskey -->
			<button
				class=" btn btn-primary m-2"
				on:click={decreaseQuestionValue}
				disabled={currentData + 1 <= 1}
				accesskey="p">Previous</button
			>
		</div>
		<div>
			<span>{count} of 11</span>
		</div>
		<div>
			<!-- svelte-ignore a11y-accesskey -->
			<button
				class=" btn btn-primary m-2"
				on:click={increaseQuestionValue}
				disabled={currentData + 1 >= 11}
				accesskey="n">Next</button
			>

			<!-- svelte-ignore a11y-accesskey -->
			<a href="/"><button class=" btn btn-primary m-2">Home</button></a>
		</div>
	</div>
</footer>
