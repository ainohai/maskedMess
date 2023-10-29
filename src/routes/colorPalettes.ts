import * as ColorScheme from 'color-scheme';
import hexRgb, { type RgbaObject } from 'hex-rgb';


//export const paletteSchemes = ['mono', 'contrast', 'triade', 'tetrade', 'analogic'];
export const paletteSchemes = ['triade', 'tetrade'];
export const variations = ['default', 'pastel', 'soft', 'light', 'hard', 'pale'];

export const getScheme = (): {
    r: number,
    b: number,
    g: number,
    opacity: number
  }[] => {
  const paletteScheme = paletteSchemes[Math.floor(Math.random()*paletteSchemes.length)];
  //const variation = variations[Math.floor(Math.random()*variations.length - 1)];
  const variation = "default"


  const scheme = new ColorScheme;
  scheme.from_hue(Math.floor(Math.random()* 359)).scheme(paletteScheme);
  scheme.variation(variation);

  const colors = scheme.colors();

  console.log(paletteScheme);
  console.log(variation);
  console.log(colors);

  const rgbs = colors.map((color: any) => hexRgb(color));

  return rgbs.map((rgba: RgbaObject) => ({
    r: rgba.red,
    b: rgba.blue,
    g: rgba.green,
    opacity: 150
  }));
};

