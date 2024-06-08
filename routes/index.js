import express from "express";
import db from "../config/Database.js";
import {
  getUsers,
  getUsersById,
  createUser,
  loginUser,
  resetPassword,
  editUser,
  logout
} from "../controllers/Users.js";
import { loginFilter } from "../filters/LoginFilter.js";
import {
  getSmartphones,
  getSmartphonesByBrand,
  getSmartphonesById,
} from "../controllers/Smartphones.js";
import {
  getCommunity,
  getCommunityById,
  createCommunity,
  deleteCommunityById,
  deleteOldCommunities
} from "../controllers/Community.js";
import {
  getCommunity_image,
  getCommunity_imageById,
  getCommunity_imageByUserId,
  createCommunity_image,
} from "../controllers/CommunityImage.js";
import {
  getUserRatings,
  createUserRatings,
  getUserRatingsBySmartphoneId,
} from "../controllers/UserRatings.js";
import {
  getUserSurveys,
  createUserSurveys,
  getUserSurveysByUserId,
} from "../controllers/UserSurveys.js";
import {
  getWishlist,
  getWishlistByUserId,
  createWishlist,
  deleteWishlistById,
} from "../controllers/Wishlist.js";
import{
  getUserClicks,
  createUserClicks,
} from "../controllers/UserClicks.js";
import{
  getTopSmartphones,
} from "../controllers/MLHomepage.js";
import{
  getTopSmartphonesSurvey
} from "../controllers/MLSurvey.js";


const router = express.Router();

router.get("/users", loginFilter, getUsers);
router.get("/users/:id", loginFilter, getUsersById);
router.get("/smartphones", loginFilter, getSmartphones);
router.get("/smartphones/brand/:brand", loginFilter, getSmartphonesByBrand);
router.get("/smartphones/:id", loginFilter, getSmartphonesById);
router.get("/community", loginFilter, getCommunity);
router.get("/community/:id", loginFilter, getCommunityById);
router.get("/Community_Images", getCommunity_image);
router.get("/Community_Images/:id", getCommunity_imageById);
router.get("/Community_Images/user/:user_id", getCommunity_imageByUserId);
router.get("/user_ratings", getUserRatings);
router.get(
  "/user_ratings/smartphone/:smartphone_id",
  getUserRatingsBySmartphoneId
);
router.get("/user_surveys", getUserSurveys);
router.get("/user_surveys/user/:user_id", getUserSurveysByUserId);
router.get("/wishlist", getWishlist);
router.get("/wishlist/user/:user_id", getWishlistByUserId);
router.get("/user_clicks", getUserClicks);
router.get("/topSmartphones/:id", getTopSmartphones);
router.post("/topUserSurveys", getTopSmartphonesSurvey);
router.post("/users", createUser);
router.post("/login", loginUser);
router.post("/resetPassword/:id", loginFilter, resetPassword);
router.post("/community/add", loginFilter, createCommunity);
router.post("/Community_Images/add", createCommunity_image);
router.post("/user_ratings/add", createUserRatings);
router.post("/user_surveys/add", createUserSurveys);
router.post("/wishlist/add", createWishlist);
router.post("/user_clicks/add", createUserClicks);
router.put("/edit_profile/:id", loginFilter, editUser);
router.delete("/community/:id", loginFilter, deleteCommunityById);
router.delete('/community-old', deleteOldCommunities);
router.delete("/wishlist/:id", deleteWishlistById);
router.delete("/logout/:id",loginFilter, logout);

export default router;
