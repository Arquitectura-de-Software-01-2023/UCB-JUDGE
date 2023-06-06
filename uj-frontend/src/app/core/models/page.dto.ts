import { SortDto } from "./sort.dto";
import { PageableDto } from "./pageable.dto";

export interface PageDto<T> {
  content: T[];
  pageable: PageableDto;
  last: boolean;
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
  sort: SortDto;
  first: boolean;
  numberOfElements: number;
  empty: boolean;
}