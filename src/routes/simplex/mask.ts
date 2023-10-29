import type { Sketch } from 'p5-svelte/types';
import { getScheme } from "../colorPalettes";
import { createNoise2D } from 'simplex-noise';

/**
 * 
 * @param canvasWidth 
 * @param canvasHeight 
 * @returns 
 */
export function createSimplexMask(canvasWidth: number, canvasHeight: number): Sketch {


    console.log("create")
    
    let sketch: Sketch = (p5) => {

        p5.setup = () => {
            console.log("setup")
            p5.createCanvas(canvasWidth, canvasHeight);
            p5.strokeWeight(0)

        };

        p5.draw = () => {

            const threshold1 = 65;
            const threshold2 = 35;
            let noiseLevel = 255;
            let noiseScale1 = 0.001;
            let noiseScale2 = 0.005;
            //Noise simplex

            const createNoise1 = createNoise2D();
            const createNoise2 = createNoise2D();
            for (let y = 0; y < canvasHeight; y += 1) {
                for (let x = 0; x < canvasWidth; x += 1) {
                    // Scale input coordinates.
                    

                    let mx = noiseScale1 * x;
                    let my = noiseScale1 * y;
                    const firstPass = createNoise1(mx, my);
                    let c1 = noiseLevel * Math.abs(firstPass);
                    if (threshold1 > c1) {
                        
                        if (c1 < 100) {
                            continue;
                        }
                        p5.fill(245);
                        p5.rect(x, y, 1, 1);
                        continue;
                    }

                    //Second pass
                    let nx = noiseScale2 * x;
                    let ny = noiseScale2 * y;
                    const noise1 = createNoise1(nx, ny);
                    const noise2 = createNoise2(nx, ny);
                    const angle = Math.atan2(noise1, noise2); 
                    const dSquared = noise1 * noise1 + noise2 * noise2;
                    const value = (angle + Math.PI) * dSquared / 4 / Math.PI;

                    // Compute noise value.
                    let c2 = noiseLevel * value;
                    let alpha = p5.map(c2, -255, 255, 0, 255);

                    if (threshold2 >= c2 ) {


                       // p5.fill(245, alpha);
                       // p5.rect(x, y, 1, 1);

                   /* } else {
                        continue;
                    }*/


                    //third pass
                    let c3 = noiseLevel * createNoise2(1 *c2, 1* c2);
                    let alpha3 = p5.map(c3, -255, 255, 0, 255);

                    if (50 > Math.abs(c3)) {


                        p5.fill(45);
                        p5.rect(x, y, 2, 2);
                    

                    /*if (x % 5 === 0 && y % 5 === 0) {
                        p5.fill(0, 150);
                        p5.circle(x, y, 5);
                    }*/
                }
                        
                }}
            }

            p5.noLoop();

        }

    };
    return sketch;
}
