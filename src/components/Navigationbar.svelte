<!-- 
	// File name : Navigationbar.svelte
	// Description : Contain navigation bar, where all questions are clickable
	// Author : Pankaj Kumar
	// Version : 1
	// Package : svelte_items
	// Created : 15 March 2022
	// Updated by : Pankaj Kumar
	// Updated Date : 30 March 2022  -->
<script>

	import { fly } from 'svelte/transition';
	export let show = false;

	import {savedData } from '../store.js';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	let clickedques;
	function handleClick(x) {
		dispatch('clickedquesno', x);
	}

	// show attempted or unattempted questions
	import {savedanswers} from '../store.js'
	$: data1= $savedanswers.filter(Boolean);
	
</script>

{#if show}
	<div class="text-dark">
		<nav id="navbar" class="position-fixed top-0 start-0 bg-white border-right border border-2 border-secondary h-100 p-2" transition:fly={{ x: -250, opacity: 1 }}>
			<h4>Attempted : {data1.length}</h4>
			<h4>Unattempted : {11-data1.length}</h4>
			<h4 class="">Questions..</h4>
			{#each $savedData as item, i}
				<small class="elep">
					<!-- svelte-ignore a11y-invalid-attribute -->
					<!-- svelte-ignore a11y-accesskey -->
					<a href="#" class="text-dark text-decoration-none d-block fs-6 m-1 text-nowrap overflow-hidden text-truncate" on:click={() => handleClick((clickedques = i))}><strong>Q{i + 1}. </strong>{JSON.parse(item.content_text).question}</a
					>
				</small>
			{/each}
		</nav>
	</div>
{/if}

<style>
	
	nav {
		width: 280px;
	}


</style>
