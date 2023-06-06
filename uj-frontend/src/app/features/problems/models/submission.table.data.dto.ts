import {ProblemMinimalDto} from "./problem.minimal.dto";
import {LanguageDto} from "../../../core/models/language.dto";
import {VerdictTypeDto} from "../../../core/models/verdict.type.dto";

export interface SubmissionTableDataDto{
  submissionId: number;
  problem: ProblemMinimalDto;
  language: LanguageDto;
  submissionDate: Date;
  verdict: VerdictTypeDto;
}
