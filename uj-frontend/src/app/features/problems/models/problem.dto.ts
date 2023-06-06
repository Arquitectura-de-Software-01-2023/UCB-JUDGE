import {TagDto} from "../../../core/models/tag.dto";
import {LanguageDto} from "../../../core/models/language.dto";

export interface ProblemDto {
  problemId: number;
  title: string;
  description: string;
  sampleInputs: string[];
  sampleOutputs: string[];
  timeLimit: number;
  memoryLimit: number;
  tags: TagDto[];
  admittedLanguages: LanguageDto[];
}