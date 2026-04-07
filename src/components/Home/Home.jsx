import React, { useState } from "react";
import "./Home.modules.css";
import plus from "../../assests/plus.svg";
import Search from "../Search/Search";
import { Link, useNavigate } from "react-router-dom";
import userLock from "../../assests/userlock.PNG";
import SendClock from "../../assests/sendClock.PNG";
import feature from "../../assests/feature.PNG";
import uxbrowser from "../../assests/uxbrowser.PNG";
import setting from "../../assests/setting.PNG";
import creadit from "../../assests/creaditaCard.PNG";
import brain from "../../assests/brain.PNG";
import { useTranslation } from "react-i18next";

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

	const questionsData = t("home.faq.questions", { returnObjects: true });

	const toggleQuestion = (index) => {
		setActiveIndex(activeIndex === index ? null : index);
	};

	return (
		<div className="home-container">
			<h1 className={`home-title ${i18n.language === "en" ? "en" : ""}`}>
				{t("home.title")}
			</h1>
			<Search />

			{/* Boxes */}
			<div className={`boxes-section ${i18n.language === "en" ? "ltr" : ""}`}>
				{boxesData.map((box, index) => (
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
									style={{ width: "40px", height: "40px" }}
								/>
							</div>

							<h3>{t(`home.boxes.${box.key}.header`)}</h3>
							<p>{t(`home.boxes.${box.key}.text`)}</p>
						</div>
					</div>
				))}
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
					{questionsData.map((item, index) => (
						<div
							className={`question-item ${
								activeIndex === index ? "active" : ""
							}`}
							key={index}
							onClick={() => toggleQuestion(index)}
						>
							<div className="question">
								<img src={plus} alt="toggle" />
								<p>{item.q}</p>
							</div>

							<div className="answer">
								<p>{item.a}</p>
							</div>
						</div>
					))}

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
