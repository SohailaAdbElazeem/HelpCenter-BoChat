import React, { useState } from "react";
import "./Home.modules.css";
import plus from "../../assests/plus.svg";
import { CgSandClock } from "react-icons/cg";
import { MdFeaturedPlayList } from "react-icons/md";
import Search from "../Search/Search";
import { Link, useNavigate } from "react-router-dom";
import userLock from "../../assests/userlock.PNG";
import SendClock from "../../assests/sendClock.PNG";
import feature from "../../assests/feature.PNG";
import uxbrowser from "../../assests/uxbrowser.PNG";
import setting from "../../assests/setting.PNG";
import creadit from "../../assests/creaditaCard.PNG";
import brain from "../../assests/brain.PNG";

const boxesData = [
	{
		// icon: <FaUserLock size={28}  />,
		imageSrc: userLock,
		header: "الخصوصية والأمان",
		text: "كيف نحمي بياناتك ونحافظ على سلامة مجتمعك",
		path: "/specialtiesAndSecurity",
	},
	{
		// icon: <CgSandClock size={28}  />,
		imageSrc: SendClock,
		header: "البداية السريعة",
		text: "كل ما تحتاجه لإعداد حسابك وبدء التواصل",
		path: "/quickstart",
	},
	{
		// icon: <MdFeaturedPlayList size={28}  />,
		imageSrc: feature,
		header: "المميزات الذكية",
		text: "اكتشف كيف تجعل أدواتنا تواصلك أكثر ذكاءً ومتعة",
		path: "/smartFeatures",
	},
	{
		// icon: <FaUserLock size={28} />,
		imageSrc: uxbrowser,
		header: "تخصيص التجربة",
		text: "اجعل Bo Chat يشبهك تحكم في الألوان و الخطوط والوضع الداكن",
		path: "/personalizeExp",
	},
	{
		icon: <CgSandClock size={28} />,
		imageSrc: setting,
		header: "الحساب والإعدادات",
		text: "تحكم كامل في مظهر تطبيقك إشعاراتك ومعلوماتك الشخصية",
		path: "/accountSettings",
	},
	{
		icon: <MdFeaturedPlayList size={28} />,
		imageSrc: creadit,
		header: "الدفع والاشتراكات",
		text: "كل ما تود معرفته عن ميزات بو شات المميزة وكيفية دعم نمو مجتمعنا",
		path: "/subscriptions",
	},
];
const questionsData = [
	{
		question:
			"في حال فقدت هاتفي كيف يمكنني استعادة حسابي دون المساس بخصوصية بياناتي القديمة؟",
		answer:
			"لأن رؤيتنا قائمة على أن التواصل والإنتاجية حق أساسي وليسا سلعة؛ نحن نعتمد على بنية تقنية ذكية ومفتوحة المصدر تقلل التكاليف التشغيلية، ونؤمن بأن كسب ثقة المجتمع أغلى من أي اشتراك شهري.",
	},
	{
		question: "كيف يمكنني تخصيص واجهة التطبيق لتناسب ذوقي الشخصي؟",
		answer:
			"مطلقاً. بو شات صُمم ليبقى حراً التزامنا معك واضح لا رسوم، لا اشتراكات، ولا مفاجآت في الفواتير. نحن هنا لنخفف عنك الأعباء لا لنضيف عبئاً جديداً.",
	},
	{
		question:
			"هل يستهلك التطبيق مساحة تخزين كبيرة أو يؤثر على أداء بطارية الهاتف؟",
		answer:
			"نعم، وبأعلى المعايير نستخدم بروتوكولات تشفير (End-to-End) تضمن أنك والطرف الآخر فقط من يمكنكم قراءة الرسائل حتى نحن في بو شات لا نملك المفتاح للاطلاع عليها.",
	},
	{
		question: "كيف يمكنني دعوة أصدقائي للانضمام وتجربة الفصل الجديد معكم؟",
		answer:
			"نعم، وبأعلى المعايير نستخدم بروتوكولات تشفير (End-to-End) تضمن أنك والطرف الآخر فقط من يمكنكم قراءة الرسائل حتى نحن في بو شات لا نملك المفتاح للاطلاع عليها.",
	},
	// ضيفي باقي الأسئلة بنفس الشكل...
];
export default function Home() {
	const [activeIndex, setActiveIndex] = useState(null);
	const navigate = useNavigate();
	const toggleQuestion = (index) => {
		setActiveIndex(activeIndex === index ? null : index);
	};
	return (
		<div className="home-container">
			<h1 className="home-title">مجتمعنا دائماً في قلب اهتمامنا</h1>
			<Search />
			{/* Boxes Section */}
			<div className="boxes-section">
				{boxesData.map((box, index) => (
					<div
						className="box"
						key={index}
						onClick={() => navigate(box.path)}
						style={{ cursor: "pointer" }}
					>
						<div className="card">
							{/* <div className="icon-box">{box.icon}</div> */}
							<div className="icon-box">
								<img
									src={box.imageSrc}
									alt={box.header}
									style={{
										width: "40px",
										height: "40px",
										objectFit: "contain",
									}}
								/>
							</div>
							<h3>{box.header}</h3>
							<p>{box.text}</p>
						</div>
					</div>
				))}
			</div>
			{/* Button */}
			<button className="join-button" onClick={() => navigate("/JoinUs")}>
				انضم إلينا كشريك
			</button>

			<div className="proplem">
				<div className="proplem-img">
					{/* <FaUserLock  size={28}/>  */}
					<img
						src={brain}
						alt="brain hand"
						style={{ width: "38px", height: "38px", objectFit: "contain" }}
					/>
				</div>
				<div className="proplem-text">
					<h3>واجهت مشكلة في الدخول؟</h3>
					<p>لا تقلق فريق بو شات هنا ليعيدك إلى مجتمعنا في أسرع وقت</p>
				</div>
				<button className="prolem-btn" onClick={() => navigate("/formpage")}>
					افتح تذكرة دعم
				</button>
			</div>

			<div className="questions-section" dir="rtl">
				<h1
					id="faq-title"
					style={{ fontSize: "24px", marginBottom: "20px", fontWeight: 700 }}
				>
					الأسئلة الشائعة
				</h1>

				<div className="question-container container">
					{questionsData.map((item, index) => (
						<div
							className={`question-item ${activeIndex === index ? "active" : ""}`}
							key={index}
							onClick={() => toggleQuestion(index)}
						>
							<div className="question">
								<img src={plus} className="toggle-icon" alt="toggle" />
								<p>{item.question}</p>
							</div>
							<div className="answer">
								<p>{item.answer}</p>
							</div>
						</div>
					))}

					<div className="faq-link-wrapper">
						<Link to="/FAQs" className="faq-link">
							<span>عرض المزيد</span>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
