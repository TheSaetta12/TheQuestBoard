import { Injectable, signal } from "@angular/core";

export interface LevelUpData {
  name: string;
  level: number;
}

@Injectable({ providedIn: 'root' })
export class Ui {
  // --- LOGICA LEVEL UP ---
  isLevelUpOpen = signal<boolean>(false);
  
  // Assicurati che il tuo componente LevelUpDialog usi "levelUpData()" per leggere i dati
  levelUpData = signal<LevelUpData>({
    name: '',
    level: 1
  });

  openLevelUp(name: string, level: number) {
    this.levelUpData.set({ name, level });
    this.isLevelUpOpen.set(true);
    
    console.log(`🎉 Level Up per ${name}: raggiunto livello ${level}`);
  }

  closeLevelUp() {
    this.isLevelUpOpen.set(false);
  }

  // --- LOGICA RESET GAME ---
  isResetDialogOpen = signal<boolean>(false);

  openResetConfirm() { 
    this.isResetDialogOpen.set(true); 
  }
  
  closeResetConfirm() { 
    this.isResetDialogOpen.set(false); 
  }
}