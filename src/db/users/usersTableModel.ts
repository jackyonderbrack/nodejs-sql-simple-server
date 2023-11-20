import { RowDataPacket } from "mysql2";

export interface IUserRow extends RowDataPacket {
  id: number;
  name: string;
  surname: string;
  email: string;
  created: string;
  role: string;
}
