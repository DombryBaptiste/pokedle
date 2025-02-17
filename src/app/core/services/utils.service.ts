import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  /**
   * Génère un nombre entier aléatoire entre min et max (inclus).
   *
   * @param {number} min - La valeur minimale du nombre généré (incluse).
   * @param {number} max - La valeur maximale du nombre généré (incluse).
   * @returns {number} Un nombre entier compris entre min et max.
   *
   * @example
   * const random = utilsService.getRandomNumber(1, 151);
   * console.log(random); // Exemple de sortie : 42
   */
  getRandomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  /**
   * Traduit une couleur de l'anglais vers le francais.
   *
   * @param {string} color - La couleur en anglais.
   * @returns {string} La couleur traduite en francais.
   *
   * @exemple
   * const color = utilsService.translateColor('red');
   * console.log(color); // "Rouge"
   */
  translateColor(color: string): string {
    const colorTranslation: { [key: string]: string } = {
      black: "Noir", blue: "Bleu", brown: "Marron",
      gray: "Gris", green: "Vert", pink: "Rose",
      purple: "Violet", red: "Rouge", white: "Blanc",
      yellow: "Jaune"
    }

    return colorTranslation[color] || color;
  }

  /**
   * Traduit l'habitat d'un pokemon de l'anglais vers le francais.
   *
   * @param {string} habitat - L'habitat en anglais.
   * @returns {string} L'habitat traduite en francais.
   *
   * @exemple
   * const habitat = utilsService.translateHabitat('cave');
   * console.log(habitat); // "Grottes"
   */
  translateHabitat(habitat: string): string {
    const habitatTranslation: { [key:string]: string } = {
      cave: "Grottes", forest: "Forets", grassland: "Champs",
      mountain: "Montagne", rare: "Rare", "rough-terrain": "Milieux Hostiles",
      sea: "Mers", urban: "Urbains", "water-edge": "Marécages"
    }

    return habitatTranslation[habitat] || habitat
  }
}
