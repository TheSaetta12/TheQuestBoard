import { Injectable, effect, inject, signal } from "@angular/core";
import { Hero } from "./hero";

export interface QuestData {
  id: string;
  title: string;
  description: string;
  xpReward: number;
  difficulty: 'EASY' | 'NORMAL' | 'HARD' | 'BOSS';
  completed: boolean;
}

@Injectable({ providedIn: 'root' })
export class Quest {
  private hero = inject(Hero);
  private readonly STORAGE_KEY = 'dev_quest_list';

  /**
   * Inizializzazione: tenta di caricare le missioni salvate.
   * Se non trova nulla, restituisce un array vuoto.
   */
  private loadInitialQuests(): QuestData[] {
    const saved = localStorage.getItem(this.STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Errore nel recupero delle missioni dal localStorage", e);
        return [];
      }
    }
    return [];
  }

  // Segnale che contiene la lista attuale delle missioni
  list = signal<QuestData[]>(this.loadInitialQuests());

  constructor() {
    /**
     * Ogni volta che il segnale 'list' cambia (aggiunta o completamento),
     * questo effetto salva automaticamente lo stato nel browser.
     */
    effect(() => {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.list()));
    });
  }

  /**
   * Metodo per aggiungere una nuova missione (Azione del Quest Giver)
   */
  addQuest(newQuest: Omit<QuestData, 'id' | 'completed'>) {
    const quest: QuestData = {
      ...newQuest,
      id: crypto.randomUUID(), // Genera un ID unico
      completed: false
    };

    // Aggiorna la lista (scatena l'effetto di salvataggio)
    this.list.update(currentQuests => [quest, ...currentQuests]);

    // Aggiorna le statistiche dell'Hero (missioni create/attività)
    this.hero.state.update(s => ({
      ...s,
      // questsDone: s.questsDone + 1,
      recentActivity: [`📢 Nuova missione creata: ${quest.title}`, ...s.recentActivity].slice(0, 5)
    }));
  }

  /**
   * Metodo per completare una missione (Azione dell'Avventuriero)
   */
  completeQuest(id: string) {
    let questTitle = '';

    this.list.update(quests => {
      return quests.map(q => {
        if (q.id === id && !q.completed) {
          questTitle = q.title;
          
          // 1. Assegna XP all'eroe tramite il suo servizio
          this.hero.gainXp(q.xpReward);
          
          // 2. Segna la missione come completata
          this.hero.completeQuest();
          return { ...q, completed: true };
        }
        return q;
      });
    });

    // Se la missione è stata trovata e completata, aggiorna i log dell'eroe
    if (questTitle) {
      this.hero.state.update(s => ({
        ...s,
        questsDone: s.questsDone + 1,
        recentActivity: [`✅ Completata: ${questTitle}`, ...s.recentActivity].slice(0, 5)
      }));
    }
  }

  /**
   * Utility per svuotare la bacheca (reset)
   */
  clearAllQuests() {
    this.list.set([]);
    localStorage.removeItem(this.STORAGE_KEY);
  }

}