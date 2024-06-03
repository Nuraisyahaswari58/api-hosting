import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const DataTypes = Sequelize;

const Comments = db.define('comments', {
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    community_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    comment: {
        type: DataTypes.STRING,
        allowNull: false
    }
},{freezeTableName: true });

export default Comments;