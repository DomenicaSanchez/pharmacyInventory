import { Request, Response } from "express";
import * as Product from "./product.model";

const formatDate = (date: Date) => {
  return new Date(date).toISOString().split("T")[0];
};

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.getAllProducts();
    const formattedProducts = products.map((product) => ({
      ...product,
      exp: formatDate(product.exp),
    }));

    res.json(formattedProducts);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const product = await Product.getProductById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const formattedProduct = { ...product, exp: formatDate(product.exp) };
    res.json(formattedProduct);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};

export const getProductByName = async (req: Request, res: Response) => {
  try {
    const name = req.params.name;
    const product = await Product.getProductByName(name);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const formattedProduct = { ...product, exp: formatDate(product.exp) };
    res.json(formattedProduct);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  const product = await Product.createProduct(req.body);
  res.status(201).json(product);
};

export const updateProduct = async (
  req: Request,
  res: Response
): Promise<any> => {
  const id = parseInt(req.params.id);
  const product = await Product.updateProduct(id, req.body);
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }
  return res.json(product);
};

export const deleteProduct = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const product = await Product.deleteProduct(id);
  res.json(product);
};
