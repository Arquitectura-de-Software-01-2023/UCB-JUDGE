import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UjUsersService} from "../../../../core/services/uj-users.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import { KeycloakService } from 'keycloak-angular';
import {environment} from "../../../../../environments/environment";
@Component({
  selector: 'app-account-profile-change-password',
  templateUrl: './account-profile-change-password.component.html',
  styleUrls: ['./account-profile-change-password.component.css']
})
export class AccountProfileChangePasswordComponent {
  updatePasswordForm: FormGroup;
  homeUrl: string = `${environment.ANGULAR_URL}`;
  hideCurrentPassword: boolean = true;
  hidePassword: boolean = true;
  hideConfirmPassword: boolean = true;
  constructor(
    public keycloakService: KeycloakService,
    private formBuilder: FormBuilder,
    private ujUsersService: UjUsersService,
    private snackBar: MatSnackBar
) {
    this.updatePasswordForm = this.formBuilder.group({
      currentPassword: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  showMessage(message: string) {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000, // Duration in milliseconds
    });
  }

  onSubmit() {
    if (this.updatePasswordForm.valid) {
      if (this.updatePasswordForm.value.password !== this.updatePasswordForm.value.confirmPassword) {
        this.showMessage('Error: Las contraseñas no coinciden');
        return;
      }
      const formData = this.updatePasswordForm.value;
      console.log(formData);
      this.ujUsersService.updatePassword(formData).subscribe({
        next: (data) => {
          // console.log(data);
          this.showMessage('Contraseña actualizada correctamente');
          setTimeout(() => {
            this.keycloakService.logout(this.homeUrl).then(r => console.log(r));
          }, 1000);
        },
        error: ({error}) => {
          console.log(error.message);
          this.showMessage(`Error: ${error.message}`);
        },
      });
    }
  }

  onCancel(){
    this.updatePasswordForm.reset();
  }
}
