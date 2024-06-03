import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const DataTypes = Sequelize;

const UserClicks = db.define('user_clicks', {
    user_id:{
        type: DataTypes.INTEGER,
        allowNull: false       
    },
    smartphone_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
},{freezeTableName: true });

export default UserClicks;