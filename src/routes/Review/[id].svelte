
	<!-- // File name : [id].svelte
	// Description : clickable questions on result page and goes to review page.
	// Author : Pankaj Kumar
	// Version : 1
	// Package : svelte_items
	// Created : 15 March 2022
	// Updated by : Pankaj Kumar
	// Updated Date : 30 March 2022  -->

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
	import Header from '../../components/Header.svelte'
	import { savedData, answerCheckedByUser, reviewNavigator } from '../../store.js';
	import Footer_ReviewPage from '../../components/Footer_ReviewPage.svelte';
	import { onDestroy } from 'svelte';
	export let id;
	let pageNo = Number(id); 
	let explanationAnswer; 
	$: if (pageNo + 1) {
		explanationAnswer = JSON.parse($savedData[pageNo].content_text).explanation;
		let indexOfSeq = explanationAnswer.indexOf('<seq');
		while (indexOfSeq > -1) {
			let str1 = explanationAnswer.substr(indexOfSeq, 14);
			let currectAnswer = explanationAnswer.charAt(indexOfSeq + 9);
			currectAnswer = currectAnswer.toUpperCase();
			explanationAnswer = explanationAnswer.replace(str1, currectAnswer);
			indexOfSeq = explanationAnswer.indexOf('<seq');
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
		reviewNavigator.update((x) => {
			return (x = false);
		});
	});

</script>

<Header />
<div class="my-5">
	<div class=" w-75 mx-auto">
		{#each $savedData as data, i}
			{#if pageNo == i}
				<div class="question">
					<h4>
						Q{i + 1} . {JSON.parse(data.content_text).question}
					</h4>
					<div class="mt-3">
						<div class="">
							{#each JSON.parse(data.content_text).answers as answers, j}
								{#if answers.is_correct == 1}
									<label class=" d-flex align-items-center">
										<input
											type="radio"
											class="custom_InputButton mx-4 bg-success rounded-circle border"
											value={j}
											name="radio"
											bind:group={answers}
											disabled
										/>
										{@html answers.answer}
									</label>
								{:else}
									<label class=" d-flex align-items-center">
										<input type="radio" name="radio" class="mx-4" disabled />
										{@html answers.answer}
									</label>
								{/if}
							{/each}
						</div>
					</div>
					{#each JSON.parse(data.content_text).answers as answersCorrect}
						{#if answersCorrect.is_correct == 1}


							<div class="bg-primary text-white rounded mt-5 mb-2 p-2">

								<p>{@html explanationAnswer}</p>
							</div>
						{/if}
					{/each}
					{#each $answerCheckedByUser as user}
						{#if i + 1 == user.quesNo}
							{#if user.userAns == '1'}
								<div>
									<h3 class="bg-success text-center text-white p-1 rounded">Correct</h3>
								</div>
							{:else}
								<div >
									<h3 class="text-center bg-danger text-white p-1 rounded">Incorrect</h3>
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
	<Footer_ReviewPage
		currentData={pageNo}
		on:changques={upDateQuestionPage}
		on:increment={incrementPage}
		on:decrement={decrementPage}
		count={pageNo + 1}
	/>
</div>

<style>
	.custom_InputButton {
		box-shadow: 0 0 0 1px #392;
		appearance: none;
		width: 12px;
		height: 12px;
	}
	
</style>
