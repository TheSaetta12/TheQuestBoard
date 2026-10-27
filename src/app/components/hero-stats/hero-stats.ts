import { Component, inject, input } from '@angular/core';
import { Hero } from '../../services/hero';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero-stats',
  imports: [CommonModule],
  templateUrl: './hero-stats.html',
  styleUrl: './hero-stats.scss',
})
export class HeroStats {
  public hero = inject(Hero);
  
  /** 
   * Riceviamo il ruolo dal componente padre (AppComponent) 
   * per cambiare le etichette dell'interfaccia 
   */
  userRole = input<'PLAYER' | 'GIVER' | null>(null);
}