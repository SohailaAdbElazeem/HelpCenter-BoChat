import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import "./FormPage.modules.css"
export default function FormPage() {
	const { t, i18n } = useTranslation();
	const [showToast, setShowToast] = useState(false);
	const [toastMessage, setToastMessage] = useState("");
	const [toastType, setToastType] = useState("success");
	const isLTR = i18n.language === "en";

	const [formData, setFormData] = useState({
		email: "",
		address: "",
		description: "",
		file: null,
	});

	const [errors, setErrors] = useState({});

	const handleInputChange = (e) => {
		const { id, name, value, files } = e.target;
		if (id === "uploadFile" || name === "uploadFile") {
			setFormData({ ...formData, file: files?.[0] || null });
		} else {
			setFormData({ ...formData, [id]: value });
		}
		if (errors[id]) {
			setErrors({ ...errors, [id]: "" });
		}
	};

	const validateForm = () => {
		const newErrors = {};

		// Validate email
		if (!formData.email.trim()) {
			newErrors.email = t("formPage.errors.emailRequired");
		} else if (!/\S+@\S+\.\S+/.test(formData.email)) {
			newErrors.email = t("formPage.errors.emailInvalid");
		}

		// Validate address
		if (!formData.address.trim()) {
			newErrors.address = t("formPage.errors.addressRequired");
		} else if (formData.address.trim().length < 3) {
			newErrors.address = t("formPage.errors.addressTooShort");
		}

		// Validate description
		if (!formData.description.trim()) {
			newErrors.description = t("formPage.errors.descriptionRequired");
		} else if (formData.description.trim().length < 10) {
			newErrors.description = t("formPage.errors.descriptionTooShort");
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const showToastMessage = (message, type = "success") => {
		setToastMessage(message);
		setToastType(type);
		setShowToast(true);
		setTimeout(() => {
			setShowToast(false);
		}, 5000);
	};

	const handleSubmit = () => {
		if (validateForm()) {
			console.log("Form submitted:", formData);
			showToastMessage(t("formPage.successMessage"), "success");
		} else {
			// Form has errors
			const errorCount = Object.keys(errors).length;
			showToastMessage(
				t("formPage.errors.missingFields", { count: errorCount }),
				"error",
			);
		}
	};

	const getToastStyles = () => {
		const baseStyles = {
			position: "fixed",
			top: "clamp(10px, 5vh, 50px)",
			right: isLTR ? "auto" : "clamp(10px, 5vw, 30px)",
			left: isLTR ? "clamp(10px, 5vw, 30px)" : "auto",
			zIndex: 9999,
		};

		const backgroundColor = "rgba(255, 255, 255, 0.70)";
		const textColor = "#D72229";
		let borderColor = "";

		switch (toastType) {
			case "success":
				borderColor = "#D72229";
				break;
			case "error":
				borderColor = "#D72229";
				break;
			case "warning":
				borderColor = "#D72229";
				break;
			default:
				borderColor = "#D72229";
		}

		return { baseStyles, backgroundColor, textColor, borderColor };
	};

	const { baseStyles, backgroundColor, textColor, borderColor } =
		getToastStyles();

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
				<form  className="custom-form">
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
							{t("formPage.email")} <span style={{ color: "#D72229" }}>*</span>
						</label>
						<input
							type="email"
							id="email"
							name="email"
							value={formData.email}
							onChange={handleInputChange}
							className="form-control"
							style={{
								width: "100%",
								height: "clamp(50px, 8vh, 60px)",
								borderRadius: "clamp(16px, 4vw, 22px)",
								background: "rgba(255, 255, 255, 0.9)",
								backdropFilter: "blur(15px)",
								border: errors.email ? "2px solid #D72229" : "none",
								padding: "0 clamp(15px, 4vw, 25px)",
								fontSize: "clamp(14px, 3.5vw, 18px)",
								textAlign: isLTR ? "left" : "right",
							}}
						/>
						{errors.email && (
							<div
								style={{
									color: "#D72229",
									fontSize: "clamp(12px, 3vw, 14px)",
									marginTop: "5px",
									textAlign: isLTR ? "left" : "right",
									fontFamily: "'Cairo', sans-serif",
								}}
							>
								{errors.email}
							</div>
						)}
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
							{t("formPage.address")}{" "}
							<span style={{ color: "#D72229" }}>*</span>
						</label>
						<input
							type="text"
							id="address"
							name="address"
							value={formData.address}
							onChange={handleInputChange}
							className="form-control"
							style={{
								width: "100%",
								height: "clamp(50px, 8vh, 60px)",
								borderRadius: "clamp(16px, 4vw, 22px)",
								background: "rgba(255, 255, 255, 0.9)",
								backdropFilter: "blur(15px)",
								border: errors.address ? "2px solid #D72229" : "none",
								padding: "0 clamp(15px, 4vw, 25px)",
								fontSize: "clamp(14px, 3.5vw, 18px)",
								textAlign: isLTR ? "left" : "right",
							}}
						/>
						{errors.address && (
							<div
								style={{
									color: "#D72229",
									fontSize: "clamp(12px, 3vw, 14px)",
									marginTop: "5px",
									textAlign: isLTR ? "left" : "right",
									fontFamily: "'Cairo', sans-serif",
								}}
							>
								{errors.address}
							</div>
						)}
					</div>

					{/* Description */}
					<div className="mb-4">
						<label
							htmlFor="description"
							style={{
								fontFamily: "'Cairo', sans-serif",
								fontWeight: 600,
								fontSize: "clamp(16px, 4vw, 22px)",
								color: "#000000",
								display: "block",
								textAlign: isLTR ? "left" : "right",
							}}
						>
							{t("formPage.description")}{" "}
							<span style={{ color: "#D72229" }}>*</span>
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
							id="description"
							name="description"
							value={formData.description}
							onChange={handleInputChange}
							rows={8}
							className="form-control"
							style={{
								width: "100%",
								minHeight: "clamp(200px, 40vh, 412px)",
								borderRadius: "clamp(16px, 4vw, 22px)",
								background: "rgba(255, 255, 255, 0.9)",
								backdropFilter: "blur(15px)",
								border: errors.description ? "2px solid #D72229" : "none",
								padding: "clamp(15px, 3vw, 25px)",
								fontSize: "clamp(14px, 3.5vw, 18px)",
								textAlign: isLTR ? "left" : "right",
								resize: "vertical",
							}}
						/>
						{errors.description && (
							<div
								style={{
									color: "#D72229",
									fontSize: "clamp(12px, 3vw, 14px)",
									marginTop: "5px",
									textAlign: isLTR ? "left" : "right",
									fontFamily: "'Cairo', sans-serif",
								}}
							>
								{errors.description}
							</div>
						)}
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
								border: errors.file
									? "2px dashed #D72229"
									: "1px dashed #00000080",
								backdropFilter: "blur(15px)",
								cursor: "pointer",
								fontFamily: "'Cairo', sans-serif",
								fontSize: "clamp(13px, 3.5vw, 18px)",
								color: "#666666",
								margin: "0 auto",
								padding: "clamp(10px, 3vw, 20px)",
							}}
						>
							{formData.file ? formData.file.name : t("formPage.uploadHint")}
						</label>

						<input
							type="file"
							id="uploadFile"
							name="uploadFile"
							style={{ display: "none" }}
							onChange={handleInputChange}
						/>
						{errors.file && (
							<div
								style={{
									color: "#D72229",
									fontSize: "clamp(12px, 3vw, 14px)",
									marginTop: "5px",
									textAlign: isLTR ? "left" : "right",
									fontFamily: "'Cairo', sans-serif",
								}}
							>
								{errors.file}
							</div>
						)}
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
							onMouseEnter={(e) => {
								e.target.style.transform = "translateY(-2px)";
								e.target.style.boxShadow = "0 6px 20px rgba(215, 34, 41, 0.4)";
							}}
							onMouseLeave={(e) => {
								e.target.style.transform = "translateY(0)";
								e.target.style.boxShadow = "0 4px 15px rgba(215, 34, 41, 0.3)";
							}}
						>
							{t("formPage.submit")}
						</button>
					</div>
				</form>

				{/* Toast Notification */}
				{showToast && (
					<div style={baseStyles}>
						<div
							style={{
								width: "min(100%, 350px)",
								minHeight: "clamp(45px, 8vh, 50px)",
								backgroundColor: backgroundColor,
								borderRadius: "clamp(14px, 4vw, 17px)",
								boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
								borderLeft: `4px solid ${borderColor}`,
								display: "flex",
								alignItems: "center",
								padding: "0 clamp(12px, 4vw, 20px)",
								fontFamily: "'Cairo', sans-serif",
								fontSize: "clamp(12px, 3.5vw, 16px)",
								fontWeight: 500,
								color: textColor,
								direction: isLTR ? "ltr" : "rtl",
								gap: "10px",
								backdropFilter: "blur(15px)",
							}}
						>
							<button
								onClick={() => setShowToast(false)}
								style={{
									width: "clamp(16px, 4vw, 18px)",
									height: "clamp(16px, 4vw, 18px)",
									background: "none",
									color: textColor,
									border: `2px solid ${textColor}`,
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
								{toastMessage}
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
