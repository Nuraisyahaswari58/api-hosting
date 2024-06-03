import Users from "../models/UsersModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const getUsers = async (req, res) => {
  try {
    const users = await Users.findAll();
    res.json(users);
  } catch (error) {
    console.error(error);
  }
};

//create getusers by id
export const getUsersById = async (req, res) => {
  try {
    const users = await Users.findAll({ where: { id: req.params.id } });
    res.json(users);
  } catch (error) {
    console.error(error);
  }
};

export const createUser = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);
    await Users.create({
      name,
      email,
      password: hashPassword,
    });
    res.json({ msg: "User created successfully" });
  } catch (error) {
    console.error(error);
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Users.findAll({ where: { email } });
    const match = await bcrypt.compare(password, user[0].password);
    if (!match) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const userId = user[0].id;
    const name = user[0].name;
    const mail = user[0].email;

    const accessToken = jwt.sign(
      { userId, name, mail },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "5d" }
    );
    const refreshToken = jwt.sign(
      { userId, name, mail },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "7d" }
    );

    await Users.update(
      { refreshToken },
      {
        where: {
          id: user[0].id,
        },
      }
    );
    res.cookie(
      "refreshToken",
      refreshToken,
      { httpOnly: true },
      { maxAge: 7 * 24 * 60 * 60 * 1000 },
      { secure: true }
    );
    res.json({ accessToken });
  } catch (error) {
    console.error(error);
  }
};

//create reset password
export const resetPassword = async (req, res) => {
  try {
    const { email, password, confirmPassword } = req.body;
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);
    await Users.update(
      { password: hashPassword },
      {
        where: {
          email,
        },
      }
    );
    res.json({ msg: "Password reset successfully" });
  } catch (error) {
    console.error(error);
  }
};


//create logout
export const logout = async (req, res) => {
  try {
    res.clearCookie("refreshToken");
    res.json({ msg: "Logged out successfully" });
  } catch (error) {
    console.error(error);
  }
};