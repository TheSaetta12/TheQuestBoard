import { Component, effect, inject, signal } from "@angular/core";
import { HeroProfile } from "./components/hero-profile/hero-profile";
import { HeroStats } from "./components/hero-stats/hero-stats";
import { QuestBoard } from "./components/quest-board/quest-board";
import { Hero } from "./services/hero";
import { Quest } from "./services/quest";
import { Login } from "./components/login/login";
import { LevelUpDialog } from "./components/level-up-dialog/level-up-dialog";
import { Ui } from "./services/ui";
import { ResetDialog } from "./components/reset-dialog/reset-dialog";
import { CommonModule } from "@angular/common";

@Component({
  selector: 'app-root',
  standalone: true,
  // Importiamo i componenti necessari per il template
  imports: [
    HeroStats,
    HeroProfile,
    QuestBoard,
    Login,
    LevelUpDialog,
    CommonModule,
    ResetDialog
],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  public hero = inject(Hero);
  public quest = inject(Quest);
  public ui = inject(Ui);

  private readonly ROLE_KEY = 'dev_quest_user_role';

  // Inizializzazione dal localStorage
  userRole = signal<'PLAYER' | 'GIVER' | null>(
    localStorage.getItem(this.ROLE_KEY) as 'PLAYER' | 'GIVER' | null
  );

  constructor() {
    // Effetto per rendere persistente la scelta del ruolo
    effect(() => {
      const role = this.userRole();
      if (role) {
        localStorage.setItem(this.ROLE_KEY, role);
      } else {
        localStorage.removeItem(this.ROLE_KEY);
      }
    });
  }

  handleLogin(role: 'PLAYER' | 'GIVER') {
    this.userRole.set(role);
  }

  logout() {
    this.userRole.set(null);
  }

  fullReset() {
    // 1. Chiudiamo la modale
    this.ui.closeResetConfirm();

    // 2. Eseguiamo la pulizia
    this.hero.resetHero();
    this.quest.clearAllQuests();
    this.userRole.set(null);
    localStorage.clear();

    // 3. Ricarichiamo per pulire tutto
    window.location.reload();
  }

}