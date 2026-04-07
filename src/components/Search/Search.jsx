import React from "react";
import { IoSearchOutline } from "react-icons/io5";
import { useTranslation } from "react-i18next";
import "./Search.css";

export default function Search({ onChange }) {
	const { t, i18n } = useTranslation();

	const isLTR = i18n.language === "en";

	return (
		<div className={`search-container ${isLTR ? "ltr" : "rtl"}`}>
			<IoSearchOutline className="search-icon" />

			<input
				type="text"
				placeholder={t("search.placeholder")}
				className="search-input"
				onChange={onChange}
				dir={isLTR ? "ltr" : "rtl"}
				style={{ textAlign: isLTR ? "left" : "right" }}
			/>
		</div>
	);
}