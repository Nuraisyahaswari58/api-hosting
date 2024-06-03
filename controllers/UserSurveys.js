import UserSurveys from "../models/UserSurveysModel.js";

export const getUserSurveys = async (req, res) => {
    try {
        const userSurveys = await UserSurveys.findAll();
        res.json(userSurveys);
    } catch (error) {
        console.error(error);
    }
}

export const createUserSurveys = async (req, res) => {
    try {
        const { user_id, q1, q2, q3, q4, q5, q6, q7, q8 } = req.body;
        await UserSurveys.create({
            user_id,
            q1,
            q2,
            q3,
            q4,
            q5,
            q6,
            q7,
            q8
        });
        res.json({msg: "UserSurveys created successfully"});
    } catch (error) {
        console.error(error);
    }
}

export const getUserSurveysByUserId = async (req, res) => {
    try {
        const userSurveys = await UserSurveys.findAll({where: {user_id: req.params.user_id}});
        res.json(userSurveys);
    } catch (error) {
        console.error(error);
    }
}


