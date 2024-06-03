import UserClicks from "../models/UserClicksModel.js";

export const getUserClicks = async (req, res) => {
    try {
        const userClicks = await UserClicks.findAll();
        res.json(userClicks);
    } catch (error) {
        console.error(error);
    }
}

export const createUserClicks = async (req, res) => {
    try {
        const { user_id, smartphone_id } = req.body;
        await UserClicks.create({
            user_id,
            smartphone_id,
        });
        res.json({msg: "User Clicks created successfully"});
    } catch (error) {
        console.error(error);
    }
}