// import React, { useMemo, useState, useEffect } from "react";
// import { useTranslation } from "react-i18next";
// import { useParams, useNavigate } from "react-router-dom";
// import Search from "../Search/Search";
// import { useSearch } from "../../Context/SearchContext";
// import { increaseArticleView } from "../../utils/increaseArticleView";

// const ArticlesByCategory = () => {
//   const { t, i18n } = useTranslation();
//   const { searchTerm } = useSearch();
//   const isLTR = i18n.language === "en";
//   const navigate = useNavigate();
//   const { ctg } = useParams(); 

//   const [articles, setArticles] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const URL = "https://bo-chat.space";

//   // Category names (for title)
//   const categories = {
//     1: "الخصوصية والأمان",
//     2: "البداية السريعة",
//     3: "المميزات الذكية",
//     4: "تخصيص التجربة",
//     5: "الحساب والإعدادات",
//     6: "الدفع والاشتراكات",
//     7: "برنامج السفراء",
//     8:"استثمر معنا",
//     9:"المطورون والمساهمون"
//    };

//   const categoryTitle = categories[ctg] || "المقالات";

//   const fetchArticles = async () => {
//     try {
//       setLoading(true);
//       setError("");
//       const token = localStorage.getItem("token");

//       const res = await fetch(
//         `${URL}/dashboard/articles/AllByCTG?page=1&limit=20&ctg=${ctg}`,
//         {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

//       const data = await res.json();
//       setArticles(data.response || []);
//     } catch (err) {
//       console.error("Error fetching articles:", err);
//       setError("Failed to load articles");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (ctg) fetchArticles();
//   }, [ctg]);

//   const filteredArticles = useMemo(() => {
//     if (!searchTerm.trim()) return articles;
//     return articles.filter((article) =>
//       article.title.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//   }, [searchTerm, articles]);

//   const highlightText = (text, searchTerm) => {
//     if (!searchTerm) return text;
//     const regex = new RegExp(`(${searchTerm})`, "gi");
//     const parts = text.split(regex);
//     return parts.map((part, i) =>
//       regex.test(part) ? (
//         <mark key={i} style={{ backgroundColor: "rgba(215, 34, 41, 0.2)", fontWeight: "bold", padding: "0 2px", borderRadius: "4px" }}>
//           {part}
//         </mark>
//       ) : (
//         part
//       )
//     );
//   };

//   if (loading) {
//     return (
//       <div className="min-vh-100 d-flex align-items-center justify-content-center" style={{ background: "linear-gradient(180deg, #D72229 30%, rgba(215, 34, 41, 0) 100%)" }}>
//         <div className="spinner-border text-danger" role="status"><span className="visually-hidden">Loading...</span></div>
//         <p className="ms-2">{t("loading") || "Loading..."}</p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-vh-100 d-flex align-items-center justify-content-center" style={{ background: "linear-gradient(180deg, #D72229 30%, rgba(215, 34, 41, 0) 100%)" }}>
//         <div className="text-center bg-danger bg-opacity-75 p-4 rounded-4 text-white">
//           <h4>حدث خطأ</h4>
//           <p>{error}</p>
//           <button className="btn btn-light mt-2" onClick={() => window.location.reload()}>إعادة المحاولة</button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-vh-100 d-flex align-items-center justify-content-center p-4" style={{ background: "linear-gradient(180deg, #D72229 30%, rgba(215, 34, 41, 0) 100%)", direction: isLTR ? "ltr" : "rtl" }}>
//       <div className="w-100" style={{ maxWidth: "1050px", margin: "0 auto" }}>
//         <Search />

//         <div className="mb-5 Head-title">
//           <div className="fw-bold" style={{ fontFamily: "'Cairo', sans-serif", fontWeight: 700, fontSize: "clamp(30px, 8vw, 65px)", lineHeight: "clamp(35px, 6vw, 55px)", color: "#000000", margin: "clamp(20px, 10vw, 90px) 0 clamp(20px, 8vw, 60px) 0", textAlign: isLTR ? "left" : "right" }}>
//             {highlightText(categoryTitle, searchTerm)}
//           </div>
//         </div>

