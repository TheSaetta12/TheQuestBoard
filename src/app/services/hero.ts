import { Injectable, signal, computed, inject, effect } from '@angular/core';
import { Ui } from './ui';

export interface HeroState {
  name: string;
  description: string;
  avatarUrl: string;
  level: number;
  currentXp: number;
  xpToNextLevel: number;
  questsDone: number;
  trophies: string[];
  recentActivity: string[];
}

// Nomi dei trofei basati sul livello raggiunto
const LEVEL_TITLES: { [key: number]: string } = {
  2: "Novizio del Codice",
  5: "Script Kiddo",
  10: "Architetto di Sistemi",
  20: "Leggenda del Debug",
  50: "Semi-Dio del Compilatore"
};

// Nomi dei trofei basati sulle missioni completate
const QUEST_MILESTONES: { [key: number]: string } = {
  1: "Primo Passo nell'Ignoto",
  10: "Cacciatore di Ticket",
  25: "Eroe della Bacheca",
  50: "Instancabile",
  100: "Collezionista di Taglie"
};

@Injectable({ providedIn: 'root' })
export class Hero {
  private ui = inject(Ui);
  private readonly STORAGE_KEY = 'dev_quest_hero_data';

  /**
   * Logica di inizializzazione:
   * Tenta di recuperare i dati dal localStorage. Se non esistono,
   * ritorna un oggetto con i valori di default.
   */
  private loadInitialState(): HeroState {
    const savedData = localStorage.getItem(this.STORAGE_KEY);
    if (savedData) {
      try {
        return JSON.parse(savedData);
      } catch (e) {
        console.error("Errore nel caricamento del salvataggio:", e);
      }
    }

    // Valori di default per un nuovo giocatore
    return {
      name: 'Felix',
      description: 'Un coraggioso avventuriero in cerca di bug.',
      avatarUrl: '',
      level: 1,
      currentXp: 0,
      xpToNextLevel: 1000,
      questsDone: 0,
      trophies: [],
      recentActivity: ['Inizio di una nuova leggenda!']
    };
  }

  // Il segnale principale dello stato
  state = signal<HeroState>(this.loadInitialState());

  // Segnale calcolato per la percentuale della barra XP
  xpPercentage = computed(() => {
    const s = this.state();
    const percent = (s.currentXp / s.xpToNextLevel) * 100;
    return Math.min(percent, 100); // Impedisce alla barra di uscire fuori dai bordi
  });

  constructor() {
    /**
     * L'EFFECT è il cuore del salvataggio automatico.
     * Ogni volta che uno dei valori dentro 'this.state()' cambia,
     * questa funzione viene eseguita salvando tutto su disco.
     */
    effect(() => {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.state()));
    });
  }

  /**
   * Aggiorna i dati anagrafici del profilo
   */
  updateProfile(newName: string, newBio: string, newAvatar: string) {
    this.state.update(s => ({
      ...s,
      name: newName,
      description: newBio,
      avatarUrl: newAvatar
    }));
  }

  /**
   * Gestisce l'esperienza, il level up e le statistiche
   */
  gainXp(amount: number) {
    this.state.update(s => {
      let { currentXp, level, xpToNextLevel, name, trophies, recentActivity } = s;

      currentXp += amount;

      // Logica di Level Up
      if (currentXp >= xpToNextLevel) {

        level += 1;
        currentXp -= xpToNextLevel;
        xpToNextLevel = Math.floor(xpToNextLevel * 1.2);

        // --- ASSEGNAZIONE TROFEO DI LIVELLO ---
        const title = LEVEL_TITLES[level] || `Grado ${level}`;
        const newTrophy = `⭐ ${title}`;

        trophies = [...trophies, newTrophy];
        recentActivity = [`Sei diventato un ${title}!`, ...recentActivity].slice(0, 5);

        // Notifica visiva di Level Up
        this.ui.openLevelUp(name, level);
      }

      return {
        ...s,
        currentXp,
        level,
        xpToNextLevel,
        trophies,
        recentActivity
      };
    });
  }

  completeQuest() {
    this.state.update(s => {
      debugger
      const newQuestsDone = s.questsDone + 1;
      let updatedTrophies = [...s.trophies];
      let updatedActivity = [...s.recentActivity];

      // Controlliamo se questo numero di missioni sblocca un trofeo
      if (QUEST_MILESTONES[newQuestsDone]) {
        const trophyTitle = QUEST_MILESTONES[newQuestsDone];
        const trophyLabel = `📜 ${trophyTitle}`;

        // Evitiamo duplicati se necessario
        if (!updatedTrophies.includes(trophyLabel)) {
          updatedTrophies.push(trophyLabel);
          updatedActivity = [`Nuovo Trofeo: ${trophyTitle}!`, ...updatedActivity];
        }
      }

      return {
        ...s,
        questsDone: newQuestsDone,
        trophies: updatedTrophies,
        recentActivity: updatedActivity.slice(0, 5)
      };
    });
  }

  resetHero() {
    const defaultState: HeroState = {
      name: 'Cadetto',
      level: 1,
      currentXp: 0,
      xpToNextLevel: 1000,
      questsDone: 0,
      recentActivity: ['Sincronizzazione neurale effettuata. Benvenuto.'],
      trophies: [],
      description: '',
      avatarUrl: ''
    };

    this.state.set(defaultState);
    // Il salvataggio su localStorage avverrà automaticamente grazie all'effect esistente
  }

  /**
   * Aggiunge un trofeo specifico alla collezione
   */
  addTrophy(trophyIcon: string, reason: string) {
    this.state.update(s => ({
      ...s,
      trophies: [...s.trophies, trophyIcon],
      recentActivity: [reason, ...s.recentActivity].slice(0, 5)
    }));
  }
}