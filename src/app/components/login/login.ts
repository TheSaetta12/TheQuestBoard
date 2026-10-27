import { Component, output } from '@angular/core';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  onLogin = output<'PLAYER' | 'GIVER'>();

  selectRole(role: 'PLAYER' | 'GIVER') {
    this.onLogin.emit(role);
  }
}
