declare module 'colorthief' {
  export default class ColorThief {
    constructor();
    getColor(img: HTMLImageElement): [number, number, number] | null;
    getPalette(img: HTMLImageElement, colorCount?: number): Array<[number, number, number]> | null;
  }
}
