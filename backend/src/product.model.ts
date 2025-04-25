import { db } from "./db";

export const getAllProducts = async () => {
  const res = await db.query("SELECT * FROM product ORDER BY id ASC");
  return res.rows;
};

export const getProductById = async (id: number) => {
  const res = await db.query("SELECT * FROM product WHERE id = $1", [id]);
  return res.rows[0];
};

export const getProductByName = async (name: string) => {
  const res = await db.query("SELECT * FROM product WHERE name = $1", [name]);
  return res.rows[0];
};

export const createProduct = async (data: any) => {
  const { code, name, stock, price, exp } = data;
  const res = await db.query(
    "INSERT INTO product (code, name, stock, price, exp) VALUES ($1, $2, $3, $4, $5) RETURNING *",
    [code, name, stock, price, exp]
  );
  return res.rows[0];
};

export const updateProduct = async (id: number, data: any) => {
  const { code, name, stock, price, exp } = data;

  const product = await getProductById(id);
  let updatedStock = null;
  if (data.sum) {
    updatedStock = product.stock + data.sum;
  }
  if (data.res) {
    updatedStock = product.stock - data.res;
  }

  const updateProduct = {
    ...product,
    ...data,
  };
  updateProduct.stock = updatedStock ?? updateProduct.stock;

  await db.query(
    "UPDATE product SET code = $1, name = $2, stock = $3, price = $4, exp = $5 WHERE id = $6 RETURNING *",
    [
      updateProduct.code,
      updateProduct.name,
      updateProduct.stock,
      updateProduct.price,
      updateProduct.exp,
      id,
    ]
  );
  return updateProduct;
};

export const deleteProduct = async (id: number) => {
  const res = await db.query("DELETE FROM product WHERE id = $1 RETURNING *", [
    id,
  ]);
  return res.rows[0];
};
