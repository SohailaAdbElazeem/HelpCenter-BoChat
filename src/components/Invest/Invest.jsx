// import React, { useMemo, useState, useEffect } from "react";
// import { useTranslation } from "react-i18next";
// import Search from "../Search/Search";
// import { useSearch } from "../../Context/SearchContext";
// import { useNavigate } from "react-router-dom";
// import { increaseArticleView } from "../../utils/increaseArticleView";

// const Invest = () => {
// 	const { t, i18n } = useTranslation();
// 	const { searchTerm } = useSearch();
// 	const isLTR = i18n.language === "en";
// 	const navigate = useNavigate();

// 	// status of data
// 	const [articles, setArticles] = useState([]);
// 	const [loading, setLoading] = useState(true);
// 	const [error, setError] = useState(null);
// 	const URL = "https://bo-chat.space";

// // fetch data from API
//   const fetchArticles = async () => {
// 	try {
// 	  setLoading(true);
// 	  setError("");

// 	  const token = localStorage.getItem("token");

// 	  const res = await fetch(
// 		`${URL}/dashboard/ArticlesByType/استثمر معنا`,
// 		{
// 		  method: "GET",
// 		  headers: {
// 			"Content-Type": "application/json",
// 			Authorization: `Bearer ${token}`, 
// 		  },
// 		}
// 	  );

// 	  if (!res.ok) {
// 		throw new Error(`HTTP error! status: ${res.status}`);
// 	  }

// 	  const data = await res.json();

// 	  console.log("API DATA:", data);

// 	  setArticles(data.response || []);
// 	} catch (err) {
// 	  console.error("Error fetching articles:", err);
// 	  setError("Failed to load articles");
// 	} finally {
// 	  setLoading(false);
// 	}
//   };
//   useEffect(() => {
// 	fetchArticles();
//   }, []);

//   // search filter
//   const filteredArticles = useMemo(() => {
// 	if (!searchTerm.trim()) return articles;

// 	return articles.filter((article) =>
// 	  article.title.toLowerCase().includes(searchTerm.toLowerCase())
// 	);
//   }, [searchTerm, articles]);
// 	// highlight search
//   const highlightText = (text, searchTerm) => {
// 	if (!searchTerm) return text;

// 	const regex = new RegExp(`(${searchTerm})`, "gi");
// 	const parts = text.split(regex);

// 	return parts.map((part, i) =>
// 	  regex.test(part) ? (
// 		<mark key={i} style={{ color: "red" }}>
// 		  {part}
// 		</mark>
// 	  ) : (
// 		part
// 	  )
// 	);
//   };

// 	if (loading) {
// 		return (
// 			<div
// 				className="min-vh-100 d-flex align-items-center justify-content-center"
// 				style={{
// 					background:
// 						"linear-gradient(180deg, #D72229 30%, rgba(215, 34, 41, 0) 100%)",
// 				}}
// 			>
// 				<div className="text-center text-white">
// 					<div className="spinner-border text-light" role="status">
// 						<span className="visually-hidden">جاري التحميل...</span>
// 					</div>
// 					<p className="mt-3">جاري تحميل المقالات...</p>
// 				</div>
// 			</div>
// 		);
// 	}

// 	if (error) {
// 		return (
// 			<div
// 				className="min-vh-100 d-flex align-items-center justify-content-center"
// 				style={{
// 					background:
// 						"linear-gradient(180deg, #D72229 30%, rgba(215, 34, 41, 0) 100%)",
// 				}}
// 			>
// 				<div className="text-center text-white bg-danger bg-opacity-75 p-4 rounded-4">
// 					<h4>حدث خطأ</h4>
// 					<p>{error}</p>
// 					<button
// 						className="btn btn-light mt-2"
// 						onClick={() => window.location.reload()}
// 					>
// 						إعادة المحاولة
// 					</button>
// 				</div>
// 			</div>
// 		);
// 	}

// 	return (
// 		<div
// 			className="min-vh-100 d-flex align-items-center justify-content-center p-4"
// 			style={{
// 				background:
// 					"linear-gradient(180deg, #D72229 30%, rgba(215, 34, 41, 0) 100%)",
// 				direction: isLTR ? "ltr" : "rtl",
// 			}}
// 		>
// 			<div className="w-100" style={{ maxWidth: "1050px", margin: "0 auto" }}>
// 				<Search />

