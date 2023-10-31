<script>
	import { base } from '$app/paths';
</script>

<nav class="rightCol">
	<div class="navItem"><a href="{base}/">Versio 1</a><span> Double perlin noise</span></div>
	<div class="navItem">
		<a href="{base}/simplex">Versio 2</a><span> Noise simplex test with (angle + PI) * dSquared / 4 / PI</span>
	</div>
	<div class="navItem">
		<a href="{base}/warped">Versio 3</a><span> Warped tangents</span>
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
		min-height: 800px;
	}
	a {
		display: block;
	}
	:global(.rightCol) {
		display: block;
		float: right;
		width: 50%;
		min-width: 600px;
	}
	:global(.sketch) {
		display: inline-block;
		position:absolute;
		top:0;
		margin: 24px 12px;
	}
	:global(.sketchWrap) {
		min-height: 750px;
		width: 700px;
		display: block;
		float:left;
	}
	.navItem {
		display: block;
		margin: 1rem;
	}
</style>
