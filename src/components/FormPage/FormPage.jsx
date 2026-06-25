// import React, { useState } from "react";
// import { useTranslation } from "react-i18next";
// import "./FormPage.modules.css";

// export default function FormPage() {
// 	const { t, i18n } = useTranslation();
// 	const [showToast, setShowToast] = useState(false);
// 	const [toastMessage, setToastMessage] = useState("");
// 	const [toastType, setToastType] = useState("success");
// 	const [isSubmitting, setIsSubmitting] = useState(false);
// 	const isLTR = i18n.language === "en";

// 	const [formData, setFormData] = useState({
// 		email: "",
// 		title: "",
// 		desc: "",
// 		img: null,
// 	});

// 	const [errors, setErrors] = useState({});

// 	const handleInputChange = (e) => {
// 		const { id, value, files } = e.target;
// 		if (id === "uploadFile") {
// 			const file = files?.[0] || null;
// 			// Optional: validate file type (images only)
// 			if (file && !file.type.startsWith("image/")) {
// 				setErrors({ ...errors, img: t("formPage.errors.invalidImageType") });
// 				setFormData({ ...formData, img: null });
// 				return;
// 			}
// 			setFormData({ ...formData, img: file });
// 			if (errors.img) setErrors({ ...errors, img: "" });
// 		} else {
// 			setFormData({ ...formData, [id]: value });
// 		}
// 		if (errors[id]) {
// 			setErrors({ ...errors, [id]: "" });
// 		}
// 	};

// 	const validateForm = () => {
// 		const newErrors = {};

// 		if (!formData.email.trim()) {
// 			newErrors.email = t("formPage.errors.emailRequired");
// 		}

// 		if (!formData.title.trim()) {
// 			newErrors.title = t("formPage.errors.addressRequired");
// 		}

// 		if (!formData.desc.trim()) {
// 			newErrors.desc = t("formPage.errors.descriptionRequired");
// 		}

// 		// if (!formData.img) {
// 		// 	newErrors.img = t("formPage.errors.fileRequired");
// 		// }

// 		setErrors(newErrors);
// 		return newErrors; // ✅ مهم جدًا
// 	};
// 	const showToastMessage = (message, type = "success") => {
// 		setToastMessage(message);
// 		setToastType(type);
// 		setShowToast(true);
// 		setTimeout(() => setShowToast(false), 5000);
// 	};


// 	const handleSubmit = async () => {
//     const validationErrors = validateForm();
//     const errorCount = Object.keys(validationErrors).length;

//     if (errorCount > 0) {
//         showToastMessage(
//             t("formPage.errors.missingFields", { count: errorCount }),
//             "error",
//         );
//         return;
//     }

//     setIsSubmitting(true);

//     try {
//         const formDataToSend = new FormData();
//         formDataToSend.append("email", formData.email);
//         formDataToSend.append("title", formData.title);
//         formDataToSend.append("desc", formData.desc);
//         formDataToSend.append("image", formData.img);   
 
//         // Optional: log to verify
//         for (let pair of formDataToSend.entries()) {
//             console.log(pair[0], pair[1]);
//         }

//         const response = await fetch(
//             "https://bo-chat.space/dashboard/features/SendHelpRequest",
//             {
//                 method: "POST",
//                 body: formDataToSend,
//             }
//         );

//         // Try to parse response even on error (for better debugging)
//         const data = await response.json().catch(() => null);

//         if (response.ok && data?.success) {
//             showToastMessage(t("formPage.successMessage"), "success");
//             setFormData({ email: "", title: "", desc: "", img: null });
//             setErrors({});
//         } else {
//             // Show actual server error message if available
//             const errorMsg = data?.message || data?.error || t("formPage.errors.submitFailed");
//             throw new Error(errorMsg);
//         }
//     } catch (error) {
//         console.error("Submit error:", error);
//         showToastMessage(error.message, "error");
//     } finally {
//         setIsSubmitting(false);
//     }
// };
// 	const getToastStyles = () => {
// 		const baseStyles = {
// 			position: "fixed",
// 			top: "clamp(10px, 5vh, 50px)",
// 			right: isLTR ? "auto" : "clamp(10px, 5vw, 30px)",
// 			left: isLTR ? "clamp(10px, 5vw, 30px)" : "auto",
// 			zIndex: 9999,
// 		};
// 		const backgroundColor = "rgba(255, 255, 255, 0.70)";
// 		const textColor = "#D72229";
// 		const borderColor = "#D72229";
// 		return { baseStyles, backgroundColor, textColor, borderColor };
// 	};

