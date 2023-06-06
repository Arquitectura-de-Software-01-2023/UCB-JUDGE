export interface SubmissionReqDto {
  problemId: number;
  contestId: number | null;
  sourceCode: string;
  languageId: number;
}