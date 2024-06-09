import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const DataTypes = Sequelize;

const CommunityLikes = db.define('community_likes', {
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    community_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
},{freezeTableName: true });

export default CommunityLikes;