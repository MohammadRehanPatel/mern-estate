import express from "express";
const app = express();
import { test } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/test", test);

export default router;