// 	const { baseStyles, backgroundColor, textColor, borderColor } =
// 		getToastStyles();

// 	return (
// 		<div
// 			className="min-vh-100 d-flex align-items-center justify-content-center p-4"
// 			style={{
// 				background:
// 					"linear-gradient(180deg, #D72229 30%, rgba(215, 34, 41, 0) 100%)",
// 				paddingBottom: "clamp(60px, 15vh, 120px)",
// 				marginBottom: "clamp(50px, 15vw, 200px)",
// 				direction: isLTR ? "ltr" : "rtl",
// 			}}
// 		>
// 			<div
// 				className="w-100"
// 				style={{ maxWidth: "min(1100px, 95%)", margin: "0 auto" }}
// 			>
// 				<div className="text-center mb-5">
// 					<h2
// 						style={{
// 							fontFamily: "'Cairo', sans-serif",
// 							fontWeight: 600,
// 							fontSize: "clamp(28px, 6vw, 55px)",
// 							lineHeight: "140%",
// 							color: "#FFFFFF",
// 							marginBottom: "clamp(30px, 8vw, 60px)",
// 							textAlign: "center",
// 						}}
// 					>
// 						{t("formPage.title")}
// 					</h2>
// 				</div>

// 				<form className="custom-form">
// 					{/* Email */}
// 					<div className="mb-4">
// 						<label
// 							htmlFor="email"
// 							style={{
// 								fontFamily: "'Cairo', sans-serif",
// 								fontWeight: 600,
// 								fontSize: "clamp(16px, 4vw, 22px)",
// 								color: "#000000",
// 								display: "block",
// 								textAlign: isLTR ? "left" : "right",
// 								marginBottom: "12px",
// 							}}
// 						>
// 							{t("formPage.email")} <span style={{ color: "#D72229" }}>*</span>
// 						</label>
// 						<input
// 							type="email"
// 							id="email"
// 							name="email"
// 							value={formData.email}
// 							onChange={handleInputChange}
// 							className="form-control"
// 							style={{
// 								width: "100%",
// 								height: "clamp(50px, 8vh, 60px)",
// 								borderRadius: "clamp(16px, 4vw, 22px)",
// 								background: "rgba(255, 255, 255, 0.9)",
// 								backdropFilter: "blur(15px)",
// 								border: errors.email ? "2px solid #D72229" : "none",
// 								padding: "0 clamp(15px, 4vw, 25px)",
// 								fontSize: "clamp(14px, 3.5vw, 18px)",
// 								textAlign: isLTR ? "left" : "right",
// 							}}
// 						/>
// 						{errors.email && (
// 							<div
// 								style={{
// 									color: "#D72229",
// 									fontSize: "clamp(12px, 3vw, 14px)",
// 									marginTop: "5px",
// 									textAlign: isLTR ? "left" : "right",
// 									fontFamily: "'Cairo', sans-serif",
// 								}}
// 							>
// 								{errors.email}
// 							</div>
// 						)}
// 					</div>

// 					{/* Title */}
// 					<div className="mb-4">
// 						<label
// 							htmlFor="title"
// 							style={{
// 								fontFamily: "'Cairo', sans-serif",
// 								fontWeight: 600,
// 								fontSize: "clamp(16px, 4vw, 22px)",
// 								color: "#000000",
// 								display: "block",
// 								textAlign: isLTR ? "left" : "right",
// 								marginBottom: "12px",
// 							}}
// 						>
// 							{t("formPage.address")}{" "}
// 							<span style={{ color: "#D72229" }}>*</span>
// 						</label>
// 						<input
// 							type="text"
// 							id="title"
// 							name="title"
// 							value={formData.title}
// 							onChange={handleInputChange}
// 							className="form-control"
// 							style={{
// 								width: "100%",
// 								height: "clamp(50px, 8vh, 60px)",
// 								borderRadius: "clamp(16px, 4vw, 22px)",
// 								background: "rgba(255, 255, 255, 0.9)",
// 								backdropFilter: "blur(15px)",
// 								border: errors.title ? "2px solid #D72229" : "none",
// 								padding: "0 clamp(15px, 4vw, 25px)",
// 								fontSize: "clamp(14px, 3.5vw, 18px)",
// 								textAlign: isLTR ? "left" : "right",
// 							}}
// 						/>
// 						{errors.title && (
// 							<div
// 								style={{
// 									color: "#D72229",
// 									fontSize: "clamp(12px, 3vw, 14px)",
// 									marginTop: "5px",
// 									textAlign: isLTR ? "left" : "right",
// 									fontFamily: "'Cairo', sans-serif",
// 								}}
// 							>
// 								{errors.title}
// 							</div>
// 						)}
// 					</div>

