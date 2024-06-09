import CommunityLikes from "../models/CommunityLikesModel.js";
import Community from "../models/CommunityModel.js";

export const likePost = async (req, res) => {
  const { user_id, community_id } = req.body;

  try {
    const like = await CommunityLikes.create({ user_id, community_id });
    await Community.increment("likeCount", {
      by: 1,
      where: { id: community_id },
    });
    res.status(201).json({ message: "Post liked", like });
  } catch (error) {
    res.status(400).json({ error: "Unable to like post" });
  }
};

export const unlikePost = async (req, res) => {
  const { user_id, community_id } = req.body;

  try {
    const like = await CommunityLikes.findOne({
      where: { user_id, community_id },
    });
    if (like) {
      await like.destroy();
      await Community.decrement("likeCount", {
        by: 1,
        where: { id: community_id },
      });
      res.status(200).json({ message: "Post unliked" });
    } else {
      res.status(404).json({ error: "Like not found" });
    }
  } catch (error) {
    res.status(400).json({ error: "Unable to unlike post" });
  }
};
