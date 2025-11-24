import React, { useEffect, useMemo, useState } from "react";
import productsData from "./data/products.json";
import SearchBar from "./components/SearchBar";
import ProductTable from "./components/ProductTable";
import ProductCardGrid from "./components/ProductCardGrid";
import ProductForm from "./components/ProductForm";
import Pagination from "./components/Pagination";
 
export default function App() {
  const [products, setProducts] = useState([]);
  const [view, setView] = useState("table"); // 'table' | 'grid'
  const [query, setQuery] = useState("");
  const [editing, setEditing] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
 
  // pagination
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 6;
 
  useEffect(() => {
    // load products JSON into state
    setProducts(productsData || []);
  }, []);
 
  // debounced filter implemented in SearchBar component; here we just keep query
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return products;
    return products.filter((p) => p.name.toLowerCase().includes(q));
  }, [products, query]);
 
  // reset page when filter changes
  useEffect(() => setPage(1), [query]);
 
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageProducts = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
 
  // Add or update product (in-memory)
  function handleSave(product) {
    if (product.id) {
      setProducts((prev) => prev.map((p) => (p.id === product.id ? { ...p, ...product } : p)));
    } else {
      const id = products.length ? Math.max(...products.map((p) => p.id)) + 1 : 1;
      const createdAt = new Date().toISOString();
      setProducts((prev) => [{ ...product, id, createdAt, isActive: true }, ...prev]);
      setPage(1);
    }
    setIsFormOpen(false);
    setEditing(null);
  }
 
  function handleEdit(p) {
    setEditing(p);
    setIsFormOpen(true);
  }
 
  function handleDelete(id) {
    if (!confirm("Delete this product?")) return;
    setProducts((prev) => prev.filter((p) => p.id !== id));
  }
 
  return (
<div className="app">
<header className="header">
<h1>Product List</h1>
 
        <div className="controls">
<SearchBar onSearch={setQuery} debounceMs={500} placeholder="Search  product name..." />
<div className="view-toggle">
<button className={view === "table" ? "active" : ""} onClick={() => setView("table")}>List</button>
<button className={view === "grid" ? "active" : ""} onClick={() => setView("grid")}>Card</button>
</div>
<button className="add-btn" onClick={() => { setEditing(null); setIsFormOpen(true); }}>+ Add Product</button>
</div>
</header>
 
      <main className="main">
        {view === "table" ? (
<ProductTable products={pageProducts} onEdit={handleEdit} onDelete={handleDelete} />
        ) : (
<ProductCardGrid products={pageProducts} onEdit={handleEdit} onDelete={handleDelete} />
        )}
 
        <div className="footer">
<Pagination current={page} totalPages={totalPages} onChange={setPage} />
<div className="summary">Showing {filtered.length === 0 ? 0 : (page - 1) * PAGE_SIZE + 1} - {Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length}</div>
</div>
</main>
 
      {isFormOpen && (
<div className="modal-backdrop">
<div className="modal">
<h2>{editing ? "Edit Product" : "Add Product"}</h2>
<ProductForm initial={editing} onCancel={() => { setIsFormOpen(false); setEditing(null); }} onSave={handleSave} />
</div>
</div>
      )}
 
     
</div>
  );
}