// 					{/* Description */}
// 					<div className="mb-4">
// 						<label
// 							htmlFor="desc"
// 							style={{
// 								fontFamily: "'Cairo', sans-serif",
// 								fontWeight: 600,
// 								fontSize: "clamp(16px, 4vw, 22px)",
// 								color: "#000000",
// 								display: "block",
// 								textAlign: isLTR ? "left" : "right",
// 							}}
// 						>
// 							{t("formPage.description")}{" "}
// 							<span style={{ color: "#D72229" }}>*</span>
// 						</label>
// 						<p
// 							style={{
// 								fontFamily: "'Cairo', sans-serif",
// 								fontSize: "clamp(13px, 3.5vw, 17px)",
// 								color: "#333",
// 								textAlign: isLTR ? "left" : "right",
// 								marginBottom: "clamp(20px, 5vw, 30px)",
// 							}}
// 						>
// 							{t("formPage.descriptionHint")}
// 						</p>
// 						<textarea
// 							id="desc"
// 							name="desc"
// 							value={formData.desc}
// 							onChange={handleInputChange}
// 							rows={8}
// 							className="form-control"
// 							style={{
// 								width: "100%",
// 								minHeight: "clamp(200px, 40vh, 412px)",
// 								borderRadius: "clamp(16px, 4vw, 22px)",
// 								background: "rgba(255, 255, 255, 0.9)",
// 								backdropFilter: "blur(15px)",
// 								border: errors.desc ? "2px solid #D72229" : "none",
// 								padding: "clamp(15px, 3vw, 25px)",
// 								fontSize: "clamp(14px, 3.5vw, 18px)",
// 								textAlign: isLTR ? "left" : "right",
// 								resize: "vertical",
// 							}}
// 						/>
// 						{errors.desc && (
// 							<div
// 								style={{
// 									color: "#D72229",
// 									fontSize: "clamp(12px, 3vw, 14px)",
// 									marginTop: "5px",
// 									textAlign: isLTR ? "left" : "right",
// 									fontFamily: "'Cairo', sans-serif",
// 								}}
// 							>
// 								{errors.desc}
// 							</div>
// 						)}
// 					</div>

// 					{/* File Upload - now required */}
// 					<div className="mb-5">
// 						<label
// 							htmlFor="uploadFile"
// 							style={{
// 								fontFamily: "'Cairo', sans-serif",
// 								fontWeight: 600,
// 								fontSize: "clamp(16px, 4vw, 22px)",
// 								color: "#000000",
// 								display: "block",
// 								textAlign: isLTR ? "left" : "right",
// 								marginBottom: "12px",
// 							}}
// 						>
// 							{t("formPage.attachments")}{" "}
// 							<span style={{ color: "#D72229" }}>*</span>
// 						</label>

// 						<label
// 							htmlFor="uploadFile"
// 							className="d-flex align-items-center justify-content-center text-center"
// 							style={{
// 								width: "100%",
// 								maxWidth: "min(1033px, 100%)",
// 								minHeight: "clamp(60px, 10vh, 70px)",
// 								borderRadius: "clamp(16px, 4vw, 22px)",
// 								background: "#FFFFFFE5",
// 								border: errors.img
// 									? "2px solid #D72229"
// 									: "1px dashed #00000080",
// 								backdropFilter: "blur(15px)",
// 								cursor: "pointer",
// 								fontFamily: "'Cairo', sans-serif",
// 								fontSize: "clamp(13px, 3.5vw, 18px)",
// 								color: "#666666",
// 								margin: "0 auto",
// 								padding: "clamp(10px, 3vw, 20px)",
// 							}}
// 						>
// 							{formData.img ? formData.img.name : t("formPage.uploadHint")}
// 						</label>

