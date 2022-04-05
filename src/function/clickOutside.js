/**
 * File name : clickOutside.js
 * Description : when you click outside navigation bar, it will close (using this file)
 * Author : Pankaj Kumar
 * Version : 1
 * Package : svelte_items
 * Created : 15 March 2022
 * Updated by : Pankaj Kumar
 * Updated Date : 30 March 2022
 */

export function clickOutside(node) {
	const handleClick = (event) => {
		if (node && !node.contains(event.target) && !event.defaultPrevented) {
			node.dispatchEvent(new CustomEvent('click_Outside', node));
		}
	};

	document.addEventListener('click', handleClick, true);

	return {
		destroy() {
			document.removeEventListener('click', handleClick, true);
		}
	};
}
