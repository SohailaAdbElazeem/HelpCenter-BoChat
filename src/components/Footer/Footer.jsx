import React from "react";
import "./Footer.css";
import linkedin from "../../assests/linkedin.svg";
import facebook from "../../assests/facebook.svg";
import youtube from "../../assests/youtube.svg";
import tiktok from "../../assests/tiktok.svg";
import logo from "../../assests/logo (2).png";
import { useTranslation } from "react-i18next";

export default function Footer() {
	const { t, i18n } = useTranslation();

	return (
		<footer className={`main-footer ${i18n.language === "en" ? "ltr" : "rtl"}`}>
			<div className="footer-grid">
				{/* Company */}
				<div className="footer-column">
					<h3>{t("footer.company.title")}</h3>
					<ul>
						 
						<li>
							<a href="https://bo-eg.site/PandaOracle.html">
								{t("footer.company.about")}
							</a>
						</li>
						<li>
							<a href="https://bo-eg.site/ContactUs.html">
								{t("footer.company.contact")}
							</a>
						</li>
						<li>
							<a href="https://bo-eg.site/AboutUs.html">
								{t("footer.company.info")}
							</a>
						</li>
						<li>
							<a href="/">{t("footer.company.help")}</a>
						</li>
					</ul>
				</div>

				{/* Find Us */}
				<div className="footer-column">
					<h3>{t("footer.findUs.title")}</h3>
					<ul>
						<li>
							<a href="https://apps.apple.com/us/app/bo-chat/id6749073096">
								{t("footer.findUs.ios")}
							</a>
						</li>
						<li>
							<a
								href="https://play.google.com/store/apps/details?id=com.pandaoracle.bochat&hl=ar"
								target="_blank"
								rel="noreferrer"
							>
								{t("footer.findUs.android")}
							</a>
						</li>
						<li>
							<a 
							href="https://global.app.mi.com/details?lo=ID&la=en_US&id=com.pandaoracle.bochat"
							 >{t("footer.findUs.xiaomi")}</a>
						</li>
					</ul>
				</div>

				{/* Legal */}
				<div className="footer-column">
					<h3>{t("footer.legal.title")}</h3>
					<ul>
						<li>
							<a href="https://bo-eg.site/PrivacyPolicies.html">
								{t("footer.legal.privacy")}
							</a>
						</li>
						<li>
							<a href="https://bo-eg.site/SocialGuiedLines.html">
								{t("footer.legal.guidelines")}
							</a>
						</li>
						<li>
							<a href="https://bo-eg.site/BoShield.html">
								{t("footer.legal.copyright")}
							</a>
						</li>
						<li>
							<a href="https://bo-eg.site/PrivacyCenter.html">
								{t("footer.legal.privacyCenter")}
							</a>
						</li>
						<li>
							<a href="https://bo-eg.site/BoShield.html">
								{t("footer.legal.Shield")}
							</a>
						</li>
						<li>
							<a href="https://bo-eg.site/ProfitsSystem.html">
								{t("footer.legal.Profit")}
							</a>
						</li>

						 {/* <li><a href="/BoShield.html" data-ar="درع بو شات" data-en="Bo Chat Shield"> درع بو شات</a></li> */}
                          {/* <li><a href="/ProfitsSystem.html" data-ar="نظام الربح" data-en="Profit system">  نظام الربح </a></li> */}
					</ul>
				</div>

				{/* Social */}
				<div className="footer-column">
					<h3>{t("footer.social.title")}</h3>
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
				<p>{t("footer.bottom")}</p>
			</div>
		</footer>
	);
}
