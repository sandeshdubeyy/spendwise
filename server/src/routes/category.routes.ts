import express from "express";

import { createCategory, getCategory, updateCategory, deleteCategory } from "../controllers/category.controllers";
import { authMiddleware } from "../middlewares/auth.middlewares";

const categoryRouter = express.Router();

//middleware
categoryRouter.use(authMiddleware);

categoryRouter.post("/",createCategory);
categoryRouter.get("/",getCategory);
categoryRouter.put("/:id",updateCategory);
categoryRouter.delete("/:id",deleteCategory);

export default categoryRouter;