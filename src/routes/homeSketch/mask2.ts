import type { Line } from "../types";
import type { Sketch } from 'p5-svelte/types';
import type * as p5 from 'p5/index'
import { getScheme } from "../colorPalettes";


/**
 * 
 * @param canvasWidth 
 * @param canvasHeight 
 * @returns 
 */
export function createLineMask(canvasWidth: number, canvasHeight: number, seed: number): Sketch {


    console.log("create")
    
    let sketch: Sketch = (p5) => {

        const palette = getScheme().map(col => p5.color(col.r, col.b, col.g, col.opacity));

        p5.setup = () => {
            console.log("setup")
            p5.createCanvas(canvasWidth, canvasHeight);
            p5.strokeWeight(0);
            p5.noiseSeed(seed);

        };

        p5.draw = () => {

            const threshold = 145;
            let noiseLevel = 255;
            let noiseScale = 0.009;
            let noiseScale2 = 0.2;
            const threshold2 = 140;
            for (let y = 0; y < canvasHeight; y += 1) {
                for (let x = 0; x < canvasWidth; x += 1) {
                    // Scale input coordinates.
                    let nx = noiseScale * x + 100;
                    let ny = noiseScale * y + 100;
                    let ny2 = noiseScale2 * y *100;
                    // Compute noise value.
                    let c = noiseLevel * p5.noise(nx, ny);
                    let c2 = noiseLevel * p5.noise(nx, ny2);
                    if (threshold <= c && threshold2 <= c2) {

                        let alpha = p5.map(c, 0, 255, threshold, 255);

                        // Compute noise value.
                        p5.fill(245);
                        //p5.fill(c)
                        p5.rect(x, y, 1, 1);
                        
                    }

                }
            }

            p5.noLoop();

        }

    };
    return sketch;
}
