import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getAllProducts = async () => {
  return await prisma.product.findMany({
    orderBy: {
      id: "asc",
    },
  });
};

export const getProductById = async (id: number) => {
  return await prisma.product.findUnique({
    where: { id },
  });
};

export const getProductByName = async (name: string) => {
  return await prisma.product.findFirst({
    where: { name },
  });
};

export const createProduct = async (data: {
  code: string;
  name: string;
  stock: number;
  price: number;
  exp: Date;
}) => {
  return await prisma.product.create({
    data,
  });
};

export const updateProduct = async (
  id: number,
  data: {
    code?: string;
    name?: string;
    stock?: number;
    price?: number;
    exp?: Date;
    sum?: number;
    res?: number;
  }
) => {
  const product = await getProductById(id);
  if (!product) throw new Error("Product not found");

  let newStock = product.stock;

  if (data.sum !== undefined) newStock += data.sum;
  if (data.res !== undefined) newStock -= data.res;

  if (newStock < 0) {
    throw new Error("Stock no puede ser negativo");
  }

  return await prisma.product.update({
    where: { id },
    data: {
      code: data.code ?? product.code,
      name: data.name ?? product.name,
      price: data.price ?? product.price,
      exp: data.exp ?? product.exp,
      stock: newStock,
    },
  });
};

export const deleteProduct = async (id: number) => {
  return await prisma.product.delete({
    where: { id },
  });
};
