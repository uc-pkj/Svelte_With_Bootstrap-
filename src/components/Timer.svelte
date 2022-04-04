<script>
	/**
	 * File name : Timer.svelte
	 * Description : Contain timer function of Footer_TestPage
	 * Author : Pankaj Kumar
	 * Version : 1
	 * Package : svelte_items
	 * Created : 15 March 2022
	 * Updated by : Pankaj Kumar
	 * Updated Date : 30 March 2022
	 */
	import { onMount } from 'svelte';
	export let CountDown = 120000; //give time in milliseconds
	let Stopper; // to stop timer
	$: Count = Math.round(CountDown / 1000); // changes to seconds
	$: H = Math.floor(Count / 3600); //find hours
	$: minutes = Math.floor((Count - H * 3600) / 60); //find minutes
	$: seconds = Count - H * 3600 - minutes * 60;
	//when timer goes to end stage timemodal popup will show
	$: if (Count === 0) {
		clearInterval(Stopper);
		timemodal_Show = true;
	}
	//call timer function on every 1 second
	onMount(() => {
		Stopper = setInterval(() => {
			Count -= 1;
		}, 1000);
	});
	// when times up this component(timesuppage) will called
	import Timesuppage from './Timesuppage.svelte';
	let timemodal_Show = false;
</script>

<Timesuppage bind:show={timemodal_Show} />
<main>
	<p>{minutes < 10 ? '0' + minutes : minutes}:{seconds < 10 ? '0' + seconds : seconds}</p>
</main>

<style>
	p {
		font-size: 18px;
	}
</style>
