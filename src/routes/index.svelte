<script>
	/**
	 * File name : index.svelte
	 * Description : Main page of project
	 * Author : Pankaj Kumar
	 * Version : 1
	 * Package : svelte_items
	 * Created : 15 March 2022
	 * Updated by : Pankaj Kumar
	 * Updated Date : 30 March 2022
	 */
	import Header from '../components/Header.svelte';
</script>

<Header />
<div class="d-flex min-vh-100 justify-content-center align-items-center">
	<a href="/testPage">
		<!-- svelte-ignore a11y-accesskey -->
		<button accesskey="s" class="btn border border-dark border-2 rounded btn btn-primary">
			<h4 class="m-0">Start Test</h4>
		</button>
	</a>
</div>
