import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const DataTypes = Sequelize;

const Smartphones = db.define('smartphones', {
    brand: {
        type: DataTypes.STRING,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false
    },
    release_date: {
        type: DataTypes.STRING,
        allowNull: false
    },
    resolution: {
        type: DataTypes.STRING,
        allowNull: false
    },

    weight: {
        type: DataTypes.STRING,
        allowNull: false
    },
    os: {
        type: DataTypes.STRING,
        allowNull: false
    },
    chipset: {
        type: DataTypes.STRING,
        allowNull: false
    },
    memory: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ram: {
        type: DataTypes.STRING,
        allowNull: false
    },
    main_camera_1: {
        type: DataTypes.STRING,
        allowNull: false
    },
    main_camera_2: {
        type: DataTypes.STRING,
        allowNull: false
    },
    main_camera_3: {
        type: DataTypes.STRING,
        allowNull: false
    },
    selfie_camera: {
        type: DataTypes.STRING,
        allowNull: false
    },
    earphone_jack: {
        type: DataTypes.STRING,
        allowNull: false
    },
    battery: {
        type: DataTypes.STRING,
        allowNull: false
    },
    charging: {
        type: DataTypes.STRING,
        allowNull: false
    },
    colors: {
        type: DataTypes.STRING,
        allowNull: false
    },
    nfc: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.STRING,
        allowNull: false
    }
},{freezeTableName: true });

export default Smartphones;