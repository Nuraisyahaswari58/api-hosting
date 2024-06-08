import Community from "../models/CommunityModel.js";
import { Op } from "sequelize";
import cron from "node-cron";

export const getCommunity = async (req, res) => {
  try {
    const community = await Community.findAll();
    res.json(community);
  } catch (error) {
    console.error(error);
  }
};
export const createCommunity = async (req, res) => {
  try {
    const { user_id, caption } = req.body;
    await Community.create({
      user_id,
      caption,
    });
    res.json({ msg: "Community created successfully" });
  } catch (error) {
    console.error(error);
  }
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
