import { Request,Response } from "express";

import Category from "../models/Category.models";

//jwt update done
//all functions are tested and working 29 june 2026

export const createCategory = async(
    req:Request,
    res:Response,
) : Promise<void> => {
    try {
      const {name} = req.body;
      const user = req.body.user
      const existingCategory = await Category.findOne({
        name: { $regex: `^${name}$`, $options: "i" },
        user,
      });

      if(existingCategory){
        res.status(400).json({
            message:"Category already exists"
        })
        return;
      }
      
      const category = await Category.create({
        name,
        user,
      });

      res.status(201).json({
        message:"Category created successfully",
        category
      });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message:"Server error",
        });
    };
};

export const getCategory = async(
    req:Request,
    res:Response,
) : Promise<void> => {
    try {
      const user = req.user.id;
      
      const category = await Category.find({
        user,
      }).sort({ name: 1 });

      res.status(201).json({
        category,
      });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message:"Server error",
        });
    };
}

export const updateCategory = async(
    req:Request,
    res:Response,
) : Promise<void> => {
    try {
      const {name} = req.body;
      
      const category = await Category.findByIdAndUpdate(
        req.params.id,
        {name},
        {new: true},
      );

      if(!category){
        res.status(400).json({
            message:"Category not found",
        })
        return;
      }

      res.status(200).json({
        message: "Category updated successfully",
        category,
    });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message:"Server error",
        });
    };
}

export const deleteCategory  = async(
    req:Request,
    res:Response,
) : Promise<void> => {
    try {

      const category = await Category.findByIdAndDelete(
        req.params.id,
      );

      if(!category){
        res.status(400).json({
            message:"Category not found",
        })
        return;
      }

      res.status(200).json({
        message: "Category deleted successfully",
    });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message:"Server error",
        });
    };
}