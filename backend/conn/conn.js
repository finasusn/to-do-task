const mongoose = require('mongoose');
require('dotenv').config();
const conn = async () => {
    try {
        const response = await mongoose.connect(`${process.env.MONGO_URL}`);
        if (response) {
            console.log("connected to DB");
        }
    } catch (error) {
        console.log(error);
    }
};
conn();