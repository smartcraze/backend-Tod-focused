import mongoose from "mongoose";

const flexcodeSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        
    },
    description:{
        type: String,
        required: true,
    },
    link:{
        type: String,
        required: true,
    },
    image:{
        type: String,
        required: true,
    },
    
},{
    timestamps: true,
});

const Flexcode = mongoose.models.Flexcode || mongoose.model('Flexcode', flexcodeSchema);
export default Flexcode;