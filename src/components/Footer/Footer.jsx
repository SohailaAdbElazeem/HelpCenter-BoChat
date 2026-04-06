import React from "react";
import "./Footer.css";
import linkedin from "../../assests/linkedin.svg";
import facebook from "../../assests/facebook.svg";
import youtube from "../../assests/youtube.svg";
import tiktok from "../../assests/tiktok.svg";
import logo from "../../assests/logo (2).png";
export default function Footer() {
	return (
		<footer className="main-footer">
			<div className="footer-grid">
				{/* Company */}
				<div className="footer-column">
					<h3>الشركة</h3>
					<ul>
						<li>
							<a href="https://bo-eg.site/AboutUs.html">عن الشركة</a>
						</li>
						<li>
							<a href="https://bo-eg.site/ContactUs.html">اتصل بنا</a>
						</li>
						<li>
							<a href="https://bo-eg.site/AboutUs.html">معلومات عنا</a>
						</li>
						<li>
							<a href="/">المساعدة</a>
						</li>
					</ul>
				</div>

				{/*  */}
				<div className="footer-column">
					<h3>أين تجدنا</h3>
					<ul>
						<li>
							<a href="https://apps.apple.com/us/app/bo-chat/id6749073096">
								متجر تطبيقات iOS
							</a>
						</li>
						<li>
							<a
								href="https://play.google.com/store/apps/details?id=com.pandaoracle.bochat&hl=ar"
								target="_blank"
								rel="noreferrer"
							>
								جوجل بلاي أندرويد
							</a>
						</li>
						<li>
							<a href="/">متجر تطبيقات شاومي</a>
						</li>
					</ul>
				</div>

				{/*  */}
				<div className="footer-column">
					<h3>القانون</h3>
					<ul>
						<li>
							<a href="https://bo-eg.site/PrivacyPolicies.html">
								سياسة الخصوصية
							</a>
						</li>
						<li>
							<a href="https://bo-eg.site/SocialGuiedLines.html">
								قواعد المجتمع
							</a>
						</li>
						<li>
							<a href="https://bo-eg.site/BoShield.html">سياسة الطبع والنشر</a>
						</li>
						<li>
							<a href="https://bo-eg.site/PrivacyCenter.html">مركز الخصوصية</a>
						</li>
					</ul>
				</div>

				{/* Social */}
				<div className="footer-column">
					<h3>المجتمع</h3>
					<div className="social-icons">
						<a
							href="https://www.linkedin.com/company/bo-chat/"
							target="_blank"
							rel="noreferrer"
						>
							<img src={linkedin} alt="linkedin" />
						</a>
						<a
							href="https://www.facebook.com/BoChatApp"
							target="_blank"
							rel="noreferrer"
						>
							<img src={facebook} alt="facebook" />
						</a>
						<a
							href="https://www.youtube.com/@Bochat_app"
							target="_blank"
							rel="noreferrer"
						>
							<img src={youtube} alt="youtube" />
						</a>
						<a
							href="https://tiktok.com/@bochat_app"
							target="_blank"
							rel="noreferrer"
						>
							<img src={tiktok} alt="tiktok" />
						</a>
						<a href="https://bo-eg.site/">
							<img src={logo} alt="logo" />
						</a>
					</div>
				</div>
			</div>

			{/* Bottom */}
			<div className="footer-bottom">
				<p>جميع الحقوق محفوظة © لشركة باندا اوريكال لتقنية المعلومات 2025</p>
			</div>
		</footer>
	);
}
