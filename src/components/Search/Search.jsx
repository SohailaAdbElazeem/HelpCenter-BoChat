import React from "react";
import { IoSearchOutline } from "react-icons/io5";
import { useTranslation } from "react-i18next";
import { useSearch } from "../../Context/SearchContext";
import "./Search.css";

export default function Search({ onChange }) {
	const { t, i18n } = useTranslation();
	const { searchTerm, setSearchTerm, clearSearch } = useSearch();
	const isLTR = i18n.language === "en";

	const handleChange = (e) => {
		const value = e.target.value;
		setSearchTerm(value);

		if (onChange) {
			onChange(e);
		}
	};

	const handleClear = () => {
		clearSearch();
		if (onChange) {
			onChange({ target: { value: "" } });
		}
	};

	return (
		<div className={`search-container ${isLTR ? "ltr" : "rtl"}`}>
			<IoSearchOutline className="search-icon" />

			<input
				type="text"
				value={searchTerm}
				placeholder={t("search.placeholder")}
				className="search-input"
				onChange={handleChange}
				dir={isLTR ? "ltr" : "rtl"}
				style={{ textAlign: isLTR ? "left" : "right" }}
			/>

			{/* زر مسح البحث - يظهر فقط عند وجود نص */}
			{/* {searchTerm && (
				<button 
					onClick={handleClear} 
					className="search-clear-btn"
					aria-label="Clear search"
				>
					✕
				</button>
			)} */}
		</div>
	);
}
