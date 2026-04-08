import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import Search from "../Search/Search";
import "./JoinUs.modules.css";
import { useNavigate } from "react-router-dom";
import { useSearch } from "../../Context/SearchContext";
import hand from "../../assests/hand.PNG";
import edit from "../../assests/edit.PNG";
import Static from "../../assests/Sta.PNG";

export default function JoinUs() {
	const { t, i18n } = useTranslation();
	const { searchTerm } = useSearch(); 
	const isLTR = i18n.language === "en";
	const navigate = useNavigate();

	

 	const boxesWithTranslations = useMemo(() => {
		const boxesData = [
		{
			imageUrl: hand,
			headerKey: "joinUs.ambassadorProgram",
			textKey: "joinUs.ambassadorText",
			path: "/Ambassadors"
		},
		{
			imageUrl: Static,
			headerKey: "joinUs.investWithUs",
			textKey: "joinUs.investText",
			path: '/Invest'
		},
		{
			imageUrl: edit,
			headerKey: "joinUs.developers",
			textKey: "joinUs.developersText",
			path: '/Developers'
		},
	];
		return boxesData.map(box => ({
			...box,
			header: t(box.headerKey),
			text: t(box.textKey)
		}));
	}, [t]);

	const filteredBoxes = useMemo(() => {
		if (!searchTerm.trim()) return boxesWithTranslations;
		
		const searchLower = searchTerm.toLowerCase().trim();
		return boxesWithTranslations.filter((box) => 
			box.header.toLowerCase().includes(searchLower) ||
			box.text.toLowerCase().includes(searchLower)
		);
	}, [searchTerm, boxesWithTranslations]);

 	const highlightText = (text, searchTerm) => {
		if (!searchTerm || !searchTerm.trim()) return text;
		
		try {
			const regex = new RegExp(`(${searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
			const parts = text.split(regex);
			
			return parts.map((part, index) => 
				regex.test(part) ? (
					<mark key={index} className="search-highlight" style={{
						backgroundColor: "rgba(215, 34, 41, 0.2)",
						color: "#D72229",
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
		<div className="joinSec" style={{ direction: isLTR ? "ltr" : "rtl" }}>
			<h2
				className="title"
				style={{
					textAlign: isLTR ? "left" : "right",
				}}
			>
				{t("joinUs.title")}
			</h2>
			<p
				className="text-join"
				style={{
					textAlign: isLTR ? "left" : "right",
				}}
			>
				{t("joinUs.description")}
			</p>
			
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
					{/* 🔍 {t("joinUs.searchResults")} "{searchTerm}": 
					<strong> {filteredBoxes.length} </strong> 
					{filteredBoxes.length === 1 ? t("joinUs.result") : t("joinUs.results")} */}
				</div>
			)}
			
			{/* Boxes Section */}
			{filteredBoxes.length > 0 ? (
				<div className="boxes-section">
					{filteredBoxes.map((box, index) => (
						<div 
							className="box" 
							key={index} 						
							onClick={() => navigate(box.path)}
							style={{ 
								cursor: "pointer",
								animation: "fadeIn 0.3s ease-in-out",
								transition: "all 0.3s ease",
							}}
							onMouseEnter={(e) => {
								e.currentTarget.style.transform = "translateY(-5px)";
							}}
							onMouseLeave={(e) => {
								e.currentTarget.style.transform = "translateY(0)";
							}}
						>
							<div
								className="card"
								style={{
									alignItems: isLTR ? "flex-start" : "flex-end",
									textAlign: isLTR ? "left" : "right",
								}}
							>
								<div
									className="icon-box"
									style={{
										alignSelf: isLTR ? "flex-end" : "flex-start",
									}}
								>
									<img
										src={box.imageUrl}
										alt={box.header}
										style={{
											width: "40px",
											height: "40px",
											objectFit: "contain",
										}}
									/>
								</div>
								<h3
									className="box-title"
									style={{
										fontSize: isLTR
											? "clamp(13px, 3vw, 16px)"
											: "clamp(15px, 3.5vw, 18px)",
										margin: "10px 0 5px",
										fontWeight: 600,
										textAlign: isLTR ? "left" : "right",
										width: "100%",
									}}
								>
									{highlightText(box.header, searchTerm)}
								</h3>
								<p
									style={{
										fontSize: isLTR
											? "clamp(11px, 2.5vw, 13px)"
											: "clamp(12px, 3vw, 14px)",
										textAlign: isLTR ? "left" : "right",
										width: "100%",
									}}
								>
									{highlightText(box.text, searchTerm)}
								</p>
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
					<p style={{ fontSize: "18px", color: "#666", marginBottom: "20px" }}>
						 {t("joinUs.noResults", { searchTerm })}
					</p>
				</div>
			)}
		</div>
	);
}