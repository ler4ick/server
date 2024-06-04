import config from "../../config/config.json" assert { type: "json" };
import jwt from "jsonwebtoken";

import { connection } from "../../utils/createConnection.mjs";

export async function getRoomsById({ id }) {
  try {
    const [results] = await connection.query(
      `Select * from chats where id_person_1 = ${id} or id_person_2 = ${id}`
    );
    console.log(results);
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
