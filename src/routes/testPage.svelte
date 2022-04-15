<script>
	/**
	 * File name : testPage.svelte
	 * Description : Contain all question of test
	 * Author : Pankaj Kumar
	 * Version : 1
	 * Package : svelte_items
	 * Created : 15 March 2022
	 * Updated by : Pankaj Kumar
	 * Updated Date : 14 April 2022
	 */

	import { savedAnswers } from '../store.js';
	import Header from '../components/Header.svelte';
	import FooterTestPage from '../components/FooterTestPage.svelte';
	import { savedData } from '../store.js';
	import { answerCheckedByUser, attemptQuestion } from '../store.js';

	let selected = [];
	import { onMount } from 'svelte';
	// fetching data from JSON file and set data in store file
	const apiURL = '/data/question.json';
	let data = [];
	onMount(async function () {
		$savedAnswers = selected;
		const response = await fetch(apiURL);
		data = await response.json();
		savedData.set(data);
	});
	// change question
	let current_question = 0;
	// next question
	function incurrent_question() {
		current_question += 1;
	}
	// previous question
	function decurrent_question() {
		current_question -= 1;
	}
	// onclick change questions
	const changeQuestion = (event) => {
		current_question = event.detail;
	};
	// this function is run when user click on radio button
	let user_answer = [];
	let use_check_ans;
	const getClassList = (j, i) => {
		const que = JSON.parse(data[current_question].content_text).question; // for collecting the queston
		const ans = JSON.parse(data[current_question].content_text).answers[j].is_correct; // for collection the correct or incorrect answer(1 or 0)
		const id = JSON.parse(data[current_question].content_text).answers[j].id; // for collecting the answer id(choose by user when click on radio button)
		// if user selected more than one questions
		if (user_answer.length > 0) {
			use_check_ans = {
				quesNo: i + 1,
				userId: id,
				userQue: que,
				userAns: ans,
				userOptionCheck: j
			};
			// for comparing the duplicacy of question, which will further use to calculate incorrect questions.
			for (let i = 0; i <= 3; i++) {
				if (user_answer[i].userQue == use_check_ans.userQue) {
					user_answer[i] = use_check_ans;
					break;
				} else {
					user_answer.push(use_check_ans);
				}
			}
		}
		// if user select only one question
		if (user_answer.length == 0) {
			user_answer.push({
				quesNo: i + 1,
				userId: id,
				userQue: que,
				userAns: ans,
				userOptionCheck: j
			});
		}
		// if the duplicacy will be, the remove the duplicacy here
		// acc is target, cur is source
		let user_selected = Object.values(
			user_answer.reduce((acc, cur) => Object.assign(acc, { [cur.userQue]: cur }), {})
		);
		// all attempted question store here
		$answerCheckedByUser = user_selected;
	};
</script>

<Header />
<div class="row position-relative m-0">
	<div class="col-2 p-0">
		<!-- empty div to cover space  -->
	</div>

	<div class="col-9 p-0">
		<div class="m-5">
			{#each data as data, i}
				{#if current_question === i}
					<div>
						<h4>Q{i + 1}.{JSON.parse(data.content_text).question}</h4>
						<br />
						<div>
							{#each JSON.parse(data.content_text).answers as answers, j}
								<div>
									<!-- svelte-ignore a11y-label-has-associated-control -->
									<label class="d-flex ">
										<div>{j + 1}.</div>
										<div class="mx-2">
											<input
												type="radio"
												value={answers.answer}
												name="answer"
												id="radio{j}"
												on:click={() => getClassList(j, i)}
												bind:group={selected[i]}
											/>
											{@html answers.answer}
										</div>
									</label>
								</div>
							{/each}
						</div>
					</div>
				{/if}
			{/each}
		</div>
	</div>
</div>

<FooterTestPage
	on:increment={incurrent_question}
	on:decrement={decurrent_question}
	count={current_question + 1}
	on:changeQuestion={changeQuestion}
	current_data={current_question}
/>
