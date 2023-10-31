import type { Sketch } from 'p5-svelte/types';
import {makeRectangle} from 'fractal-noise';
import { createNoise2D } from 'simplex-noise';

/**
 * 
 * @param canvasWidth 
 * @param canvasHeight 
 * @returns 
 */
export function createWarpedMask(canvasWidth: number, canvasHeight: number): Sketch {


    let numWarps = 5;
    let warpSizeX = 0.1;
    let warpSizeY = 0.1;
    let falloff = 0; // Should be between 0 and 1
    const createNoise1 = createNoise2D();
    const createNoise2 = createNoise2D();
    const getWarpedPosition =(x: number, y: number) =>{

      let scale = 5;
      for (let i = 0; i < numWarps; i++) {
        const dx = warpSizeX * createNoise1(x, y)
        const dy = warpSizeY * createNoise2(x, y);
        x += scale * dx;
        y += scale * dy;
        scale *= falloff;
      }
      return [x, y];
    }

    console.log("create")

    let sketch: Sketch = (p5) => {

        p5.setup = () => {
            console.log("setup")
            p5.createCanvas(canvasWidth, canvasHeight);
            p5.strokeWeight(0)

        };

        p5.draw = () => {

            const multip = 0.0001 * Math.random();
            let dy = (Math.random() * 100000) - 200000;
            let dx = 20;

            for (let y = 0; y < canvasHeight; y += 1) {
                for (let x = 0; x < canvasWidth; x += 1) {

                    let c = Math.tan(multip*(x + dx)*(y+dy))
                    
                    let pos = getWarpedPosition(x, y);

                    p5.fill(c);
                    p5.rect(pos[0], pos[1], 1, 1);
                    
                
                }
            }

            p5.noLoop();

        }

    };
    return sketch;
}
