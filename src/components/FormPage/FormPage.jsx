import React, { useState } from "react";
import { useTranslation } from "react-i18next";

export default function FormPage() {
	const { t, i18n } = useTranslation();
	const [showToast, setShowToast] = useState(false);
	const isLTR = i18n.language === "en";

	const handleSubmit = () => {
		setShowToast(true);
		setTimeout(() => {
			setShowToast(false);
		}, 5000);
	};

	return (
		<div
			className="min-vh-100 d-flex align-items-center justify-content-center p-4"
			style={{
				background:
					"linear-gradient(180deg, #D72229 30%, rgba(215, 34, 41, 0) 100%)",
				paddingBottom: "clamp(60px, 15vh, 120px)",
				marginBottom: "clamp(50px, 15vw, 200px)",
				direction: isLTR ? "ltr" : "rtl",
			}}
		>
			<div
				className="w-100"
				style={{ maxWidth: "min(1100px, 95%)", margin: "0 auto" }}
			>
				{/* Title */}
				<div className="text-center mb-5">
					<h2
						style={{
							fontFamily: "'Cairo', sans-serif",
							fontWeight: 600,
							fontSize: "clamp(28px, 6vw, 55px)",
							lineHeight: "140%",
							color: "#FFFFFF",
							marginBottom: "clamp(30px, 8vw, 60px)",
							textAlign: "center",
						}}
					>
						{t("formPage.title")}
					</h2>
				</div>
				<form className="mx-auto" style={{ maxWidth: "min(1033px, 100%)" }}>
					{/* Email */}
					<div className="mb-4">
						<label
							htmlFor="email"
							style={{
								fontFamily: "'Cairo', sans-serif",
								fontWeight: 600,
								fontSize: "clamp(16px, 4vw, 22px)",
								color: "#000000",
								display: "block",
								textAlign: isLTR ? "left" : "right",
								marginBottom: "12px",
							}}
						>
							{t("formPage.email")}
						</label>
						<input
							type="email"
							id="email"
							name="email"
							className="form-control"
							style={{
								width: "100%",
								height: "clamp(50px, 8vh, 60px)",
								borderRadius: "clamp(16px, 4vw, 22px)",
								background: "rgba(255, 255, 255, 0.9)",
								backdropFilter: "blur(15px)",
								border: "none",
								padding: "0 clamp(15px, 4vw, 25px)",
								fontSize: "clamp(14px, 3.5vw, 18px)",
								textAlign: isLTR ? "left" : "right",
							}}
						/>
					</div>

					{/* Address */}
					<div className="mb-4">
						<label
							htmlFor="address"
							style={{
								fontFamily: "'Cairo', sans-serif",
								fontWeight: 600,
								fontSize: "clamp(16px, 4vw, 22px)",
								color: "#000000",
								display: "block",
								textAlign: isLTR ? "left" : "right",
								marginBottom: "12px",
							}}
						>
							{t("formPage.address")}
						</label>
						<input
							type="text"
							id="address"
							name="address"
							className="form-control"
							style={{
								width: "100%",
								height: "clamp(50px, 8vh, 60px)",
								borderRadius: "clamp(16px, 4vw, 22px)",
								background: "rgba(255, 255, 255, 0.9)",
								backdropFilter: "blur(15px)",
								border: "none",
								padding: "0 clamp(15px, 4vw, 25px)",
								fontSize: "clamp(14px, 3.5vw, 18px)",
								textAlign: isLTR ? "left" : "right",
							}}
						/>
					</div>

					{/* Description */}
					<div className="mb-4">
						<label
							htmlFor="desc"
							style={{
								fontFamily: "'Cairo', sans-serif",
								fontWeight: 600,
								fontSize: "clamp(16px, 4vw, 22px)",
								color: "#000000",
								display: "block",
								textAlign: isLTR ? "left" : "right",
							}}
						>
							{t("formPage.description")}
						</label>
						<p
							style={{
								fontFamily: "'Cairo', sans-serif",
								fontSize: "clamp(13px, 3.5vw, 17px)",
								color: "#333",
								textAlign: isLTR ? "left" : "right",
								marginBottom: "clamp(20px, 5vw, 30px)",
							}}
						>
							{t("formPage.descriptionHint")}
						</p>
						<textarea
							id="desc"
							name="description"
							rows={8}
							className="form-control"
							style={{
								width: "100%",
								minHeight: "clamp(200px, 40vh, 412px)",
								borderRadius: "clamp(16px, 4vw, 22px)",
								background: "rgba(255, 255, 255, 0.9)",
								backdropFilter: "blur(15px)",
								border: "none",
								padding: "clamp(15px, 3vw, 25px)",
								fontSize: "clamp(14px, 3.5vw, 18px)",
								textAlign: isLTR ? "left" : "right",
								resize: "vertical",
							}}
						/>
					</div>

					{/* File Upload */}
					<div className="mb-5">
						<label
							htmlFor="uploadFile"
							style={{
								fontFamily: "'Cairo', sans-serif",
								fontWeight: 600,
								fontSize: "clamp(16px, 4vw, 22px)",
								color: "#000000",
								display: "block",
								textAlign: isLTR ? "left" : "right",
								marginBottom: "12px",
							}}
						>
							{t("formPage.attachments")}
						</label>

						<label
							htmlFor="uploadFile"
							className="d-flex align-items-center justify-content-center text-center"
							style={{
								width: "100%",
								maxWidth: "min(1033px, 100%)",
								minHeight: "clamp(60px, 10vh, 70px)",
								borderRadius: "clamp(16px, 4vw, 22px)",
								background: "#FFFFFFE5",
								border: "1px dashed #00000080",
								backdropFilter: "blur(15px)",
								cursor: "pointer",
								fontFamily: "'Cairo', sans-serif",
								fontSize: "clamp(13px, 3.5vw, 18px)",
								color: "#666666",
								margin: "0 auto",
								padding: "clamp(10px, 3vw, 20px)",
							}}
						>
							{t("formPage.uploadHint")}
						</label>

						<input
							type="file"
							id="uploadFile"
							name="uploadFile"
							style={{ display: "none" }}
							onChange={(e) => console.log(e.target.files)}
						/>
					</div>

					{/* Submit Button */}
					<div className="text-center mt-5">
						<button
							type="button"
							style={{
								width: "min(400px, 85%)",
								minHeight: "clamp(50px, 8vh, 60px)",
								borderRadius: "clamp(16px, 4vw, 20px)",
								backgroundColor: "#D72229",
								color: "#FFFFFF",
								fontFamily: "'Cairo', sans-serif",
								fontWeight: 600,
								fontSize: "clamp(16px, 4vw, 22px)",
								border: "none",
								cursor: "pointer",
								backdropFilter: "blur(15px)",
								boxShadow: "0 4px 15px rgba(215, 34, 41, 0.3)",
								transition: "all 0.3s ease",
							}}
							onClick={handleSubmit}
						>
							{t("formPage.submit")}
						</button>
					</div>
				</form>

				{/* Success Toast */}
				{showToast && (
					<div
						style={{
							position: "fixed",
							top: "clamp(10px, 5vh, 50px)",
							right: isLTR ? "auto" : "clamp(10px, 5vw, 30px)",
							left: isLTR ? "clamp(10px, 5vw, 30px)" : "auto",
							zIndex: 9999,
						}}
					>
						<div
							style={{
								width: "min(100%, 270px)",
								minHeight: "clamp(45px, 8vh, 50px)",
								backgroundColor: "rgba(255, 255, 255, 0.70)",
								borderRadius: "clamp(14px, 4vw, 17px)",
								boxShadow: "0 4px 20px rgba(0, 0, 0, 0.12)",
								display: "flex",
								alignItems: "center",
								padding: "0 clamp(12px, 4vw, 20px)",
								fontFamily: "'Cairo', sans-serif",
								fontSize: "clamp(12px, 3.5vw, 16px)",
								fontWeight: 500,
								color: "#D72229",
								direction: isLTR ? "ltr" : "rtl",
								gap: "10px",
							}}
						>
							<button
								onClick={() => setShowToast(false)}
								style={{
									width: "clamp(16px, 4vw, 18px)",
									height: "clamp(16px, 4vw, 18px)",
									background: "none",
									color: "#D72229",
									border: "2px solid #D72229",
									borderRadius: "50%",
									fontSize: "clamp(12px, 3.5vw, 16px)",
									fontWeight: "bold",
									cursor: "pointer",
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
									lineHeight: "1",
									paddingBottom: "2px",
									boxSizing: "border-box",
									flexShrink: 0,
								}}
							>
								×
							</button>

							<div
								style={{
									flex: 1,
									textAlign: isLTR ? "left" : "right",
									paddingRight: isLTR ? "0" : "8px",
									paddingLeft: isLTR ? "8px" : "0",
								}}
							>
								{t("formPage.successMessage")}
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
