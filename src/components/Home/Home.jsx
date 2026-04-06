import React, { useState } from "react";
import "./Home.css";
// import brainHand from "../../assests/brainHand.PNG"
import plus from "../../assests/plus.svg"
import { FaUser, FaHeart, FaStar ,FaUserLock} from "react-icons/fa";
import { IoSearchOutline } from "react-icons/io5";
   import { CgSandClock } from "react-icons/cg";
import { MdFeaturedPlayList } from "react-icons/md";
import Search from "../Search/Search";

const boxesData = [
  {
    icon: <FaUserLock size={28}  />,
    header: "الخصوصية والأمان",
    text: "كيف نحمي بياناتك ونحافظ على سلامة مجتمعك",
  },
  {
    icon: <CgSandClock size={28}  />,
    header: "البداية السريعة",
    text: "كل ما تحتاجه لإعداد حسابك وبدء التواصل",
  },
  {
    icon: <MdFeaturedPlayList size={28}  />,
    header: "المميزات الذكية",
    text: "اكتشف كيف تجعل أدواتنا تواصلك أكثر ذكاءً ومتعة",
  },
  {
    icon: <FaUserLock size={28}  />,
    header: "الخصوصية والأمان",
    text: "كيف نحمي بياناتك ونحافظ على سلامة مجتمعك",
  },
  {
    icon: <CgSandClock size={28}  />,
    header: "البداية السريعة",
    text: "كل ما تحتاجه لإعداد حسابك وبدء التواصل",
  },
  {
    icon: <MdFeaturedPlayList size={28}  />,
    header: "المميزات الذكية",
    text: "اكتشف كيف تجعل أدواتنا تواصلك أكثر ذكاءً ومتعة",
  },
  // يمكن إضافة باقي الثلاثة الأخرى بنفس الطريقة
];
const questionsData = [
  {
    question:"في حال فقدت هاتفي كيف يمكنني استعادة حسابي دون المساس بخصوصية بياناتي القديمة؟",
    answer: "لأن رؤيتنا قائمة على أن التواصل والإنتاجية حق أساسي وليسا سلعة؛ نحن نعتمد على بنية تقنية ذكية ومفتوحة المصدر تقلل التكاليف التشغيلية، ونؤمن بأن كسب ثقة المجتمع أغلى من أي اشتراك شهري."
  },
  {
    question: "كيف يمكنني تخصيص واجهة التطبيق لتناسب ذوقي الشخصي؟",
    answer: "مطلقاً. بو شات صُمم ليبقى حراً التزامنا معك واضح لا رسوم، لا اشتراكات، ولا مفاجآت في الفواتير. نحن هنا لنخفف عنك الأعباء لا لنضيف عبئاً جديداً."
  },
  {
    question: "هل يستهلك التطبيق مساحة تخزين كبيرة أو يؤثر على أداء بطارية الهاتف؟",
    answer: "نعم، وبأعلى المعايير نستخدم بروتوكولات تشفير (End-to-End) تضمن أنك والطرف الآخر فقط من يمكنكم قراءة الرسائل حتى نحن في بو شات لا نملك المفتاح للاطلاع عليها."
  },
  {
    question: "كيف يمكنني دعوة أصدقائي للانضمام وتجربة الفصل الجديد معكم؟",
    answer: "نعم، وبأعلى المعايير نستخدم بروتوكولات تشفير (End-to-End) تضمن أنك والطرف الآخر فقط من يمكنكم قراءة الرسائل حتى نحن في بو شات لا نملك المفتاح للاطلاع عليها."
  },
  // ضيفي باقي الأسئلة بنفس الشكل...
];
export default function Home() {
  const [activeIndex, setActiveIndex] = useState(null);
  const toggleQuestion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };
  return (
    <div className="home-container">

      {/* H1 */}
      <h1 className="home-title">
        مجتمعنا دائماً في قلب اهتمامنا
      </h1>

      {/* Search Input */}
      {/* <div className="search-container">
        <IoSearchOutline  className="search-icon"  />
        <input
          type="text"
          placeholder="اكتب ما تريد البحث عنه"
          className="search-input"
        />
      </div> */}

<Search/>
      {/* Boxes Section */}
     <div className="boxes-section">
      {boxesData.map((box, index) => (
        <div className="box" key={index}>
          <div className="card">
            
            <div className="icon-box">{box.icon}</div>
            <h3>{box.header}</h3>
            <p>{box.text}</p>
          </div>
        </div>
      ))}
    </div>

      {/* Button */}
      <button className="join-button">انضم إلينا كشريك</button>
       
       <div className="proplem">
        <div className="proplem-img">
          <FaUserLock  size={28}/> 
        </div>
        <div className="proplem-text">
          <h3>واجهت مشكلة في الدخول؟</h3>
          <p>لا تقلق فريق بو شات هنا ليعيدك إلى مجتمعنا في أسرع وقت</p>
        </div>
          <button className="prolem-btn">افتح تذكرة دعم</button>
       </div>


          <div className="questions-section" dir="rtl">
      <h1 id="faq-title" style={{fontSize: "24px", marginBottom: "20px", fontWeight: 700 }}>
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
  <a
    href="/FAQs.html"
    className="faq-link"
  >
    <span>عرض المزيد</span>
  </a>
</div>
      </div>
    </div>
    </div>



  );
}
