import type { Sketch } from 'p5-svelte/types';
import { getScheme } from "../colorPalettes";

type coordinate = {
    x: number,
    y: number,
}

/**
 * Creates polygon centered to origo.
 * @param numOfCorners 
 */
const createPolygonDots = (numOfCorners: number, radius: number ) => {
    const angleOfRotation = 2 * Math.PI / numOfCorners;

    //first point is in y = 0, x = r
    const points = [{x: radius, y:-10}]

    for (let i = 1; i < numOfCorners; i++){
        const p0 = points[i-1]
        const x1 = p0.x * Math.cos(angleOfRotation) + p0.y * Math.sin(angleOfRotation);
        const y1 = -p0.x * Math.sin(angleOfRotation) + p0.y * Math.cos(angleOfRotation);


        points.push({x: x1, y: y1});
    }

    return points;
}

/**
 * Distorts dots by max value.
 */
const distortDots = (dots: {x: number, y: number}[], maxX:number, maxY: number ) => {
    
        return dots.map(dot => {
            const randX = (Math.random() * maxX *2) - maxX;
            const randY = (Math.random() * maxY *2) - maxY;
            return {x: dot.x + randX, y: dot.y + randY};
    });
}


/**
 * 
 * @param canvasWidth 
 * @param canvasHeight 
 * @param numOfAngles angles of polygon
 * @returns 
 */
export function createSketch(canvasWidth: number, canvasHeight: number, maxNumOfAngles: number, maxRadius: number): Sketch {


    console.log("create")
    
    let sketch: Sketch = (p5) => {

        const OPACITY = 50;
        const palette = getScheme().map(col => p5.color(col.r, col.b, col.g, OPACITY));

        p5.setup = () => {
            console.log("setup")
            p5.createCanvas(canvasWidth, canvasHeight);
            
            p5.fill(45) 
            p5.rect(0, 0, canvasWidth, canvasHeight);
            p5.translate(canvasWidth/2,canvasHeight/2);
            p5.strokeWeight(0)

        };

        p5.draw = () => {

            //p5.background(200)

            const randNumOfAngles = Math.floor(Math.random() * maxNumOfAngles);
            const randRadius = Math.floor(Math.random() * maxRadius);
            const polygonDots = createPolygonDots(randNumOfAngles, randRadius);
            const dots = distortDots(polygonDots, randRadius / 2, randRadius / 2)

            const randColor = Math.floor(Math.random() * palette.length)

            let position: [number, number] | undefined = undefined;

            while (position === undefined) {

                const randX = Math.floor(Math.random() * canvasWidth);
                const randY = Math.floor(Math.random() * canvasHeight);

                const threshold = 125;
                let noiseLevel = 255;
                let noiseScale = 0.01;
                // Scale input coordinates.
                let nx = noiseScale * randX;
                let ny = noiseScale * randY;
                // Compute noise value.
                let c = noiseLevel * p5.noise(nx, ny);

                if (c >= threshold) {
                    position = [randX, randY];
                    break;
                }

            }

            //p5.translate(randX/2,randY/2);
            p5.translate(position[0], position[1]);

            p5.fill(palette[randColor]);
            p5.beginShape();

            for (let i=0; i < dots.length; i++) {
                
                p5.curveVertex(dots[i].x, dots[i].y);
            }
            p5.curveVertex(dots[0].x, dots[0].y);
            //stretchAndDrawLine([dots[dots.length-1], dots[0]], stretch, stretchFromMid, p5);

            p5.endShape();

            if (p5.frameCount > 250) {
                p5.noLoop()
            }
        };
    };
    return sketch;
}
