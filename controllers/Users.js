import Users from "../models/UsersModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Storage } from "@google-cloud/storage";
import { format } from "util";
import multer from "multer";

const storage = new Storage({ keyFilename: "D:/final-api/google-cloud-key.json" });
const bucket = storage.bucket("storage_auxilium");

const multerStorage = multer.memoryStorage();
const uploadMiddleware = multer({ storage: multerStorage }).single("file");

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

const uploadImageToGCS = (file) => {
  return new Promise((resolve, reject) => {
    if (!file || !file.originalname) {
      reject(new Error("A file name must be specified."));
      return;
    }

    const blob = bucket.file(file.originalname);
    const blobStream = blob.createWriteStream({
      resumable: false,
    });

    blobStream.on("error", (err) => {
      reject(err);
    });

    blobStream.on("finish", async () => {
      const publicUrl = format(
        `https://storage.googleapis.com/${bucket.name}/${blob.name}`
      );

      try {
        await bucket.file(file.originalname).makePublic();
        resolve(publicUrl);
      } catch (err) {
        reject(err);
      }
    });

    blobStream.end(file.buffer);
  });
};

//make if duplicate email return error message
export const createUser = (req, res) => {
  uploadMiddleware(req, res, async (err) => {
    if (err) {
      return res.status(500).send("Error uploading file.");
    }

    try {
      const { name, email, password, confirmPassword } = req.body;
      if (!req.file) {
        return res.status(400).send("No file uploaded.");
      }

      if (password !== confirmPassword) {
        return res.status(400).json({ message: "Passwords do not match" });
      } else if (await Users.findOne({ where: { email } })) {
        return res.status(400).json({ message: "Email already exists" });
      }

      const salt = bcrypt.genSaltSync(10);
      const hashPassword = bcrypt.hashSync(password, salt);

      // Jika ada gambar profil yang diunggah, unggah ke GCS dan dapatkan URL-nya
      const file = req.file;
      const imageUrl = await uploadImageToGCS(file);

      const image = await Users.create({
        name,
        email,
        password: hashPassword,
        profileImage: imageUrl,
      });

      res.json(image);
    } catch (error) {
      console.error(error);
      res.status(500).send("An error occurred while uploading the file.");
    }
  });
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
      token: accessToken,
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
