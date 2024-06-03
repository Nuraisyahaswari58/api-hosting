import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const DataTypes = Sequelize;

const UserSurveys = db.define('user_surveys', {
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    q1: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    q2: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    q3: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    q4: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    q5: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    q6: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    q7: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    q8: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
},{freezeTableName: true });

export default UserSurveys;