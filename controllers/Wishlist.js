import Wishlist from "../models/WishlistModel.js";

export const getWishlist = async (req, res) => {
    try {
        const wishlist = await Wishlist.findAll();
        res.json(wishlist);
    } catch (error) {
        console.error(error);
    }
}

export const createWishlist = async (req, res) => {
    try {
      const { user_id, smartphone_id } = req.body;
  
      // Check if wishlist item already exists
      const existingWishlist = await Wishlist.findOne({
        where: { user_id, smartphone_id },
      });
  
      if (existingWishlist) {
        return res.status(400).json({ msg: "Item sudah ada di wishlist" });
      }
  
      // Create wishlist item if it doesn't exist
      await Wishlist.create({
        user_id,
        smartphone_id,
      });
      res.json({ msg: "Wishlist created successfully" });
    } catch (error) {
      console.error(error);
    }
  };

export const getWishlistByUserId = async (req, res) => {
    try {
        const wishlist = await Wishlist.findAll({where: {user_id: req.params.user_id}});
        res.json(wishlist);
    } catch (error) {
        console.error(error);
    }
}

export const deleteWishlistById = async (req, res) => {
    try {
        await Wishlist.destroy({where: {id: req.params.id}});
        res.json({msg: "Wishlist deleted successfully"});
    } catch (error) {
        console.error(error);
    }
}