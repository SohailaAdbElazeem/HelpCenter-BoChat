import React, { useMemo } from "react";
import Search from "../Search/Search";
import { useTranslation } from "react-i18next";
import { useSearch } from "../../Context/SearchContext";

const AccountSettings = () => {
	const { t, i18n } = useTranslation();
	const { searchTerm } = useSearch();
	const isLTR = i18n.language === "en";

	const settingsItems = t("accountSettings.items", { returnObjects: true });

	const filteredItems = useMemo(() => {
		if (!searchTerm.trim()) return settingsItems;

		const searchLower = searchTerm.toLowerCase().trim();
		return settingsItems.filter((item) =>
			item.toLowerCase().includes(searchLower),
		);
	}, [searchTerm, settingsItems]);

	return (
		<div
			className="min-vh-100 d-flex align-items-center justify-content-center p-4"
			style={{
				background:
					"linear-gradient(180deg, #D72229 30%, rgba(215, 34, 41, 0) 100%)",
			}}
		>
			<div className="w-100" style={{ maxWidth: "1100px", margin: "0 auto" }}>
				<Search />

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
						{t("accountSettings.title")}
					</div>
				</div>

				{searchTerm && (
					<div
						className="search-results"
						style={{
							textAlign: isLTR ? "left" : "right",
							marginBottom: "20px",
						}}
					>
						{/* {t("accountSettings.searchResults")} "{searchTerm}":  */}
						{/* <strong> {filteredItems.length} </strong>  */}
						{/* {filteredItems.length === 1 ? t("accountSettings.result") : t("accountSettings.results")} */}
					</div>
				)}

				{filteredItems.length > 0 ? (
					<div
						className="row gx-2 gy-3"
						style={{ marginBottom: "clamp(30px, 15vw, 500px)" }}
					>
						{filteredItems.map((item, index) => (
							<div key={index} className="col-12 col-md-6 d-flex">
								<div
									className="d-flex align-items-center px-4 shadow-sm"
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
										console.log("Selected:", item);
									}}
								>
									{/* Red Dot */}
									<div
										className="bg-danger rounded-circle flex-shrink-0"
										style={{
											width: "12px",
											height: "12px",
											marginLeft: isLTR ? "0" : "0px",
											marginRight: isLTR ? "10px" : "0",
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
										{highlightText(item, searchTerm)}
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
						}}
					>
						<p
							style={{ fontSize: "18px", color: "#666", marginBottom: "20px" }}
						>
							{t("accountSettings.noResults")}
						</p>
					</div>
				)}
			</div>
		</div>
	);
};

// Helper function to highlight search terms
function highlightText(text, searchTerm) {
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
}

export default AccountSettings;