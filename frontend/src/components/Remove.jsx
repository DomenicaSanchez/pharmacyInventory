import React, { useState } from "react";
import remove from "../assets/remove.png";

const API_URL = import.meta.env.PUBLIC_API_URL || "http://localhost:3000";

export default function RemoveProduct({ id, onRemoved }) {
  const [loading, setLoading] = useState(false);

  const handleRemove = async () => {
    if (!confirm("¿Estás seguro de eliminar este producto?")) return;

    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/products/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        onRemoved?.();
      } else {
        const text = await res.text();
        console.error("Error del servidor:", text);
        alert("No se pudo borrar el producto.");
      }
    } catch (error) {
      alert("Error de red.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="inline-block relative">
      <button
        className="p-1"
        onClick={handleRemove}
        disabled={loading}
        aria-label="Eliminar producto"
      >
        <img src={remove.default || remove.src || remove.url || remove} alt="Eliminar" className="h-6 w-6" style={{ opacity: loading ? 0.5 : 1 }} />
      </button>
    </div>
  );
}
