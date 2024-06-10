import Community from "../models/CommunityModel.js";
import CommunityLikes from "../models/CommunityLikesModel.js";
import { Op } from "sequelize";
import cron from "node-cron";
import { Storage } from "@google-cloud/storage";
import { format } from "util";
import multer from "multer";

const storage = new Storage({ keyFilename: "google-cloud-key.json" });
const bucket = storage.bucket("storage-auxilium");

const multerStorage = multer.memoryStorage();
const uploadMiddleware = multer({ storage: multerStorage }).single("file");

export const getCommunity = async (req, res) => {
  try {
    const community = await Community.findAll();
    res.json(community);
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

export const createCommunity = (req, res) => {
  uploadMiddleware(req, res, async (err) => {
    if (err) {
      return res.status(500).send("Error uploading file.");
    }
  try {
    const { user_id, caption } = req.body;

    if (!req.file) {
      return res.status(400).send("No file uploaded.");
    }

    const file = req.file;
    const imageUrl = await uploadImageToGCS(file)

    const image = await Community.create({
      user_id,
      caption,
      image: imageUrl,
    });
    res.json(image);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while uploading the file.");
  }
});
};

export const getCommunityById = async (req, res) => {
  try {
    const community = await Community.findAll({ where: { id: req.params.id } });
    res.json(community);
  } catch (error) {
    console.error(error);
  }
};

export const deleteCommunityById = async (req, res) => {
  try {
    await Community.destroy({ where: { id: req.params.id } });
    res.json({ msg: "Community deleted successfully" });
  } catch (error) {
    console.error(error);
  }
};

export const deleteOldCommunities = async (req, res) => {
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  try {
    const result = await Community.destroy({
      where: {
        createdAt: {
          [Op.lt]: oneWeekAgo,
        },
      },
    });
    console.log(`${result} communities deleted that were older than one week.`);
    if (res) {
      res.json({
        msg: `${result} communities deleted that were older than one week.`,
      });
    }
  } catch (error) {
    console.error("Error deleting old communities: ", error);
    if (res) {
      res.status(500).json({ message: "error" });
    }
  }
};

// Menjalankan fungsi deleteOldCommunities setiap hari pada jam 00:00 (midnight)
cron.schedule("0 0 * * *", () => {
  console.log("Running scheduled job to delete old communities");
  deleteOldCommunities();
});

export const getLikesByPostId = async (req, res) => {
  try {
    const likes = await CommunityLikes.findAll({ where: { community_id: req.params.community_id } });
    res.json(likes);
  } catch (error) {
    console.error(error);
  }
}




