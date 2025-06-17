import React, { useState } from "react";
import modify from "../assets/modify.png";

const API_URL = import.meta.env.PUBLIC_API_URL || "http://localhost:3000";

export default function Modify({ id, onUpdated }) {
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [exp, setExp] = useState("");
  const [loading, setLoading] = useState(false);

  const toggleForm = () => setShowForm((v) => !v);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const body = {};
    if (name.trim()) body.name = name.trim();
    if (price) body.price = parseFloat(price);
    if (exp) body.exp = exp;

    try {
      const res = await fetch(`${API_URL}/api/products/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (res.ok) {
        onUpdated?.();
        setShowForm(false);
        setName("");
        setPrice("");
        setExp("");
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
        <img src={modify.default || modify.src || modify.url || modify} alt="Modificar" className="h-6 w-6" />
      </button>

      {showForm && (
        <div className="absolute z-10 mt-2 right-0 bg-white rounded shadow-md p-2 w-64">
          <form onSubmit={handleSubmit}>
            <label className="block mb-2">
              Nombre:
              <input
                type="text"
                className="mt-1 block w-full border border-gray-300 rounded px-2 py-1 text-sm"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={loading}
              />
            </label>

            <label className="block mb-2">
              Precio:
              <input
                type="number"
                step="0.01"
                className="mt-1 block w-full border border-gray-300 rounded px-2 py-1 text-sm"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                disabled={loading}
              />
            </label>

            <label className="block mb-2">
              Expira:
              <input
                type="date"
                className="mt-1 block w-full border border-gray-300 rounded px-2 py-1 text-sm"
                value={exp}
                onChange={(e) => setExp(e.target.value)}
                disabled={loading}
              />
            </label>

            <button
              type="submit"
              className="mt-2 bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 shadow-md"
              disabled={loading}
            >
              {loading ? "Actualizando..." : "Actualizar"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
