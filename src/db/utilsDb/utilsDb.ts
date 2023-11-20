import { ResultSetHeader } from "mysql2";
import pool from "../connectionDb";

export async function SelectQuery<T>(
  queryString: string,
  params?: any[]
): Promise<T[]> {
  const [results] = await pool.execute(queryString, params);
  return results as T[];
}

export async function ModifyQuery(
  queryString: string,
  params?: any[]
): Promise<ResultSetHeader> {
  const [results] = await pool.query(queryString, params);
  return results as ResultSetHeader;
}
