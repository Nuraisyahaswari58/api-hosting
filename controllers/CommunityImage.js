import Community_image from "../models/CommunityImageModel.js";

export const getCommunity_image = async (req, res) => {
    try {
        const community_image = await Community_image.findAll();
        res.json(community_image);
    } catch (error) {
        console.error(error);
    }
}

export const createCommunity_image = async (req, res) => {
    try {
        const { user_id, community_id, image_path } = req.body;
        await Community_image.create({
            user_id,
            community_id,
            image_path
        });
        res.json({msg: "Community_image created successfully"});
    } catch (error) {
        console.error(error);
    }
}

export const getCommunity_imageById = async (req, res) => {
    try {
        const community_image = await Community_image.findAll({where: {id: req.params.id}});
        res.json(community_image);
    } catch (error) {
        console.error(error);
    }
}

export const getCommunity_imageByUserId = async (req, res) => {
    try {
        const community_image = await Community_image.findAll({where: {user_id: req.params.user_id}});
        res.json(community_image);
    } catch (error) {
        console.error(error);
    }
}