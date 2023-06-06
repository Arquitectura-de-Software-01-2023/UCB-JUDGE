import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {ResponseDto} from "../models/response.dto";
import {CampusDto} from "../../features/accounts/models/campus.dto";
import {UserDto} from "../../features/accounts/models/user.dto";
import {Observable} from "rxjs";
import {CampusMajorDto} from "../../features/accounts/models/campus-major.dto";
import {KeycloakUserDto} from "../../features/accounts/models/keycloak-user.dto";

@Injectable({
  providedIn: 'root'
})
export class UjUsersService {
  baseUrl: string = `${environment.API_URL}/uj-users/api/v1`;
  constructor(private http: HttpClient) {}

  // Campus services
  public getCampuses() : Observable<ResponseDto<CampusDto[]>> {
    return this.http.get<ResponseDto<CampusDto[]>>(`${this.baseUrl}/campuses`);
  }

  // CampusMajor services

  public getMajorsByCampusId(campusId: number) : Observable<ResponseDto<CampusMajorDto[]>> {
    return this.http.get<ResponseDto<CampusMajorDto[]>>( `${this.baseUrl}/campuses-majors/campus/${campusId}`);
  }


  public getCampusMajorByUserId(userId: String) : Observable<ResponseDto<CampusMajorDto>> {
    return this.http.get<ResponseDto<CampusMajorDto>>(`${this.baseUrl}/campuses-majors/student/${userId}`);
  }

  // User services
  public createStudent(student: UserDto): Observable<ResponseDto<String>> {
    return this.http.post<ResponseDto<String>>(`${this.baseUrl}/users/student`, student);
  }

  // User Profile services
  public getUser(userId: String) {
    return this.http.get<ResponseDto<KeycloakUserDto>>(`${this.baseUrl}/users/profile/${userId}`);
  }

  public updateUser(user: UserDto) {
    return this.http.put<ResponseDto<KeycloakUserDto>>(`${this.baseUrl}/users/profile`, user);
  }

  public deleteUser(user: UserDto) {
    return this.http.request<ResponseDto<KeycloakUserDto>>('delete', `${this.baseUrl}/users/profile`, {body: user});
  }

  public updatePassword(user: UserDto) {
    return this.http.put<ResponseDto<String>>(`${this.baseUrl}/users/profile/password`, user);
  }
}

