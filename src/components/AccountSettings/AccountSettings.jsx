import React from "react";
import Search from "../Search/Search";
import { useTranslation } from "react-i18next";

const AccountSettings = () => {
	const { t, i18n } = useTranslation();
	const isLTR = i18n.language === "en";

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

				<div
					className="row gx-2 gy-3"
					style={{ marginBottom: "clamp(30px, 15vw, 500px)" }}
				>
					{t("accountSettings.items", { returnObjects: true }).map(
						(item, index) => (
							<div key={index} className="col-12 col-md-6 d-flex">
								<div
									className="d-flex align-items-center px-4 shadow-sm"
									style={{
										width: "509px",
										height: "60px",
										background: "#EDEDED",
										borderRadius: "28px",
										opacity: 1,
										flexDirection: isLTR ? "row-reverse" : "row",
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

									{/* Text */}
									<span
										className="text-danger fw-semibold fs-5 flex-grow-1 px-3"
										style={{
											fontFamily: "'Cairo', sans-serif",
											textAlign: isLTR ? "left" : "right",
										}}
									>
										{item}
									</span>
								</div>
							</div>
						),
					)}
				</div>
			</div>
		</div>
	);
};

export default AccountSettings;
