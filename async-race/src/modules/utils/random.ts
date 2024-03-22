import { ICarMakeModel } from './utils-i';

class Randomizer {
  public static generateCarsData(): Array<{ [key: string]: string }> {
    const carsArr = this.getRandomCarsArr();
    const newArr = carsArr.map((car) => {
      const obj: { [key: string]: string } = {};
      obj.name = car;
      obj.color = this.getRandomColor();
      return obj;
    });
    return newArr;
  }

  /** @min inclusive, @max inclusive */
  private static getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1)) + Math.ceil(min);
  }

  private static getRandomElem(source: Array<string> | string): string {
    return source[this.getRandomInt(0, source.length - 1)];
  }

  private static getRandomColor(): string {
    const hexSymbols = '0123456789ABCDEF';
    let hexColor = '#';
    const max = 6;
    for (let i = 0; i < max; i += 1) {
      hexColor += this.getRandomElem(hexSymbols);
    }
    return hexColor;
  }

  private static getRandomCarsArr(): Array<string> {
    const CarMakeModel: ICarMakeModel = {
      Audi: ['A1', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'e-tron GT', 'TT', 'R8'],
      VW: ['Golf', 'Polo', 'Jetta', 'Passat', 'Tiguan', 'Beetle', 'Up', 'Caddy', 'Touran', 'Kaddy'],
      Kia: ['Seed', 'Rio', 'K5', 'Optima', 'Soul', 'Sorento', 'Sportage', 'Picanto', 'K8'],
      Skoda: ['Fabia', 'Rapid', 'Octavia', 'Superb', 'Karoq', 'Kodiaq', 'Roomster', 'Yeti'],
      Renault: ['Arkana', 'Captur', 'Clio', 'Docker', 'Duster', 'Fluence', 'Kaptur', 'Logan'],
      Toyota: ['Corolla', 'Camry', 'Auris', 'Avensis', 'Celica', 'IQ', 'Prius', 'Mark II', 'Supra'],
      Mazda: ['3', '6', '323', '626', 'CX-5', 'Tribute'],
      Mercedes: ['C-class', 'E-class', 'S-class', 'CLA', 'AMG GT', 'GL', 'ML'],
      Citroen: ['Picasso', 'Berlingo', 'C4', 'Xantia', 'Xsara'],
      Porshe: ['911', 'Cayenne', 'Spyder', 'Carrera GT', 'Panamera', 'Boxster'],
    };

    const randomTotal = 100;
    const carMakes = Object.keys(CarMakeModel);
    const namesArr = [];

    for (let i = 0; i < randomTotal; i += 1) {
      const make: string = this.getRandomElem(carMakes);
      const model = this.getRandomElem(CarMakeModel[make]);
      namesArr.push(`${make} ${model}`);
    }
    return namesArr;
  }
}

export default Randomizer;
