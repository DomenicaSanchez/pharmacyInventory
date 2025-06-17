import React, { useState, useEffect } from "react";
import {
  Paper, Table, TableBody, TableCell, TableContainer,
  TableHead, TablePagination, TableRow, Button,
} from "@mui/material";

export default function ListProduct({ products: initialProducts = [], onEdit, onView }) {
  const [products, setProducts] = useState(initialProducts);
  const [loading, setLoading] = useState(initialProducts.length === 0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);

  useEffect(() => {
    // Solo fetch si no se pasaron productos
    if (initialProducts.length === 0) {
      const fetchProducts = async () => {
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
      fetchProducts();
    }
  }, []);

  const handleChangePage = (_, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const visibleRows = products.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Paper sx={{ width: "100%", overflow: "hidden", bgcolor: "white", boxShadow: 1, borderRadius: 2 }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="tabla de productos">
          <TableHead>
            <TableRow sx={{ textAlign: "center" }}>
              {["Code", "Name", "Stock", "Price", "Expires", "Actions"].map((header) => (
                <TableCell key={header} sx={{ color: "#adadad", fontWeight: "bold", fontFamily: "'Trebuchet MS', sans-serif", p: 1.5, textAlign: "center" }}>
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
                <TableRow key={p.id} hover role="checkbox" tabIndex={-1} sx={{ textAlign: "center", "&:hover": { bgcolor: "#f9fafb" } }}>
                  <TableCell>{p.code}</TableCell>
                  <TableCell>{p.name}</TableCell>
                  <TableCell>{p.stock}</TableCell>
                  <TableCell>${Number(p.price).toFixed(2)}</TableCell>
                  <TableCell>{new Date(p.exp).toLocaleDateString()}</TableCell>
                  <TableCell sx={{ p: 2, textAlign: "center", display: "flex", gap: 1, justifyContent: "center" }}>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => onView?.(p)}
                      sx={{ color: "black", borderColor: "#243751", fontFamily: "'Trebuchet MS', sans-serif" }}
                    >
                      Ver
                    </Button>
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => onEdit?.(p)}
                      sx={{ backgroundColor: "#243751", color: "white", fontFamily: "'Trebuchet MS', sans-serif" }}
                    >
                      Editar
                    </Button>
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
