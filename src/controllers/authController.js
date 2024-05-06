//import { getAllUsersComponent } from "../components/authComponent.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from '../configs/database.js';
import { createError } from '../utils/errorHandler.js';

/*
 ***** Authentication login
 */
export const loginUser = async (req, res, next) => {
  try {
    const email = req.body.email;

    const response = await db.query(`select * from users WHERE email = '${email}'`);

    const [user] = response.rows;

    if (!user) return next(createError(404, "User not found...!"));

    //Check if password is cool
    const isPassword = await bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!isPassword)
      return next(
        createError(400, "Username or Password not valid...!")
      );

    const token = jwt.sign(
      { id: user.id, },
      process.env.JWT_SECRET
    );

    delete user.password;

    res.cookie(process.env.JWT_TOKEN, token, {
      httpOnly: true,
    })
      .status(200)
      .json({ data: user, token: token });
  } catch (error) {
    console.log(error)
  }
}

/*
 ***** Authentication Signup
 */
export const signupUser = async (req, res, next) => {
  try {
    const data = req.body;

    // Check if user is exist
    const response = await db.query(`SELECT * FROM users WHERE email = '${data.email}'`);
    const [user] = response.rows;
    if (user) {
      return next(createError(500, "This email is already exist...!"));
    } else {
      // Check if password match
      if (data.password !== data.confirm_password) return next(createError(400, "password do not matched...!"));

      // Hash password
      const salt = bcrypt.genSaltSync(12);
      const hashedPassword = bcrypt.hashSync(data.password, salt);

      // Save user to database
      await db.query(`INSERT INTO users (name, email, password) VALUES ('${data.name}', '${data.email}', '${hashedPassword}')`)

      res.status(200).json({ message: "Create new user successfully...!" });
    }
  } catch (error) {
    console.log(error);
  }
}

/*
 ***** Authentication logout
 */
export const logoutUser = async (req, res, next) => {
  res.clearCookie("token").send("logout successfully...!");
};