// 						<input
// 							type="file"
// 							id="uploadFile"
// 							name="uploadFile"
// 							accept="image/*"
// 							style={{ display: "none" }}
// 							onChange={handleInputChange}
// 						/>
// 						{errors.img && (
// 							<div
// 								style={{
// 									color: "#D72229",
// 									fontSize: "clamp(12px, 3vw, 14px)",
// 									marginTop: "5px",
// 									textAlign: isLTR ? "left" : "right",
// 									fontFamily: "'Cairo', sans-serif",
// 								}}
// 							>
// 								{errors.img}
// 							</div>
// 						)}
// 					</div>

// 					{/* Submit Button */}
// 					<div className="text-center mt-5">
// 						<button
// 							type="button"
// 							disabled={isSubmitting}
// 							style={{
// 								width: "min(400px, 85%)",
// 								minHeight: "clamp(50px, 8vh, 60px)",
// 								borderRadius: "clamp(16px, 4vw, 20px)",
// 								backgroundColor: "#D72229",
// 								color: "#FFFFFF",
// 								fontFamily: "'Cairo', sans-serif",
// 								fontWeight: 600,
// 								fontSize: "clamp(16px, 4vw, 22px)",
// 								border: "none",
// 								cursor: isSubmitting ? "not-allowed" : "pointer",
// 								backdropFilter: "blur(15px)",
// 								boxShadow: "0 4px 15px rgba(215, 34, 41, 0.3)",
// 								transition: "all 0.3s ease",
// 								opacity: isSubmitting ? 0.7 : 1,
// 							}}
// 							onClick={handleSubmit}
// 							onMouseEnter={(e) => {
// 								if (!isSubmitting) {
// 									e.currentTarget.style.transform = "translateY(-2px)";
// 									e.currentTarget.style.boxShadow =
// 										"0 6px 20px rgba(215, 34, 41, 0.4)";
// 								}
// 							}}
// 							onMouseLeave={(e) => {
// 								e.currentTarget.style.transform = "translateY(0)";
// 								e.currentTarget.style.boxShadow =
// 									"0 4px 15px rgba(215, 34, 41, 0.3)";
// 							}}
// 						>
// 							{isSubmitting
// 								? t("formPage.submitting") || "جاري الإرسال..."
// 								: t("formPage.submit")}
// 						</button>
// 					</div>
// 				</form>

// 				{/* Toast Notification */}
// 				{showToast && (
// 					<div style={baseStyles}>
// 						<div
// 							style={{
// 								width: "min(100%, 350px)",
// 								minHeight: "clamp(45px, 8vh, 50px)",
// 								backgroundColor: backgroundColor,
// 								borderRadius: "clamp(14px, 4vw, 17px)",
// 								boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
// 								borderLeft: `4px solid ${borderColor}`,
// 								display: "flex",
// 								alignItems: "center",
// 								padding: "0 clamp(12px, 4vw, 20px)",
// 								fontFamily: "'Cairo', sans-serif",
// 								fontSize: "clamp(12px, 3.5vw, 16px)",
// 								fontWeight: 500,
// 								color: textColor,
// 								direction: isLTR ? "ltr" : "rtl",
// 								gap: "10px",
// 								backdropFilter: "blur(15px)",
// 							}}
// 						>
// 							<button
// 								onClick={() => setShowToast(false)}
// 								style={{
// 									width: "clamp(16px, 4vw, 18px)",
// 									height: "clamp(16px, 4vw, 18px)",
// 									background: "none",
// 									color: textColor,
// 									border: `2px solid ${textColor}`,
// 									borderRadius: "50%",
// 									fontSize: "clamp(12px, 3.5vw, 16px)",
// 									fontWeight: "bold",
// 									cursor: "pointer",
// 									display: "flex",
// 									alignItems: "center",
// 									justifyContent: "center",
// 									lineHeight: 1,
// 									paddingBottom: "2px",
// 									boxSizing: "border-box",
// 									flexShrink: 0,
// 								}}
// 							>
// 								×
// 							</button>
// 							<div
// 								style={{
// 									flex: 1,
// 									textAlign: isLTR ? "left" : "right",
// 									paddingRight: isLTR ? "0" : "8px",
// 									paddingLeft: isLTR ? "8px" : "0",
// 								}}
// 							>
// 								{toastMessage}
// 							</div>
// 						</div>
// 					</div>
// 				)}
// 			</div>
// 		</div>
// 	);
// }

