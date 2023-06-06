import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UjSubmissionsService} from "../../../../core/services/uj-submissions.service";
import {SubmissionStatusDto} from "../../models/submission.status.dto";
import {SubmissionDto} from "../../models/submission.dto";
import {TestcaseStatusDto} from "../../models/testcase.status.dto";
import {CodeModel} from "@ngstack/code-editor";

@Component({
  selector: 'app-problem-results',
  templateUrl: './problem-results.component.html',
  styleUrls: ['./problem-results.component.css']
})
export class ProblemResultsComponent implements OnInit {
  submissionId: number = -1;
  isDone: boolean = false;
  totalTestcases: number = 0;
  acceptedTestcases: number = 0;

  // code editor
  codeEditorTheme: string = "vs-dark";

  codeModel: CodeModel = {
    language: "",
    uri: "",
    value: ""
  };

  options = {
    contextmenu: true,
    minimap: {
      enabled: true
    }
  }

  submission: SubmissionDto = {
    submissionId: -1,
    problem: {
      problemId: -1,
      title: "",
    },
    language: {
      languageId: -1,
      name: "",
      extension: ""
    },
    sourceCode: "",
    submissionDate: new Date(),
    verdict: {
      verdictTypeId: -1,
      name: ""
    },
    testcases: []
  }
  submissionStatus: SubmissionStatusDto = {
    submissionId: -1,
    testcases: [],
    isDone: false,
    testcaseCount: 0
  }
  submissionInterval: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private ujSubmissionsService: UjSubmissionsService
  ) {
    this.submissionId = this.activatedRoute.snapshot.params['id'];
    this.getSubmission();
    this.getStatus();
  }

  ngOnInit(): void {
    this.submissionInterval = setInterval(() => {
      if(this.isDone) return;
      this.getStatus();
    }, 750);
  }

  getStatus() {
    this.ujSubmissionsService.getSubmissionStatusById(this.submissionId).subscribe({
      next: (response) => {
        this.isDone = response.data!.isDone;
        this.submissionStatus = response.data!;
        if(this.isDone) {
          clearInterval(this.submissionInterval)
          this.getSubmission();
        }
        this.acceptedTestcases = response.data!.testcases.filter((testcase: TestcaseStatusDto) => {
          return testcase.verdictType != undefined && testcase.verdictType.verdictTypeId === 1
        }).length;
        // fill the testcases array with empty objects if testcases are not yet available
        if(this.submissionStatus.testcases.length < this.submissionStatus.testcaseCount) {
          this.submissionStatus.testcases.push(...Array(this.submissionStatus.testcaseCount - this.submissionStatus.testcases.length).fill({}));
        }
        this.totalTestcases = this.submissionStatus.testcaseCount;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  getSubmission() {
    this.ujSubmissionsService.getSubmissionById(this.submissionId).subscribe({
      next: (response) => {
        this.submission = response.data!;
        console.log(this.submission);
        this.codeModel = {
          language: this.submission.language.extension,
          uri: `main.${this.submission.language.extension}`,
          value: this.submission.sourceCode
        }
        console.log(this.codeModel);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
}
