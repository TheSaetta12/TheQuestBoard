import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestData } from '../../services/quest';

@Component({
  selector: 'app-quest-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quest-card.html',
  styleUrl: './quest-card.scss',
})
export class QuestCard {
  /**
   * Dati della missione passati dal genitore (QuestList)
   */
  data = input.required<QuestData>();

  /**
   * Ruolo dell'utente per personalizzare i controlli
   */
  mode = input.required<'PLAYER' | 'GIVER'>();

  /**
   * Evento emesso quando il giocatore preme su "Completa"
   */
  onComplete = output<string>();
}