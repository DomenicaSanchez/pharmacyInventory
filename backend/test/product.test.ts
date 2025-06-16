import { getAllProducts } from "../src/product.model";
import { getProductById } from "../src/product.model";
import { createProduct, getProductByName } from "../src/product.model";
import { updateProduct } from "../src/product.model";

describe("getAllProducts", () => {
  it("debería devolver al menos un producto", async () => {
    const products = await getAllProducts();
    expect(Array.isArray(products)).toBe(true);
    expect(products.length).toBeGreaterThan(0);
  });
});

describe("getProductById", () => {
  it("debería devolver null si el producto no existe", async () => {
    const product = await getProductById(999);
    expect(product).toBeNull();
  });
});

describe("createProduct", () => {
  it("debería crear un producto y encontrarlo por nombre", async () => {
    const newProduct = await createProduct({
      code: "P001",
      name: "Paracetamol",
      stock: 50,
      price: 5.0,
      exp: new Date("2026-12-31"),
    });

    const found = await getProductByName("Paracetamol");

    expect(found).not.toBeNull();
    expect(found?.code).toBe("P001");
  });
});

describe("updateProduct", () => {
  it("debería lanzar error si el stock queda negativo", async () => {
    const product = await getProductById(1);
    await expect(updateProduct(product!.id, { res: 999 })).rejects.toThrow(
      "Stock no puede ser negativo"
    );
  });
});
