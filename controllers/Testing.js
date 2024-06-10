import Testing from "../models/TestingModel.js";
import processFile from "../filters/upload.js";
import { Storage } from "@google-cloud/storage";
import { format } from "util";

const storage = new Storage({ keyFilename: "google-cloud-key.json" });
const bucket = storage.bucket("storage-auxilium");

const uploadImageToGCS = (file) => {
  return new Promise((resolve, reject) => {
    const blob = bucket.file(file.originalname);
    const blobStream = blob.createWriteStream({
      resumable: false,
    });

    blobStream.on("error", (err) => {
      reject(err); // Menolak promise jika terjadi kesalahan
    });

    blobStream.on("finish", async () => {
      const publicUrl = format(
        `https://storage.googleapis.com/${bucket.name}/${blob.name}`
      );

      try {
        await bucket.file(file.originalname).makePublic();
        resolve(publicUrl); // Mengembalikan URL publik jika sukses
      } catch (err) {
        reject(err); // Menolak promise jika terjadi kesalahan saat membuat file menjadi publik
      }
    });

    blobStream.end(file.buffer);
  });
};

export const upload = async (req, res) => {
  try {
    const { nama } = req.body;
    await processFile(req, res);
    if (!req.file) {
      res.status(400).send("No file uploaded.");
      return;
    }

    const imageUrl = await uploadImageToGCS(req.file);

    const image = await Testing.create({
      nama,
      image: imageUrl,
    });
    
    res.json(image);
  } catch (error) {
    console.error(error);
  }
};