// ///////////////////////
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import "./FormPage.modules.css";

export default function FormPage() {
	const { t, i18n } = useTranslation();

	const isLTR = i18n.language === "en";

	const [showToast, setShowToast] = useState(false);
	const [toastMessage, setToastMessage] = useState("");
	const [toastType, setToastType] = useState("success");
	const [isSubmitting, setIsSubmitting] = useState(false);

	const [formData, setFormData] = useState({
		email: "",
		title: "",
		desc: "",
		img: null,
	});

	const [errors, setErrors] = useState({});

 	// TOAST
	const showToastMessage = (message, type = "success") => {
		setToastMessage(message);
		setToastType(type);
		setShowToast(true);

		setTimeout(() => {
			setShowToast(false);
		}, 5000);
	};

 	// HANDLE INPUT CHANGE
 	const handleInputChange = (e) => {
		const { id, value, files } = e.target;

		// FILE INPUT
		if (files) {
			const file = files[0];

			console.log("SELECTED FILE => ", file);

			if (file && !file.type.startsWith("image/")) {
				setErrors((prev) => ({
					...prev,
					img: t("formPage.errors.invalidImageType"),
				}));

				return;
			}

			setFormData((prev) => ({
				...prev,
				img: file,
			}));

			setErrors((prev) => ({
				...prev,
				img: "",
			}));

			return;
		}

		// NORMAL INPUTS
		setFormData((prev) => ({
			...prev,
			[id]: value,
		}));

		setErrors((prev) => ({
			...prev,
			[id]: "",
		}));
	};

 	// VALIDATION
 	const validateForm = () => {
		const newErrors = {};

		if (!formData.email.trim()) {
			newErrors.email = t("formPage.errors.emailRequired");
		}

		if (!formData.title.trim()) {
			newErrors.title = t("formPage.errors.addressRequired");
		}

		if (!formData.desc.trim()) {
			newErrors.desc = t("formPage.errors.descriptionRequired");
		}

		if (!formData.img) {
			newErrors.img = t("formPage.errors.fileRequired");
		}

		setErrors(newErrors);

		return newErrors;
	};

 	// SUBMIT
 	const handleSubmit = async (e) => {
		e.preventDefault();

		const validationErrors = validateForm();

		if (Object.keys(validationErrors).length > 0) {
			showToastMessage(
				t("formPage.errors.missingFields", {
					count: Object.keys(validationErrors).length,
				}),
				"error",
			);

			return;
		}

		try {
			setIsSubmitting(true);

			console.log("FORM DATA => ", formData);

			const sendData = new FormData();

			sendData.append("email", formData.email);
			sendData.append("title", formData.title);
			sendData.append("desc", formData.desc);

			// IMPORTANT
			sendData.append("file", formData.img);
			// sendData.append("image", formData.img);

			// DEBUG
			for (const pair of sendData.entries()) {
				console.log(pair[0], pair[1]);
			}

			const response = await fetch(
				"https://bo-chat.space/dashboard/features/SendHelpRequest",
				{
					method: "POST",
					body: sendData,
				},
			);

			const data = await response.json();

			console.log("STATUS => ", response.status);
			console.log("RESPONSE => ", data);

			if (response.ok && data.success) {
				showToastMessage(
					t("formPage.successMessage") || "تم الإرسال بنجاح",
					"success",
				);

				setFormData({
					email: "",
					title: "",
					desc: "",
					img: null,
				});

				setErrors({});
			} else {
				throw new Error(
					data.response ||
						data.message ||
						t("formPage.errors.submitFailed"),
				);
			}
		} catch (error) {
			console.error("SUBMIT ERROR => ", error);

			showToastMessage(
				error.message || t("formPage.errors.submitFailed"),
				"error",
			);
		} finally {
			setIsSubmitting(false);
		}
	};

 	// TOAST STYLES
	const getToastStyles = () => {
	const baseStyles = {
		position: "fixed",
		top: "clamp(10px, 5vh, 50px)",
		right: isLTR ? "auto" : "clamp(10px, 5vw, 30px)",
		left: isLTR ? "clamp(10px, 5vw, 30px)" : "auto",
		zIndex: 9999,
	};

	const isSuccess = toastType === "success";

	const backgroundColor = "rgba(255, 255, 255, 0.70)";
	const textColor = isSuccess ? "#1B8F3A" : "#D72229";
	const borderColor = isSuccess ? "#1B8F3A" : "#D72229";

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

				<form className="custom-form">
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

					{/* Title */}
					<div className="mb-4">
						<label
							htmlFor="title"
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
							id="title"
							name="title"
							value={formData.title}
							onChange={handleInputChange}
							className="form-control"
							style={{
								width: "100%",
								height: "clamp(50px, 8vh, 60px)",
								borderRadius: "clamp(16px, 4vw, 22px)",
								background: "rgba(255, 255, 255, 0.9)",
								backdropFilter: "blur(15px)",
								border: errors.title ? "2px solid #D72229" : "none",
								padding: "0 clamp(15px, 4vw, 25px)",
								fontSize: "clamp(14px, 3.5vw, 18px)",
								textAlign: isLTR ? "left" : "right",
							}}
						/>
						{errors.title && (
							<div
								style={{
									color: "#D72229",
									fontSize: "clamp(12px, 3vw, 14px)",
									marginTop: "5px",
									textAlign: isLTR ? "left" : "right",
									fontFamily: "'Cairo', sans-serif",
								}}
							>
								{errors.title}
							</div>
						)}
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
							id="desc"
							name="desc"
							value={formData.desc}
							onChange={handleInputChange}
							rows={8}
							className="form-control"
							style={{
								width: "100%",
								minHeight: "clamp(200px, 40vh, 412px)",
								borderRadius: "clamp(16px, 4vw, 22px)",
								background: "rgba(255, 255, 255, 0.9)",
								backdropFilter: "blur(15px)",
								border: errors.desc ? "2px solid #D72229" : "none",
								padding: "clamp(15px, 3vw, 25px)",
								fontSize: "clamp(14px, 3.5vw, 18px)",
								textAlign: isLTR ? "left" : "right",
								resize: "vertical",
							}}
						/>
						{errors.desc && (
							<div
								style={{
									color: "#D72229",
									fontSize: "clamp(12px, 3vw, 14px)",
									marginTop: "5px",
									textAlign: isLTR ? "left" : "right",
									fontFamily: "'Cairo', sans-serif",
								}}
							>
								{errors.desc}
							</div>
						)}
					</div>

					{/* File Upload - now required */}
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
							{t("formPage.attachments")}{" "}
							<span style={{ color: "#D72229" }}>*</span>
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
								border: errors.img
									? "2px solid #D72229"
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
							{formData.img ? formData.img.name : t("formPage.uploadHint")}
						</label>

						<input
							type="file"
							id="uploadFile"
							name="uploadFile"
							accept="image/*"
							style={{ display: "none" }}
							onChange={handleInputChange}
						/>
						{errors.img && (
							<div
								style={{
									color: "#D72229",
									fontSize: "clamp(12px, 3vw, 14px)",
									marginTop: "5px",
									textAlign: isLTR ? "left" : "right",
									fontFamily: "'Cairo', sans-serif",
								}}
							>
								{errors.img}
							</div>
						)}
					</div>

					{/* Submit Button */}
					<div className="text-center mt-5">
						<button
							type="button"
							disabled={isSubmitting}
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
								cursor: isSubmitting ? "not-allowed" : "pointer",
								backdropFilter: "blur(15px)",
								boxShadow: "0 4px 15px rgba(215, 34, 41, 0.3)",
								transition: "all 0.3s ease",
								opacity: isSubmitting ? 0.7 : 1,
							}}
							onClick={handleSubmit}
							onMouseEnter={(e) => {
								if (!isSubmitting) {
									e.currentTarget.style.transform = "translateY(-2px)";
									e.currentTarget.style.boxShadow =
										"0 6px 20px rgba(215, 34, 41, 0.4)";
								}
							}}
							onMouseLeave={(e) => {
								e.currentTarget.style.transform = "translateY(0)";
								e.currentTarget.style.boxShadow =
									"0 4px 15px rgba(215, 34, 41, 0.3)";
							}}
						>
							{isSubmitting
								? t("formPage.submitting") || "جاري الإرسال..."
								: t("formPage.submit")
								}
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
									lineHeight: 1,
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