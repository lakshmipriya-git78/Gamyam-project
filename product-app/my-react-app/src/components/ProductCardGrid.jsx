import React from "react";
 
export default function ProductCardGrid({ products = [], onEdit, onDelete }) {

  return (
<div className="grid-wrap">

      {products.length === 0 ? (
<div className="empty">No products found</div>

      ) : (

        products.map((p) => (
<div key={p.id} className="card">
<div className="card-head">
<strong>{p.name}</strong>
<span className="muted">#{p.id}</span>
</div>
<div className="card-body">
<p className="desc">{p.description}</p>
<div className="meta">
<span>Category: {p.category}</span>
<span>Stock: {p.stock}</span>
</div>
</div>
<div className="card-foot">
<div className="price">₹{p.price}</div>
<div className="card-actions">
<button onClick={() => onEdit(p)}>Edit</button>
<button className="danger" onClick={() => onDelete(p.id)}>Delete</button>
</div>
</div>
</div>

        ))

      )}
</div>

  );

}

 