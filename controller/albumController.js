import { dirname } from "path";
import { fileURLToPath } from "url";
import slugify from "slugify";
import Album from "../model/albumModel.js";
import fs from "fs";
import path from "path";
import FormData from "form-data";
import axios from "axios";


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


export const createAlbum = async (req, res) => {
  try {
    const { albumName } = req.body;
    const files = req.files;

    if (!albumName) {
      return res.status(400).json({ error: "Album name is required" });
    }

    if (!files || files.length === 0) {
      return res.status(400).json({ error: "At least one image is required" });
    }

    const uploadedImages = [];

    for (const file of files) {
      const filePath = path.join(__dirname, "..", file.path);
      const formData = new FormData();
      formData.append("image", fs.createReadStream(filePath));
      formData.append("key", process.env.IMGBB_API_KEY);

      const response = await axios.post("https://api.imgbb.com/1/upload", formData, {
        headers: {
          ...formData.getHeaders(),
        },
      });

      const data = await response.json();
      if (!data.success) {
        throw new Error("Image upload failed");
      }

      uploadedImages.push(data.data.url);
      fs.unlinkSync(filePath); // Remove file after upload
    }

    const newAlbum = new Album({
      name: albumName,
      slug: slugify(albumName, { lower: true, strict: true }),
      images: uploadedImages,
    });

    await newAlbum.save();
    res.json(newAlbum);
  } catch (error) {
    console.error("Error creating album:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
