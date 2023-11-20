import { Router } from "express";
import db from "../db";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const users = await db.usersDb.getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Wewnętrzny błąd serwera" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const userID: number = parseInt(req.params.id, 10);
    const [user] = await db.usersDb.getOneUser(userID);
    user
      ? res.json(user)
      : res.json({
          message: `użytkownik o podanym ID: ${userID} - nie istnieje`,
        });
  } catch (error) {
    res.status(500).json({ error: "Wewnętrzny błąd serwera" });
  }
});

router.post("/", async (req, res) => {
  try {
    const newUser = { ...req.body };
    const result = await db.usersDb.insertNewUser(newUser);
    res.json(result);
  } catch (error) {
    const mysqlError = error as { errno?: number; sqlMessage?: string };
    if (mysqlError.errno === 1062) {
      res
        .status(409)
        .json({ error: "Adres email już istnieje w bazie danych." });
    } else {
      res.status(500).json({
        error: "Nie można dodać użytkownika",
        details: mysqlError.sqlMessage,
      });
    }
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const userID: number = parseInt(req.params.id, 10);
    const { ...updatedUser } = req.body;
    const result = await db.usersDb.updateUser(userID, updatedUser);
    res.json(result);
  } catch (error) {
    const mysqlError = error as { sqlMessage?: string };
    res.status(500).json({
      error: "Nie można zaktualizować użytkownika",
      details: mysqlError.sqlMessage,
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const userID: number = parseInt(req.params.id, 10);
    const result = await db.usersDb.deleteUser(userID);
    res.json(result);
  } catch (error) {
    const mysqlError = error as { sqlMessage?: string };
    res.status(500).json({
      error: "Nie można usunąc użytkownika",
      details: mysqlError.sqlMessage,
    });
  }
});

export default router;
