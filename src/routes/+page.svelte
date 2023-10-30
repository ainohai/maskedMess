<script lang="ts">
	import P5 from 'p5-svelte';
	import { createSketch } from './homeSketch/sketch'
	import { createLineMask } from './homeSketch/mask2';
	import { createMask } from './homeSketch/mask';
	
	const CANVAS_WIDTH = 500;
	const CANVAS_HEIGHT = 700;

	const NUM_OF_DRAWINGS = 1;

	let numOfAngles = 25;
	let radius = 70;

	type Sketchy = {
		id: string;
		sketch: (p5: any) => void;
	};

	let sketches: Sketchy[] = [];

	function createSketches() {
		let newSketches = [];
		const seed = Date.now();

		for (let i = 0; i < NUM_OF_DRAWINGS; i++) {
			newSketches.push({
				id: `sketch-bg-${Date.now()}`,
				sketch: createSketch(CANVAS_WIDTH, CANVAS_HEIGHT, numOfAngles, radius, seed)
			});
			newSketches.push({
				id: `sketch-mask-${Date.now()}`,
				sketch: createMask(CANVAS_WIDTH, CANVAS_HEIGHT, seed)
			});
			newSketches.push({
				id: `sketch-line-mask-${Date.now()}`,
				sketch: createLineMask(CANVAS_WIDTH, CANVAS_HEIGHT, seed)
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
		top:50px;
		margin: 24px 12px;
	}
	.sketchWrap {
		min-height: 250px;
		width: 700px;
		display: inline-block;
	}
</style>
