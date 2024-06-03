import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const DataTypes = Sequelize;

const Community = db.define('community', {
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    caption: {
        type: DataTypes.STRING,
        allowNull: false
    }
},{freezeTableName: true });

export default Community;