interface BaseModel {
  id?: string;
  createdBy?: string;
  createdAt?: Date;
  updatedBy?: string;
  updatedAt?: Date;
  deletedAt?: Date;
}

export interface ISearchParams {
  limit?: number;
  page?: number;

}

export interface IPaginationResponse<T> {
  rows: T[],
  count: number
}

export default BaseModel;
