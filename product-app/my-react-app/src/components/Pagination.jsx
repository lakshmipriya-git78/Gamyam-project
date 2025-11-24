import React from "react";
 
export default function Pagination({ current = 1, totalPages = 1, onChange }) {
  if (totalPages <= 1) return null;
  const pages = [];
  for (let i = 1; i <= totalPages; i++) pages.push(i);
 
  return (
<div className="pagination">
<button onClick={() => onChange(Math.max(1, current - 1))}>Prev</button>
      {pages.map((p) => (
<button key={p} className={p === current ? "active" : ""} onClick={() => onChange(p)}>{p}</button>
      ))}
<button onClick={() => onChange(Math.min(totalPages, current + 1))}>Next</button>
</div>
  );
}