import {Component, OnInit} from '@angular/core';
import {KeycloakUserDto} from "../../models/keycloak-user.dto";
import {CampusMajorDto} from "../../models/campus-major.dto";
import {KeycloakService} from "keycloak-angular";
import {UjUsersService} from "../../../../core/services/uj-users.service";

@Component({
  selector: 'app-account-profile',
  templateUrl: './account-profile.component.html',
  styleUrls: ['./account-profile.component.css']
})
export class AccountProfileComponent implements OnInit{
  userId: string;
  keycloakUserDto: KeycloakUserDto | null = null;
  campusMajorDto: CampusMajorDto | null = null;

  constructor(
    private keycloakService: KeycloakService,
    private ujUsersService: UjUsersService,
  ) {
    this.userId = this.keycloakService.getKeycloakInstance().subject || '';
  }

  ngOnInit(): void {
    this.ujUsersService.getUser(this.userId).subscribe({
      next: (data) => {
        // console.log(data);
        this.keycloakUserDto = data.data;
      },
      error: (error) => {
        console.log(error);
      },
    });
    this.ujUsersService.getCampusMajorByUserId(this.userId).subscribe({
      next: (data) => {
        this.campusMajorDto = data.data;
        // console.log(data);
      },
      error: (error) => {
        console.log(error);
      }
    })
  }
}
