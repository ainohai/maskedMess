import type { Line } from "./types";
import type { Sketch } from 'p5-svelte/types';
import type * as p5 from 'p5/index'
import { getScheme } from "./colorPalettes";


/**
 * 
 * @param canvasWidth 
 * @param canvasHeight 
 * @param numOfAngles angles of polygon
 * @param stretch stretch factor. From 0 to 1
 * @param stretchFromMid From 0 to 1. How big percentage of the stretch is in the start side of the mid point.
 * @returns 
 */
export function createLineMask(canvasWidth: number, canvasHeight: number, maxNumOfAngles: number, stretch: number, stretchFromMid: number, maxRadius: number): Sketch {


    console.log("create")
    
    let sketch: Sketch = (p5) => {

        const palette = getScheme().map(col => p5.color(col.r, col.b, col.g, col.opacity));

        p5.setup = () => {
            console.log("setup")
            p5.createCanvas(canvasWidth, canvasHeight);
            //p5.rect(0, 0, canvasWidth, canvasHeight);
            //p5.translate(canvasWidth/2,canvasHeight/2);
            p5.strokeWeight(0)

        };

        p5.draw = () => {

            const threshold = 105;
            let noiseLevel = 255;
            let noiseScale = 0.005;
            let noiseScale2 = 0.02;
            for (let y = 0; y < canvasHeight; y += 1) {
                for (let x = 0; x < canvasWidth; x += 1) {
                    // Scale input coordinates.
                    let nx = noiseScale * x;
                    let ny = noiseScale * y;
                    let ny2 = noiseScale2 * y *100;
                    // Compute noise value.
                    let c = noiseLevel * p5.noise(nx, ny);
                    let c2 = noiseLevel * p5.noise(nx, ny2);
                    if (threshold <= c && threshold <= c2) {

                        let alpha = p5.map(c, 0, 255, threshold, 255);

                        // Compute noise value.
                        p5.fill(245);
                        p5.rect(x, y, 1, 1);
                        
                    }

                }
            }

            p5.noLoop();

        }

    };
    return sketch;
}
