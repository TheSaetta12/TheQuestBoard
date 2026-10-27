export type Difficulty = 'EASY' | 'NORMAL' | 'HARD' | 'BOSS';
export type QuestStatus = 'OPEN' | 'IN_PROGRESS' | 'COMPLETED';

export interface Quest {
  id: string;
  title: string;          // es. "Il PC fa rumori strani"
  description: string;    // I dettagli dell'amico in panico
  issuer: string;         // Il nome del tuo amico (il Quest Giver)
  difficulty: Difficulty; // La difficoltà determina gli XP!
  status: QuestStatus;
  xpReward: number;       // Punti esperienza guadagnati al completamento
  createdAt: Date;
}