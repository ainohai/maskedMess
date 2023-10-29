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
export function createMask(canvasWidth: number, canvasHeight: number, seed: number): Sketch {


    console.log("create")
    
    let sketch: Sketch = (p5) => {

        p5.setup = () => {
            console.log("setup")
            p5.createCanvas(canvasWidth, canvasHeight);
            p5.strokeWeight(0)
            p5.noiseSeed(seed)

        };

        p5.draw = () => {

            const threshold = 105;
            let noiseLevel = 255;
            let noiseScale = 0.01;
            for (let y = 0; y < canvasHeight; y += 1) {
                for (let x = 0; x < canvasWidth; x += 1) {
                    // Scale input coordinates.
                    let nx = noiseScale * x;
                    let ny = noiseScale * y;
                    // Compute noise value.
                    let c = noiseLevel * p5.noise(nx, ny);
                    if (threshold <= c) {

                        let alpha = p5.map(c, 0, 255, threshold, 255);

                        // Compute noise value.
                        let c2 = noiseLevel * p5.noise(0.0001 *c, 1* c);

                        if (threshold <= c2) {
                            p5.fill(0);
                            p5.rect(x, y, 1, 1);
                        }
                    }

                }
            }

            p5.noLoop();

        }

    };
    return sketch;
}
