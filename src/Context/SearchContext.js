import React, { createContext, useState, useContext, useCallback } from "react";

const SearchContext = createContext();

export const useSearch = () => {
	const context = useContext(SearchContext);
	if (!context) {
		throw new Error("useSearch must be used within SearchProvider");
	}
	return context;
};

export const SearchProvider = ({ children }) => {
	const [searchTerm, setSearchTerm] = useState("");
	const [filteredData, setFilteredData] = useState({
		boxes: [],
		faqs: [],
	});

	const updateFilteredData = useCallback(
		(boxes, faqs) => {
			if (!searchTerm.trim()) {
				setFilteredData({ boxes, faqs });
				return;
			}

			const searchLower = searchTerm.toLowerCase().trim();

			const filteredBoxes = boxes.filter(
				(box) =>
					box.title?.toLowerCase().includes(searchLower) ||
					box.description?.toLowerCase().includes(searchLower),
			);

			const filteredFaqs = faqs.filter(
				(faq) =>
					faq.question?.toLowerCase().includes(searchLower) ||
					faq.answer?.toLowerCase().includes(searchLower),
			);

			setFilteredData({ boxes: filteredBoxes, faqs: filteredFaqs });
		},
		[searchTerm],
	);

	const clearSearch = useCallback(() => {
		setSearchTerm("");
	}, []);

	return (
		<SearchContext.Provider
			value={{
				searchTerm,
				setSearchTerm,
				filteredData,
				updateFilteredData,
				clearSearch,
			}}
		>
			{children}
		</SearchContext.Provider>
	);
};
