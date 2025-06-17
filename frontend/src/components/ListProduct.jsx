import React, { useState, useEffect } from "react";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Button, } from "@mui/material";
import Modify from "./Modify.jsx";
import Plus from "./Plus.jsx";
import Rest from "./Rest.jsx";

export default function ListProduct({ products: initialProducts = [], onEdit, onView }) {
  const [products, setProducts] = useState(initialProducts);
  const [loading, setLoading] = useState(initialProducts.length === 0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.PUBLIC_API_URL || "http://localhost:3000"}/api/products`);
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error("❌ Error cargando productos:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialProducts.length === 0) {
      fetchProducts();
    }
  }, []);

  const handleChangePage = (_, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const visibleRows = products.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  // Refresca la lista después de una actualización
  const handleProductUpdated = () => {
    fetchProducts();
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden", bgcolor: "white", boxShadow: 1, borderRadius: 2 }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="tabla de productos">
          <TableHead>
            <TableRow sx={{ textAlign: "center" }}>
              {["Code", "Name", "Stock", "Price", "Expires", "Actions"].map((header) => (
                <TableCell
                  key={header}
                  sx={{ color: "#adadad", fontWeight: "bold", fontFamily: "'Trebuchet MS', sans-serif", p: 1.5, textAlign: "left" }}
                >
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} align="center" sx={{ fontFamily: "'Trebuchet MS', sans-serif" }}>
                  Cargando productos...
                </TableCell>
              </TableRow>
            ) : visibleRows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center" sx={{ fontFamily: "'Trebuchet MS', sans-serif" }}>
                  No hay productos para mostrar.
                </TableCell>
              </TableRow>
            ) : (
              visibleRows.map((p) => (
                <TableRow
                  key={p.id}
                  hover
                  role="checkbox"
                  tabIndex={-1}
                  sx={{ textAlign: "center", "&:hover": { bgcolor: "#f9fafb" } }}
                >
                  <TableCell>{p.code}</TableCell>
                  <TableCell>{p.name}</TableCell>
                  <TableCell>{p.stock}</TableCell>
                  <TableCell>${Number(p.price).toFixed(2)}</TableCell>
                  <TableCell>{new Date(p.exp).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Plus id={p.id} onUpdated={handleProductUpdated} />
                    <Modify id={p.id} onUpdated={handleProductUpdated} />
                    <Rest id={p.id} onUpdated={handleProductUpdated} />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[3, 5, 8]}
        component="div"
        count={products.length}
        rowsPerPage={rowsPerPage}
        page={page}
        labelRowsPerPage="Filas por pg:"
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{ fontFamily: "'Trebuchet MS', sans-serif" }}
      />
    </Paper>
  );
}
