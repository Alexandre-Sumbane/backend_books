import { Router } from "express";
import { CreateCategory } from "../controllers/category/create-category-controller";
import { GetAllCategories } from "../controllers/category/findall-categories-controller";
import { GetCategoryById } from "../controllers/category/find-by-category-by-id-controller";
import { UpdateCategory } from "../controllers/category/update-category-controller";
import { DeleteCategory } from "../controllers/category/delete-category-controller";

const router = Router();

router.post("/", CreateCategory);
router.get("/", GetAllCategories);
router.get("/:categoryId", GetCategoryById);
router.put("/:categoryId", UpdateCategory);
router.delete("/:categoryId", DeleteCategory);


export default router;
