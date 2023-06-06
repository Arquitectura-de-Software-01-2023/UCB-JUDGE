import {Component, OnInit} from '@angular/core';
import {ProblemTableDataDto} from "../../../problems/models/problem.table.data.dto";
import {UjProblemsService} from "../../../../core/services/uj-problems.service";
import {Router} from "@angular/router";
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit{
  problems: ProblemTableDataDto[] = [];
  page: number = 0;
  size: number = 10;
  total: number = 0;

  constructor(
    private ujProblemsService: UjProblemsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadProblems();
  }

  loadProblems() {
    this.ujProblemsService.getAllPublicProblems(this.page, this.size).subscribe({
      next: (response) => {
        this.problems = response.data!.content;
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

  goToProblem(id: number) {
    this.router.navigate([`/problems/${id}`], {
      state: {
        problemId: id,
        contestId: null
      }
    }).then(r => console.log(r));
  }
}
