import express from "express";

import { createCategory, getCategory, updateCategory, deleteCategory } from "../controllers/category.controllers";

const categoryRouter = express.Router();

categoryRouter.post("/",createCategory);
categoryRouter.get("/",getCategory);
categoryRouter.put("/:id",updateCategory);
categoryRouter.delete("/:id",deleteCategory);

export default categoryRouter;