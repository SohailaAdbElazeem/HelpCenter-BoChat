import "./Header.modules.css";
import logo from "../../assests/logo (2).png";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Header() {
	const { i18n, t } = useTranslation();

	const toggleLanguage = () => {
		const newLang = i18n.language === "ar" ? "en" : "ar";
		i18n.changeLanguage(newLang);
		localStorage.setItem("lang", newLang);
		document.body.dir = newLang === "ar" ? "rtl" : "ltr";
	};
 	return (
		<div className="main-section">
			<div className="header">
				<div className="logo-container">
					<Link to="/home" onClick={() => window.location.reload()}>
						<img src={logo} alt="logo" />
					</Link>
					<span className="line"></span>
					<Link className="logo-text" to="/">
						{t("header.help")}
					</Link>
				</div>

				<button className="translate" onClick={toggleLanguage}>
					{i18n.language === "ar" ? "English" : "عربي"}
				</button>

			</div>
		</div>
	);
}
