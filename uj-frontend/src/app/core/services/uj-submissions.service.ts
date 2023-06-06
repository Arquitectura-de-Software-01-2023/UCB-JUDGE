import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {SubmissionReqDto} from "../../features/problems/models/submission.req.dto";
import {ResponseDto} from "../models/response.dto";
import {Observable} from "rxjs";
import {SubmissionStatusDto} from "../../features/problems/models/submission.status.dto";
import {SubmissionDto} from "../../features/problems/models/submission.dto";
import {PageDto} from "../models/page.dto";
import {ProblemTableDataDto} from "../../features/problems/models/problem.table.data.dto";
import {SubmissionTableDataDto} from "../../features/problems/models/submission.table.data.dto";

@Injectable({
  providedIn: 'root'
})
export class UjSubmissionsService {
  baseUrl: string = `${environment.API_URL}/uj-submissions/api/v1/submissions`;

  constructor(
    private http: HttpClient
  ) { }

  public createSubmission(submission: SubmissionReqDto): Observable<ResponseDto<number>> {
    return this.http.post<ResponseDto<number>>(`${this.baseUrl}`, submission);
  }

  public getSubmissionStatusById(id: number): Observable<ResponseDto<SubmissionStatusDto>> {
    return this.http.get<ResponseDto<SubmissionStatusDto>>(`${this.baseUrl}/${id}/status`);
  }

  public getSubmissionById(id: number): Observable<ResponseDto<SubmissionDto>> {
    return this.http.get<ResponseDto<SubmissionDto>>(`${this.baseUrl}/${id}`);
  }

  public getAllSubmissions(page: number = 0, size: number = 10): Observable<ResponseDto<PageDto<SubmissionTableDataDto>>>{
    return this.http.get<ResponseDto<PageDto<SubmissionTableDataDto>>>(`${this.baseUrl}?page=${page}&size=${size}`);
  }
}
