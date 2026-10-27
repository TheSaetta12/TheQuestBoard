import { Component, computed, inject, signal } from '@angular/core';
import { Hero } from '../../services/hero';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-hero-profile',
  imports: [FormsModule],
  templateUrl: './hero-profile.html',
  styleUrl: './hero-profile.scss',
})
export class HeroProfile {
  public hero = inject(Hero);
  
  // Stato interno per la modalità edit
  isEditing = signal(false);

  // Variabili temporanee per il "double binding" (ngModel)
  tempName = '';
  tempBio = '';
  tempAvatar = '';

  /**
   * Determina quale immagine mostrare.
   * Se l'utente ha inserito un URL, usa quello.
   * Altrimenti genera un avatar pixel-art basato sul nome corrente.
   */
  displayAvatar = computed(() => {
    const currentState = this.hero.state();
    return currentState.avatarUrl || 
      `https://api.dicebear.com/7.x/pixel-art/svg?seed=${currentState.name}`;
  });

  toggleEdit() {
    if (!this.isEditing()) {
      // Quando apriamo l'editing, copiamo i dati attuali nel form
      const current = this.hero.state();
      this.tempName = current.name;
      this.tempBio = current.description;
      this.tempAvatar = current.avatarUrl;
    }
    this.isEditing.set(!this.isEditing());
  }

  save() {
    // Invia i dati al servizio Hero
    this.hero.updateProfile(this.tempName, this.tempBio, this.tempAvatar);
    this.isEditing.set(false);
  }
}