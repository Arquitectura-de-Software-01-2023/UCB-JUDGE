import {TestcaseStatusDto} from "./testcase.status.dto";

export interface SubmissionStatusDto {
  submissionId: number;
  testcases: TestcaseStatusDto[];
  isDone: boolean;
  testcaseCount: number;
}