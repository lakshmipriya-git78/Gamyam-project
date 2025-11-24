import React, { useEffect, useState } from "react";
 
export default function SearchBar({ onSearch, debounceMs = 500, placeholder = "Search..." }) {

  const [text, setText] = useState("");
 
  useEffect(() => {

    const t = setTimeout(() => onSearch(text), debounceMs);

    return () => clearTimeout(t);

  }, [text, debounceMs, onSearch]);
 
  return (
<input

      className="search-input"

      placeholder={placeholder}

      value={text}

      onChange={(e) => setText(e.target.value)}

    />

  );

}

 