import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {environment} from "../../../../../environments/environment";
import {KeycloakService} from "keycloak-angular";
import {UjUsersService} from "../../../../core/services/uj-users.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-account-profile-delete',
  templateUrl: './account-profile-delete.component.html',
  styleUrls: ['./account-profile-delete.component.css']
})
export class AccountProfileDeleteComponent {
  deleteForm: FormGroup;
  homeUrl: string = `${environment.ANGULAR_URL}`;
  hideCurrentPassword: boolean = true;
  deleteMessage: string = 'Deseo eliminar permanentemente mi cuenta de UCB Judge';
  constructor(
    public keycloakService: KeycloakService,
    private formBuilder: FormBuilder,
    private ujUsersService: UjUsersService,
    private snackBar: MatSnackBar
  ) {
    this.deleteForm = this.formBuilder.group({
      delete: ['', Validators.required],
      currentPassword: ['', Validators.required]
    });
  }

  showMessage(message: string) {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000, // Duration in milliseconds
    });
  }

  onSubmit() {
    if (this.deleteForm.valid) {
      if (this.deleteForm.value.delete !== this.deleteMessage) {
        this.showMessage('Error: Debes escribir el mensaje exacto');
        return;
      }
      const formData = this.deleteForm.value;
      this.ujUsersService.deleteUser(formData).subscribe({
        next: (data) => {
          // console.log(data);
          this.showMessage('Cuenta eliminada correctamente');
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
    this.deleteForm.reset();
  }
}
