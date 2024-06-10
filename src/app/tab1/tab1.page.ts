import { Component } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  paquet1: { carte: string, valeur: number }[] = [];
  paquet2: { carte: string, valeur: number }[] = [];
  carteJoueur1: { carte: string, valeur: number } | null = null;
  carteJoueur2: { carte: string, valeur: number } | null = null;
  j1Win: boolean = false;
  j2Win: boolean = false;
  couleur: boolean = false;

  constructor() {
    this.initGame();
  }

  melanger() {
    window.location.reload();
  }

  poserCarte() {
    if (this.paquet1.length > 0 && this.paquet2.length > 0) {
      this.carteJoueur1 = this.paquet1.shift()!;
      this.carteJoueur2 = this.paquet2.shift()!;
      this.comparerCartes();
  
      if (this.paquet1.length === 0) {
        this.alertGagnant("Joueur 2");
      } else if (this.paquet2.length === 0) {
        this.alertGagnant("Joueur 1");
      }
    }
  }
  
  alertGagnant(gagnant: string) {
    alert("Le joueur gagnant est : " + gagnant);
  }

  comparerCartes() {
    if (this.carteJoueur1 && this.carteJoueur2) {
      const valeur1 = this.carteJoueur1.valeur;
      const valeur2 = this.carteJoueur2.valeur;
  
      if (valeur1 > valeur2) {
        this.j1Win = true;
        this.j2Win = false;
        this.paquet1.push(this.carteJoueur1, this.carteJoueur2);
      } else if (valeur1 < valeur2) {
        this.j1Win = false;
        this.j2Win = true;
        this.paquet2.push(this.carteJoueur1, this.carteJoueur2);
      } else {
        this.j1Win = false;
        this.j2Win = false;
      }
    }
  }

  bataille() {
    if (this.paquet1.length > 0 && this.paquet2.length > 0) {
      const nouvelleCarteJoueur1 = this.paquet1.shift()!;
      const nouvelleCarteJoueur2 = this.paquet2.shift()!;
      
      if (this.carteJoueur1 && this.carteJoueur2) {
        this.carteJoueur1 = { carte: this.carteJoueur1.carte + " , " +nouvelleCarteJoueur1.carte, valeur: nouvelleCarteJoueur1.valeur };
        this.carteJoueur2 = { carte: this.carteJoueur2.carte + " , " +nouvelleCarteJoueur2.carte, valeur: nouvelleCarteJoueur2.valeur };
      }
      
      this.comparerCartes();
    }
  }
  
  initGame() {
    class Carte {
      private _valeur: number;
      private _couleur: number;

      static readonly CARREAU: number = 1;
      static readonly PIQUE: number = 2;
      static readonly COEUR: number = 3;
      static readonly TREFLE: number = 4;

      static readonly AS: number = 1;
      static readonly DEUX: number = 2;
      static readonly TROIS: number = 3;
      static readonly QUATRE: number = 4;
      static readonly CINQ: number = 5;
      static readonly SIX: number = 6;
      static readonly SEPT: number = 7;
      static readonly HUIT: number = 8;
      static readonly NEUF: number = 9;
      static readonly DIX: number = 10;
      static readonly VALET: number = 11;
      static readonly DAME: number = 12;
      static readonly ROI: number = 13;

      constructor(couleur: number, valeur: number) {
        this._couleur = couleur;
        this._valeur = valeur;
      }

      get couleur(): number { return this._couleur; }
      get valeur(): number { return this._valeur; }

      public toStringCouleur(): string {
        let result: string;

        switch (this._couleur) {
          case Carte.CARREAU: result = "Carreau"; break;
          case Carte.PIQUE: result = "Pique"; break;
          case Carte.COEUR: result = "Coeur"; break;
          case Carte.TREFLE: result = "Trèfle"; break;
          default: result = "";
        }

        return result;
      }

      public toStringValeur(): string {
        let result: string;

        switch (this._valeur) {
          case Carte.AS: result = "As"; break;
          case Carte.DEUX: result = "Deux"; break;
          case Carte.TROIS: result = "Trois"; break;
          case Carte.QUATRE: result = "Quatre"; break;
          case Carte.CINQ: result = "Cinq"; break;
          case Carte.SIX: result = "Six"; break;
          case Carte.SEPT: result = "Sept"; break;
          case Carte.HUIT: result = "Huit"; break;
          case Carte.NEUF: result = "Neuf"; break;
          case Carte.DIX: result = "Dix"; break;
          case Carte.VALET: result = "Valet"; break;
          case Carte.DAME: result = "Dame"; break;
          case Carte.ROI: result = "Roi"; break;
          default: result = "";
        }

        return result;
      }

      static isValidCouleur(couleur: number): boolean {
        return (Number.isInteger(couleur) && Carte.CARREAU <= couleur && couleur <= Carte.TREFLE);
      }

      static isValidValeur(valeur: number): boolean {
        return Number.isInteger(valeur) && Carte.AS <= valeur && valeur <= Carte.ROI;
      }
    }

    class JeuDeCartes {
      static readonly NB_COULEURS: number = 4;
      static readonly NB_VALEURS: number = 13;
      static readonly NB_CARTES = JeuDeCartes.NB_COULEURS * JeuDeCartes.NB_VALEURS;

      private cartes: Carte[];

      constructor() {
        this.cartes = [];

        for (let i: number = Carte.CARREAU; i <= Carte.TREFLE; i++) {
          for (let j: number = Carte.AS; j <= Carte.ROI; j++) {
            this.cartes.push(new Carte(i, j));
          }
        }
      }

      getCartes(): Carte[] {
        return this.cartes;
      }

      melanger() {
        for (let i = this.cartes.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [this.cartes[i], this.cartes[j]] = [this.cartes[j], this.cartes[i]];
        }
      }

      distribuer(): [Carte[], Carte[]] {
        const mi = Math.floor(this.cartes.length / 2);
        const paquet1 = this.cartes.slice(0, mi);
        const paquet2 = this.cartes.slice(mi);
        return [paquet1, paquet2];
      }
    }

    let jeu = new JeuDeCartes();
    jeu.melanger();

    const [paquet1, paquet2] = jeu.distribuer();

    this.paquet1 = paquet1.map(carte => ({
      carte: carte.toStringValeur() + " de " + carte.toStringCouleur(),
      valeur: carte.valeur
    }));

    this.paquet2 = paquet2.map(carte => ({
      carte: carte.toStringValeur() + " de " + carte.toStringCouleur(),
      valeur: carte.valeur
    }));
  }
}