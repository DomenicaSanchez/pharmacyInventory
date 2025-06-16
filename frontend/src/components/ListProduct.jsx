import React from "react";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Button, } from "@mui/material";

export default function ListProduct({ products, onEdit, onView }) {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const visibleRows = products.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
    );

    return (
        <Paper sx={{ width: "100%", overflow: "hidden", bgcolor: "white", boxShadow: 1, borderRadius: 2 }}>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="tabla de productos">
                    <TableHead>
                        <TableRow sx={{ textAlign: "center" }}>
                            {["Code", "Name", "Stock", "Price", "Expires", "Actions"].map((header) => (
                                <TableCell
                                    key={header}
                                    sx={{
                                        color: "#adadad",
                                        fontWeight: "bold",
                                        fontFamily: "'Trebuchet MS', sans-serif",
                                        p: 1.5,
                                        textAlign: "center",
                                    }}
                                >
                                    {header}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {visibleRows.length === 0 ? (
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
                                    sx={{
                                        textAlign: "center",
                                        "&:hover": { bgcolor: "#f9fafb" },
                                    }}
                                >
                                    <TableCell sx={{ fontFamily: "'Trebuchet MS', sans-serif", color: "#000", p: 1.5 }}>
                                        {p.code}
                                    </TableCell>
                                    <TableCell sx={{ fontFamily: "'Trebuchet MS', sans-serif", color: "#000" }}>{p.name}</TableCell>
                                    <TableCell sx={{ fontFamily: "'Trebuchet MS', sans-serif", color: "#000" }}>{p.stock}</TableCell>
                                    <TableCell sx={{ fontFamily: "'Trebuchet MS', sans-serif", color: "#000" }}>
                                        ${Number(p.price).toFixed(2)}
                                    </TableCell>
                                    <TableCell sx={{ fontFamily: "'Trebuchet MS', sans-serif", color: "#000" }}>
                                        {new Date(p.exp).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell sx={{ p: 2, textAlign: "center", display: "flex", gap: 1, justifyContent: "center" }}>
                                        <Button
                                            variant="outlined"
                                            size="small"
                                            onClick={() => onView(p)}
                                            sx={{ color: "black", borderColor: "#243751", fontFamily: "'Trebuchet MS', sans-serif" }}
                                        >
                                            Ver
                                        </Button>
                                        <Button
                                            variant="contained"
                                            size="small"
                                            onClick={() => onEdit(p)}
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
                labelRowsPerPage="Filas por página:"
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                sx={{ fontFamily: "'Trebuchet MS', sans-serif" }}
            />
        </Paper>
    );
}
