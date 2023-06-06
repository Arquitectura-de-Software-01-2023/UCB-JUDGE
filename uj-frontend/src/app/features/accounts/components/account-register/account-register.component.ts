import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CampusDto} from "../../models/campus.dto";
import {CampusMajorDto} from "../../models/campus-major.dto";
import {UjUsersService} from "../../../../core/services/uj-users.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import { Router } from '@angular/router';

@Component({
  selector: 'app-account-register',
  templateUrl: './account-register.component.html',
  styleUrls: ['./account-register.component.css']
})
export class AccountRegisterComponent implements OnInit {
  registerForm: FormGroup;
  campuses: CampusDto[] = [];
  campusesMajors: CampusMajorDto[] = [];
  selectedCampusMajorId: number = 0;
  hidePassword: boolean = true;
  hideConfirmPassword: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private ujUsersService: UjUsersService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
      campus: ['', Validators.required],
      major: ['', Validators.required],
    });


  }

  ngOnInit(): void {
    this.ujUsersService.getCampuses().subscribe({
      next: (data) => {
        // console.log(data);
        this.campuses = data.data!;
        this.registerForm.patchValue({
          campus: this.campuses[0].campusId,
        });
      },
      error: (error) => {
        console.log(error);
      },
    });
    this.ujUsersService.getMajorsByCampusId(1).subscribe({
      next: (data) => {
        // console.log(data);
        this.campusesMajors = data.data!;
        this.registerForm.patchValue({
          major: this.campusesMajors[0].campusMajorId,
        });
        this.selectedCampusMajorId = this.campusesMajors[0].campusMajorId;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  onCampusChange(event: any) {
    // console.log(event.value);
    // console.log('event :' + event.value);
    this.ujUsersService.getMajorsByCampusId(event.value).subscribe({
      next: (data) => {
        this.campusesMajors = data.data!;
        this.registerForm.patchValue({
          major: this.campusesMajors[0].campusMajorId,
        });
        // console.log(data);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  onMajorChange(event: any) {
    // console.log('event :' + event);
    // console.log(event.value);
    this.selectedCampusMajorId = event.value;
    // console.log(this.selectedCampusMajorId);
  }

  showMessage(message: string) {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000, // Duration in milliseconds
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      if (this.registerForm.value.password !== this.registerForm.value.confirmPassword) {
        this.showMessage('Error: Las contraseñas no coinciden');
        return;
      }
      const formData = this.registerForm.value;
      formData.campusMajorId = this.selectedCampusMajorId;
      console.log(formData);
      this.ujUsersService.createStudent(formData).subscribe({
        next: (data) => {
          console.log(data);
          this.showMessage('Usuario creado correctamente');
          setTimeout(() => {
            this.router.navigate(['/problems']).then(r => console.log(r));
          }, 1000);
        },
        error: ({error}) => {
          console.log(error.message);
          this.showMessage(`Error: ${error.message} `);
        }
      });
    }
  }
}
