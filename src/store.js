	// File name : store.svelte
	// Description : Used for store all data
	// Author : Pankaj Kumar
	// Version : 1
	// Package : svelte_items
	// Created : 15 March 2022
	// Updated by : Pankaj Kumar
	// Updated Date : 30 March 2022

import { writable } from 'svelte/store';

//store all questions and answer data(questionAnswerData)
export const savedData = writable()

// to store how many question are attempted
export const attemptQuestion = writable(0);

//for storing user answers(chosedAns)
export const savedanswers= writable([])

// to store only correct answer
export const correctAnswer=writable(0)

// for storing incorrect answer
export const incorrectAnswer=writable(0)

// show dashboard button instead of end button on revew page
export const reviewNavigator=writable(false)

// which question and answer are selected by user are store here
export const answerCheckedByUser=writable([])