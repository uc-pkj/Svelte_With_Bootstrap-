const c = [
	() => import("../runtime/components/layout.svelte"),
	() => import("../runtime/components/error.svelte"),
	() => import("../../src/routes/index.svelte"),
	() => import("../../src/routes/ResultPage.svelte"),
	() => import("../../src/routes/testPage.svelte"),
	() => import("../../src/routes/Review/[id].svelte")
];

const d = decodeURIComponent;

export const routes = [
	// src/routes/index.svelte
	[/^\/$/, [c[0], c[2]], [c[1]]],

	// src/routes/ResultPage.svelte
	[/^\/ResultPage\/?$/, [c[0], c[3]], [c[1]]],

	// src/routes/testPage.svelte
	[/^\/testPage\/?$/, [c[0], c[4]], [c[1]]],

	// src/routes/Review/[id].svelte
	[/^\/Review\/([^/]+?)\/?$/, [c[0], c[5]], [c[1]], (m) => ({ id: d(m[1])})]
];

// we import the root layout/error components eagerly, so that
// connectivity errors after initialisation don't nuke the app
export const fallback = [c[0](), c[1]()];