//         {filteredArticles.length > 0 ? (
//           <div className="row gx-2 gy-3" style={{ marginBottom: "clamp(30px, 15vw, 500px)" }}>
//             {filteredArticles.map((article) => (
//               <div key={article._id} className="col-12 col-md-6 d-flex">
//                 <div className="d-flex align-items-center px-4 shadow-sm" style={{ width: "100%", height: "60px", background: "#EDEDED", borderRadius: "28px", opacity: 1, flexDirection: isLTR ? "row" : "row-reverse", cursor: "pointer", transition: "all 0.3s ease", animation: "fadeIn 0.3s ease-in-out" }}
//                   onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.15)"; e.currentTarget.style.background = "#e0e0e0"; }}
//                   onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.background = "#EDEDED"; }}
//                   onClick={() => { increaseArticleView(article._id); navigate(`/article/${article._id}`); }}>
//                   <div className="bg-danger rounded-circle flex-shrink-0" style={{ width: "12px", height: "12px", marginLeft: isLTR ? "0" : "auto", marginRight: isLTR ? "10px" : "0", order: isLTR ? 0 : 1 }}></div>
//                   <span className="text-danger fw-semibold fs-5 flex-grow-1 px-3" style={{ fontFamily: "'Cairo', sans-serif", textAlign: isLTR ? "left" : "right", fontSize: "clamp(14px, 4vw, 20px)", order: isLTR ? 1 : 0 }}>
//                     {highlightText(article.title, searchTerm)}
//                   </span>
//                 </div>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <div className="text-center p-5 bg-white bg-opacity-75 rounded-4 m-4" style={{ maxWidth: "500px", margin: "40px auto" }}>
//             <p style={{ fontSize: "18px", color: "#666" }}>{t("security.noResults", { searchTerm })}</p>
//           </div>
//         )}
//       </div>
//       <style jsx>{`
//         @keyframes fadeIn {
//           from { opacity: 0; transform: translateY(10px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default ArticlesByCategory;

import React, { useMemo, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useParams, useNavigate } from "react-router-dom";
import Search from "../Search/Search";
import { useSearch } from "../../Context/SearchContext";
import { increaseArticleView } from "../../utils/increaseArticleView";

