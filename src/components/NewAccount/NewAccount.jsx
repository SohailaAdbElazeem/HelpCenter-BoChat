import React from "react";
import Search from "../Search/Search";
export default function NewAccount() {
	return (
		<div
			className="min-vh-100 d-flex align-items-center justify-content-center p-4"
			style={{
				background:
					"linear-gradient(180deg, #D72229 30%, rgba(215, 34, 41, 0) 100%)",
			}}
		>
			<div className="w-100" style={{ maxWidth: "1050px", margin: "0 auto" }}>
				{/* Search  */}
				<Search />

				{/* Header - B */}
				<div className="mb-5">
					<div
						className="fw-bold"
						style={{
							fontFamily: "'Cairo', sans-serif",
							fontWeight: 700,
							color: "#000000",
							fontSize: "clamp(30px, 8vw, 65px)",
							lineHeight: "clamp(25px, 5vw, 45px)",
							margin: "clamp(20px, 10vw, 90px) 0 clamp(20px, 8vw, 60px) 0",
						}}
					>
						إنشاء حساب جديد{" "}
					</div>
				</div>

				<div
					className="d-flex align-items-center "
					style={{ color: "#ffffff" }}
				>
					<p className="ms-5">آخر تحديث: [أبريل 2025]</p>
					<p>تم التحديث</p>
				</div>
				<div className="stpes">
					<h5>الخطوات:</h5>
					<ol className="mx-3">
						<li>افتح التطبيق.</li>
						<li>اضغط على إنشاء حساب.</li>
						<li>أدخل اسمك الكامل، عنوان بريدك الإلكتروني، وتاريخ ميلادك.</li>
						<li>اضغط على التالي.</li>
						<li>أنشئ كلمة مرور قوية.</li>
						<li>أكّد بريدك الإلكتروني (مهم للخطوة التالية).</li>
						<li>
							ستصلك رسالة تحقق عبر البريد الإلكتروني — أدخل الرمز واضغط
							على تحقق.
						</li>
						<li>اختر المعرّف @ الخاص بك.</li>
						<li>اضغط على تسجيل.</li>
					</ol>
				</div>
				<div className="">
					<h5>المشاكل الشائعة</h5>
					<p>التطبيق يعرض رسالة "الرجاء إدخال بريد إلكتروني صالح".</p>
					<ul className="mx-3" style={{ listStyleType: "square" }}>
						<li>يحدث ذلك عند إدخال بريد غير صالح.</li>
						<li>السبب الأكثر شيوعًا هو وجود مسافات في البداية أو النهاية.</li>
						<li>
							تأكّد من عدم وجود مسافات وأن البريد يتبع الصيغة الصحيحة للبريد
							الإلكتروني.
						</li>
					</ul>
					<span>لم أتلقَّ رمز التحقق.</span>
				</div>
				<div className="d-flex flex-column align-items-center justify-content-center mt-5 mb-5 px-3">
					<h5
						style={{
							fontSize: "clamp(18px, 5vw, 24px)",
							fontFamily: "'Cairo', sans-serif",
							fontWeight: 600,
							color: "#000000",
							textAlign: "center",
							marginBottom: "clamp(15px, 4vw, 25px)",
						}}
					>
						هل وجدت الإجابة التي تبحث عنها؟
					</h5>

					<div className="d-flex flex-wrap justify-content-center gap-3 mb-3">
						<button
							className="mx-2"
							style={{
								width: "clamp(120px, 30vw, 150px)",
								height: "clamp(45px, 8vh, 50px)",
								borderRadius: "clamp(14px, 4vw, 18px)",
								border: "none",
								background: "#FFFFFF",
								fontFamily: "'Cairo', sans-serif",
								fontSize: "clamp(14px, 3.5vw, 16px)",
								fontWeight: 600,
								color: "#D72229",
								cursor: "pointer",
								transition: "all 0.3s ease",
								boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
							}}
							onMouseEnter={(e) => {
								e.currentTarget.style.transform = "translateY(-2px)";
								e.currentTarget.style.boxShadow =
									"0 4px 12px rgba(0, 0, 0, 0.15)";
							}}
							onMouseLeave={(e) => {
								e.currentTarget.style.transform = "translateY(0)";
								e.currentTarget.style.boxShadow =
									"0 2px 8px rgba(0, 0, 0, 0.1)";
							}}
						>
							بالتأكيد
						</button>

						<button
							style={{
								width: "clamp(120px, 30vw, 150px)",
								height: "clamp(45px, 8vh, 50px)",
								borderRadius: "clamp(14px, 4vw, 18px)",
								border: "none",
								background: "#FFFFFF",
								fontFamily: "'Cairo', sans-serif",
								fontSize: "clamp(14px, 3.5vw, 16px)",
								fontWeight: 600,
								color: "#D72229",
								cursor: "pointer",
								transition: "all 0.3s ease",
								boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
							}}
							onMouseEnter={(e) => {
								e.currentTarget.style.transform = "translateY(-2px)";
								e.currentTarget.style.boxShadow =
									"0 4px 12px rgba(0, 0, 0, 0.15)";
							}}
							onMouseLeave={(e) => {
								e.currentTarget.style.transform = "translateY(0)";
								e.currentTarget.style.boxShadow =
									"0 2px 8px rgba(0, 0, 0, 0.1)";
							}}
						>
							ليس مفيداً
						</button>
					</div>

					<p
						style={{
							fontFamily: "'Cairo', sans-serif",
							fontSize: "clamp(12px, 3.5vw, 14px)",
							color: "#000000",
							textAlign: "center",
							marginTop: "clamp(10px, 3vw, 15px)",
							marginBottom: "clamp(15px, 4vw, 20px)",
						}}
					>
						1239 من 1844 وجدوا هذا مفيداً
					</p>

					<span
						style={{
							width: "min(1020px, 90%)",
							maxWidth: "1020px",
							height: "1px",
							background: "#000000",
							margin: "0 auto",
						}}
					></span>
				</div>

				{/* Buttons */}
				<h4 className="mb-4">مقالات هذا القسم</h4>
				<div className="row gx-2 gy-3" style={{}}>
					{Array.from({ length: 8 }).map((_, index) => (
						<div key={index} className="col-12 col-md-6 d-flex ">
							<div
								className="d-flex align-items-center px-4 shadow-sm"
								style={{
									width: "509px",
									height: "60px",
									background: "#EDEDED",
									borderRadius: "28px",
								}}
							>
								{/* Red Dot */}
								<div
									className="bg-danger rounded-circle flex-shrink-0"
									style={{
										width: "12px",
										height: "12px",
										// marginLeft: '6px'
										marginLeft: "0px",
									}}
								></div>

								{/* Text */}
								<span
									className="fw-semibold fs-5 flex-grow-1 text-end px-3"
									style={{
										fontFamily: "'Cairo', sans-serif",
										fontSize: "25px",
										color: "#000000",
									}}
								>
									إدارة حسابك
								</span>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
