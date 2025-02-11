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
}
