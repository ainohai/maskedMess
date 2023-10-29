<nav class="mainNav">
	<div class="navItem"><a href="/">Versio 1</a><span> Double perlin pass</span></div>
	<div class="navItem"><a href="/simplex">Versio 2</a><span>Noise simplex test with (angle + PI) * dSquared / 4 / PI</span></div>
</nav>

<slot></slot>

<style>
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