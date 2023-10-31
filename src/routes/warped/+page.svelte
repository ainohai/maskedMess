<script lang="ts">
	import P5 from 'p5-svelte';
	import { createWorleyBg } from './worleyBg';
	import { createWarpedMask } from './mask';
	

	
	const CANVAS_WIDTH = 500;
	const CANVAS_HEIGHT = 700;

	const NUM_OF_DRAWINGS = 1;

	let numOfAngles = 15;
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
				sketch: createWorleyBg(CANVAS_WIDTH, CANVAS_HEIGHT, numOfAngles, radius)
			});
			newSketches.push({
				id: `sketch-mask-${Date.now()}`,
				sketch: createWarpedMask(CANVAS_WIDTH, CANVAS_HEIGHT)
			});
		}createWarpedMask
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


<div class="rightCol">
    <button on:click={() => createSketches()}>Piirrä uudestaan</button>
</div>


	


<style>

</style>
