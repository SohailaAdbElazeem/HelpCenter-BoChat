import React, { useMemo } from "react";
import Search from "../Search/Search";
import { useTranslation } from "react-i18next";
import { useSearch } from "../../Context/SearchContext";

const Developers = () => {
	const { t, i18n } = useTranslation();
	const { searchTerm } = useSearch();
	const isLTR = i18n.language === "en";

	const DevelopersObject = t("Developers", { returnObjects: true });

	const developersArray = useMemo(() => {
		return Object.keys(DevelopersObject)
			.filter((key) => key !== "title")
			.map((key) => ({
				key: key,
				name: DevelopersObject[key],
			}));
	}, [DevelopersObject]);

	const filteredDevelopers = useMemo(() => {
		if (!searchTerm.trim()) return developersArray;

		const searchLower = searchTerm.toLowerCase().trim();
		return developersArray.filter((developer) =>
			developer.name.toLowerCase().includes(searchLower),
		);
	}, [searchTerm, developersArray]);

	const highlightText = (text, searchTerm) => {
		if (!searchTerm || !searchTerm.trim()) return text;

		try {
			const regex = new RegExp(
				`(${searchTerm.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`,
				"gi",
			);
			const parts = text.split(regex);

			return parts.map((part, index) =>
				regex.test(part) ? (
					<mark
						key={index}
						className="search-highlight"
						style={{
							backgroundColor: "rgba(215, 34, 41, 0.2)",
							color: "#D72229",
							fontWeight: "bold",
							padding: "0 2px",
							borderRadius: "4px",
						}}
					>
						{part}
					</mark>
				) : (
					<span key={index}>{part}</span>
				),
			);
		} catch (error) {
			return text;
		}
	};

	return (
		<div
			className="min-vh-100 d-flex align-items-center justify-content-center p-4"
			style={{
				background:
					"linear-gradient(180deg, #D72229 30%, rgba(215, 34, 41, 0) 100%)",
			}}
		>
			<div className="w-100" style={{ maxWidth: "1100px", margin: "0 auto" }}>
				{/* Search Component */}
				<Search />

				{/* Title */}
				<div className="mb-5">
					<div
						className="fw-bold"
						style={{
							fontFamily: "'Cairo', sans-serif",
							fontWeight: 700,
							color: "#000000",
							fontSize: "clamp(30px, 8vw, 65px)",
							lineHeight: "clamp(35px, 6vw, 55px)",
							margin: "clamp(20px, 10vw, 90px) 0 clamp(20px, 8vw, 60px) 0",
							textAlign: isLTR ? "left" : "right",
						}}
					>
						{DevelopersObject.title}
					</div>
				</div>

				{/* Search Results Info */}
				{searchTerm && (
					<div
						className="search-results-info"
						// style={{
						//   textAlign: isLTR ? "left" : "right",
						//   marginBottom: "20px",
						//   padding: "12px 20px",
						//   background: "rgba(255, 255, 255, 0.95)",
						//   borderRadius: "12px",
						//   color: "#D72229",
						//   fontWeight: 500,
						//   animation: "fadeIn 0.3s ease-in-out",
						// }}
					>
						{/* 🔍 {t("developers.searchResults")} "{searchTerm}": 
            <strong> {filteredDevelopers.length} </strong> 
            {filteredDevelopers.length === 1 ? t("developers.result") : t("developers.results")} */}
					</div>
				)}

				{/* Items */}
				{filteredDevelopers.length > 0 ? (
					<div
						className="row gx-2 gy-3"
						style={{ marginBottom: "clamp(30px, 15vw, 500px)" }}
					>
						{filteredDevelopers.map((developer, index) => (
							<div
								key={developer.key || index}
								className="col-12 col-md-6 d-flex justify-content-center"
							>
								<div
									className="d-flex align-items-center px-4 shadow-sm developer-item"
									style={{
										width: "100%",
										maxWidth: "509px",
										height: "60px",
										background: "#EDEDED",
										borderRadius: "28px",
										opacity: 1,
										flexDirection: isLTR ? "row-reverse" : "row",
										transition: "all 0.3s ease",
										cursor: "pointer",
									}}
									onClick={() => {
										console.log("Selected developer:", developer.name);
									}}
									onMouseEnter={(e) => {
										e.currentTarget.style.transform = "translateX(5px)";
										e.currentTarget.style.background = "#e0e0e0";
									}}
									onMouseLeave={(e) => {
										e.currentTarget.style.transform = "translateX(0)";
										e.currentTarget.style.background = "#EDEDED";
									}}
								>
									{/* Red Dot */}
									<div
										className="bg-danger rounded-circle flex-shrink-0"
										style={{
											width: "12px",
											height: "12px",
											marginRight: isLTR ? "10px" : "0",
											marginLeft: isLTR ? "0" : "10px",
										}}
									></div>

									{/* Text with highlight */}
									<span
										className="text-danger fw-semibold fs-5 flex-grow-1 px-3"
										style={{
											fontFamily: "'Cairo', sans-serif",
											textAlign: isLTR ? "left" : "right",
										}}
									>
										{highlightText(developer.name, searchTerm)}
									</span>
								</div>
							</div>
						))}
					</div>
				) : (
					<div
						className="no-results"
						style={{
							textAlign: "center",
							padding: "60px 20px",
							background: "rgba(255, 255, 255, 0.9)",
							borderRadius: "20px",
							margin: "40px auto",
							maxWidth: "500px",
							animation: "fadeIn 0.3s ease-in-out",
						}}
					>
						<p
							style={{ fontSize: "18px", color: "#666", marginBottom: "20px" }}
						>
							{t("developers.noResults", { searchTerm })}
						</p>
					</div>
				)}
			</div>
		</div>
	);
};

export default Developers;
