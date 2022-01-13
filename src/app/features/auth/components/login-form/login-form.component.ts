import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'ngbytes-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
})
export class LoginFormComponent implements OnInit {
  @Output() formData: EventEmitter<{
    email: string;
    password: string;
  }> = new EventEmitter();

  private errorMessageSub: Subscription;
  errorMsg = '';
  form: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.errorMessageSub = this.authService
      .getErrorMsg()
      .subscribe((message) => {
        this.errorMsg = message;
        console.log(
          '🚀 ~ file: login-form.component.ts ~ line 25 ~ LoginFormComponent ~ .subscribe ~ message',
          { message, type: typeof message, tm: this.errorMsg }
        );
      });
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }

  onSubmit() {
    if (
      this.email?.status === 'INVALID' ||
      this.password?.status === 'INVALID'
    ) {
      return;
    }
    this.formData.emit(this.form.value);
  }

  ngOnDestroy() {
    this.errorMessageSub.unsubscribe();
  }
}
