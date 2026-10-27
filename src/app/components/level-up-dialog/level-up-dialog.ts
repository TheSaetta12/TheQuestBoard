import { Component, inject } from '@angular/core';
import { Ui } from '../../services/ui';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-level-up-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './level-up-dialog.html',
  styleUrl: './level-up-dialog.scss',
})
export class LevelUpDialog {
  /** 
   * Iniezione del servizio Ui per gestire l'apertura/chiusura 
   * e leggere i dati (nome e livello) dell'eroe.
   */
  public ui = inject(Ui);
}