import { ModifyQuery, SelectQuery } from "../utilsDb/utilsDb";
import { IUserRow } from "./usersTableModel";

export function getAllUsers() {
  const queryString = "SELECT * FROM users";
  return SelectQuery<IUserRow>(queryString);
}

export function getOneUser(id: number) {
  const queryString = "SELECT * FROM users WHERE id = ?;";
  return SelectQuery<IUserRow>(queryString, [id]);
}

export function insertNewUser(newUser: {
  name: string;
  surname: string;
  email: string;
  role: string;
}) {
  const queryString = "INSERT INTO users SET ?;";
  return ModifyQuery(queryString, [newUser]);
}

export function updateUser(
  id: number,
  updatedUser: {
    name: string;
    surname: string;
    email: string;
    role: string;
  }
) {
  const queryString = "UPDATE users SET ? WHERE id = ?;";
  return ModifyQuery(queryString, [updatedUser, id]);
}

export function deleteUser(id: number) {
  const queryString = "DELETE FROM users WHERE id = ?;";
  return SelectQuery<IUserRow>(queryString, [id]);
}
