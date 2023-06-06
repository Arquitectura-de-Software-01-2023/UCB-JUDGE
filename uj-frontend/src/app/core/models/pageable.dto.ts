import { SortDto } from "./sort.dto";

export interface PageableDto {
  sort: SortDto;
  offset: number;
  pageNumber: number;
  pageSize: number;
  unpaged: boolean;
  paged: boolean;
}