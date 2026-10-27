import { Component, computed, inject, input } from '@angular/core';
import { QuestList } from "../quest-list/quest-list";
import { QuestForm } from "../quest-form/quest-form";

@Component({
  selector: 'app-quest-board',
  imports: [QuestList, QuestForm],
  templateUrl: './quest-board.html',
  styleUrl: './quest-board.scss',
})
export class QuestBoard {
  /**
   * Riceve il ruolo dell'utente dal componente genitore (AppComponent).
   * Determina se mostrare il modulo di creazione o solo la lista.
   */
  mode = input.required<'PLAYER' | 'GIVER'>();
}
