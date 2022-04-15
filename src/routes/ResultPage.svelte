<script>
	/**
	 * File name : ResultPage.svelte
	 * Description : Contain all result page data
	 * Author : Pankaj Kumar
	 * Version : 1
	 * Package : svelte_items
	 * Created : 15 March 2022
	 * Updated by : Pankaj Kumar
	 * Updated Date : 14 April 2022
	 */
	import Header from '../components/Header.svelte';
	import { onMount } from 'svelte';
	import { savedData, answerCheckedByUser, savedAnswers, reviewNavigator } from '../store.js';
	let correct = 0;
	let incorrect = 0;
	let percentage = 0;
	let actual_correct_array = [];
	let answer_choose_by_user_array = [];
	let option = ['A', 'B', 'C', 'D']; // options for user to select
	$: for (let i = 0; i < $savedData.length; i++) {
		let correctIndex = 0;
		if ($savedAnswers[i]) {
			for (let j = 0; j < 4; j++) {
				if (JSON.parse($savedData[i].content_text).answers[j].answer == $savedAnswers[i]) {
					correctIndex = j;
				}
			}
		} else {
			correctIndex = null;
		}
		answer_choose_by_user_array[i] = correctIndex;
	}
	$: for (let i = 0; i < $savedData.length; i++) {
		let actualCorrect = 0;
		for (let j = 0; j < 4; j++) {
			if (JSON.parse($savedData[i].content_text).answers[j].is_correct == '1') {
				actualCorrect = j;
			}
		}
		actual_correct_array[i] = actualCorrect;
	}
	onMount(() => {
		$answerCheckedByUser.sort(function (a, b) {
			return a.quesNo - b.quesNo;
		});
		for (let i = 0; i < $answerCheckedByUser.length; i++) {
			if ($answerCheckedByUser[i].userAns == 1) {
				correct = correct + 1;
				percentage = Math.round((correct / 11) * 100);
			} else {
				incorrect = incorrect + 1;
			}
		}
	});
	const reviewPage = () => {
		reviewNavigator.set(true);
	};
	let j;
	let unselected = [];
	let matched = [];
	for (let i = 0; i < $savedData.length; i++) {
		for (j = 0; j < $answerCheckedByUser.length; j++) {
			if (i + 1 == $answerCheckedByUser[j].quesNo) {
				matched[i] = i + 1;
				break;
			} else {
				matched[i] = 0;
			}
		}
		if (j >= $answerCheckedByUser.length) {
			unselected[i] = i + 1;
		}
	}
	// for showing number of attempted questions
	$: data2 = $savedAnswers.filter(Boolean);
</script>

<Header />

<main>
	<div class="container my-4 d-flex align-items-center flex-column">
		<div
			class="row d-flex justify-content-around align-items-center border border-secondary border-4 rounded m-1 p-1 w-75">
			<div
				class="col  border border-2 border-danger rounded text-center text-uppercase p-1 m-1 d-flex justify-content-center flex-column ">
				<h5 class=" text-nowrap">Total Ques</h5>
				<h2>11</h2>
			</div>
			<div
				class="col  border border-2 border-danger rounded text-center text-uppercase p-1 m-1 d-flex justify-content-center flex-column ">
				<h5>Attempted</h5>
				<h2>{data2.length}</h2>
			</div>
			<div
				class="col  border border-2 border-danger rounded text-center text-uppercase p-1 m-1 d-flex justify-content-center flex-column ">
				<h5>Unattempted</h5>
				<h2>{11 - $answerCheckedByUser.length}</h2>
			</div>
			<div
				class="col  border border-2 border-danger rounded text-center text-uppercase p-1 m-1 d-flex justify-content-center flex-column ">
				<h5>Correct</h5>
				<h2>{correct}</h2>
			</div>
			<div
				class="col  border border-2 border-danger rounded text-center text-uppercase p-1 m-1 d-flex justify-content-center flex-column ">
				<h5>Incorrect</h5>
				<h2>{incorrect}</h2>
			</div>
			<div
				class="col  border border-2 border-danger rounded text-center text-uppercase p-1 m-1 d-flex justify-content-center flex-column ">
				<h5>Percentage</h5>
				<h2>{percentage} %</h2>
			</div>
		</div>

		<div class="d-flex flex-column   m-2 ">
			<h6 class="mb-3 text-nowrap bg-success p-2 text-white">(Attempted + Correct) : </h6>
			<h6 class="mb-3 text-nowrap bg-danger p-2 text-white">(Attempted + InCorrect) :</h6>
			<h6 class="mb-3 text-nowrap bg-info p-2 text-white">(Correct Answers) :</h6>
		</div>

		<div class=" mx-5 my-auto w-75 border border-dark border-2 rounded p-2">
			{#each $savedData as item, i}
				<div class="d-flex flex-md-column flex-lg-column flex-column flex-xl-row">
					<!-- for questions  -->
					<div class="col-9  ">
						<!-- svelte-ignore a11y-invalid-attribute -->
						<p class="fw-bold">
							<a
								class="text-decoration-none text-dark d-block text-nowrap overflow-hidden text-truncate"
								href={`Review/${i}`}
								on:click={reviewPage}>Q{i + 1}.{JSON.parse(item.content_text).question}</a
							>
						</p>
					</div>

					<!-- for answers  -->
					<div class="col-3 d-flex">
						<!-- show all answers  -->
							<div class="col d-flex p-0 mb-1">
								{#each option as optionData, j}
									<div 
									class="{`${actual_correct_array[i] == j}`} border col w-25 text-center align-middle " 
									class:selected={actual_correct_array[i] != answer_choose_by_user_array[i] && answer_choose_by_user_array[i] == j ? true : false}>
										<p class="m-0 p-1">{optionData}</p>
									</div>
								{/each}
							</div>
							<!-- user review about questions  -->
							<div class=" p text-center ms-1 p-1">
								{#each $answerCheckedByUser as selectQue}
									{#if i + 1 == selectQue.quesNo}
										{#if selectQue.userAns == 0}
											<p class="m-0 p-0">INCORRECT</p>
										{:else}
											<p class="bg-success text-light align-items-center m-0 p-1">CORRECT</p>
										{/if}
									{/if}
								{/each}
								{#each unselected as un}
									{#if i + 1 == un}
										<p class="m-0 p-0">UNATTEMPTED</p>
									{/if}
								{/each}
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
</main>
<div class="d-flex justify-content-center align-items-center">
	<a href="/">
		<button class=" border rounded bg-primary text-light border-dark border-2 p-2 "
			><h5 class="m-0">Restart</h5></button
		>
	</a>
</div>

<style>

	.true {
		background-color: lightblue;
	}
	.selected {
		background-color: red;
		color: white;
	}
</style>
