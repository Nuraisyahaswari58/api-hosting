import dotenv from "dotenv";
dotenv.config();

const url_homepage = process.env.ML_URL_homepage;
const url_survey = process.env.ML_URL_survey;

export default { url_homepage, url_survey };
