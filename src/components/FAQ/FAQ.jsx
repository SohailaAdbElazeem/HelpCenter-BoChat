import React from "react";
import "./FAQ.modules.CSS";
import Search from "../Search/Search";
import { useTranslation } from "react-i18next";

export default function FAQ() {
	const { t, i18n } = useTranslation();
	const isLTR = i18n.language === "en";

	const questionsData = t("faq.questions", { returnObjects: true });

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
								//  unicodeBidi: isLTR ? "plaintext" : "normal",
								unicodeBidi: "plaintext",
							}}
						>
							{t("faq.title")}
						</div>
					</div>

					{/* Questions Section */}
					<div
						className="row gx-3 gy-3"
						style={{ marginBottom: "clamp(30px, 15vw, 500px)" }}
					>
						{questionsData.map((item, index) => (
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

									{/* Question Text */}
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
										{item}
									</span>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
