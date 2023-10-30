<script>
	import { base } from '$app/paths';
</script>

<nav class="mainNav">
	<div class="navItem"><a href="{base}/">Versio 1</a><span> Double perlin pass</span></div>
	<div class="navItem">
		<a href="{base}/simplex">Versio 2</a><span
			>Noise simplex test with (angle + PI) * dSquared / 4 / PI</span
		>
	</div>
</nav>

<slot />

<style>
	@import 'milligram/dist/milligram.min.css';

	:global(html) {
		font-size: 10px;
	}
	:global(body) {
		margin-right: 1.5rem;
		background-color: #383838;
	}
	a {
		display: block;
	}
	.mainNav {
		display: block;
		float: right;
	}
	.navItem {
		display: inline-block;
		margin: 1rem;
	}
</style>
