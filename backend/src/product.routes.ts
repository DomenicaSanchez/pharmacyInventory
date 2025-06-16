import { Router } from "express";
import * as ProductController from "./product.controller";

const router = Router();

router.get("/", ProductController.getAllProducts);
router.get("/:id", ProductController.getProductById);
router.get("/name/:name", ProductController.getProductByName);
router.post("/", ProductController.createProduct);
router.patch("/:id", ProductController.updateProduct);
router.delete("/:id", ProductController.deleteProduct);

export default router;
