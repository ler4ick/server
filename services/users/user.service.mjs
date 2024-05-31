import config from "../../config/config.json" assert { type: "json" };
import jwt from "jsonwebtoken";

import { connection } from "../../utils/createConnection.mjs";

export async function authenticate({ id }) {
  try {
    const [results] = await connection.query(
      `Select * from users where id = ${id}`
    );
    const user = results[0];

    if (!user) throw "Id is incorrect";

    // create a jwt token that is valid for 7 days
    const token = jwt.sign({ sub: user.id }, config.secret, {
      expiresIn: "7d",
    });

    return {
      ...omitPassword(user),
      token,
    };
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
