import express from "express";
import productRoutes from "./product.routes";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/products", productRoutes);

export default app;
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
