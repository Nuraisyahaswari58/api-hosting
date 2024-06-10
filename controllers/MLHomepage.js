import url_homepage from "../config/MachineLearning.js";
import Smartphones from "../models/SmartphonesModel.js";
import UserClicks from "../models/UserClicksModel.js";
import UserRatings from "../models/UserRatingsModel.js";
import axios from "axios";

export const getTopSmartphones = async (req, res) => {
  try {
    const userId = req.params.id;
    let user_click_raw = await UserClicks.findAll({
      where: {
        user_id: userId,
      },
      order: [["createdAt", "DESC"]],
      limit: 20,
    });
    let user_rating_raw = await UserRatings.findAll({
      where: {
        user_id: userId,
      },
      order: [["createdAt", "DESC"]],
      limit: 5,
    });
    let phone_count = await Smartphones.count();
    let user_click = new Array(phone_count).fill(0);
    for (let i = 0; i < user_click_raw.length; i++) {
      const smartphoneId = user_click_raw[i].smartphone_id;
      user_click[smartphoneId] = 1;
    }

    let user_rating = new Array(phone_count).fill(0);
    for (let i = 0; i < user_rating_raw.length; i++) {
      const smartphoneId = user_rating_raw[i].smartphone_id;
      user_rating[smartphoneId] = user_rating_raw[i].rating;;
    }

    const data = {
      phone_count: phone_count,
      user_click: user_click,
      user_rating: user_rating,
    };

    // console.log(data);
    const response = await axios.post(url_homepage.url_homepage, data);
    res.json(response.data);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: err.message });
  }
};