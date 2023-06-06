import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UjProblemsService} from "../../../../core/services/uj-problems.service";
import {ProblemDto} from "../../models/problem.dto";

@Component({
  selector: 'app-problem-details',
  templateUrl: './problem-details.component.html',
  styleUrls: ['./problem-details.component.css']
})
export class ProblemDetailsComponent implements OnInit {

  problemId: number = -1;
  contestId: number | null = -1;

  problem: ProblemDto = {
    problemId: -1,
    title: "",
    description: "",
    sampleInputs: [],
    sampleOutputs: [],
    timeLimit: 0,
    memoryLimit: 0,
    tags: [],
    admittedLanguages: []
  };

  description: string = "";
  input: string = "";
  output: string = "";
  sampleTestcases: any[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private ujProblemsService: UjProblemsService
  ) {
    this.problemId = this.activatedRoute.snapshot.params['id'];
    this.contestId = this.router.getCurrentNavigation()?.extras.state?.['contestId'];
  }

  ngOnInit(): void {
    this.ujProblemsService.getProblemById(this.problemId).subscribe({
      next: (response) => {
        this.problem = response.data!;
        this.problem.description = this.problem.description.replace("{Input}", "{Description}")
        this.problem.description = this.problem.description.replace("{Output}", "{Description}")
        const [_empty, description, input, output] = this.problem.description.split("\\section{Description}")
        this.description = description.trim();
        this.input = input.trim();
        this.output = output.trim();
        this.sampleTestcases = this.problem.sampleInputs.map((input, index) => {
          return [{
            input: input,
            output: this.problem.sampleOutputs[index]
          }]
        });
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  goToSubmit() {
    this.router.navigate([`/problems/${this.problemId}/submit`], {
      state: {
        problemId: this.problemId,
        contestId: this.contestId,
        admittedLanguages: this.problem.admittedLanguages
      }
    })
  }
}
