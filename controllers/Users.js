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


//make if duplicate email return error message 
export const createUser = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;
    let profileImage = req.body.profileImage; // Ambil nama file gambar profil dari request

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    } else if (await Users.findOne({ where: { email } })) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);

    // Jika ada gambar profil yang diunggah, unggah ke GCS dan dapatkan URL-nya
    if (req.file) {
      profileImage = await uploadImageToGCS(req.file);
    }

    await Users.create({
      name,
      email,
      profileImage,
      password: hashPassword,
    });

    res.json({ msg: "User created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};


export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Users.findAll({ where: { email } });
    // Check for invalid email
    if (!user) {
      return res.status(400).json({ message: "Invalid email" });
    }
    const match = await bcrypt.compare(password, user[0].password);
    if (!match) {
      return res.status(400).json({ message: "Password does not match" });
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
    // Respon sukses dengan detail pengguna
    res.json({
      message: "success",
      userId: userId,
      name: name,
      token: accessToken
    });
  } catch (error) {
    console.error(error);
    // Respon error jika terjadi masalah
    res.status(500).json({ message: "error" });
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

//edit user profile 
export const editUser = async (req, res) => {
  try {
    const { name, email, profileImage } = req.body;
    if (await Users.findOne({ where: { email } })) {
      return res.status(400).json({ message: "Email already exists" });
    }
    await Users.update(
      { name, email, profileImage },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.json({ msg: "User updated successfully" });
  } catch (error) {
    console.error(error);
  }
};

