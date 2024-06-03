import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const DataTypes = Sequelize;

const Community_image = db.define('community_image', {
    user_id:{
        type: DataTypes.INTEGER,
        allowNull: false       
    },
    community_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    image_path: {
        type: DataTypes.STRING,
        allowNull: false
    }
},{freezeTableName: true });

export default Community_image;