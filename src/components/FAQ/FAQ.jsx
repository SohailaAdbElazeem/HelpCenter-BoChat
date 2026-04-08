import React, { useMemo } from "react";
import "./FAQ.modules.CSS";
import Search from "../Search/Search";
import { useTranslation } from "react-i18next";
import { useSearch } from "../../Context/SearchContext";

export default function FAQ() {
	const { t, i18n } = useTranslation();
	const { searchTerm } = useSearch();
	const isLTR = i18n.language === "en";

	const questionsData = t("faq.questions", { returnObjects: true });

	const filteredQuestions = useMemo(() => {
		if (!searchTerm.trim()) return questionsData;

		const searchLower = searchTerm.toLowerCase().trim();
		return questionsData.filter((question) =>
			question.toLowerCase().includes(searchLower),
		);
	}, [searchTerm, questionsData]);

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
		<div>
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

					{/* Header */}
					<div className="mb-5">
						<div
							className="fw-bold mx-4"
							style={{
								fontFamily: "'Cairo', sans-serif",
								fontWeight: 700,
								color: "#000000",
								maxWidth: "800px",
								fontSize: "clamp(20px, 8vw, 65px)",
								lineHeight: "clamp(20px, 6vw, 55px)",
								margin: "clamp(10px, 10vw, 90px) 0 clamp(10px, 8vw, 60px) 0",
								textAlign: isLTR ? "left" : "right",
								direction: isLTR ? "ltr" : "rtl",
								unicodeBidi: "plaintext",
							}}
						>
							{t("faq.title")}
						</div>
					</div>

					{/* Search Results Info */}
					{searchTerm && (
						<div
							className="search-results-info"
							// style={{
							// 	textAlign: isLTR ? "left" : "right",
							// 	marginBottom: "20px",
							// 	padding: "12px 20px",
							// 	background: "rgba(255, 255, 255, 0.95)",
							// 	borderRadius: "12px",
							// 	color: "#D72229",
							// 	fontWeight: 500,
							// 	maxWidth: "600px",
							// 	margin: "0 auto 20px auto",
							// 	animation: "fadeIn 0.3s ease-in-out",
							// }}
						>
							{/* 🔍 {t("faq.searchResults")} "{searchTerm}": 
							<strong> {filteredQuestions.length} </strong> 
							{filteredQuestions.length === 1 ? t("faq.question") : t("faq.questions")} */}
						</div>
					)}

					{/* Questions Section */}
					{filteredQuestions.length > 0 ? (
						<div
							className="row gx-3 gy-3"
							style={{ marginBottom: "clamp(30px, 15vw, 500px)" }}
						>
							{filteredQuestions.map((item, index) => (
								<div key={index} className="col-12">
									<div
										className="d-flex align-items-center shadow-sm px-3 px-sm-4 px-md-5"
										style={{
											width: "100%",
											maxWidth: "min(1032px, 95%)",
											minHeight: "clamp(50px, 8vh, 70px)",
											background: "#EDEDED",
											borderRadius: "clamp(16px, 5vw, 28px)",
											margin: "0 auto",
											gap: "clamp(8px, 2vw, 15px)",
											flexDirection: isLTR ? "row-reverse" : "row",
											transition: "all 0.3s ease",
											cursor: "pointer",
										}}
										onClick={() => {
											console.log("Question clicked:", item);
										}}
										onMouseEnter={(e) => {
											e.currentTarget.style.background = "#e0e0e0";
											e.currentTarget.style.transform = "translateX(5px)";
										}}
										onMouseLeave={(e) => {
											e.currentTarget.style.background = "#EDEDED";
											e.currentTarget.style.transform = "translateX(0)";
										}}
									>
										{/* Red Dot */}
										<div
											className="bg-danger rounded-circle flex-shrink-0"
											style={{
												width: "clamp(8px, 2.5vw, 15px)",
												height: "clamp(8px, 2.5vw, 15px)",
											}}
										></div>

										{/* Question Text with Highlight */}
										<span
											className="text-danger fw-semibold flex-grow-1"
											style={{
												fontFamily: "'Cairo', sans-serif",
												fontSize: "clamp(10px, 4vw, 18px)",
												lineHeight: "1.4",
												wordBreak: "break-word",
												textAlign: isLTR ? "left" : "right",
												direction: isLTR ? "ltr" : "rtl",
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
								animation: "fadeIn 0.3s ease-in-out",
							}}
						>
							<p
								style={{
									fontSize: "18px",
									color: "#666",
									marginBottom: "20px",
								}}
							>
								{t("faq.noResults", { searchTerm })}
							</p>
						</div>
					)}
				</div>
			</div>

			<style jsx>{`
				@keyframes fadeIn {
					from {
						opacity: 0;
						transform: translateY(10px);
					}
					to {
						opacity: 1;
						transform: translateY(0);
					}
				}
			`}</style>
		</div>
	);
}
