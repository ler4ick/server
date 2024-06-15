import db from "../../models/index.js";

import { connection } from "../../utils/createConnection.mjs";

export async function getRoomsById({ id }) {
  try {
    const [results] = await connection.query(
      `SELECT
      c.id AS id,
      c.id_person_1 AS id_person_1,
      c.id_person_2 AS id_person_2,
      c.messages AS messages,
      (
        SELECT
          m.content AS content
        FROM messages m
        WHERE m.id_chat = c.id
        ORDER BY m.createdAt DESC
        LIMIT 1
      ) AS last_message
    FROM chats c
    WHERE c.id_person_1 = ${id} OR c.id_person_2 = ${id}`
    );

    return results;
  } catch (e) {
    throw e;
  }
}

export async function getAll() {
  try {
    const [results] = await connection.query("Select * from users");

    return results.map((u) => omitPassword(u));
  } catch (e) {
    throw e;
  }
}

// helper functions

function omitPassword(user) {
  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
}
