import React from "react";
import { IoSearchOutline } from "react-icons/io5";
import "./Search.css"
export default function Search({ placeholder = "اكتب ما تريد البحث عنه", onChange }) {
  return (
    <div className="search-container">
      <IoSearchOutline className="search-icon" />
      
      <input
        type="text"
        placeholder={placeholder}
        className="search-input"
        onChange={onChange}
      />
    </div>
  );
}