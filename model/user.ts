export type IRole = 'ADMIN' | 'MOD' | 'USER';

export interface IUser {
  id: number;
  email: string;
  username: string;
  role: IRole;
  money: string;
  bonus?: number;
  account_type?: string;
}

export interface IRoleData {
  role: string;
  bonus?: number;
  account_type?: string;
}

export enum IHistoryCheckType {
  DELETE_ACCOUNT = 'DELETE_ACCOUNT',
  AMOUNT_TRANSFERRED = 'AMOUNT_TRANSFERRED',
  BUY_ACCOUNT_BY_USER = 'BUY_ACCOUNT_BY_USER',
  BONUS = 'BONUS'
}
export interface IHistoryCheckParams {
  limit: number;
  offset: number;
  keyword: string;
  type: IHistoryCheckType;
}

interface IHistoryCheckUserResponse {
  username: string;
}
export interface IHistoryCheckResponse {
  created_at: string;
  history_message: string;
  id: number;
  information: string;
  is_deleted: boolean;
  type: string;
  updated_at: string;
  user: IHistoryCheckUserResponse;
}
