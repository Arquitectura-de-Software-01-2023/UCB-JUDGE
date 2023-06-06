import {VerdictTypeDto} from "../../../core/models/verdict.type.dto";

export interface TestcaseStatusDto {
  testcaseId: number;
  verdictType: VerdictTypeDto;
  memory: number;
  time: number;
}