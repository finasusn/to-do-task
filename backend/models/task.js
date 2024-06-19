const mongoose = require('mongoose');
const taskSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        important: {
            type: Boolean,
            default: false,
            required: true,
        },
        complete: {
            type: Boolean,
            default: false,
            required: true,
        },
        // date: {
        //     type: Date,
        //     required: true,
        // },
    },{
        timestamps: true, 
    }
);
module.exports = mongoose.model("task",taskSchema);