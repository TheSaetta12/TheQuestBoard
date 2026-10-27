import { Component, inject, output } from '@angular/core';
import { Ui } from '../../services/ui';

@Component({
  selector: 'app-reset-dialog',
  imports: [],
  templateUrl: './reset-dialog.html',
  styleUrl: './reset-dialog.scss',
})
export class ResetDialog {
  ui = inject(Ui);
  onConfirm = output<void>();
}
