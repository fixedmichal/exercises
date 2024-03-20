import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SignupData } from '../../models/auth-data.type';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignupFormComponent implements OnInit {
  hidePassword = true;

  signupForm = new FormGroup({
    displayName: new FormControl('', { validators: [Validators.required], nonNullable: true }),
    email: new FormControl('', { validators: [Validators.required, Validators.email], nonNullable: true }),
    password: new FormControl('', { validators: [Validators.required], nonNullable: true }),
  });

  @Output() formSubmitted = new EventEmitter<SignupData>();

  ngOnInit(): void {
    this.signupForm.statusChanges.subscribe((data) => console.log(data, this.signupForm));
  }

  getEmailControlError(): string {
    if (this.signupForm.controls.email.hasError('required')) {
      return 'Email address is required';
    }

    return this.signupForm.controls.email.hasError('email') ? 'Not a valid email' : '';
  }

  getNickControlError(): string {
    if (this.signupForm.controls.displayName.hasError('required')) {
      return 'Nickname  is required';
    }

    return this.signupForm.controls.displayName.hasError('email') ? 'Not a valid email' : '';
  }

  onCreateAccountClick(): void {
    if (this.signupForm.valid) {

      const signupData: SignupData = {
        displayName: this.signupForm.controls.displayName.value,
        email: this.signupForm.controls.email.value,
        password: this.signupForm.controls.password.value,
      };

      this.formSubmitted.emit(signupData);
    }
  }
}
