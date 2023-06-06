import {Component, Input} from '@angular/core';
import {KeycloakUserDto} from "../../models/keycloak-user.dto";
import {CampusMajorDto} from "../../models/campus-major.dto";

@Component({
  selector: 'app-account-profile-info',
  templateUrl: './account-profile-info.component.html',
  styleUrls: ['./account-profile-info.component.css']
})
export class AccountProfileInfoComponent {
  @Input() keycloakUserDto: KeycloakUserDto | null = null;
  @Input() campusMajorDto: CampusMajorDto | null = null;
}