// 				{/* Header */}
// 				<div className="mb-5 Head-title">
// 					<div
// 						className="fw-bold"
// 						style={{
// 							fontFamily: "'Cairo', sans-serif",
// 							fontWeight: 700,
// 							fontSize: "clamp(30px, 8vw, 65px)",
// 							lineHeight: "clamp(35px, 6vw, 55px)",
// 							color: "#000000",
// 							margin: "clamp(20px, 10vw, 90px) 0 clamp(20px, 8vw, 60px) 0",
// 							textAlign: isLTR ? "left" : "right",
// 						}}
// 					>
// 						{highlightText(t("Invest.title"), searchTerm)}
// 					</div>
// 				</div>

// 				{/* شبكة الأزرار */}
// 				{filteredArticles.length > 0 ? (
// 					<div
// 						className="row gx-2 gy-3"
// 						style={{ marginBottom: "clamp(30px, 15vw, 500px)" }}
// 					>
// 						{filteredArticles.map((article) => (
// 							<div key={article.id} className="col-12 col-md-6 d-flex">
// 								<div
// 									className="d-flex align-items-center px-4 shadow-sm"
// 									style={{
// 										width: "100%",
// 										height: "60px",
// 										background: "#EDEDED",
// 										borderRadius: "28px",
// 										opacity: 1,
// 										flexDirection: isLTR ? "row" : "row-reverse",
// 										cursor: "pointer",
// 										transition: "all 0.3s ease",
// 										animation: "fadeIn 0.3s ease-in-out",
// 									}}
// 									onMouseEnter={(e) => {
// 										e.currentTarget.style.transform = "translateY(-2px)";
// 										e.currentTarget.style.boxShadow =
// 											"0 4px 12px rgba(0, 0, 0, 0.15)";
// 										e.currentTarget.style.background = "#e0e0e0";
// 									}}
// 									onMouseLeave={(e) => {
// 										e.currentTarget.style.transform = "translateY(0)";
// 										e.currentTarget.style.boxShadow = "none";
// 										e.currentTarget.style.background = "#EDEDED";
// 									}}
// 									onClick={() => {
// 										// يمكنك التوجيه إلى صفحة تفاصيل المقال هنا
// 										console.log("Article clicked:", article.title, article.id);
// 										increaseArticleView(article._id);
// 										navigate(`/article/${article._id}`);

// 									}}
// 								>
// 									<div
// 										className="bg-danger rounded-circle flex-shrink-0"
// 										style={{
// 											width: "12px",
// 											height: "12px",
// 											marginLeft: isLTR ? "0" : "auto",
// 											marginRight: isLTR ? "10px" : "0",
// 											order: isLTR ? 0 : 1,
// 										}}
// 									></div>

// 									<span
// 										className="text-danger fw-semibold fs-5 flex-grow-1 px-3"
// 										style={{
// 											fontFamily: "'Cairo', sans-serif",
// 											textAlign: isLTR ? "left" : "right",
// 											fontSize: "clamp(14px, 4vw, 20px)",
// 											order: isLTR ? 1 : 0,
// 										}}
// 									>
// 										{highlightText(article.title, searchTerm)}
// 									</span>
// 								</div>
// 							</div>
// 						))}
// 					</div>
// 				) : (
// 					<div
// 						className="no-results"
// 						style={{
// 							textAlign: "center",
// 							padding: "60px 20px",
// 							background: "rgba(255, 255, 255, 0.9)",
// 							borderRadius: "20px",
// 							margin: "40px auto",
// 							maxWidth: "500px",
// 							animation: "fadeIn 0.3s ease-in-out",
// 						}}
// 					>
// 						<p
// 							style={{ fontSize: "18px", color: "#666", marginBottom: "20px" }}
// 						>
// 							{t("security.noResults", { searchTerm })}
// 						</p>
// 					</div>
// 				)}
// 			</div>

// 			<style jsx>{`
// 				@keyframes fadeIn {
// 					from {
// 						opacity: 0;
// 						transform: translateY(10px);
// 					}
// 					to {
// 						opacity: 1;
// 						transform: translateY(0);
// 					}
// 				}
// 			`}</style>
// 		</div>
// 	);
// };

// export default Invest;

import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import Search from "../Search/Search";
import { useSearch } from "../../Context/SearchContext";
import { useNavigate } from "react-router-dom";

