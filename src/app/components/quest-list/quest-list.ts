import { Component, inject, input } from '@angular/core';
import { Quest } from '../../services/quest';
import { QuestCard } from "../quest-card/quest-card";

@Component({
  selector: 'app-quest-list',
  imports: [QuestCard],
  templateUrl: './quest-list.html',
  styleUrl: './quest-list.scss',
})
export class QuestList {
  /**
   * Iniezione del servizio Quest per accedere al segnale list()
   */
  public questService = inject(Quest);

  /**
   * Riceve il ruolo dell'utente (PLAYER o GIVER) dal componente superiore (QuestBoard).
   * Questo valore viene passato a ogni singola QuestCard.
   */
  mode = input.required<'PLAYER' | 'GIVER'>();
}
