import { Request, Response } from "express";
import * as Product from "./product.model";

export const getAllProducts = async (req: Request, res: Response) => {
  const products = await Product.getAllProducts();

  products.forEach((product) => {
    product.exp = new Date(product.exp).toISOString().split("T")[0];
  });

  res.json(products);
};

export const getProductById = async (
  req: Request,
  res: Response
): Promise<any> => {
  const id = parseInt(req.params.id);
  const product = await Product.getProductById(id);
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  product.exp = new Date(product.exp).toISOString().split("T")[0];
  return res.json(product);
};

export const getProductByName = async (
  req: Request,
  res: Response
): Promise<any> => {
  const name = req.params.name;
  const product = await Product.getProductByName(name);
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  product.exp = new Date(product.exp).toISOString().split("T")[0];
  return res.json(product);
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
