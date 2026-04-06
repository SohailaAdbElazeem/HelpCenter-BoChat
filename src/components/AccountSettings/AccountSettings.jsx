import React from "react";
import Search from "../Search/Search";

const AccountSettings = () => {
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
						}}
					>
						الحساب والإعدادات{" "}
					</div>
				</div>

				<div
					className="row gx-2 gy-3"
					style={{ marginBottom: "clamp(30px, 15vw, 500px)" }}
				>
					{Array.from({ length: 16 }).map((_, index) => (
						<div key={index} className="col-12 col-md-6 d-flex ">
							<div
								className="d-flex align-items-center px-4 shadow-sm"
								style={{
									width: "509px",
									height: "60px",
									background: "#EDEDED",
									borderRadius: "28px",
									opacity: 1,
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
									className="text-danger fw-semibold fs-5 flex-grow-1 text-end px-3"
									style={{ fontFamily: "'Cairo', sans-serif" }}
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
};

export default AccountSettings;
