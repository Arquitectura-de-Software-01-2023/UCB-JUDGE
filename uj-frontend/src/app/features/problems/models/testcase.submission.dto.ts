import {VerdictTypeDto} from "../../../core/models/verdict.type.dto";

export interface TestcaseSubmissionDto {
  testcaseId: number;
  input: string;
  output: string;
  verdict: VerdictTypeDto;
  time: number;
  memory: number;
}