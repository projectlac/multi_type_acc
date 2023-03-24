export type IType = 'hero' | 'weapon';
export type History = 'SUCCESS' | 'ERROR' | 'EXPIRED' | 'PENDING';
export interface IHistoryData {
  history_message: string;
  created_at: string;
  id: number;
  transaction: IHistoryTransaction;
  user: IHistoryUser;
  bank_name: string;
  total: number;
  status: History;
  description: string;
}
export interface IHistoryUser {
  email: string;
  username: string;
}
export interface IHistoryTransaction {
  status: History;
  description: string;
  bank_name: string;
}

export interface IData {
  id: number;
  desc: string;
  slug: string;
  created_at: string;
  type: IType;
}

export interface ITag {
  data: IData[];
  total: number;
}
