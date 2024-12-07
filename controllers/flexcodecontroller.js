import Flexcode from "../models/flexcode.js";
import { connectDb } from '../lib/db.js';
import { uploadOnCloudinary } from "../lib/uploadtocloudinary.js";


export const UploadFlexcode = async (req, res) => {
  try {
    await connectDb();

    const { title, description, link } = req.body;

    if (!title || !description || !link) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const localFilePath = req.file?.path;  
    if (!localFilePath) {
      return res.status(400).json({ error: "File not uploaded" });
    }


    // Upload file to Cloudinary
    const cloudinaryResponse = await uploadOnCloudinary(localFilePath);
    if (!cloudinaryResponse) {
      console.error("Cloudinary upload failed:", cloudinaryResponse);
      return res.status(500).json({ error: "Failed to upload file to Cloudinary" });
    }
    console.log("File uploaded to Cloudinary:");
    const image = cloudinaryResponse.secure_url;

    const flexcode = new Flexcode({
      title,
      description,
      link,
      image,  
    });
    await flexcode.save();
    console.log(flexcode);
    
    return res.status(201).json({
      success: true,
      data: flexcode,
      message: "Flexcode uploaded successfully",
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: error.message || "Failed to upload flexcode" });
  }
};

export const deleteAllFlexcode = async (req, res) => {
  try {
    await connectDb();
    
    const result = await Flexcode.deleteMany({});

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'No record found' });
    }

    return res.status(200).json({ message: 'All records have been deleted' });

  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: error.message || 'Failed to delete attendance records' });
  }
};


export const getAllFlexcode = async (req, res) => {
  try {
    await connectDb(); 

    const flexcodes = await Flexcode.find(); 

    return res.status(200).json(flexcodes); 
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: error.message || 'Failed to fetch flexcodes' });
  }
};
