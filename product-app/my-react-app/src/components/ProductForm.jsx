import React, { useEffect, useMemo, useState } from "react";
 
export default function ProductForm({ initial = null, onSave, onCancel }) {

  const [form, setForm] = useState({

    name: "",

    price: "",

    category: "",

    stock: "",

    description: "",

    isActive: true,

  });

  const [touched, setTouched] = useState({});
 
  useEffect(() => {

    if (initial) {

      setForm({

        name: initial.name ?? "",

        price: initial.price ?? "",

        category: initial.category ?? "",

        stock: initial.stock ?? 0,

        description: initial.description ?? "",

        isActive: initial.isActive ?? true,

        id: initial.id ?? undefined,

      });

    } else {

      setForm({ name: "", price: "", category: "", stock: "", description: "", isActive: true });

    }

    setTouched({});

  }, [initial]);
 
  const errors = useMemo(() => {

    const e = {};

    if (!form.name || form.name.toString().trim().length === 0) e.name = "Name required";

    if (form.price === "" || isNaN(Number(form.price))) e.price = "Price must be a number";

    if (!form.category || form.category.toString().trim().length === 0) e.category = "Category required";

    if (form.stock !== "" && (isNaN(Number(form.stock)) || Number(form.stock) < 0)) e.stock = "Stock must be a non-negative number";

    return e;

  }, [form]);
 
  function handleChange(e) {

    const { name, value, type, checked } = e.target;

    setForm((s) => ({ ...s, [name]: type === "checkbox" ? checked : value }));

  }
 
  function handleBlur(e) {

    setTouched((t) => ({ ...t, [e.target.name]: true }));

  }
 
  function submit(e) {

    e.preventDefault();

    setTouched({ name: true, price: true, category: true, stock: true });

    if (Object.keys(errors).length === 0) {

      const payload = {

        ...form,

        price: Number(form.price),

        stock: form.stock === "" ? 0 : Number(form.stock),

      };

      onSave(payload);

    }

  }
 
  return (
<form className="product-form" onSubmit={submit}>
<label>

        Name *
<input name="name" value={form.name} onChange={handleChange} onBlur={handleBlur} />

        {touched.name && errors.name && <div className="error">{errors.name}</div>}
</label>
 
      <label>

        Price *
<input name="price" value={form.price} onChange={handleChange} onBlur={handleBlur} />

        {touched.price && errors.price && <div className="error">{errors.price}</div>}
</label>
 
      <label>

        Category *
<input name="category" value={form.category} onChange={handleChange} onBlur={handleBlur} />

        {touched.category && errors.category && <div className="error">{errors.category}</div>}
</label>
 
      <label>

        Stock
<input name="stock" value={form.stock} onChange={handleChange} onBlur={handleBlur} />

        {touched.stock && errors.stock && <div className="error">{errors.stock}</div>}
</label>
 
      <label>

        Description
<textarea name="description" value={form.description} onChange={handleChange} />
</label>
 
      <label className="checkbox-label">
<input type="checkbox" name="isActive" checked={!!form.isActive} onChange={handleChange}  />

        <span>Active</span>
</label>
 
      <div className="form-actions">
<button type="button" onClick={onCancel}>Cancel</button>
<button type="submit" className="primary">Save</button>
</div>
</form>

  );

}

 