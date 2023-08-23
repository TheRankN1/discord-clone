import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: 'register.component.html',
  styleUrls: ['register.component.scss']
})
export class RegisterComponent {
  public username: string = '';
  public password: string = '';
  public usernameTakenError: boolean = false;
  public userCreated: boolean = false;

  constructor(
    private _router: Router,
    private _authService: AuthService
  ) {}

  public navigateToLogin(): void {
    this._router.navigate(['/auth/login']);
  }

  public register(): void {
    if (!this._authService.addUser(this.username, this.password)) {
      this._authService.addUser(this.username, this.password);
      this.userCreated = true;
      this.usernameTakenError = false;
      this._router.navigate(['/auth/login']);
    } else {
      this.usernameTakenError = true;
      this.userCreated = false;
    }
  }
}