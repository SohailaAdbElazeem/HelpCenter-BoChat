import  { useMemo } from "react";
import { useTranslation } from "react-i18next";
import Search from "../Search/Search";
import { useSearch } from "../../Context/SearchContext";

export default function NewAccount() {
	const { t, i18n } = useTranslation();
	const { searchTerm } = useSearch(); 
	const isLTR = i18n.language === "en";

 	const pageContent = useMemo(() => {
		const steps = [];
		for (let i = 1; i <= 9; i++) {
			steps.push(t(`newAccount.step${i}`));
		}
		
		const issues = [
			t("newAccount.issue1"),
			t("newAccount.issue2"),
			t("newAccount.issue3")
		];
		
		const articles = [];
		for (let i = 1; i <= 8; i++) {
			articles.push(t("newAccount.articleTitle"));
		}
		
		return {
			title: t("newAccount.title"),
			steps,
			commonIssues: t("newAccount.commonIssues"),
			errorMessage: t("newAccount.errorMessage"),
			issues,
			noCode: t("newAccount.noCode"),
			articles
		};
	}, [t]);
// eslint-disable-next-line no-unused-vars
 	const isSearchMatch = useMemo(() => {
		if (!searchTerm.trim()) return true;
		
		const searchLower = searchTerm.toLowerCase().trim();
		const allText = [
			pageContent.title,
			...pageContent.steps,
			pageContent.commonIssues,
			pageContent.errorMessage,
			...pageContent.issues,
			pageContent.noCode,
			...pageContent.articles
		].join(" ").toLowerCase();
		
		return allText.includes(searchLower);
	}, [searchTerm, pageContent]);

 	const highlightText = (text, searchTerm) => {
		if (!searchTerm || !searchTerm.trim()) return text;
		
		try {
			const regex = new RegExp(`(${searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
			const parts = text.split(regex);
			
			return parts.map((part, index) => 
				regex.test(part) ? (
					<mark key={index} className="search-highlight" style={{
						backgroundColor: "rgba(215, 34, 41, 0.2)",
						color: "black",
						fontWeight: "bold",
						padding: "0 2px",
						borderRadius: "4px",
					}}>
						{part}
					</mark>
				) : (
					<span key={index}>{part}</span>
				)
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
				direction: isLTR ? "ltr" : "rtl",
			}}
		>
			<div className="w-100" style={{ maxWidth: "1050px", margin: "0 auto" }}>
				{/* Search */}
				<Search />

				{/* Search Results Info */}
				{searchTerm && (
					<div
						className="search-results-info"
						style={{
							// textAlign: isLTR ? "left" : "right",
							// marginBottom: "20px",
							// padding: "12px 20px",
							// background: "rgba(255, 255, 255, 0.95)",
							// borderRadius: "12px",
							// color: "#D72229",
							// fontWeight: 500,
							// maxWidth: "600px",
							// margin: "20px auto",
							// animation: "fadeIn 0.3s ease-in-out",
						}}
					>
						{/* 🔍 {t("newAccount.searchResults")} "{searchTerm}": 
						<strong> {isSearchMatch ? t("newAccount.resultsFound") : t("newAccount.noResultsFound")}</strong> */}
					</div>
				)}

				{/* Header */}
				<div className="mb-5">
					<div
						className="fw-bold"
						style={{
							fontFamily: "'Cairo', sans-serif",
							fontWeight: 700,
							color: "#000000",
							fontSize: "clamp(30px, 8vw, 65px)",
							lineHeight: "clamp(25px, 5vw, 45px)",
							margin: "clamp(20px, 10vw, 90px) 0 clamp(20px, 8vw, 60px) 0",
							textAlign: isLTR ? "left" : "right",
						}}
					>
						{highlightText(t("newAccount.title"), searchTerm)}
					</div>
				</div>

				<div
					className={`d-flex align-items-center ${!isLTR ? "flex-row-reverse" : ""}`}
					style={{
						color: "#ffffff",
						justifyContent: isLTR ? "flex-start" : "flex-end",
						gap: "10px",
					}}
				>
					<p className={isLTR ? "me-4" : "ms-5"}>
						{t("newAccount.lastUpdated")} [{t("newAccount.april2025")}]
					</p>
					<p>{t("newAccount.updated")}</p>
				</div>

				{/* Steps Section */}
				<div className="steps" style={{ textAlign: isLTR ? "left" : "right" }}>
					<h5>{highlightText(t("newAccount.steps"), searchTerm)}</h5>
					<ol className="mx-3">
						{Array.from({ length: 9 }).map((_, index) => {
							const stepText = t(`newAccount.step${index + 1}`);
							return (
								<li key={index}>
									{highlightText(stepText, searchTerm)}
								</li>
							);
						})}
					</ol>
				</div>

				{/* Common Issues Section */}
				<div className="" style={{ textAlign: isLTR ? "left" : "right" }}>
					<h5>{highlightText(t("newAccount.commonIssues"), searchTerm)}</h5>
					<p>{highlightText(t("newAccount.errorMessage"), searchTerm)}</p>
					<ul className="mx-3" style={{ listStyleType: "square" }}>
						<li>{highlightText(t("newAccount.issue1"), searchTerm)}</li>
						<li>{highlightText(t("newAccount.issue2"), searchTerm)}</li>
						<li>{highlightText(t("newAccount.issue3"), searchTerm)}</li>
					</ul>
					<span>{highlightText(t("newAccount.noCode"), searchTerm)}</span>
				</div>

				{/* Feedback Section */}
				<div className="d-flex flex-column align-items-center justify-content-center mt-5 mb-5 px-3">
					<h5
						style={{
							fontSize: "clamp(18px, 5vw, 24px)",
							fontFamily: "'Cairo', sans-serif",
							fontWeight: 600,
							color: "#000000",
							textAlign: "center",
							marginBottom: "clamp(15px, 4vw, 25px)",
						}}
					>
						{highlightText(t("newAccount.foundAnswer"), searchTerm)}
					</h5>

					<div className="d-flex flex-wrap justify-content-center gap-3 mb-3">
						<button
							className="mx-2"
							style={{
								width: "clamp(120px, 30vw, 150px)",
								height: "clamp(45px, 8vh, 50px)",
								borderRadius: "clamp(14px, 4vw, 18px)",
								border: "none",
								background: "#FFFFFF",
								fontFamily: "'Cairo', sans-serif",
								fontSize: "clamp(14px, 3.5vw, 16px)",
								fontWeight: 600,
								color: "#D72229",
								cursor: "pointer",
								transition: "all 0.3s ease",
								boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
							}}
							onMouseEnter={(e) => {
								e.currentTarget.style.transform = "translateY(-2px)";
								e.currentTarget.style.boxShadow =
									"0 4px 12px rgba(0, 0, 0, 0.15)";
							}}
							onMouseLeave={(e) => {
								e.currentTarget.style.transform = "translateY(0)";
								e.currentTarget.style.boxShadow =
									"0 2px 8px rgba(0, 0, 0, 0.1)";
							}}
							onClick={() => console.log("Yes clicked")}
						>
							{t("newAccount.yes")}
						</button>

						<button
							style={{
								width: "clamp(120px, 30vw, 150px)",
								height: "clamp(45px, 8vh, 50px)",
								borderRadius: "clamp(14px, 4vw, 18px)",
								border: "none",
								background: "#FFFFFF",
								fontFamily: "'Cairo', sans-serif",
								fontSize: "clamp(14px, 3.5vw, 16px)",
								fontWeight: 600,
								color: "#D72229",
								cursor: "pointer",
								transition: "all 0.3s ease",
								boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
							}}
							onMouseEnter={(e) => {
								e.currentTarget.style.transform = "translateY(-2px)";
								e.currentTarget.style.boxShadow =
									"0 4px 12px rgba(0, 0, 0, 0.15)";
							}}
							onMouseLeave={(e) => {
								e.currentTarget.style.transform = "translateY(0)";
								e.currentTarget.style.boxShadow =
									"0 2px 8px rgba(0, 0, 0, 0.1)";
							}}
							onClick={() => console.log("Not helpful clicked")}
						>
							{t("newAccount.notHelpful")}
						</button>
					</div>

					<p
						style={{
							fontFamily: "'Cairo', sans-serif",
							fontSize: "clamp(12px, 3.5vw, 14px)",
							color: "#000000",
							textAlign: "center",
							marginTop: "clamp(10px, 3vw, 15px)",
							marginBottom: "clamp(15px, 4vw, 20px)",
						}}
					>
						{t("newAccount.feedbackCount")}
					</p>

					<span
						style={{
							width: "min(1020px, 90%)",
							maxWidth: "1020px",
							height: "1px",
							background: "#000000",
							margin: "0 auto",
						}}
					></span>
				</div>

				{/* Articles Section */}
				<h4 className="mb-4" style={{ textAlign: isLTR ? "left" : "right" }}>
					{highlightText(t("newAccount.articles"), searchTerm)}
				</h4>
				<div className="row gx-2 gy-3">
					{Array.from({ length: 8 }).map((_, index) => (
						<div key={index} className="col-12 col-md-6 d-flex">
							<div
								className="d-flex align-items-center px-4 shadow-sm"
								style={{
									width: "100%",
									height: "60px",
									background: "#EDEDED",
									borderRadius: "28px",
									flexDirection: isLTR ? "row" : "row-reverse",
									transition: "all 0.3s ease",
									cursor: "pointer",
								}}
								onMouseEnter={(e) => {
									e.currentTarget.style.background = "#e0e0e0";
								}}
								onMouseLeave={(e) => {
									e.currentTarget.style.background = "#EDEDED";
								}}
								onClick={() => console.log("Article clicked:", index)}
							>
								{/* Red Dot */}
								<div
									className="bg-danger rounded-circle flex-shrink-0"
									style={{
										width: "12px",
										height: "12px",
										marginLeft: isLTR ? "0" : "10px",
										marginRight: isLTR ? "10px" : "0",
									}}
								></div>

								{/* Text */}
								<span
									className="fw-semibold fs-5 flex-grow-1 px-3"
									style={{
										fontFamily: "'Cairo', sans-serif",
										fontSize: "clamp(16px, 4vw, 25px)",
										color: "#000000",
										textAlign: isLTR ? "left" : "right",
									}}
								>
									{highlightText(t("newAccount.articleTitle"), searchTerm)}
								</span>
							</div>
						</div>
					))}
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