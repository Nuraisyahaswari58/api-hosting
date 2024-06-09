import url_homepage from "../config/MachineLearning.js";
import Smartphones from "../models/SmartphonesModel.js";
import UserClicks from "../models/UserClicksModel.js";
import UserRatings from "../models/UserRatingsModel.js";
import axios from "axios";

export const getRelatedPhone = async (req, res) => {
  try {
    const phoneId = req.params.id;

   
    let phone_count = await Smartphones.count();
    let user_click = new Array(phone_count).fill(0);
    user_click[phoneId] = 1;


    let user_rating = new Array(phone_count).fill(0);
    user_rating[phoneId] = 1;
  

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