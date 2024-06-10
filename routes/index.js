import express from 'express';
import formidableMiddleware from 'express-formidable';
import { getUsers, getUsersById, createUser, loginUser, resetPassword, editUser } from '../controllers/Users.js';
import { loginFilter } from '../filters/LoginFilter.js';
import { getSmartphones, getSmartphonesByBrand, getSmartphonesById } from '../controllers/Smartphones.js';
import {
	getCommunity,
	getCommunityById,
	createCommunity,
	deleteCommunityById,
	deleteOldCommunities,
	getLikesByPostId
} from '../controllers/Community.js';
import { likePost, unlikePost } from '../controllers/CommunityLikes.js';
import { getUserRatings, createUserRatings, getUserRatingsBySmartphoneId } from '../controllers/UserRatings.js';
import { getUserSurveys, createUserSurveys, getUserSurveysByUserId } from '../controllers/UserSurveys.js';
import { getWishlist, getWishlistByUserId, createWishlist, deleteWishlistById } from '../controllers/Wishlist.js';
import { getUserClicks, createUserClicks } from '../controllers/UserClicks.js';
import { getComments, createComments, getCommentsByCommunityId } from '../controllers/Comments.js';

import { getTopSmartphones } from '../controllers/MLHomepage.js';
import { getTopSmartphonesSurvey } from '../controllers/MLSurvey.js';
import { getRelatedPhone } from '../controllers/MLRelatedPhone.js';
import { upload } from '../controllers/Testing.js';

const router = express.Router();

router.post('/upload', upload);

router.get('/users', loginFilter, getUsers);
router.get('/users/:id', loginFilter, getUsersById);
router.get('/smartphones', loginFilter, getSmartphones);
router.get('/smartphones/brand/:brand', loginFilter, getSmartphonesByBrand);
router.get('/smartphones/:id', loginFilter, getSmartphonesById);
router.get('/community', loginFilter, getCommunity);
router.get('/community/:id', loginFilter, getCommunityById);
router.get('/user_ratings', getUserRatings);
router.get('/user_ratings/smartphone/:smartphone_id', getUserRatingsBySmartphoneId);
router.get('/user_surveys', getUserSurveys);
router.get('/user_surveys/user/:user_id', getUserSurveysByUserId);
router.get('/wishlist', getWishlist);
router.get('/wishlist/user/:user_id', getWishlistByUserId);
router.get('/user_clicks', getUserClicks);
router.get('/comments', getComments);
router.get('/comments/:community_id', getCommentsByCommunityId);
router.get('/topSmartphones/:id', getTopSmartphones);
router.get('/relatedPhone/:id', getRelatedPhone);
router.get('/getLikesByPostId/:community_id', getLikesByPostId);
router.post('/topUserSurveys', getTopSmartphonesSurvey);
router.post('/users', createUser);
router.post('/login', formidableMiddleware(), loginUser);
router.post('/resetPassword/:id', loginFilter, resetPassword);
router.post('/community/add', loginFilter, createCommunity);
router.post('/user_ratings/add', createUserRatings);
router.post('/user_surveys/add', createUserSurveys);
router.post('/wishlist/add', createWishlist);
router.post('/user_clicks/add', createUserClicks);
router.post('/comments/add', createComments);
router.post('/community/like', likePost);
router.post('/community/unlike', unlikePost);
router.put('/edit_profile/:id', loginFilter, editUser);
router.delete('/community/:id', loginFilter, deleteCommunityById);
router.delete('/community-old', deleteOldCommunities);
router.delete('/wishlist/:id', deleteWishlistById);

export default router;
