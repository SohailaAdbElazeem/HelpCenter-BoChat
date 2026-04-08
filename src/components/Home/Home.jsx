import React, { useState, useMemo, useEffect } from "react";
import "./Home.modules.css";
import plus from "../../assests/plus.svg";
import Search from "../Search/Search";
import { Link, useNavigate } from "react-router-dom";
import userLock from "../../assests/user-lock 1.svg";
import SendClock from "../../assests/Vector.svg";
import feature from "../../assests/features 1.svg";
import uxbrowser from "../../assests/ux-browser 1.svg";
import setting from "../../assests/Vector (1).svg";
import creadit from "../../assests/credit-card 1.svg";
import brain from "../../assests/brain.PNG";
import { useTranslation } from "react-i18next";
import { useSearch } from "../../Context/SearchContext";

const boxesData = [
	{ imageSrc: userLock, key: "security", path: "/specialtiesAndSecurity" },
	{ imageSrc: SendClock, key: "quickstart", path: "/quickstart" },
	{ imageSrc: feature, key: "features", path: "/smartFeatures" },
	{ imageSrc: uxbrowser, key: "personalize", path: "/personalizeExp" },
	{ imageSrc: setting, key: "settings", path: "/accountSettings" },
	{ imageSrc: creadit, key: "subscriptions", path: "/subscriptions" },
];

export default function Home() {
	const { t, i18n } = useTranslation();
	const [activeIndex, setActiveIndex] = useState(null);
	const navigate = useNavigate();

	const { searchTerm, clearSearch } = useSearch();

	const questionsData = t("home.faq.questions", { returnObjects: true });

	const toggleQuestion = (index) => {
		setActiveIndex(activeIndex === index ? null : index);
	};

	const filteredBoxes = useMemo(() => {
		if (!searchTerm.trim()) return boxesData;

		const searchLower = searchTerm.toLowerCase().trim();
		return boxesData.filter((box) => {
			const header = t(`home.boxes.${box.key}.header`).toLowerCase();
			const text = t(`home.boxes.${box.key}.text`).toLowerCase();
			return header.includes(searchLower) || text.includes(searchLower);
		});
	}, [searchTerm, t]);

	const filteredQuestions = useMemo(() => {
		if (!searchTerm.trim()) return questionsData;

		const searchLower = searchTerm.toLowerCase().trim();
		return questionsData.filter((item) => {
			const question = item.q.toLowerCase();
			const answer = item.a.toLowerCase();
			return question.includes(searchLower) || answer.includes(searchLower);
		});
	}, [searchTerm, questionsData]);

	useEffect(() => {
		if (searchTerm && activeIndex !== null) {
			setActiveIndex(null);
		}
	}, [searchTerm]);

	return (
		<div className="home-container">
			<h1 className={`home-title ${i18n.language === "en" ? "en" : ""}`}>
				{t("home.title")}
			</h1>

			<Search />

			{/* Search Results Info */}
			{searchTerm && (
				<div className="search-results-info">
					<span>
						{/* "🔍 {t("home.search.resultsFor")} "{searchTerm}"":  */}
						"":
						<strong> {filteredBoxes.length} </strong>
						{filteredBoxes.length === 1
							? t("home.search.box")
							: t("home.search.boxes")}
						{filteredQuestions.length > 0 && (
							<>
								{" "}
								{t("home.search.and")}{" "}
								<strong>{filteredQuestions.length}</strong>{" "}
								{t("home.search.faqs")}
							</>
						)}
					</span>
					<button onClick={clearSearch} className="clear-search">
						✕
					</button>
				</div>
			)}

			{/* Boxes */}
			<div className={`boxes-section ${i18n.language === "en" ? "ltr" : ""}`}>
				{filteredBoxes.length > 0 ? (
					filteredBoxes.map((box, index) => (
						<div
							className="box"
							key={index}
							onClick={() => navigate(box.path)}
							style={{ cursor: "pointer" }}
						>
							<div
								className="card"
								style={{ textAlign: i18n.language === "en" ? "left" : "right" }}
							>
								<div className="icon-box">
									<img
										src={box.imageSrc}
										alt="icon"
										style={{ width: "28px", height: "28px" }}
									/>
								</div>
								<h3>
									{highlightText(t(`home.boxes.${box.key}.header`), searchTerm)}
								</h3>
								<p>
									{highlightText(t(`home.boxes.${box.key}.text`), searchTerm)}
								</p>
							</div>
						</div>
					))
				) : (
					<div className="no-results">
						<p>{t("home.search.noResults")}</p>
						<button onClick={clearSearch} className="clear-search-btn">
							{t("home.search.clearSearch")}
						</button>
					</div>
				)}
			</div>

			{/* Button */}
			<button className="join-button" onClick={() => navigate("/JoinUs")}>
				{t("home.join")}
			</button>

			{/* Problem */}
			<div className={`proplem ${i18n.language === "en" ? "ltr" : "rtl"}`}>
				<div className="proplem-img">
					<img src={brain} alt="brain" style={{ width: "38px" }} />
				</div>
				<div className="proplem-text">
					<h3>{t("home.problem.title")}</h3>
					<p>{t("home.problem.desc")}</p>
				</div>
				<button className="prolem-btn" onClick={() => navigate("/formpage")}>
					{t("home.problem.btn")}
				</button>
			</div>

			{/* FAQ */}
			<div
				className={`questions-section ${i18n.language === "en" ? "ltr" : "rtl"}`}
			>
				<h2>{t("home.faq.title")}</h2>

				<div className="question-container container">
					{filteredQuestions.length > 0
						? filteredQuestions.map((item, index) => (
								<div
									className={`question-item ${
										activeIndex === index ? "active" : ""
									}`}
									key={index}
									onClick={() => toggleQuestion(index)}
								>
									<div className="question">
										<img src={plus} alt="toggle" />
										<p>{highlightText(item.q, searchTerm)}</p>
									</div>
									<div className="answer">
										<p>{highlightText(item.a, searchTerm)}</p>
									</div>
								</div>
							))
						: searchTerm && (
								<div className="no-results-faq">
									<p>{t("home.search.noFaqResults")}</p>
								</div>
							)}

					<div className="faq-link-wrapper">
						<Link to="/FAQs" className="faq-link">
							<span>{t("home.faq.more")}</span>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}

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
				<mark key={index} className="search-highlight">
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
