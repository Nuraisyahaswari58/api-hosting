import Smartphones from "../models/SmartphonesModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


export const getSmartphones = async (req, res) => {
    try {
        const smartphones = await Smartphones.findAll();
        res.json(smartphones);
    } catch (error) {
        console.error(error);
    }
}

//getSmartphonesByBrand 
export const getSmartphonesByBrand = async (req, res) => {
    try {
        const smartphones = await Smartphones.findAll({where: {brand: req.params.brand}});
        res.json(smartphones);
    } catch (error) {
        console.error(error);
    }
}

//getSmartphonesById
export const getSmartphonesById = async (req, res) => {
    try {
        const smartphones = await Smartphones.findAll({where: {id: req.params.id}});
        res.json(smartphones);
    } catch (error) {
        console.error(error);
    }
}



