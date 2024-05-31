import express from "express";
import multer from "multer";

const router = express.Router();
// import controller
import {
  createAlbum,
} from "../controller/albumController.js";

// import middleware
import { requiredSignIn, isAdmin } from "../middlewares/authMiddleware.js";

const upload = multer({ dest: "uploads/" });

router.post(
  "/album",
  requiredSignIn,
  isAdmin,
  upload.array("images", 30),
  createAlbum
);
// router.get("/album/:slug", readAlbum);
// router.get("/albums", listAlbums);
// router.delete("/album/:albumId", requiredSignIn, isAdmin, removeAlbum);


export default router;