const ArticlesByCategory = () => {
  const { t, i18n } = useTranslation();
  const { searchTerm } = useSearch();
  const isLTR = i18n.language === "en";
  const navigate = useNavigate();
  const { ctg } = useParams();

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const URL = "https://bo-chat.space";

  const categories = {
    1: "الخصوصية والأمان",
    2: "البداية السريعة",
    3: "المميزات الذكية",
    4: "تخصيص التجربة",
    5: "الحساب والإعدادات",
    6: "الدفع والاشتراكات",
    7: "برنامج السفراء",
    8: "استثمر معنا",
    9: "المطورون والمساهمون",
  };

  const categoryTitle = categories[ctg] || "المقالات";

  const fetchArticles = async () => {
    try {
      setLoading(true);
      setError("");
      const token = localStorage.getItem("token");
      const res = await fetch(
        `${URL}/dashboard/articles/AllByCTG?page=1&limit=20&ctg=${ctg}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();
      setArticles(data.response || []);
    } catch (err) {
      console.error("Error fetching articles:", err);
      setError("Failed to load articles");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (ctg) fetchArticles();
  }, [ctg]);

  const filteredArticles = useMemo(() => {
    if (!searchTerm.trim()) return articles;
    return articles.filter((article) =>
      article.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, articles]);

  const highlightText = (text, searchTerm) => {
    if (!searchTerm) return text;
    const regex = new RegExp(`(${searchTerm})`, "gi");
    const parts = text.split(regex);
    return parts.map((part, i) =>
      regex.test(part) ? (
        <mark key={i} style={{ backgroundColor: "rgba(215, 34, 41, 0.2)", fontWeight: "bold", padding: "0 2px", borderRadius: "4px" }}>{part}</mark>
      ) : part
    );
  };

  if (loading) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center" style={{ background: "linear-gradient(180deg, #D72229 30%, rgba(215, 34, 41, 0) 100%)" }}>
        <div className="spinner-border text-danger" role="status"><span className="visually-hidden">Loading...</span></div>
        <p className="ms-2">{t("loading") || "Loading..."}</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center" style={{ background: "linear-gradient(180deg, #D72229 30%, rgba(215, 34, 41, 0) 100%)" }}>
        <div className="text-center bg-danger bg-opacity-75 p-4 rounded-4 text-white">
          <h4>حدث خطأ</h4>
          <p>{error}</p>
          <button className="btn btn-light mt-2" onClick={() => window.location.reload()}>إعادة المحاولة</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center p-4" style={{ background: "linear-gradient(180deg, #D72229 30%, rgba(215, 34, 41, 0) 100%)", direction: isLTR ? "ltr" : "rtl" }}>
      <div className="w-100" style={{ maxWidth: "1050px", margin: "0 auto" }}>
        <Search />

        <div className="mb-5 Head-title">
          <div className="fw-bold" style={{ fontFamily: "'Cairo', sans-serif", fontWeight: 700, fontSize: "clamp(30px, 8vw, 65px)", lineHeight: "clamp(35px, 6vw, 55px)", color: "#000000", margin: "clamp(20px, 10vw, 90px) 0 clamp(20px, 8vw, 60px) 0", textAlign: isLTR ? "left" : "right" }}>
            {highlightText(categoryTitle, searchTerm)}
          </div>
        </div>

        {articles.length === 0 ? (
          // حالة عدم وجود مقالات في هذا التصنيف نهائياً
           <div className=" w-100 d-flex align-items-center justify-content-center">
    <div className="text-center p-5 bg-white bg-opacity-75 rounded-4" style={{ maxWidth: "600px", width: "90%", animation: "fadeIn 0.3s ease-in-out" }}>
      <p style={{ fontSize: "clamp(18px, 5vw, 24px)", color: "#D72229", fontWeight: "bold" }}>
        {isLTR ? "No articles available in this category yet." : "هذا النوع لا يوجد به مقالات حالياً"}
      </p>
      <p style={{ fontSize: "16px", color: "#666", marginTop: "10px" }}>
        {isLTR ? "Please check back later." : "يرجى العودة لاحقاً."}
      </p>
    </div>
  </div>
        ) : filteredArticles.length > 0 ? (
          <div className="row gx-2 gy-3" style={{ marginBottom: "clamp(30px, 15vw, 500px)" }}>
            {filteredArticles.map((article) => (
              <div key={article._id} className="col-12 col-md-6 d-flex">
                <div
                  className="d-flex align-items-center px-4 shadow-sm"
                  style={{ width: "100%", height: "60px", background: "#EDEDED", borderRadius: "28px", opacity: 1, flexDirection: isLTR ? "row" : "row-reverse", cursor: "pointer", transition: "all 0.3s ease", animation: "fadeIn 0.3s ease-in-out" }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.15)"; e.currentTarget.style.background = "#e0e0e0"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.background = "#EDEDED"; }}
                  onClick={() => { increaseArticleView(article._id); navigate(`/article/${article._id}`); }}>
                  <div className="bg-danger rounded-circle flex-shrink-0" style={{ width: "12px", height: "12px", marginLeft: isLTR ? "0" : "auto", marginRight: isLTR ? "10px" : "0", order: isLTR ? 0 : 1 }}></div>
                  <span className="text-danger fw-semibold fs-5 flex-grow-1 px-3" style={{ fontFamily: "'Cairo', sans-serif", textAlign: isLTR ? "left" : "right", fontSize: "clamp(14px, 4vw, 20px)", order: isLTR ? 1 : 0 }}>
                    {highlightText(article.title, searchTerm)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // حالة وجود مقالات ولكن البحث لم يعثر على شيء
          <div className="text-center p-5 bg-white bg-opacity-75 rounded-4 m-4" style={{ maxWidth: "500px", margin: "40px auto" }}>
            <p style={{ fontSize: "18px", color: "#666" }}>{t("security.noResults", { searchTerm })}</p>
          </div>
        )}
      </div>
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default ArticlesByCategory;