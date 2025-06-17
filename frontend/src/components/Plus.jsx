import React, { useState } from "react";
import plus from "../assets/plus.png";

const API_URL = import.meta.env.PUBLIC_API_URL || "http://localhost:3000";

export default function AddQuantity({ id, onUpdated }) {
  const [showForm, setShowForm] = useState(false);
  const [quantity, setQuantity] = useState("");
  const [loading, setLoading] = useState(false);

  const toggleForm = () => setShowForm((v) => !v);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const cantidad = parseInt(quantity);
    if (isNaN(cantidad) || cantidad <= 0)
      return alert("Ingresa una cantidad válida");

    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/api/products/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sum: cantidad }),
      });
      if (res.ok) {
        onUpdated?.();
        setShowForm(false);
        setQuantity("");
      } else {
        alert("No se pudo actualizar el producto.");
      }
    } catch (err) {
      alert("Error de red.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="inline-block relative">
      <button type="button" onClick={toggleForm} className="p-1">
        <img
          src={plus.default || plus.src || plus.url || plus}
          alt="Sumar stock"
          className="h-6 w-6"
        />
      </button>

      {showForm && (
        <div className="absolute z-10 mt-2 right-0 bg-white rounded shadow-md p-2 w-48">
          <form onSubmit={handleSubmit}>
            <label className="block mb-2">
              Cantidad:
              <input
                type="number"
                min="1"
                className="mt-1 block w-full border border-gray-300 rounded px-2 py-1 text-sm"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                disabled={loading}
                autoFocus
              />
            </label>
            <button
              type="submit"
              className="mt-2 bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 shadow-md"
              disabled={loading}
            >
              {loading ? "Agregando..." : "Agregar"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
