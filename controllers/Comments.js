import Comments from "../models/CommentsModel";

export const getComments = async (req, res) => {
    try {
        const comments = await Comments.findAll();
        res.json(comments);
    } catch (error) {
        console.error(error);
    }
}

//create comments sesuai community id
export const createComments = async (req, res) => {
    try {
        const { user_id, community_id, comment } = req.body;
        await Comments.create({
            user_id,
            community_id,
            comment
        });
        res.json({msg: "Comments created successfully"});
    } catch (error) {
        console.error(error);
    }
}

//get comments by community id
export const getCommentsByCommunityId = async (req, res) => {
    try {
        const comments = await Comments.findAll({where: {community_id: req.params.community_id}});
        res.json(comments);
    } catch (error) {
        console.error(error);
    }
}


