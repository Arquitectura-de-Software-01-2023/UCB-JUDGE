import {Component, OnInit} from '@angular/core';
import {UjSubmissionsService} from "../../../../core/services/uj-submissions.service";
import {Router} from "@angular/router";
import {PageEvent} from "@angular/material/paginator";
import {SubmissionTableDataDto} from "../../../problems/models/submission.table.data.dto";

@Component({
  selector: 'app-account-profile-submissions',
  templateUrl: './account-profile-submissions.component.html',
  styleUrls: ['./account-profile-submissions.component.css']
})
export class AccountProfileSubmissionsComponent implements OnInit{
  submissions: SubmissionTableDataDto[] = [];
  page: number = 0;
  size: number = 10;
  total: number = 0;

  constructor(
    private ujSubmissionsService: UjSubmissionsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadProblems();
  }

  loadProblems() {
    this.ujSubmissionsService.getAllSubmissions(this.page, this.size).subscribe({
      next: (response) => {
        this.submissions= response.data!.content;
        this.total = response.data!.totalElements;
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  onPageChange(pageEvent: PageEvent) {
    this.page = pageEvent.pageIndex;
    this.size = pageEvent.pageSize
    this.loadProblems();
  }

  goToSubmission(id: number) {
    this.router.navigate([`/submissions/${id}`], {
      state: {
        problemId: id,
        contestId: null
      }
    }).then(r => console.log(r));
  }
}
