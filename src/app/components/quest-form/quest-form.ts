import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { Quest } from '../../services/quest';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-quest-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './quest-form.html',
  styleUrl: './quest-form.scss',
})
export class QuestForm {
  private questService = inject(Quest);

  // Stato locale del form usando un Signal
  formData = signal({
    title: '',
    description: '',
    difficulty: 'NORMAL' as 'EASY' | 'NORMAL' | 'HARD' | 'BOSS'
  });

  /**
   * Calcola dinamicamente il premio XP in base alla difficoltà selezionata
   */
  calculateXp(): number {
    const rewards = {
      EASY: 50,
      NORMAL: 150,
      HARD: 400,
      BOSS: 1200
    };
    return rewards[this.formData().difficulty];
  }

  /**
   * Gestisce l'invio del form
   */
  onCreateQuest(event: Event) {
    event.preventDefault();
    const data = this.formData();

    if (!data.title.trim()) return;

    // Inviamo i dati al servizio
    this.questService.addQuest({
      title: data.title,
      description: data.description,
      difficulty: data.difficulty,
      xpReward: this.calculateXp()
    });

    // Resettiamo il form dopo l'invio
    this.formData.set({
      title: '',
      description: '',
      difficulty: 'NORMAL'
    });
  }
}