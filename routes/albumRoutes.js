import express from "express";

const router = express.Router();
// import controller
import {
  createAlbum,
} from "../controller/albumController.js";

// import middleware
import { requiredSignIn, isAdmin } from "../middlewares/authMiddleware.js";


router.post(
  "/album",
  requiredSignIn,
  isAdmin,
  createAlbum
);
// router.get("/album/:slug", readAlbum);
// router.get("/albums", listAlbums);
// router.delete("/album/:albumId", requiredSignIn, isAdmin, removeAlbum);


export default router;
