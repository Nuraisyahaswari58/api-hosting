import UserRatings from '../models/UserRatingsModel.js';

export const getUserRatings = async (req, res) => {
    try {
        const userRatings = await UserRatings.findAll();
        res.json(userRatings);
    } catch (error) {
        console.error(error);
    }
}

export const createUserRatings = async (req, res) => {
    try {
        const { user_id, smartphone_id, rating } = req.body;
        await UserRatings.create({
            user_id,
            smartphone_id,
            rating
        });
        res.json({msg: "UserRatings created successfully"});
    } catch (error) {
        console.error(error);
    }
}

//get user ratings by smartphone id
export const getUserRatingsBySmartphoneId = async (req, res) => {
    try {
        const userRatings = await UserRatings.findAll({where: {smartphone_id: req.params.smartphone_id}});
        res.json(userRatings);
    } catch (error) {
        console.error(error);
    }
}