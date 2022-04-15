<script context="module">
	export const load = ({ params }) => {
		const id = params.id;
		return {
			props: {
				id: id
			}
		};
	};
</script>

<script>
	/**
	 * File name : [id].svelte
	 * Description : clickable questions on result page and goes to review page.
	 * Author : Pankaj Kumar
	 * Version : 1
	 * Package : svelte_items
	 * Created : 15 March 2022
	 * Updated by : Pankaj Kumar
	 * Updated Date : 14 April 2022
	 */
	import Header from '../../components/Header.svelte';
	import { savedData, answerCheckedByUser, reviewNavigator } from '../../store.js';
	import FooterReviewPage from '../../components/FooterReviewPage.svelte';
	import { onDestroy } from 'svelte';
	export let id;
	let pageNo = Number(id);
	let explanation_answer;
	$: if (pageNo + 1) {
		explanation_answer = JSON.parse($savedData[pageNo].content_text).explanation;
		let indexOfSeq = explanation_answer.indexOf('<seq');
		while (indexOfSeq > -1) {
			let str1 = explanation_answer.substr(indexOfSeq, 14);
			let currectAnswer = explanation_answer.charAt(indexOfSeq + 9);
			currectAnswer = currectAnswer.toUpperCase();
			explanation_answer = explanation_answer.replace(str1, currectAnswer);
			indexOfSeq = explanation_answer.indexOf('<seq');
		}
	}
	// updating the question from sidebar list question
	const upDateQuestionPage = (event) => {
		pageNo = event.detail;
	};
	// for next button
	const incrementPage = () => {
		pageNo = pageNo + 1;
	};
	// for previous button
	const decrementPage = () => {
		pageNo = pageNo - 1;
	};
	onDestroy(() => {
		reviewNavigator.set(false);
	});


</script>

<Header />
<div class="my-5">
	<div class=" w-75 mx-auto">
		{#each $savedData as data, i}
			{#if pageNo == i}
				<div class="question">
					<h5>
						Q{i + 1} . {JSON.parse(data.content_text).question}
					</h5>
					<div class="d-flex flex-column mt-4 border p-2">
						{#each JSON.parse(data.content_text).answers as answers, j}
							<div class="d-flex">
								{#if answers.is_correct == 1}
									<p class="h6 my-auto">{String.fromCharCode(65 + j)}</p>
									<label class="w-100 m-2">
										<input type="radio" checked />
										{@html answers.answer}
									</label>
								{:else}
									<p class="h6 my-auto">{String.fromCharCode(65 + j)}</p>
									<label class="w-100 m-2">
										<input type="radio" disabled />
										{@html answers.answer}
									</label>
								{/if}
							</div>
						{/each}
					</div>

					{#each JSON.parse(data.content_text).answers as answersCorrect}
						{#if answersCorrect.is_correct == 1}
							<div class="bg-primary text-white rounded mt-5 mb-2 p-2">
								<small>{@html explanation_answer}</small>
							</div>
						{/if}
					{/each}
					{#each $answerCheckedByUser as user}
						{#if i + 1 == user.quesNo}
							{#if user.userAns == '1'}
								<div>
									<h4 class="bg-success text-center text-white p-1 rounded">Correct</h4>
								</div>
							{:else}
								<div>
									<h4 class="text-center bg-danger text-white p-1 rounded">Incorrect</h4>
								</div>
							{/if}
						{/if}
					{/each}
				</div>
			{/if}
		{/each}
	</div>
</div>
<div class="position-fixed bottom-0 w-50 end-0 m-2">
	<FooterReviewPage
		current_data={pageNo}
		on:changques={upDateQuestionPage}
		on:increment={incrementPage}
		on:decrement={decrementPage}
		count={pageNo + 1}
	/>
</div>
