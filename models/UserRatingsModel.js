import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const DataTypes = Sequelize;

const UserRatings = db.define('user_ratings', {
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    smartphone_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    rating: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
},{freezeTableName: true });

export default UserRatings;