const Invest = () => {
  const { t, i18n } = useTranslation();
  const { searchTerm } = useSearch();
  const isLTR = i18n.language === "en";
  const navigate = useNavigate();

  // Get all static articles from i18n (re‑evaluates when language changes)
  
  // Filter only those with ctg = 1 (Privacy & Security)
  const articles = useMemo(() => {
    const allStaticArticles = t("staticArticles", { returnObjects: true }) || {};
    return Object.values(allStaticArticles)
      .filter((article) => article.ctg === 8)
      .map((article) => ({
        ...article,
        _id: article._id,
      }));
  }, [t]); //ependency forces update

  // Filter by search term
  const filteredArticles = useMemo(() => {
    if (!searchTerm.trim()) return articles;
    return articles.filter((article) =>
      article.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, articles]);

  // Highlight search term
  const highlightText = (text, searchTerm) => {
    if (!searchTerm) return text;
    const regex = new RegExp(`(${searchTerm})`, "gi");
    const parts = text.split(regex);
    return parts.map((part, i) =>
      regex.test(part) ? (
        <mark key={i} style={{ color: "red", backgroundColor: "transparent" }}>
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  // No loading/error states because we use static data
  const loading = false;
  const error = null;

  if (loading) {
    return (
      <div
        className="min-vh-100 d-flex align-items-center justify-content-center"
        style={{
          background: "linear-gradient(180deg, #D72229 30%, rgba(215, 34, 41, 0) 100%)",
        }}
      >
        <div className="text-center text-white">
          <div className="spinner-border text-light" role="status">
            <span className="visually-hidden">جاري التحميل...</span>
          </div>
          <p className="mt-3">{t("loading") || "جاري تحميل المقالات..."}</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="min-vh-100 d-flex align-items-center justify-content-center"
        style={{
          background: "linear-gradient(180deg, #D72229 30%, rgba(215, 34, 41, 0) 100%)",
        }}
      >
        <div className="text-center text-white bg-danger bg-opacity-75 p-4 rounded-4">
          <h4>{t("error") || "حدث خطأ"}</h4>
          <p>{error}</p>
          <button className="btn btn-light mt-2" onClick={() => window.location.reload()}>
            {t("retry") || "إعادة المحاولة"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-vh-100 d-flex align-items-center justify-content-center p-4"
      style={{
        background: "linear-gradient(180deg, #D72229 30%, rgba(215, 34, 41, 0) 100%)",
        direction: isLTR ? "ltr" : "rtl",
      }}
    >
      <div className="w-100" style={{ maxWidth: "1050px", margin: "0 auto" }}>
        <Search />

        {/* Header */}
        <div className="mb-5 Head-title">
          <div
            className="fw-bold"
            style={{
              fontFamily: "'Cairo', sans-serif",
              fontWeight: 700,
              fontSize: "clamp(30px, 8vw, 65px)",
              lineHeight: "clamp(35px, 6vw, 55px)",
              color: "#000000",
              margin: "clamp(20px, 10vw, 90px) 0 clamp(20px, 8vw, 60px) 0",
              textAlign: isLTR ? "left" : "right",
            }}
          >
            {highlightText(t("Invest.title"), searchTerm)}
          </div>
        </div>

        {/* Articles grid */}
        {filteredArticles.length > 0 ? (
          <div className="row gx-2 gy-3" style={{ marginBottom: "clamp(30px, 15vw, 500px)" }}>
            {filteredArticles.map((article) => (
              <div key={article._id} className="col-12 col-md-6 d-flex">
                <div
                  className="d-flex align-items-center px-4 shadow-sm"
                  style={{
                    width: "100%",
                    height: "60px",
                    background: "#EDEDED",
                    borderRadius: "28px",
                    opacity: 1,
                    flexDirection: isLTR ? "row" : "row-reverse",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    animation: "fadeIn 0.3s ease-in-out",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.15)";
                    e.currentTarget.style.background = "#e0e0e0";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                    e.currentTarget.style.background = "#EDEDED";
                  }}
                  onClick={() => {
                    navigate(`/article/${article._id}`);
                  }}
                >
                  <div
                    className="bg-danger rounded-circle flex-shrink-0"
                    style={{
                      width: "12px",
                      height: "12px",
                      marginLeft: isLTR ? "0" : "auto",
                      marginRight: isLTR ? "10px" : "0",
                      order: isLTR ? 0 : 1,
                    }}
                  />
                  <span
                    className="text-danger fw-semibold fs-5 flex-grow-1 px-3"
                    style={{
                      fontFamily: "'Cairo', sans-serif",
                      textAlign: isLTR ? "left" : "right",
                      fontSize: "clamp(14px, 4vw, 20px)",
                      order: isLTR ? 1 : 0,
                    }}
                  >
                    {highlightText(article.title, searchTerm)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div
            className="no-results"
            style={{
              textAlign: "center",
              padding: "60px 20px",
              background: "rgba(255, 255, 255, 0.9)",
              borderRadius: "20px",
              margin: "40px auto",
              maxWidth: "500px",
              animation: "fadeIn 0.3s ease-in-out",
            }}
          >
            <p style={{ fontSize: "18px", color: "#666", marginBottom: "20px" }}>
              {t("security.noResults", { searchTerm })}
            </p>
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

export default Invest;