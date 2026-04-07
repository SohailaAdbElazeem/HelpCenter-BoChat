import React from "react";
import { useTranslation } from "react-i18next";
import Search from "../Search/Search";
import { MdFeaturedPlayList } from "react-icons/md";
import "./JoinUs.modules.css";
import hand from "../../assests/hand.PNG";
import edit from "../../assests/edit.PNG";
import Static from "../../assests/Sta.PNG";

export default function JoinUs() {
	const { t, i18n } = useTranslation();
	const isLTR = i18n.language === "en";

	const boxesData = [
		{
			imageUrl: hand,
			headerKey: "joinUs.ambassadorProgram",
			textKey: "joinUs.ambassadorText",
		},
		{
			imageUrl: Static,
			headerKey: "joinUs.investWithUs",
			textKey: "joinUs.investText",
		},
		{
			imageUrl: edit,
			icon: <MdFeaturedPlayList size={28} />,
			headerKey: "joinUs.developers",
			textKey: "joinUs.developersText",
		},
	];

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
			<div className="boxes-section">
				{boxesData.map((box, index) => (
					<div className="box" key={index}>
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
									alt={t(box.headerKey)}
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
								{t(box.headerKey)}
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
								{t(box.textKey)}
							</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
