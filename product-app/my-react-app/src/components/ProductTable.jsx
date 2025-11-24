import React from "react";
 
export default function ProductTable({ products = [], onEdit, onDelete }) {
  return (
<div className="table-wrap">
<table className="product-table">
<thead>
<tr>
<th>ID</th><th>Name</th><th>Price</th><th>Category</th><th>Stock</th><th>Active</th><th>Actions</th>
</tr>
</thead>
<tbody>
          {products.length === 0 ? (
<tr><td colSpan="7" className="empty">No products found</td></tr>
          ) : (
            products.map(p => (
<tr key={p.id}>
<td>{p.id}</td>
<td className="name-cell">{p.name}</td>
<td>₹{p.price}</td>
<td>{p.category}</td>
<td>{p.stock}</td>
<td>{p.isActive ? "Yes" : "No"}</td>
<td className="actions">
<button onClick={() => onEdit(p)}>Edit</button>
<button className="danger" onClick={() => onDelete(p.id)}>Delete</button>
</td>
</tr>
            ))
          )}
</tbody>
</table>
</div>
  );
}