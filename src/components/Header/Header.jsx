import "./Header.css";
import logo from "../../assests/logo (2).png";
import { Link } from "react-router-dom";
export default function Header() {
	return (
		<div className="main-section">
			<div className="header">
					{/* Logo + Text */}
				<div className="logo-container">
					<Link to="/">
						<img src={logo} alt="logo" />
					</Link>
					<span className="line"></span>
					<span className="logo-text">المساعدة</span>
				</div>

				{/* Translate Button */}
				<button className="translate" id="translateBtn">
					English
				</button>
			
			</div>
		</div>
	);
}
