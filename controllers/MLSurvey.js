import url_survey from "../config/MachineLearning.js";
import Smartphones from "../models/SmartphonesModel.js";
import axios from "axios";

export const getTopSmartphonesSurvey = async (req, res) => {
  try {
    const user_survey = req.body.user_survey;

    let phone_count = await Smartphones.count();

    const data = {
      phone_count: phone_count,
      user_survey: user_survey,
    };
    console.log(user_survey);
    const response = await axios.post(url_survey.url_survey, data);
    res.json(response.data);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: err.message });
  }
};