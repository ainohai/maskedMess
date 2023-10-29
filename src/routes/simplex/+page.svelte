<script lang="ts">
	import P5 from 'p5-svelte';
	import { createSketch } from './simplexSketch';
	import { createSimplexMask } from './mask';
	import { createDotMask } from './mask2';

	
	const CANVAS_WIDTH = 500;
	const CANVAS_HEIGHT = 700;

	const NUM_OF_DRAWINGS = 1;

	let numOfAngles = 25;
	let radius = 80;

	type Sketchy = {
		id: string;
		sketch: (p5: any) => void;
	};

	let sketches: Sketchy[] = [];

	function createSketches() {
		let newSketches = [];

		for (let i = 0; i < NUM_OF_DRAWINGS; i++) {
			newSketches.push({
				id: `sketch-bg-${Date.now()}`,
				sketch: createSketch(CANVAS_WIDTH, CANVAS_HEIGHT, numOfAngles, radius)
			});
			newSketches.push({
				id: `sketch-dot-mask-${Date.now()}`,
				sketch: createDotMask(CANVAS_WIDTH, CANVAS_HEIGHT)
			});
			newSketches.push({
				id: `sketch-mask-${Date.now()}`,
				sketch: createSimplexMask(CANVAS_WIDTH, CANVAS_HEIGHT)
			});
		}
		sketches = newSketches;
		return true;
	}

	createSketches()
</script>

<svelte:head>
	<title>Masked mess</title>
</svelte:head>



<div class="sketchWrap">
		{#each sketches as sketch (sketch.id)}
			<div class="sketch" id= {sketch.id}>
				<P5 sketch={sketch.sketch} />
			</div>
		{/each}
</div>


<div style="margin:0rem 2rem; float: right">
    <button on:click={() => createSketches()}>Piirrä uudestaan</button>
</div>


	


<style>
	.sketch {
		display: inline-block;
		position:absolute;
		top:0;
		margin: 24px 12px;
	}
	.sketchWrap {
		min-height: 250px;
		width: 700px;
		display: inline-block;
	}
</style>
