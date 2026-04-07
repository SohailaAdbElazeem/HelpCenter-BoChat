import React from "react";
import { useTranslation } from "react-i18next";
import Search from "../Search/Search";

const SpecialtiesAndSecurity = () => {
	const { t, i18n } = useTranslation();
	const isLTR = i18n.language === "en";

	const articles = [
		"dataEncryption",
		"twoFactorAuth",
		"privacySettings",
		"dataBackup",
		"secureLogin",
		"accountRecovery",
		"sessionManagement",
		"deviceManagement",
		"dataDeletion",
		"securityAlerts",
		"biometricAuth",
		"secureSharing",
		"privateMode",
		"dataPermissions",
		"securityAudit",
		"vpnProtection",
	];

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

				{/* Header */}
				<div className="mb-5 Head-title">
					<div
						className="fw-bold"
						style={{
							fontFamily: "'Cairo', sans-serif",
							fontWeight: 700,
							fontSize: "clamp(30px, 8vw, 65px)",
							lineHeight: "clamp(35px, 6vw, 55px)",
							color: "#000000",
							margin: "clamp(20px, 10vw, 90px) 0 clamp(20px, 8vw, 60px) 0",
							textAlign: isLTR ? "left" : "right",
						}}
					>
						{t("security.title")}
					</div>
				</div>

				{/* Buttons Grid */}
				<div
					className="row gx-2 gy-3"
					style={{ marginBottom: "clamp(30px, 15vw, 500px)" }}
				>
					{articles.map((article, index) => (
						<div key={index} className="col-12 col-md-6 d-flex">
							<div
								className="d-flex align-items-center px-4 shadow-sm"
								style={{
									width: "100%",
									height: "60px",
									background: "#EDEDED",
									borderRadius: "28px",
									opacity: 1,
									flexDirection: isLTR ? "row" : "row-reverse",
									cursor: "pointer",
									transition: "all 0.3s ease",
								}}
								onMouseEnter={(e) => {
									e.currentTarget.style.transform = "translateY(-2px)";
									e.currentTarget.style.boxShadow =
										"0 4px 12px rgba(0, 0, 0, 0.15)";
								}}
								onMouseLeave={(e) => {
									e.currentTarget.style.transform = "translateY(0)";
									e.currentTarget.style.boxShadow = "none";
								}}
							>
								{/* Red Dot */}
								<div
									className="bg-danger rounded-circle flex-shrink-0"
									style={{
										width: "12px",
										height: "12px",
										marginLeft: isLTR ? "0" : "auto",
										marginRight: isLTR ? "10px" : "0",
										order: isLTR ? 0 : 1,
									}}
								></div>

								{/* Text */}
								<span
									className="text-danger fw-semibold fs-5 flex-grow-1 px-3"
									style={{
										fontFamily: "'Cairo', sans-serif",
										textAlign: isLTR ? "left" : "right",
										fontSize: "clamp(14px, 4vw, 20px)",
										order: isLTR ? 1 : 0,
									}}
								>
									{t(`security.${article}`)}
								</span>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default SpecialtiesAndSecurity;
