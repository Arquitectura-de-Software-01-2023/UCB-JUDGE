import {VerdictTypeDto} from "../../../core/models/verdict.type.dto";
import {LanguageDto} from "../../../core/models/language.dto";
import {ProblemMinimalDto} from "./problem.minimal.dto";
import {TestcaseSubmissionDto} from "./testcase.submission.dto";

export interface SubmissionDto {
  submissionId: number;
  problem: ProblemMinimalDto;
  language: LanguageDto;
  sourceCode: string;
  submissionDate: Date;
  verdict: VerdictTypeDto;
  testcases: TestcaseSubmissionDto[];
}