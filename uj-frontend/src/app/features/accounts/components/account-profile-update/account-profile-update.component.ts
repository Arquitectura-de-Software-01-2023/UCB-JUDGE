import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UjUsersService} from "../../../../core/services/uj-users.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {KeycloakUserDto} from "../../models/keycloak-user.dto";

@Component({
  selector: 'app-account-profile-update',
  templateUrl: './account-profile-update.component.html',
  styleUrls: ['./account-profile-update.component.css']
})
export class AccountProfileUpdateComponent implements OnInit {
  @Input() userId: string = '';
  updateForm: FormGroup;
  keycloakUserDto: KeycloakUserDto | null = null;
  constructor(
    private formBuilder: FormBuilder,
    private ujUsersService: UjUsersService,
    private snackBar: MatSnackBar
  ) {
    this.updateForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {
    this.ujUsersService.getUser(this.userId).subscribe({
      next: (data) => {
        // console.log(data);
        this.keycloakUserDto = data.data;
        this.updateForm.patchValue({
          firstName: this.keycloakUserDto?.firstName,
          lastName: this.keycloakUserDto?.lastName,
          email: this.keycloakUserDto?.email,
        });
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  showMessage(message: string) {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000, // Duration in milliseconds
    });
  }

  onSubmit() {
    if (this.updateForm.valid) {
      const formData = this.updateForm.value;
      console.log(formData);
      this.ujUsersService.updateUser(formData).subscribe({
        next: (data) => {
          // console.log(data);
          this.showMessage('Perfil actualizado correctamente');
        },
        error: ({error}) => {
          console.log(error.message);
          this.showMessage(`Error: ${error.message}`);
        },
      });
    }
  }

  onCancel(){
    this.updateForm.patchValue({
      firstName: this.keycloakUserDto?.firstName,
      lastName: this.keycloakUserDto?.lastName,
      email: this.keycloakUserDto?.email,
    });
  }

}
